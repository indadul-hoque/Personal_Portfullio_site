import { Router } from "express";

import {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controlers/projects.controler.js";
import fileUpload from "../middlewares/fileUpload.middleware.js";

const router = Router();

router.get("/", getProjects);
router.post("/", fileUpload.single("displayImage"), addProject);
router.put("/:id", fileUpload.single("displayImage"), updateProject);
router.delete("/:id", deleteProject);

export default router;
