import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getCheckoutSession } from "../Controllers/checkController.js";
const router = express.Router();
router.post("/now", authenticate, getCheckoutSession);
export default router;
