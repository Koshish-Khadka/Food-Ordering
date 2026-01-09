import express from "express";
import {
  adminLogin,
  changePassword,
  forgotPassword,
  loginUser,
  registerUser,
  VerifyOtp,
} from "../../controller/auth/authController.js";
import { catchAsync } from "../../services/catchAsync.js";

const router = express.Router();

router.post("/login", catchAsync(loginUser));
router.post("/login/admin", catchAsync(adminLogin));
router.post("/register", catchAsync(registerUser));
router.post("/forgot-password", catchAsync(forgotPassword));
router.post("/verifyOTP", catchAsync(VerifyOtp));
router.post("/changePassword", catchAsync(changePassword));

export default router;
