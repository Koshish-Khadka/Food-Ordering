// get my profile

import User from "../../../models/userModel.js";
import bcrypt from "bcryptjs";

export const getMyProfile = async (req, res) => {
  const userId = req.user.id;
  const myProfile = await User.findById(userId);
  //   send response
  res.status(200).json({ message: "Profile data", data: myProfile });
};
// update my profile

export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { user, email, phoneNumber } = req.body;

  const Updateddata = await User.findByIdAndUpdate(
    userId,
    {
      user,
      email,
      phoneNumber,
    },
    {
      runValidators: true,
      new: true,
    }
  );
  res
    .status(200)
    .json({ message: "Profile update successfully", data: Updateddata });
};

//delete my profile

export const deleteProfile = async (req, res) => {
  const userId = req.user.id;
  await User.findByIdAndDelete(userId);
  res.status(200).json({ message: "User deleted Successfullly", data: null });
};

// Update your password
export const updatePassword = async (req, res) => {
  const userId = req.user.id;
  // User input - old password and new password
  // Check if the old password matched with the current password or not

  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "Old password new password and confirmPassword are required",
    });
  }
  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "new password and confirm password do not match " });
  }
  // Find user
  const userData = await User.findById(userId);
  if (!userData) {
    return res.status(404).json({ message: "User not found" });
  }

  // Compare old password
  const isMatch = bcrypt.compareSync(oldPassword, userData.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }
  // Hash new password
  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  // Update password
  userData.password = hashedPassword;
  await userData.save();

  res.status(200).json({ message: "Password changed successfully" });
};
