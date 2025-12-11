import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { catchAsync } from "../../services/catchAsync.js";
import {
  getAllOrders,
  getSingleOrder,
} from "../../controller/admin/order/orderController.js";
import { isValidRole } from "../../middleware/isValidRole.js";

const router = express.Router();

router
  .route("/allorders")
  .get(isAuthenticated, isValidRole("admin"), catchAsync(getAllOrders));
router.route("/:id").get(isAuthenticated, catchAsync(getSingleOrder));

export default router;
