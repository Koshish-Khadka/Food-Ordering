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
  // console.log("User id", userId);
  const userOrders = await Order.find({ user: userId }).populate({
    path: "items.product",
    model: "Product",
    select: "-productStockQty -createdAt -updatedAt -reviews -__v",
  });

  res.status(200).json({ data: userOrders });
};

export const deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  console.log("order id", orderId);

  if (!orderId) {
    return res.status(400).json({ message: "Order id is required" });
  }

  const findOrder = await Order.findById(orderId);

  if (!findOrder) {
    return res.status(404).json({ message: "Order not found" });
  }

  await Order.findByIdAndDelete(orderId);

  res.status(200).json({ message: "Order deleted successfully" });
};


