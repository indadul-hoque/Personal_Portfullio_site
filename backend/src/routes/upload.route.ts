// src/routes/uploadRoutes.ts
import { Router } from "express";
import upload from "../middlewares/fileUpload.middleware.js";
import { uploadImage } from "../controlers/upload.controler.js";

const router = Router();

// 'image' = field name in form-data
router.post("/upload", upload.single("image"), uploadImage);

export default router;
