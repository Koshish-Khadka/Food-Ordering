import express from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../controller/admin/product/productController.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { isValidRole } from "../../middleware/isValidRole.js";
import { upload } from "../../middleware/multer.js";
import { catchAsync } from "../../services/catchAsync.js";
import { getAllProducts, getProductbyID } from "../../controller/global/globalController.js";

const router = express.Router();

router.post(
  "/createProduct",
  isAuthenticated,
  isValidRole("admin"),
  upload.single("productImage"),
  catchAsync(createProduct)
);
router.get("/getAllProducts", catchAsync(getAllProducts));
router.get(
  "/:productID",
  // isAuthenticated,
  // isValidRole("admin"),
  catchAsync(getProductbyID)
);
router.patch(
  "/:productID",
  isAuthenticated,
  isValidRole("admin"),
  upload.single("productImage"),
  catchAsync(updateProduct)
);
router.delete(
  "/:productID",
  isAuthenticated,
  isValidRole("admin"),
  catchAsync(deleteProduct)
);

export default router;
