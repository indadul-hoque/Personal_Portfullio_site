import { Router } from "express";
import { createProfile, getProfile, updateProfile, } from "../controlers/profile.contorler.js";
const router = Router();
router.get("/", getProfile);
router.post("/", createProfile);
router.put("/:id", updateProfile);
export default router;
//# sourceMappingURL=profile.route.js.map