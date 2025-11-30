import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductbyID,
  updateProduct,
} from "../controller/productController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isValidRole } from "../middleware/isValidRole.js";
import { upload } from "../middleware/multer.js";
import { catchAsync } from "../services/catchAsync.js";

const router = express.Router();

router.post(
  "/createProduct",
  isAuthenticated,
  isValidRole("admin"),
  upload.single("productImage"),
  createProduct
);
router.get("/getAllProducts", catchAsync(getAllProducts));
router.get("/:productID", catchAsync(getProductbyID));
router.patch("/:productID", catchAsync(updateProduct));
router.delete("/:productID", catchAsync(deleteProduct));

export default router;
