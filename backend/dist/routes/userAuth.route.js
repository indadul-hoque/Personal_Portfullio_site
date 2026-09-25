import { Router } from "express";
import { userLogin } from "../controlers/userAuth.contorler.js";
const router = Router();
router.post("/login", userLogin);
export default router;
//# sourceMappingURL=userAuth.route.js.map