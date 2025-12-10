import Order from "../../../models/orderModel.js";

export const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { shippingAddress, items, totalAmount, paymentDetails } = req.body;
  if (
    !shippingAddress ||
    !items.length === 0 ||
    !totalAmount ||
    !paymentDetails
  ) {
    return res.status(400).json({
      message:
        "please provide shippingAddress,items,totalAmount and paymentDetails",
    });
  }
  const userOrder = await Order.create({
    user: userId,
    items,
    totalAmount,
    shippingAddress,
    paymentDetails,
  });
  if (!userOrder) {
    res.status(400).json({ message: "Failed to create order" });
  } else {
    res
      .status(200)
      .json({ message: "Order created successfully", data: userOrder });
  }
};

export const getUserOrder = async (req, res) => {
  const userId = req.user.id;
  console.log("User id", userId);
  const userOrders = await Order.find({ userId }).populate({
    path: "items.product",
    modal: "Product",
  });
  res.status(200).json({ data: userOrders });
};

export const updateOrderStatus = async (req, res) => {};
