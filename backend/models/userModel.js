import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please enter your phone number"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
