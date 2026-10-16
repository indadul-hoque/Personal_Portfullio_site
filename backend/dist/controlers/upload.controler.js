export const uploadFile = (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "No file was uploaded. Please provide a file.",
            });
            return;
        }
        const host = req.get("host") || "localhost:4001";
        const protocol = req.protocol || "http";
        const filename = req.file.filename;
        const fileUrl = `${protocol}://${host}/uploads/${filename}`;
        const relativePath = `/uploads/${filename}`;
        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            url: fileUrl,
            relativePath,
            filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
        });
    }
    catch (error) {
        console.error("Error in uploadFile controller:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while processing uploaded file",
        });
    }
};
//# sourceMappingURL=upload.controler.js.map