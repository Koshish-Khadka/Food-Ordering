import express from "express";
import { initiateKhaltiPayment } from "../../controller/payment/paymentController.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { catchAsync } from "../../services/catchAsync.js";
const router = express.Router();

router.route("/").post(isAuthenticated, catchAsync(initiateKhaltiPayment));

export default router;
