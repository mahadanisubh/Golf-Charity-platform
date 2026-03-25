import express from "express";
import protect from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.controller.js";
import { createCharity, getCharities } from "../controllers/charity.controller.js";

const router = express.Router();

router.get("/", getCharities);
router.post("/", protect, adminOnly, createCharity);

export default router;