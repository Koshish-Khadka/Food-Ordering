import express from "express";
import {
  deleteUser,
  getUser,
} from "../../controller/admin/user/userController.js";
import { catchAsync } from "../../services/catchAsync.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { isValidRole } from "../../middleware/isValidRole.js";
const router = express.Router();

router.get(
  "/users",
  isAuthenticated,
  isValidRole("admin"),
  catchAsync(getUser)
);
router.delete(
  "/users",
  isAuthenticated,
  isValidRole("admin"),
  catchAsync(deleteUser)
);
export default router;
