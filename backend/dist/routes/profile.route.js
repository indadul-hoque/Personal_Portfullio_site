// BUG 12: Route uses fileUpload.fields([...]) for both photo and cv — no other middleware needed.
import { Router } from "express";
import { createProfile, getProfile, updateProfile, } from "../controlers/profile.contorler.js";
import fileUpload from "../middlewares/fileUpload.middleware.js";
const router = Router();
// BUG 12: both POST and PUT accept photo + cv files
const profileUpload = fileUpload.fields([
    { name: "photo", maxCount: 1 },
    { name: "cv", maxCount: 1 },
]);
router.get("/", getProfile);
router.post("/", profileUpload, createProfile);
router.put("/:id", profileUpload, updateProfile);
export default router;
//# sourceMappingURL=profile.route.js.map