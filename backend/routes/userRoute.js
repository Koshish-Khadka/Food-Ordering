import express from "express";
import {
  forgotPassword,
  loginUser,
  registerUser,
} from "../controller/usercontroller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgot-password", forgotPassword);

export default router;
