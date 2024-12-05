const express = require("express");
const router = express.Router();

const { auth, isInstructor, isStudent } = require("../middlewares/auth");
const {
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  deleteAccount,
  instructorDashboard,
  getPaymentHistory,
} = require("../controllers/Profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// Route for update profile details
router.put("/updateProfile", auth, updateProfile);

// Route for get User Details
router.get("/getUserDetails", auth, getAllUserDetails);

// Route for update profile picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// Route for get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

// Route for Instructor Dashboard
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

// Route for delete profile
router.delete("/deleteProfile", auth, deleteAccount);

// Route for payment history
router.get("/paymentHistory", auth, isStudent, getPaymentHistory);

module.exports = router;
