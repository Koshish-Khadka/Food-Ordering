import mongoose, { Schema } from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        quantity: { type: Number, required: true },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "delivered", "cancelled", "ontheway", "preparation"],
      default: "pending",
    },
    paymentDetails: {
      pidx: { type: String },
      method: { type: String, enum: ["COD", "Khalti"] },
      status: { type: String, enum: ["paid", "unpaid", "pending"] },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
