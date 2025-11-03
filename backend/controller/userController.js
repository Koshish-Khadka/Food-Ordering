import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
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
