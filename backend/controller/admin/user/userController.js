import User from "../../../models/userModel.js";

export const getUser = async (req, res) => {
  const users = await User.find();
  //   const filterUsers = users.filter((userdata) => userdata.id != users._id);

  //   Exclude the current login user information
  const filterUsers = users.filter(
    (u) => u._id.toString() !== req.user._id.toString() //req.user._id will come from the middleware
  );

  if (filterUsers.length >= 1) {
    res
      .status(200)
      .json({ message: "Users fetched successfully", data: filterUsers });
  } else {
    res.status(404).json({ message: "Users collections is empty", data: [] });
  }
};

export const deleteUser = async (req, res) => {
  // const { userID } = req.body;
  // console.log("userID", userID);
  const { userID } = req.params.id;
  if (!userID) {
    return res.status(505).json({ message: "UserID not provided" });
  }
  //   find that id user
  const user = await User.findById(userID);
  if (!user) {
    return res.status(404).json({ message: "User not found with that id" });
  }
  const deleteuser = await User.findByIdAndDelete(userID);
  res.status(200).json({
    message: "User deleted Successfully",
    data: deleteuser,
    new: true,
  });
};
