import express from "express";
import {
  createOrder,
  deleteOrder,
  getUserOrder,
} from "../../controller/user/order/orderController.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { catchAsync } from "../../services/catchAsync.js";
import { getAllOrders } from "../../controller/admin/order/orderController.js";

const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, catchAsync(getUserOrder))
  .post(isAuthenticated, catchAsync(createOrder))
  .get(isAuthenticated, catchAsync(getAllOrders));

router
  .route("/:id")
  .delete(isAuthenticated, catchAsync(deleteOrder))


export default router;
