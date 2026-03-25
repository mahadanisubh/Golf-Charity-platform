import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { createOrUpdateSubscription } from "../controllers/subscription.controller.js";

const router = express.Router();

router.post("/", protect, createOrUpdateSubscription);

export default router;