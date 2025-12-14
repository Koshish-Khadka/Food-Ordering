import express from "express";
import {
  cancelOrder,
  createOrder,
  deleteOrder,
  getUserOrder,
  updateMyOrder,
} from "../../controller/user/order/orderController.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { catchAsync } from "../../services/catchAsync.js";
import { getAllOrders } from "../../controller/admin/order/orderController.js";

const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, catchAsync(getUserOrder))
  .post(isAuthenticated, catchAsync(createOrder));
// .get(isAuthenticated, catchAsync(getAllOrders));
router.route("/cancel/:id").patch(isAuthenticated, catchAsync(cancelOrder));
router
  .route("/:id")
  .delete(isAuthenticated, catchAsync(deleteOrder))
  .patch(isAuthenticated, catchAsync(updateMyOrder));

export default router;
