import { Router } from "express";
import { getEducation, createEducation, } from "../controlers/educations.controler.js";
const router = Router();
router.get("/", getEducation);
router.post("/", createEducation);
export default router;
//# sourceMappingURL=educations.route.js.map