import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "ProductName must be provided"],
    },
    productDescription: {
      type: String,
      required: [true, "productDescription must be provided"],
    },
    productStockQty: {
      type: Number,
      required: [true, "productStockQty must be provided"],
    },
    productPrice: {
      type: Number,
      required: [true, "productPrice must be provided"],
    },
    productStatus: {
      type: String,
      enum: ["available", "unavailable"],
    },
    productImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
