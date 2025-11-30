import express from "express";
import {
  changePassword,
  forgotPassword,
  loginUser,
  registerUser,
  VerifyOtp,
} from "../controller/usercontroller.js";
import { catchAsync } from "../services/catchAsync.js";

const router = express.Router();

router.post("/login", catchAsync(loginUser));
router.post("/register", catchAsync(registerUser));
router.post("/forgot-password", catchAsync(forgotPassword));
router.post("/verifyOTP", catchAsync(VerifyOtp));
router.post("/changePassword", catchAsync(changePassword));

export default router;
