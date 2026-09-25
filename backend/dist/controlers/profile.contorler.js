import { prisma } from "../config/dbConnection.js";
export const getProfile = async (_req, res) => {
    try {
        const bio = await prisma.profile.findFirst();
        if (!bio) {
            res.status(404).json({ success: false, message: "Bio not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Bio fetched successfully", data: bio });
    }
    catch (error) {
        console.error("Error fetching bio:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
export const createProfile = async (req, res) => {
    try {
        const { displayName, email, phone, address, bio, socialLinks, photoURL, cvURL, skills, } = req.body;
        if (!displayName ||
            !email ||
            !phone ||
            !address ||
            !bio ||
            !socialLinks ||
            !photoURL ||
            !cvURL ||
            !skills) {
            res.status(401).json({
                success: false,
                message: "Please provide all the required fields",
            });
            return;
        }
        const newProfile = await prisma.profile.create({
            data: {
                displayName,
                email,
                phone,
                address,
                bio,
                socialLinks,
                photoURL,
                cvURL,
                skills,
            },
        });
        res.status(201).json({
            success: true,
            message: "Profile created successfully",
            data: newProfile,
        });
    }
    catch (error) {
        console.error("Error creating profile:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { displayName, email, phone, address, bio, socialLinks, photoURL, cvURL, skills, } = req.body;
        if (typeof id !== "string") {
            res
                .status(400)
                .json({ success: false, message: "Invalid or missing profile ID" });
            return;
        }
        const updateData = {};
        if (displayName !== undefined)
            updateData.displayName = displayName;
        if (email !== undefined)
            updateData.email = email;
        if (phone !== undefined)
            updateData.phone = phone;
        if (address !== undefined)
            updateData.address = address;
        if (bio !== undefined)
            updateData.bio = bio;
        if (socialLinks !== undefined)
            updateData.socialLinks = socialLinks;
        if (photoURL !== undefined)
            updateData.photoURL = photoURL;
        if (cvURL !== undefined)
            updateData.cvURL = cvURL;
        if (skills !== undefined)
            updateData.skills = skills;
        const updatedProfile = await prisma.profile.update({
            where: { id },
            data: updateData,
        });
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedProfile,
        });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        if (typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2025") {
            res.status(404).json({ success: false, message: "Profile not found" });
            return;
        }
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
//# sourceMappingURL=profile.contorler.js.map