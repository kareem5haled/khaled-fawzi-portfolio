import { Router } from "express";
import { login, changePassword } from "../controllers/authController";
import { protect } from "../middleware/auth";
import { loginLimiter } from "../middleware/rateLimiter";
import { body } from "express-validator";
import { validate } from "../middleware/validate";

const router = Router();

router.post(
  "/login",
  loginLimiter,
  [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  login,
);

router.post("/change-password", protect, changePassword);

export default router;
