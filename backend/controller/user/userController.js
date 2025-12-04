import Product from "../../models/productModel.js";
import Review from "../../models/reviewModel.js";

export const createReview = async (req, res) => {
  const userId = req.user.id;
  const { rating, message } = req.body;
  const productId = req.params.id;
  if (!rating || !message || !productId) {
    return res.status(400).json({
      message:
        "Please provide rating, message and productID to create review. ",
    });
  }
  //   Check if the product exists or not
  const productExists = await Product.findById(productId);
  if (!productExists) {
    return res
      .status(404)
      .json({ message: "Product with that Id does not exist " });
  }
  //   Insert into Review Schema
  await Review.create({
    userId: userId,
    productId: productId,
    rating: rating,
    message: message,
  });
  res.status(200).json({ message: "Review Created Successfully" });
};

export const getProductReview = async (req, res) => {
  const productId = req.params.id;
  console.log(productId);
  if (!productId) {
    return res.status(400).json({
      message: "Product Id must be provided",
    });
  }
  //   Check if that product exist or not
  const productExists = await Product.findById(productId);
  if (!productExists) {
    return res
      .status(404)
      .json({ message: "Product with that ID does not exist" });
  }
  //   Get review
  const reviews = await Review.find({ productId })
    .populate("userId")
    .populate("productId");

  res.status(200).json({ message: "Review fetched successfully", reviews });
};

export const deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  if (!reviewId) {
    return res.status(400).json({
      message: "reviewId  must be provided",
    });
  }
  //   Check if that review exist or not
  const reviewExists = await Review.findById(reviewId);
  if (!reviewExists) {
    return res
      .status(404)
      .json({ message: "review with that ID does not exist" });
  }
  //   Delete that review
  const review = Review.findByIdAndDelete({ reviewId });
  res.status(200).json({ message: "Review Deleted Successfully", review });
};
