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
    .json({ message: "Successfully fetched all ordersp", data: allOrders });
};

export const getSingleOrder = async (req, res) => {
  const orderId = req.params.id;
  if (!orderId) {
    return res.status(400).json({ message: "orderId is required" });
  }
  const findOrder = await Order.findById(orderId).populate({
    path: "items.product",
  });
  if (!findOrder) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.status(200).json({ message: "Order found", data: findOrder });
};

export const deleteOrderById = async (req, res) => {
  const orderId = req.params.id;
  if (!orderId) {
    return res.status(400).json({ message: "Order Id is required" });
  }
  const findOrder = await Order.findById(orderId);
  if (!findOrder) {
    return res.status(404).json({ message: "Order not found" });
  }
  await Order.findByIdAndDelete(orderId);
  res.status(200).json({ message: "Order deleted Successfully" });
};

export const updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const { orderStatus } = req.body;
  if (
    !orderStatus ||
    !["pending", "delivered", "cancelled", "ontheway", "preparation"].includes(
      orderStatus.toLowerCase()
    )
  ) {
    return res
      .status(400)
      .json({ message: "Order status is invalid or should be provided" });
  }
  // find the order
  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ message: "Order with that id not found" });
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    {
      orderStatus,
    },
    { new: true }
  );
  res
    .status(200)
    .json({ message: "Order Updated Successfully", data: updatedOrder });
};
