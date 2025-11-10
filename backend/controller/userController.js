import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../services/sendMail.js";

export const loginUser = async (req, res) => {
  try {
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
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.log("Failed to login user", error);
  }
};

export const registerUser = async (req, res) => {
  try {
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
        .json({ message: "User registered successfully", createUser });
    } else {
      res.status(500).json({ message: "Failed to register user" });
    }
  } catch (error) {
    console.log("Failed to register user", error);
  }
};

// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }
//   // check email
//   const checkUser = await User.find({ email: email });
//   if (checkUser.length === 0) {
//     return res.status(404).json({ message: "Email not found" });
//   }
//   //   send otp to email
//   const otp = Math.floor(1000 + Math.random() * 9000);

//   // Save the send otp to the otp column on database
//   checkUser.otp = otp;
//   await User.save();

//   await sendMail({
//     to: "koshishkhadka364@gmail.com",
//     subject: "Password Recovery OTP",
//     text: `Your OTP for password recovery is ${otp}. It is valid for 10 minutes.`,
//   });

//   res.status(200).json({ message: "OTP sent to email", otp });
// };
export const forgotPassword = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
