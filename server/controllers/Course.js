const Course = require("../models/Course");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const User = require("../models/User");
const { uploadFileToCloudinary } = require("../utils/fileUploader");
const { default: mongoose } = require("mongoose");
const { convertSecondsToDuration } = require("../utils/secondToDuration");
// Function to create a new course
exports.createCourse = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id;

    // Get all required fields from request body
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status,
      instructions: _instructions,
    } = req.body;

    const tag = JSON.parse(_tag);
    const instructions = JSON.parse(_instructions);

    // Get thumbnail image from request files
    const thumbnail = req.files.thumbnailImage;

    // Check if any of the required fields are missing
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !category ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }
    if (!status || status === undefined) {
      status = "Draft";
    }
    // Check if the user is an instructor
    const instructorDetails = await User.findOne({
      _id: userId,
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    // Check if the category given is valid
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }
    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadFileToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    console.log(thumbnailImage);
    // Create a new course with the given details
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions: instructions,
    });

    // Add the new course in the Instructor details of the User Schema
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    // Add the new course to the Categories
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// getAllCourse
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      { status: "Published" },
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Course Data`,
      error: error.message,
    });
  }
};

// getCourseDetails
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.query; // const {courseId} = req.params;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .populate("ratingAndReviews")
      .populate("category")
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course Details Not Found",
      });
    }

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((section) => {
      section.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    });
  } catch (error) {
    console.error("Error occurred while fetching Course Details:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching Course Details",
      error: error.message,
    });
  }
};

// updateCourseDetails
exports.updateCourseDetails = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id;
    const { courseId } = req.body;

    const courseDetails = await Course.findById(courseId);

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Course Details Not Found",
      });
    }

    // Get all required fields from request body
    const {
      courseName = courseDetails.courseName,
      courseDescription = courseDetails.courseDescription,
      price = courseDetails.price,
      category = courseDetails.category,
      tag: _tag = JSON.stringify(courseDetails.tag), // Use JSON string to ensure consistency
      whatYouWillLearn = courseDetails.whatYouWillLearn,
      instructions: _instructions = JSON.stringify(courseDetails.instructions), // Use JSON string to ensure consistency
      status = courseDetails.status,
    } = req.body;

    const tag = JSON.parse(_tag);
    const instructions = JSON.parse(_instructions);

    // Get thumbnail image from request files
    const thumbnail = req.files ? req.files.thumbnailImage : null; // Assuming req.files.thumbnailImage exists

    // Check if the user is an instructor
    const instructorDetails = await User.findOne({
      _id: userId,
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    // Check if the category given is valid
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }

    let thumbnailImage;
    // Upload the Thumbnail to Cloudinary
    if (thumbnail) {
      thumbnailImage = await uploadFileToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
    }

    // update course with the given details
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        courseName: courseName,
        courseDescription: courseDescription,
        whatYouWillLearn: whatYouWillLearn,
        price: price,
        tag: tag,
        category: categoryDetails._id,
        thumbnail: thumbnailImage
          ? thumbnailImage.secure_url
          : courseDetails.thumbnail,
        status: status,
        instructions: instructions,
      },
      { new: true }
    )
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // Add the new course to the Categories
    if (courseDetails.category !== category) {
      await Category.findByIdAndUpdate(
        { _id: category },
        {
          $push: {
            courses: updatedCourse._id,
          },
        },
        { new: true }
      );

      await Category.findByIdAndUpdate(
        courseDetails.category,
        {
          $pull: {
            courses: updatedCourse._id,
          },
        },
        { new: true }
      );
    }

    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "Course Updated Successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update course",
      error: error.message,
    });
  }
};

// Get full Course Details
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.query;
    const userId = req.user.id;

    const userDetails = User.findById(userId);

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User Details Not Found",
      });
    }

    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    const uid = new mongoose.Types.ObjectId(userId);
    if (!courseDetails.studentsEnrolled.includes(uid)) {
      return res.status(400).json({
        success: false,
        message: "You are not authorised to access this Page",
      });
    }

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    let totalNoOfLectures = 0;
    courseDetails.courseContent.forEach(
      (section) => (totalNoOfLectures += section.subSection.length)
    );

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        totalNoOfLectures,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id;

    // Find all courses belonging to the instructor
    let instructorCourses = await Course.find({
      instructor: instructorId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    instructorCourses = instructorCourses.map((course) => {
      let totalDuration = 0;
      course.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration);
          totalDuration += timeDurationInSeconds;
        });
      });

      return {
        ...course._doc,
        totalDuration,
      };
    });

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

//deleteCourse
exports.deleteCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, categoryId } = req.body;

    if (!userId || !courseId || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "All Details Are Required",
      });
    }

    // Check if the user is an instructor
    const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    // Check if the category given is valid
    const categoryDetails = await Category.findById(categoryId);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }

    // Check if the course exist or not
    const courseDetails = await Course.findById(courseId);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course Details Not Found",
      });
    }

    if (
      courseDetails.studentsEnrolled &&
      courseDetails.studentsEnrolled.length > 0
    ) {
      return res.status(400).json({
        success: false,
        message: "You Can't Delete this Course",
      });
    }

    // Step 1: Fetch all sections
    let sections;
    if (courseDetails.courseContent) {
      sections = await Section.find({
        _id: { $in: courseDetails.courseContent },
      });
    }

    // Step 2: Collect all sub-section IDs
    let subSectionIds;
    if (sections) {
      subSectionIds = sections.reduce((acc, section) => {
        if (section.subSection) {
          return acc.concat(section.subSection);
        }
        return acc;
      }, []);
    }

    // Step 3: Delete all sub-sections
    if (subSectionIds) {
      await SubSection.deleteMany({ _id: { $in: subSectionIds } });
    }

    // Step 4: Delete all sections
    if (courseDetails.courseContent) {
      await Section.deleteMany({ _id: { $in: courseDetails.courseContent } });
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          courses: courseId,
        },
      },
      { new: true }
    );

    await Category.findByIdAndUpdate(
      categoryId,
      {
        $pull: {
          courses: courseId,
        },
      },
      { new: true }
    );

    await Course.findByIdAndDelete(courseId);

    res.status(200).json({
      success: true,
      message: "Course Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to Delete Course",
      error: error.message,
    });
  }
};

// deleteAllCourses -> which has not any students enrolled
exports.deleteAllCourses = async (req, res) => {
  try {
    const id = req.user.id;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "User Id Not Found",
      });
    }

    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "User Details Not Found",
      });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const courses = await Course.find({
        instructor: id,
        studentsEnrolled: { $size: 0 },
      }).session(session);

      if (courses) {
        for (const course of courses) {
          if (course.courseContent) {
            for (const sectionId of course.courseContent) {
              const section = await Section.findById(sectionId).session(
                session
              );
              if (section && section.subSection) {
                await SubSection.deleteMany({
                  _id: { $in: section.subSection },
                }).session(session);
              }
            }

            await Section.deleteMany({
              _id: { $in: course.courseContent },
            }).session(session);
          }

          await Category.updateOne(
            { _id: course.category },
            { $pull: { courses: course._id } }
          ).session(session);

          await User.updateOne(
            { _id: id },
            {
              $pull: {
                courses: course._id,
              },
            }
          );

          await Course.findByIdAndDelete(course._id).session(session);
        }
      }

      await session.commitTransaction();
      return res.status(200).json({
        success: true,
        message: "All Courses Deleted Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Can't Delete All Courses",
        error: error.message,
      });
    } finally {
      session.endSession();
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
