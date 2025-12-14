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
  const userId = req.user.id;
  // console.log("order id", orderId);

  if (!orderId) {
    return res.status(400).json({ message: "Order id is required" });
  }

  const findOrder = await Order.findById(orderId);
  // Check the owner of the order
  if (findOrder.user.toString() !== userId.toString()) {
    return res
      .status(403)
      .json({ message: "You don't have permission to cancel this order" });
  }

  if (!findOrder) {
    return res.status(404).json({ message: "Order not found" });
  }

  await Order.findByIdAndDelete(orderId);

  res.status(200).json({ message: "Order deleted successfully" });
};

// update order if status is pending only

// export const updateMyOrder = async (req, res) => {
//   const { id } = req.params;
//   const { shippingAddress, items } = req.body;
//   const userId = req.user.id;

//   console.log("id", id);
//   console.log(req.body);

//   // get the order by id
//   const existingOrder = await Order.findById(id);
//   if (!existingOrder) {
//     res.status(404).json({ message: "Order not found" });
//   }
//   // Check the order status of that order
//   const OrderStatus = existingOrder.orderStatus;
//   if (OrderStatus === "ontheway") {
//     return res
//       .status(400)
//       .json({ message: "Cannot update Order its already on the way" });
//   }

//   // Check if the user trying to update order is the one created it
//   if (OrderStatus.user.toString() !== userId.toString()) {
//     return res
//       .status(403)
//       .json({ message: "You don't have permission to cancel this order" });
//   }
//   // now update the order
//   const updateOrder = await Order.findByIdAndUpdate(
//     id,
//     {
//       shippingAddress,
//       items,
//     },
//     {
//       new: true,
//     }
//   );
//   res
//     .status(200)
//     .json({ message: "Order updated Successfully", data: updateOrder });
// };
export const updateMyOrder = async (req, res) => {
  const { id } = req.params;
  const { shippingAddress, items } = req.body;
  const userId = req.user.id; 

  // get the order by id
  const existingOrder = await Order.findById(id);
  if (!existingOrder) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Check order status
  if (existingOrder.orderStatus === "ontheway") {
    return res
      .status(400)
      .json({ message: "Cannot update order, it's already on the way" });
  }

  // Check ownership
  if (existingOrder.user.toString() !== userId.toString()) {
    return res
      .status(403)
      .json({ message: "You don't have permission to update this order" });
  }

  // Update order
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      shippingAddress,
      items,
    },
    { new: true }
  );

  res.status(200).json({
    message: "Order updated successfully",
    data: updatedOrder,
  });
};

// cancel order if its in pending state
export const cancelOrder = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const findOrder = await Order.findById(id);
  if (!findOrder) {
    return res.status(404).json({ message: "Order not found" });
  }
  if (findOrder.user.toString() !== userId.toString()) {
    return res
      .status(403)
      .json({ message: "You don't have permission to cancel this order" });
  }
  // check the order state
  if (findOrder.orderStatus !== "pending") {
    return res.status(400).json({ message: "Cannot cancel the order" });
  }
  const cancelOrder = await Order.findByIdAndUpdate(
    id,
    {
      orderStatus: "cancelled",
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json({ message: "Order cancelled successfully", data: cancelOrder });
};
