import express from "express";
import {
  createReview,
  deleteReview,
  getProductReview,
} from "../controller/user/userController.js";
import { catchAsync } from "../services/catchAsync.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/reviews/:id", isAuthenticated, catchAsync(createReview));

// router.get("/reviews/:id", isAuthenticated, catchAsync(getProductReview));
// router.delete("/reviews/:id", isAuthenticated, catchAsync(deleteReview));
// Chaning both cause they have same endpoint
router
  .route("/reviews/:id")
  .get(catchAsync(getProductReview))
  .delete(isAuthenticated, catchAsync(deleteReview));

export default router;
