const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// create rating and review
exports.createRatingAndreview = async (req, res) => {
  try {
    // fetch data
    const { rating, review, courseId } = req.body;
    const userId = req.user.id;

    // validation
    if (!rating || !review || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // find out course based on courseId and userId
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });

    // check if student is enrolled in the course or not
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the Course",
      });
    }

    // check if user already reviewed the course or not
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "Course is already reviewed by the User",
      });
    }

    // create a new review
    const newRatingAndReview = await RatingAndReview.create({
      user: userId,
      rating: rating,
      review: review,
      course: courseId,
    });

    // update this review in Course schema
    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { ratingAndReviews: newRatingAndReview._id },
      },
      { new: true }
    );

    // return res
    return res.status(200).json({
      success: true,
      message: "Rating and Review Created Successfullly",
      data: newRatingAndReview,
    });
  } catch (error) {
    console.log(
      "Something went wrong while creating a Rating and Review : ",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating a Rating and Review",
      error: error.message,
    });
  }
};

// get average Rating
exports.getAverageRating = async (req, res) => {
  try {
    // fetch courseId
    const { courseId } = req.body;

    // calculate average rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId.createFromHexString(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    // return a res
    if (result && result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    // if no review/ rating exist
    return res.status(200).json({
      succee: true,
      message: "Average Rating is 0, No Ratings given till now",
      averageRating: 0,
    });
  } catch (error) {
    console.log("Something went wrong while getting Average Rating : ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting Average Rating",
      error: error.message,
    });
  }
};

// getAllRatingAndReviews based on courseId
exports.getAllRatingAndReviewsOfCourse = async (req, res) => {
  try {
    const { courseId } = req.query;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course Id is required",
      });
    }

    const courseDetails = await Course.findById(courseId);

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }

    const allRatingAndReviews = await RatingAndReview.findOne({
      course: courseId,
    })
      .sort({
        rating: "desc",
      })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    if (!allRatingAndReviews) {
      return res.status(400).json({
        success: true,
        message: "No Ratings and Reviews Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Ratings and Reviews of Course are fetched Successfully",
      data: allRatingAndReviews,
    });
  } catch (error) {
    console.log(
      "Something went wrong while fetching all Rating and Review of Course : ",
      error
    );
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching all Rating and Review of Course",
      error: error.message,
    });
  }
};

// getAllRatingAndReviews
exports.getAllRatingAndReviews = async (req, res) => {
  try {
    const allRatingAndReviews = await RatingAndReview.find({})
      .sort({
        rating: "desc",
      })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    if (!allRatingAndReviews) {
      return res.status(400).json({
        success: true,
        message: "No Ratings and Reviews Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Ratings and Reviews are fetched Successfully",
      data: allRatingAndReviews,
    });
  } catch (error) {
    console.log(
      "Something went wrong while fetching all Rating and Review : ",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching all Rating and Review",
      error: error.message,
    });
  }
};
