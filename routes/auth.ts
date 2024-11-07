import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
import { validateRegister } from "../middlewares/validationMiddleware";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", validateRegister, registerUser);

router.post("/login", loginUser);

router.get("/profile", verifyToken, (req, res) => {
    res.status(200).json({
        message: "Profile data",
        user: req.user
    });
});

export default router;
