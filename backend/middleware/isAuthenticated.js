import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log("The token is", token);
    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }

    //   If there is token verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const UserExists = await User.findOne({ _id: decoded.userId });

    if (!UserExists) {
      return res
        .status(404)
        .json({ message: "User doesnot exists with that id/token " });
    }

    req.user = UserExists;
    // console.log(UserExists);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
