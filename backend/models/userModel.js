import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema(
  {
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
      // select: false, //make this data hidden when user data is fetched
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
      // select: false,
    },
    otp: {
      type: Number,

      // select: false
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
      // select: false,
    },
    cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
