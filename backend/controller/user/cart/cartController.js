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
  // check if the productID already exists or not
  // if yes increase quantity only
  // if no insert the product
  const existingCartItem = user.cart.find((item) =>
    item.product.equals(productId)
  );
  if (existingCartItem) {
    existingCartItem.quantity += 1;
  } else {
    user.cart.push({
      product: productId,
      quantity: 1,
    });
  }

  await user.save(); //save it to the database

  // get the updated data
  const updatedData = await User.findById(userId).populate("cart.product");
  res.status(200).json({
    message: "Product added to cart successfully",
    data: updatedData.cart,
  });
};

export const getCartItems = async (req, res) => {
  const userId = req.user.id;
  const userData = await User.findById(userId).populate({
    path: "cart.product",
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

export const updateCartItems = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  const user = await User.findById(userId);
  const cartItem = user.cart.find((items) => items.product.equals(productId));
  if (!cartItem) {
    return res.status(404).json({ message: "Data not found" });
  }
  cartItem.quantity = quantity;
  await user.save();
  res
    .status(200)
    .json({ message: "Data updated successfully", data: user.cart });
};


export const deleteCartItems = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  if (!userId || !productId) {
    return res.status(400).json({ message: "Userid and productId not found" });
  }

  const userData = await User.findById(userId);

  // userData.cart = userData.cart.filter((pId) => pId != productId);

  userData.cart = userData.cart.filter(
    (item) => item.product.toString() !== productId
  );

  await userData.save();

  // Send the updated cart
  res.status(200).json({
    message: "Item deleted successfully",
    cart: userData.cart, // UPDATED CART
  });
};
