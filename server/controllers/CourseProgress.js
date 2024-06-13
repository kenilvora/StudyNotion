const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const User = require("../models/User");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    if (!courseId || !subSectionId || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User details not found",
      });
    }

    const courseDetails = await Course.findById(courseId);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course details not found",
      });
    }

    const uid = new mongoose.Types.ObjectId(userId);

    if (!courseDetails.studentsEnrolled.includes(uid)) {
      return res.status(400).json({
        success: false,
        message: "Course details for given user not found",
      });
    }

    const subSectionDetails = await SubSection.findById(subSectionId);

    if (!subSectionDetails) {
      return res.status(404).json({
        success: false,
        message: "SubSection details not found",
      });
    }

    const courseProgressDetails = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    if (!courseProgressDetails) {
      return res.status(404).json({
        success: false,
        message: "CourseProgress details not found",
      });
    }

    const ssid = new mongoose.Types.ObjectId(subSectionId);
    if (courseProgressDetails?.completedVideos.includes(ssid)) {
      return res.json({
        success: false,
      });
    }

    await CourseProgress.findByIdAndUpdate(
      courseProgressDetails._id,
      {
        $push: {
          completedVideos: subSectionId,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course Progress Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not update Course Progress",
    });
  }
};
