import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { catchAsync } from "../../services/catchAsync.js";
import {
  deleteOrderById,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../../controller/admin/order/orderController.js";
import { isValidRole } from "../../middleware/isValidRole.js";

const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, isValidRole("admin"), catchAsync(getAllOrders));
router
  .route("/:id")
  .get(isAuthenticated, isValidRole("admin"), catchAsync(getSingleOrder))
  .delete(isAuthenticated, isValidRole("admin"), catchAsync(deleteOrderById))
  .patch(isAuthenticated, isValidRole("admin"), catchAsync(updateOrderStatus));

export default router;
