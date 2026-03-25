import express from "express";
import protect from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.controller.js";
import { simulateDraw, publishDraw, getAllDraws } from "../controllers/matchDraw.controller.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAllDraws);
router.post("/simulate", protect, adminOnly, simulateDraw);
router.put("/publish/:id", protect, adminOnly, publishDraw);

export default router;