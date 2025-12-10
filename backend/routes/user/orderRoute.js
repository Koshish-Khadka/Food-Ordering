import express from "express";
import {
  createOrder,
  getUserOrder,
} from "../../controller/user/order/orderController.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { catchAsync } from "../../services/catchAsync.js";

const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, catchAsync(getUserOrder))
  .post(isAuthenticated, catchAsync(createOrder));

export default router;
