import { Router } from "express";
import { addProject, getProjects, updateProject, deleteProject, } from "../controlers/projects.controler.js";
const router = Router();
router.get("/", getProjects);
router.post("/", addProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
export default router;
//# sourceMappingURL=projects.route.js.map