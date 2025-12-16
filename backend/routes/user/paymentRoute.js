import express from "express";
import {
  initiateKhaltiPayment,
  verifyKhaltiPayment,
} from "../../controller/payment/paymentController.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { catchAsync } from "../../services/catchAsync.js";
const router = express.Router();

router.route("/").post(isAuthenticated, catchAsync(initiateKhaltiPayment));
router.route("/success").get(catchAsync(verifyKhaltiPayment));

export default router;
