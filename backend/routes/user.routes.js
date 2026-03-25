import express from "express";
import protect from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.controller.js";
import { getMe, getAllUsers,updateCharity } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.get("/", protect, adminOnly, getAllUsers);
router.put("/update-charity", protect, updateCharity);

export default router;