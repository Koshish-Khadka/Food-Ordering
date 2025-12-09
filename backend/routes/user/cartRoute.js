import express from "express";
import {
  addToCart,
  deleteCartItems,
  getCartItems,
} from "../../controller/user/cart/cartController.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { catchAsync } from "../../services/catchAsync.js";

const router = express.Router();

// router.route("/", isAuthenticated, catchAsync(addToCart));
router
  .route("/:productId")
  .post(isAuthenticated, catchAsync(addToCart))
  .delete(isAuthenticated, catchAsync(deleteCartItems));
router.get("/getCartItems", isAuthenticated, catchAsync(getCartItems));
export default router;
