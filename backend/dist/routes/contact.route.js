import { Router } from "express";
import { createContact, getContacts } from "../controlers/contact.controler.js";
const router = Router();
router.get("/", getContacts);
router.post("/me", createContact);
export default router;
//# sourceMappingURL=contact.route.js.map