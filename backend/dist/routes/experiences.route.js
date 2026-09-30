import { Router } from "express";
import { getExperience, createExperience, updateExperience, } from "../controlers/experiences.controler.js";
const router = Router();
router.get("/", getExperience);
router.post("/", createExperience);
router.put("/:id", updateExperience);
export default router;
//# sourceMappingURL=experiences.route.js.map