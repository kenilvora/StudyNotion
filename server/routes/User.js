const express = require("express");

const {
  login,
  signUp,
  sendOTP,
  changePassword,
  verifyToken,
  me,
  logout,
} = require("../controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

const { auth } = require("../middlewares/auth");

const router = express.Router();

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user SignUp
router.post("/signup", signUp);

// Route for user Login
router.post("/login", login);

// Route for sending OTP to the user's email
router.post("/sendOtp", sendOTP);

//Route for changing password
router.put("/change-password", auth, changePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.put("/resetPassword", resetPassword);

// Route for identifying the user
router.get("/me", auth, me);

// Route for logout
router.get("/logout", logout);

module.exports = router;
