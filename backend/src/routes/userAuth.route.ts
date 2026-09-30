import { Router } from "express";
import {
  userLogin,
  getMe,
  userLogout,
} from "../controlers/userAuth.contorler.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", userLogin);
router.get("/me", verifyAuth, getMe);
router.post("/logout", userLogout);

export default router;
