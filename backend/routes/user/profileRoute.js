import express from "express";
import {
  deleteProfile,
  getMyProfile,
  updatePassword,
  updateProfile,
} from "../../controller/user/profile/profileController.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { catchAsync } from "../../services/catchAsync.js";

const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, catchAsync(getMyProfile))
  .patch(isAuthenticated, catchAsync(updateProfile))
  .delete(isAuthenticated, catchAsync(deleteProfile));

// router.patch("/changePassword", (isAuthenticated, catchAsync(updatePassword)));
router.patch("/changePassword", isAuthenticated, catchAsync(updatePassword));

export default router;
