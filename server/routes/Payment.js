const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/Payments");

const { auth, isStudent } = require("../middlewares/auth");

// Route for Capturing payment
router.post("/capturePayment", auth, isStudent, capturePayment);

// Route for verifying payment
router.post("/verifyPayment", auth, isStudent, verifyPayment);

// Route for sending payment Success Email
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
);

module.exports = router;
