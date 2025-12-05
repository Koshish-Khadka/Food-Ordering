import express from "express";
import {
  createReview,
  deleteReview,
  getMyReviews,
} from "../../controller/user/review/reviewController.js";
import { catchAsync } from "../../services/catchAsync.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/reviews", isAuthenticated, catchAsync(getMyReviews));
// Chaning both cause they have same endpoint
router
  .route("/reviews/:id")
  .delete(isAuthenticated, catchAsync(deleteReview))
  .post(isAuthenticated, catchAsync(createReview));

export default router;
