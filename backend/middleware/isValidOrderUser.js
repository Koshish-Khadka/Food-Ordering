// export const isValidOrderUser = (userID) => {
//   return (req, res, next) => {
//     const userId = req.user.id;
//     if (userID !== userId) {
//       return res
//         .status(400)
//         .json({ message: "Cannot update Order its already on the way" });
//     }
//     next();
//   };
// };
export const isValidOrderUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check owner
    if (order.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to modify this order" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
