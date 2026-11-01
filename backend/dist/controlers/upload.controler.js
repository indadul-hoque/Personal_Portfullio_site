import fs from "fs";
import cloudinary from "../config/cloudinary.js";
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ success: false, message: "No file uploaded" });
            return;
        }
        const localPath = req.file.path;
        const result = await cloudinary.uploader.upload(localPath, {
            folder: "portfolio_images",
            resource_type: "image",
        });
        // Cleanup local file
        if (fs.existsSync(localPath))
            fs.unlinkSync(localPath);
        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            data: {
                url: result.secure_url,
                public_id: result.public_id,
            },
        });
    }
    catch (error) {
        const err = error;
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            success: false,
            message: "Upload failed",
            error: err.message,
        });
    }
};
//# sourceMappingURL=upload.controler.js.map