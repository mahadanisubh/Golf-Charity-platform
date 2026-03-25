import express from "express";
import protect from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.controller.js";
import { getAllWinners, uploadProof,verifyWinner } from "../controllers/winner.controller.js";

const router = express.Router();

router.get("/", protect, getAllWinners);
router.put("/proof/:id", protect, uploadProof);
router.put("/verify/:id", protect, adminOnly, verifyWinner);

export default router;