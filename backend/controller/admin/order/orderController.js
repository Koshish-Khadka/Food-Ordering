import Order from "../../../models/orderModel.js";

export const getAllOrders = async (req, res) => {
  const allOrders = await Order.find().populate({
    path: "items.product",
    model: "Product",
  });
  if (allOrders.length === 0) {
    return res.status(400).json({ message: "No order found", data: [] });
  }
  res
    .status(200)
    .json({ message: "Successfully fetched all orders", data: allOrders });
};
