import { Router } from "express";
import userAuthRoute from "./userAuth.route.js";
import profileRoute from "./profile.route.js";
import projectRoute from "./projects.route.js";
import educationRoute from "./educations.route.js";

const router = Router();

router.use("/auth", userAuthRoute);
router.use("/profile", profileRoute);
router.use("/projects", projectRoute);
router.use("/educations", educationRoute);

export default router;
