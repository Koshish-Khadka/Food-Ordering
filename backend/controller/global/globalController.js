//This is the global controller this includes the function that is used bu both admin and users

import Product from "../../models/productModel.js";
import Review from "../../models/reviewModel.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  if (!products) {
    return res.status(404).json({ message: "Products not found" });
  }
  res.status(200).json({ products });
};

export const getProductbyID = async (req, res) => {
  const productID = req.params.productID;
  if (!productID) {
    return res.status(403).json({ message: "Product id not found" });
  }
  const product = await Product.findById(productID);
  // also fetch the review of that product
  const productReviews = await Review.find({ productId: productID }).populate(
    "userId"
  );

  if (!product) {
    res.status(404).json({ message: "product not found with that id" });
  } else {
    res.status(200).json({ message: "product found", product, productReviews });
  }
};
