import { Router } from "express";
import { getExperience, createExperience, updateExperience, deleteExperience, } from "../controlers/experiences.controler.js";
const router = Router();
router.get("/", getExperience);
router.post("/", createExperience);
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);
export default router;
//# sourceMappingURL=experiences.route.js.map