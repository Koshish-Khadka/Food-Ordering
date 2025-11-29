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

const router = express.Router();

router.post(
  "/createProduct",
  isAuthenticated,
  isValidRole("admin"),
  upload.single("productImage"),
  createProduct
);
router.get("/getAllProducts", getAllProducts);
router.get("/:productID", getProductbyID);
router.patch("/:productID", updateProduct);
router.delete("/:productID", deleteProduct);

export default router;
