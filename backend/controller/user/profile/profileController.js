// get my profile

import User from "../../../models/userModel.js";

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

  await User.findByIdAndUpdate(
    userId,
    {
      user,
      email,
      phoneNumber,
    },
    {
      new: true,
    }
  );
  res.status(200).json({ message: "Profile update successfull" });
};

//delete my profile
