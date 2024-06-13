const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
const { uploadFileToCloudinary } = require("../utils/fileUploader");
const mongoose = require("mongoose");
require("dotenv").config();

// createSubSection
exports.createSubSection = async (req, res) => {
  try {
    // fetch data from req ki body
    const { title, description, sectionId, courseId } = req.body;
    // fetch video from req.files
    const video = req.files.videoFile;
    // validate data
    if (!title || !description || !video || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // upload video on cloudinary
    const lectureVideo = await uploadFileToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    // create a subsection
    const newSubSection = await SubSection.create({
      title: title,
      timeDuration: `${lectureVideo.duration}`,
      description: description,
      videoUrl: lectureVideo.secure_url,
    });
    // update section with this subsection id
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: newSubSection._id,
        },
      },
      { new: true }
    );

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    console.log(updatedCourse);

    // return a response
    return res.status(200).json({
      success: true,
      message: "SubSection Created Successfully",
      updatedCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to create Sub-Section, Please try again",
      error: error.message,
    });
  }
};

// updateSubSection
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, description, courseId } = req.body;
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection || !courseId) {
      return res.status(404).json({
        success: false,
        message: "SubSection or Course not found",
      });
    }

    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadFileToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    await subSection.save();

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.json({
      success: true,
      message: "SubSection updated successfully",
      updatedCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    });
  }
};

// deleteSubSection -> maybe Update
exports.deleteSubSection = async (req, res) => {
  try {
    // Extract data from request
    const { sectionId, subSectionId, courseId } = req.body;

    // Validate data
    if (!subSectionId || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Valid subSectionId and sectionId are required",
      });
    }

    // Remove subSectionId from the section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );

    // Delete the SubSection
    await SubSection.findByIdAndDelete(subSectionId);

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // Return success response
    return res.status(200).json({
      success: true,
      message: "SubSection Deleted Successfully",
      updatedCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete SubSection, Please try again",
      error: error.message,
    });
  }
};
