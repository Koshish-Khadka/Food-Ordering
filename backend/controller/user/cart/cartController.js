import Product from "../../../models/productModel.js";
import User from "../../../models/userModel.js";

export const addToCart = async (req, res) => {
  // First user id lene
  // Product Id lene
  const userId = req.user.id;
  const { productId } = req.params;

  if (!productId || !userId) {
    return res
      .status(400)
      .json({ message: "Please provide userID and ProductID" });
  }
  //   Find if product exists on product table or noe
  const productExists = await Product.findById(productId);
  if (!productExists) {
    return res.status(404).json({ message: "Product Data not found" });
  }
  const user = await User.findById(userId);
  //   user ko data vetra cart vanne column cha tesma push gardene productid
  user.cart.push(productId);
  await user.save(); //save it to the database
  res.status(200).json({ message: "Product added to cart successfully" });
};

export const getCartItems = async (req, res) => {
  const userId = req.user.id;
  const userData = await User.findById(userId).populate({
    path: "cart",
    select: "-productStatus",
  });
  const cartData = userData.cart; //only show the cart items not whole user info
  if (!userData) {
    return res.status(404).json({ message: "User not found with the id" });
  } else {
    res
      .status(200)
      .json({ message: "User data fetched Successfully", data: cartData });
  }
};

export const deleteCartItems = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  if (!userId || !productId) {
    return res.status(400).json({ message: "Userid and productId not found" });
  }
  const userData = await User.findById(userId);
  userData.cart = userData.cart.filter((pId) => pId != productId);
  await userData.save();
  res.status(200).json({ message: "Deleted product form cart " });
};
