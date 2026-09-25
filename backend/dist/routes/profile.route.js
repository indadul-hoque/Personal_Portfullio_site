import { Router } from "express";
import { createProfile, getProfile, updateProfile, } from "../controlers/profile.contorler.js";
const router = Router();
router.get("/get", getProfile);
router.post("/create", createProfile);
router.put("/update/:id", updateProfile);
export default router;
//# sourceMappingURL=profile.route.js.map