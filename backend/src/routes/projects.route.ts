import { Router } from "express";

import {
  addProject,
  getProjects,
  updateProject,
} from "../controlers/projects.controler.js";

const router = Router();

router.get("/", getProjects);
router.post("/", addProject);
router.put("/:id", updateProject);

export default router;
