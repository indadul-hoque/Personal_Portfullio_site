// src/middlewares/multer.ts (fileUpload.middleware.ts)
import multer from "multer";
import fs from "node:fs";
import path from "node:path";
const uploadDir = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    // BUG 16 fix: let TypeScript infer the callback signature — do NOT annotate
    // the filename cb as FileFilterCallback (that is for fileFilter only).
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});
// BUG 19 fix: allow both images AND CV document types
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".pdf"];
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"];
// BUG 20 fix: 15MB global server limit (client enforces 5MB for photos)
const fileUpload = multer({
    storage,
    limits: {
        fileSize: 15 * 1024 * 1024,
    },
    // BUG 17 fix: Request is already imported above
    fileFilter: (_req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const isExtensionValid = ALLOWED_EXTENSIONS.includes(extension);
        const isMimeValid = ALLOWED_MIME_TYPES.includes(file.mimetype);
        if (isExtensionValid && isMimeValid) {
            cb(null, true);
        }
        else {
            // BUG 18 fix: pass an Error so the client sees a meaningful message
            // and the controller's catch block runs (not cb(null, false) silent reject)
            cb(new Error(`Invalid file type "${extension}" (${file.mimetype}). Allowed: ${ALLOWED_EXTENSIONS.join(", ")}`));
        }
    },
});
export default fileUpload;
//# sourceMappingURL=fileUpload.middleware.js.map