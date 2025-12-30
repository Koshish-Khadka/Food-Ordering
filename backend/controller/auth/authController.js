import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../../services/sendMail.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
  }
  //check user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  // compare password
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  // generate token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "11h",
    }
  );

  res.status(200).json({ message: "Login successful", user, token });
};

export const registerUser = async (req, res) => {
  const { email, phoneNumber, password, user } = req.body;
  if (!email || !phoneNumber || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check existing email
  const checkEmail = await User.findOne({ email: email });
  if (checkEmail) {
    return res.status(409).json({ message: "Email already exists" });
  }

  //   create new user

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const createUser = await User.create({
    user,
    email,
    phoneNumber,
    password: hashPassword,
  });
  if (createUser) {
    res
      .status(201)
      .json({ message: "User registered successfully", data: createUser });
  } else {
    res.status(500).json({ message: "Failed to register user" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // check email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }

  // generate otp
  const otp = Math.floor(1000 + Math.random() * 9000);

  // save otp to user
  user.otp = otp;
  await user.save();

  // send email
  await sendMail({
    to: email, // send to user's email
    subject: "Password Recovery OTP",
    text: `Your OTP for password recovery is ${otp}. It is valid for 10 minutes.`,
  });

  res.status(200).json({ message: "OTP sent to email" });
};

export const VerifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // find user by email
  const users = await User.find({ email: email });

  if (users.length === 0) {
    return res.status(404).json({ message: "Email not registered" });
  }

  // access the first user in the array
  const currentUser = users[0];

  // compare otp
  if (currentUser.otp !== otp) {
    res.status(400).json({ message: "Invalid OTP" });
  } else {
    res.status(200).json({ message: "OTP matched " });
    // After otp is matcted dispatch the otp
    currentUser.otp = null;
    currentUser.isOtpVerified = true;
    await currentUser.save();
  }
};

export const changePassword = async (req, res) => {
  const { email, password, confirmpassword } = req.body;
  console.log("body", req.body);
  if (!email || !password || !confirmpassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Password donot match" });
  }
  const userExists = await User.find({ email: email });
  if (userExists.length === 0) {
    return res.status(404).json({ message: "Email not registered" });
  }
  if (userExists[0].isOtpVerified !== true) {
    return res.status(403).json({ message: "You cannot perform this action" });
  }

  const currentUser = userExists[0];
  currentUser.password = bcrypt.hashSync(password, 10);
  currentUser.isOtpVerified = false;
  await currentUser.save();
  return res.status(200).json({ message: "Password changed successfully" });
};
