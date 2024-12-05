const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadFileToCloudinary } = require("../utils/fileUploader");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secondToDuration");
const Invoice = require("../models/Invoice");

// updateProfile
exports.updateProfile = async (req, res) => {
  try {
    // fetch data
    const { dateOfBirth = "", about, gender = "", contactNumber } = req.body;
    // get userId
    const id = req.user.id;
    // validate data
    if (!about || !contactNumber || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // find profile
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    // update profile
    profileDetails.gender = gender;
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;

    await profileDetails.save();

    if (
      (userDetails.contactNumber &&
        userDetails.contactNumber !== contactNumber) ||
      !userDetails.contactNumber
    ) {
      userDetails.contactNumber = contactNumber;
    }

    await userDetails.save();

    const updatedUserDetails = await User.findById(userDetails._id)
      .populate("additionalDetails")
      .exec();

    updatedUserDetails.password = undefined;

    // return reaponse
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      userDetails: updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to update Profile, Please try again",
      error: error.message,
    });
  }
};

// deleteAccount
exports.deleteAccount = async (req, res) => {
  try {
    // get userId
    const id = req.user.id;
    const accountType = req.user.accountType;

    // validation
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    const userCourses = userDetails.courses;
    // find profile
    const profileId = userDetails.additionalDetails;

    // delete profile
    await Profile.findByIdAndDelete({ _id: profileId });

    // remove user from enrolled courses
    if (accountType === "Student") {
      if (userCourses && userCourses.length > 0) {
        await Course.updateMany(
          { _id: { $in: userCourses } },
          { $pull: { studentsEnrolled: id } }
        );
        await CourseProgress.deleteMany({ userId: { $in: id } });
      }
    }

    // delete user
    await User.findByIdAndDelete({ _id: id });

    //return response
    return res.status(200).json({
      success: true,
      message: "User Account Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete account, Please try again",
      error: error.message,
    });
  }
};

// getAllUserDetails
exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    userDetails.password = undefined;

    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadFileToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      200,
      90
    );
    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
      .populate("additionalDetails")
      .exec();

    updatedProfile.password = undefined;
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getEnrolledCourses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    userDetails = userDetails.toObject();
    var SubsectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });
      courseProgressCount = courseProgressCount?.completedVideos.length;
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Instructor Dashboard
exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({
      instructor: req.user.id,
    });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDesc: course.courseDescription,
        totalStudentsEnrolled: totalStudentsEnrolled,
        totalAmountGenerated: totalAmountGenerated,
      };

      return courseDataWithStats;
    });

    return res.status(200).json({
      success: true,
      data: courseData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Payment History
exports.getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const paymentHistory = await Invoice.find({
      userId: userId,
    }).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      data: paymentHistory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
