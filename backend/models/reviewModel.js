import mongoose from "mongoose";
import { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A review must belong to user"],
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "A review must belong to product"],
  },
  rating: {
    type: Number,
    default: 3,
  },
  message: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
