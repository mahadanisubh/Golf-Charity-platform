import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { addScore, getMyScores } from "../controllers/score.controller.js";

const router = express.Router();

router.post("/", protect, addScore);
router.get("/me", protect, getMyScores);

export default router;