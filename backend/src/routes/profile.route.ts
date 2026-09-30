import { Router } from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "../controlers/profile.contorler.js";

const router = Router();

router.get("/", getProfile);
router.get("/get", getProfile);
router.post("/", createProfile);
router.post("/create", createProfile);
router.put("/:id", updateProfile);
router.put("/update/:id", updateProfile);

export default router;
