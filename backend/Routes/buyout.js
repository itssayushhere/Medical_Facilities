import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getCheckoutSession, getOrdered } from "../Controllers/checkController.js";
const router = express.Router();
router.post("/now", authenticate, getCheckoutSession);
router.get("/ordered", authenticate,getOrdered);
export default router;
