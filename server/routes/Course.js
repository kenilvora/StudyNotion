const express = require("express");
const {
  auth,
  isInstructor,
  isAdmin,
  isStudent,
} = require("../middlewares/auth");
const {
  createCourse,
  updateCourseDetails,
  getAllCourses,
  getCourseDetails,
  deleteCourse,
  getFullCourseDetails,
  getInstructorCourses,
  deleteAllCourses,
} = require("../controllers/Course");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");
const {
  createCategory,
  getAllCategory,
  categoryPageDetails,
} = require("../controllers/Categories");
const {
  createRatingAndreview,
  getAverageRating,
  getAllRatingAndReviewsOfCourse,
  getAllRatingAndReviews,
} = require("../controllers/RatingAndReview");
const { updateCourseProgress } = require("../controllers/CourseProgress");
const router = express.Router();

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);

// Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);

// Update a Section
router.put("/updateSection", auth, isInstructor, updateSection);

// Delete a Section
router.delete("/deleteSection", auth, isInstructor, deleteSection);

// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);

// Update a SubSection
router.put("/updateSubSection", auth, isInstructor, updateSubSection);

// Delete a SubSection
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

// Update a Course
router.put("/editCourse", auth, isInstructor, updateCourseDetails);

// Get all registerd courses
router.get("/getAllCourses", getAllCourses);

// Get Details of a specified Course
router.get("/getCourseDetails", getCourseDetails);

// Get Full Details of a specified course
router.get("/getFullCourseDetails", auth, getFullCourseDetails);

// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

// Delete a Course
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

// Delete All Courses
router.delete("/deleteAllCourses", auth, isInstructor, deleteAllCourses);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin

// Create a new Category
router.post("/createCategory", auth, isAdmin, createCategory);

// Show All Categories
router.get("/getAllCategories", getAllCategory);

// Get Category Page Details
router.get("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Course Progress
// ********************************************************************************************************
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

// Create a Rating
router.post("/createRating", auth, isStudent, createRatingAndreview);

// Get Average Rating
router.get("/getAverageRating", getAverageRating);

// Get All rating and review of course
router.get("/getAllRating/:id", getAllRatingAndReviewsOfCourse);

// Get All rating and review
router.get("/getAllRating", getAllRatingAndReviews);

module.exports = router;
