import express from "express";
import { createProduct } from "../controller/productController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isValidRole } from "../middleware/isValidRole.js";

const router = express.Router();

router.post(
  "/createProduct",
  isAuthenticated,
  isValidRole("admin"),
  createProduct
);

export default router;
