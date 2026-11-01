import type { Request, Response, NextFunction } from "express";
export interface CloudinaryUploadOptions {
    folder?: string;
}
/**
 * Cloudinary Upload Middleware.
 * Supports:
 * - uploadToCloudinary (default folder: 'portfolio')
 * - uploadToCloudinary('projects') (folder: 'portfolio/projects')
 * - uploadToCloudinary({ folder: 'custom_folder' })
 */
export declare function uploadToCloudinary(folderOrOptionsOrReq?: string | CloudinaryUploadOptions | Request, res?: Response, next?: NextFunction): any;
export default uploadToCloudinary;
//# sourceMappingURL=cloudinary.middleware.d.ts.map