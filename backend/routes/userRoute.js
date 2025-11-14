import express from "express";
import {
  changePassword,
  forgotPassword,
  loginUser,
  registerUser,
  VerifyOtp,
} from "../controller/usercontroller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgot-password", forgotPassword);
router.post("/verifyOTP", VerifyOtp);
router.post("/changePassword", changePassword);

export default router;
