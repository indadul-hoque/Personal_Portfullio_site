import { promises as fsp } from "node:fs";
import cloudinary from "../config/cloudinary.js";
// ─── Helpers ─────────────────────────────────────────────────────────────────
/** Best-effort async unlink — never throws. */
async function unlinkSafe(filePath) {
    if (!filePath)
        return;
    try {
        await fsp.unlink(filePath);
    }
    catch {
        // ignore — file may not exist or already removed
    }
}
/** Destroy a Cloudinary asset; never throws. */
async function destroySafe(publicId, resourceType) {
    if (!publicId)
        return;
    try {
        await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });
    }
    catch {
        // best-effort
    }
}
/** Strict JSON parse: returns `{ ok, value }` so callers can 400 on failure. */
function tryParseJSON(value) {
    if (typeof value !== "string")
        return { ok: false };
    try {
        return { ok: true, value: JSON.parse(value) };
    }
    catch {
        return { ok: false };
    }
}
/** Upload a local temp file; returns URL + publicId. */
async function uploadToCloudinary(filePath, folder, resourceType) {
    const result = await cloudinary.uploader.upload(filePath, {
        folder,
        resource_type: resourceType,
    });
    return { url: result.secure_url, publicId: result.public_id };
}
const REQUIRED_FIELDS = [
    "displayName",
    "email",
    "phone",
    "address",
    "bio",
];
function missingRequired(body) {
    return REQUIRED_FIELDS.filter((f) => {
        const v = body[f];
        return v === undefined || v === null || String(v).trim() === "";
    });
}
// ─── GET /api/profile ────────────────────────────────────────────────────────
export const getProfile = async (_req, res) => {
    const { prisma } = await import("../config/dbConnection.js");
    try {
        const profile = await prisma.profile.findFirst();
        if (!profile) {
            res.status(404).json({ success: false, message: "Profile not found" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: profile,
        });
    }
    catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
// ─── POST /api/profile ───────────────────────────────────────────────────────
export const createProfile = async (req, res) => {
    const { prisma } = await import("../config/dbConnection.js");
    const files = req.files;
    const photoFile = files?.photo?.[0];
    const cvFile = files?.cv?.[0];
    // Track uploads so we can roll back on later failure
    let photoRef;
    let cvRef;
    try {
        // ── 1. Validate required text fields FIRST (before any upload) ──
        const missing = missingRequired(req.body);
        if (missing.length > 0) {
            res.status(400).json({
                success: false,
                message: `Missing required fields: ${missing.join(", ")}`,
            });
            return;
        }
        if (!photoFile || !cvFile) {
            res.status(400).json({
                success: false,
                message: "Both 'photo' and 'cv' files are required",
            });
            return;
        }
        // ── 2. Validate JSON fields strictly ──
        const skillsParsed = tryParseJSON(req.body.skills);
        if (!skillsParsed.ok) {
            res.status(400).json({
                success: false,
                message: "skills must be a JSON array of strings",
            });
            return;
        }
        const socialParsed = tryParseJSON(req.body.socialLinks ?? "{}");
        if (!socialParsed.ok) {
            res.status(400).json({
                success: false,
                message: "socialLinks must be a valid JSON object",
            });
            return;
        }
        // ── 3. Upload files ──
        [photoRef, cvRef] = await Promise.all([
            uploadToCloudinary(photoFile.path, "portfolio/photos", "image"),
            uploadToCloudinary(cvFile.path, "portfolio/cvs", "raw"),
        ]);
        // ── 4. Persist ──
        const newProfile = await prisma.profile.create({
            data: {
                displayName: req.body.displayName.trim(),
                email: req.body.email.trim().toLowerCase(),
                phone: req.body.phone.trim(),
                address: req.body.address.trim(),
                bio: req.body.bio.trim(),
                socialLinks: socialParsed.value,
                photoURL: photoRef.url,
                cvURL: cvRef.url,
                skills: skillsParsed.value,
            },
        });
        res.status(201).json({
            success: true,
            message: "Profile created successfully",
            data: newProfile,
        });
    }
    catch (error) {
        // Roll back any successful uploads — DB write failed
        await Promise.all([
            destroySafe(photoRef?.publicId, "image"),
            destroySafe(cvRef?.publicId, "raw"),
        ]);
        if (typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2002") {
            const target = error.meta?.target;
            res.status(409).json({
                success: false,
                message: `Duplicate value for: ${(target ?? []).join(", ") || "unique field"}`,
            });
            return;
        }
        console.error("Error creating profile:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        });
    }
    finally {
        await Promise.all([unlinkSafe(photoFile?.path), unlinkSafe(cvFile?.path)]);
    }
};
// ─── PUT /api/profile/:id ────────────────────────────────────────────────────
export const updateProfile = async (req, res) => {
    const { prisma } = await import("../config/dbConnection.js");
    const { id } = req.params;
    if (typeof id !== "string" || !id) {
        res
            .status(400)
            .json({ success: false, message: "Invalid or missing profile ID" });
        return;
    }
    const files = req.files;
    const photoFile = files?.photo?.[0];
    const cvFile = files?.cv?.[0];
    let photoRef;
    let cvRef;
    try {
        // ── 1. Load existing profile (needed for old publicIds + 404) ──
        const existing = await prisma.profile.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ success: false, message: "Profile not found" });
            return;
        }
        // ── 2. Build update payload (text fields only) ──
        const updateData = {};
        const textFields = [
            "displayName",
            "email",
            "phone",
            "address",
            "bio",
        ];
        for (const f of textFields) {
            const v = req.body[f];
            if (v !== undefined)
                updateData[f] = String(v).trim();
        }
        if (req.body.skills !== undefined) {
            const parsed = tryParseJSON(req.body.skills);
            if (!parsed.ok) {
                res.status(400).json({
                    success: false,
                    message: "skills must be a JSON array of strings",
                });
                return;
            }
            updateData.skills = parsed.value;
        }
        if (req.body.socialLinks !== undefined) {
            const parsed = tryParseJSON(req.body.socialLinks);
            if (!parsed.ok) {
                res.status(400).json({
                    success: false,
                    message: "socialLinks must be a valid JSON object",
                });
                return;
            }
            updateData.socialLinks = parsed.value;
        }
        // ── 3. Upload new files (if provided) ──
        if (photoFile) {
            photoRef = await uploadToCloudinary(photoFile.path, "portfolio/photos", "image");
            updateData.photoURL = photoRef.url;
        }
        if (cvFile) {
            cvRef = await uploadToCloudinary(cvFile.path, "portfolio/cvs", "raw");
            updateData.cvURL = cvRef.url;
        }
        // ── 4. Reject empty update ──
        if (Object.keys(updateData).length === 0) {
            await Promise.all([
                destroySafe(photoRef?.publicId, "image"),
                destroySafe(cvRef?.publicId, "raw"),
            ]);
            res
                .status(400)
                .json({ success: false, message: "No updateable fields provided" });
            return;
        }
        // ── 5. Persist ──
        const updatedProfile = await prisma.profile.update({
            where: { id },
            data: updateData,
        });
        // ── 6. Delete OLD files (only after DB success) ──
        // Derive old publicIds from URL — fragile; see note below.
        if (photoRef)
            await destroySafe(derivePublicId(existing.photoURL), "image");
        if (cvRef)
            await destroySafe(derivePublicId(existing.cvURL), "raw");
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedProfile,
        });
    }
    catch (error) {
        // Roll back NEW uploads — DB write failed
        await Promise.all([
            destroySafe(photoRef?.publicId, "image"),
            destroySafe(cvRef?.publicId, "raw"),
        ]);
        if (typeof error === "object" && error !== null && "code" in error) {
            const code = error.code;
            if (code === "P2025") {
                res.status(404).json({ success: false, message: "Profile not found" });
                return;
            }
            if (code === "P2002") {
                const target = error.meta?.target;
                res.status(409).json({
                    success: false,
                    message: `Duplicate value for: ${(target ?? []).join(", ") || "unique field"}`,
                });
                return;
            }
        }
        console.error("Error updating profile:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        });
    }
    finally {
        await Promise.all([unlinkSafe(photoFile?.path), unlinkSafe(cvFile?.path)]);
    }
};
/** Derive public_id from a Cloudinary URL — best effort only. */
function derivePublicId(url) {
    const m = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z0-9]+)?$/i);
    return m?.[1];
}
//# sourceMappingURL=profile.contorler.js.map