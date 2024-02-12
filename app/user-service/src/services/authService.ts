import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("profile", authMiddleware, (req, res) => {
	res.status(200).json({ message: "user authenticated." });
});

export default router;