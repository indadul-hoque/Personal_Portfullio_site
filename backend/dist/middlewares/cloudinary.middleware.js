import path from "node:path";
import { uploadBufferToCloudinary } from "../config/cloudinary.js";
/**
 * Uploads an individual Multer file (from memory buffer) to Cloudinary
 * and attaches Cloudinary URL and public_id to the file object.
 */
async function uploadMulterFile(file, targetFolder) {
    const isPdf = file.mimetype === "application/pdf" ||
        file.originalname.toLowerCase().endsWith(".pdf");
    const sanitizedBasename = path
        .parse(file.originalname)
        .name.replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e4)}`;
    const publicId = `${sanitizedBasename}_${uniqueSuffix}${isPdf ? ".pdf" : ""}`;
    const result = await uploadBufferToCloudinary(file.buffer, {
        folder: targetFolder,
        public_id: publicId,
        resource_type: isPdf ? "auto" : "image",
    }, file.originalname);
    // Set file.path and file.filename so downstream controllers receive the Cloudinary URL and ID
    file.path = result.secure_url;
    file.filename = result.public_id;
    file.secure_url = result.secure_url;
    file.cloudinaryUrl = result.secure_url;
    file.public_id = result.public_id;
    return result.secure_url;
}
async function processCloudinaryUpload(req, res, next, folderName) {
    try {
        const rootFolder = folderName.startsWith("portfolio")
            ? folderName
            : `portfolio/${folderName}`;
        // 1. Single file upload (e.g. req.file from fileUpload.single('displayImage'))
        if (req.file && req.file.buffer) {
            await uploadMulterFile(req.file, rootFolder);
        }
        // 2. Multiple files upload (e.g. req.files from fileUpload.fields(...) or fileUpload.array(...))
        if (req.files) {
            if (Array.isArray(req.files)) {
                for (const file of req.files) {
                    if (file.buffer) {
                        await uploadMulterFile(file, rootFolder);
                    }
                }
            }
            else {
                // req.files is a dictionary: { [fieldname: string]: Express.Multer.File[] }
                const fields = req.files;
                for (const [fieldName, files] of Object.entries(fields)) {
                    const subFolder = `${rootFolder}/${fieldName}`;
                    for (const file of files) {
                        if (file.buffer) {
                            await uploadMulterFile(file, subFolder);
                        }
                    }
                }
            }
        }
        next();
    }
    catch (error) {
        console.error("Cloudinary upload middleware error:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? `File upload to Cloudinary failed: ${error.message}`
                : "File upload to Cloudinary failed",
        });
    }
}
/**
 * Cloudinary Upload Middleware.
 * Supports:
 * - uploadToCloudinary (default folder: 'portfolio')
 * - uploadToCloudinary('projects') (folder: 'portfolio/projects')
 * - uploadToCloudinary({ folder: 'custom_folder' })
 */
export function uploadToCloudinary(folderOrOptionsOrReq, res, next) {
    if (typeof folderOrOptionsOrReq === "string" ||
        (typeof folderOrOptionsOrReq === "object" &&
            folderOrOptionsOrReq !== null &&
            !("headers" in folderOrOptionsOrReq))) {
        const folder = typeof folderOrOptionsOrReq === "string"
            ? folderOrOptionsOrReq
            : folderOrOptionsOrReq?.folder ?? "portfolio";
        return (r, s, n) => processCloudinaryUpload(r, s, n, folder);
    }
    // When used directly as middleware: router.post('/', uploadToCloudinary, handler)
    return processCloudinaryUpload(folderOrOptionsOrReq, res, next, "portfolio");
}
export default uploadToCloudinary;
//# sourceMappingURL=cloudinary.middleware.js.map