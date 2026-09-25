import { Router } from "express";
import userAuthRoute from "./userAuth.route.js";
import profileRoute from "./profile.route.js";

const router = Router();

router.use("/auth", userAuthRoute);
router.use("/profile", profileRoute);

export default router;
