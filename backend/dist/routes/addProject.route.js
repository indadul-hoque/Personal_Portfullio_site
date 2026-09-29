import { Router } from "express";
import { addProject, getProjects, updateProject, } from "../controlers/projects.controler.js";
const router = Router();
router.get("/get", getProjects);
router.post("/add", addProject);
router.put("/update/:id", updateProject);
export default router;
//# sourceMappingURL=addProject.route.js.map