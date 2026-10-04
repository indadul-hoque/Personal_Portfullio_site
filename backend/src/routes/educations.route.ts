import { Router } from "express";

import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controlers/educations.controler.js";

const router = Router();

router.get("/", getEducation);
router.post("/", createEducation);
router.put("/:id", updateEducation);
router.delete("/:id", deleteEducation);

export default router;
