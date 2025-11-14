import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const Seedadmin = async () => {
  const isAdminExists = await User.findOne({
    email: "admin123@gmail.com",
  });
  if (!isAdminExists) {
    // If admin doesnot exists seed admin data
    await User.create({
      user: "admin",
      email: "admin123@gmail.com",
      phoneNumber: 9843023686,
      password: bcrypt.hashSync("admin", 10),
      role: "admin",
    });
  }
};
