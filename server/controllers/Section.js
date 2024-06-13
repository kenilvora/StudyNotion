const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

// createSection
exports.createSection = async (req, res) => {
  try {
    // fetch data from req ki body
    const { sectionName, courseId } = req.body;

    // validate data
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create a new Section
    const newSection = await Section.create({
      sectionName,
    });

    // insert this section id into Course model
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // return a response
    return res.status(200).json({
      success: true,
      message: "Section Created Successfully",
      updatedCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to create Section, Please try again",
      error: error.message,
    });
  }
};

// updateSection
exports.updateSection = async (req, res) => {
  try {
    // fetch data from req ki body
    const { sectionName, sectionId, courseId } = req.body;

    // data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if Section exist or not
    const existingSection = await Section.findById(sectionId);

    if (!existingSection) {
      return res.status(400).json({
        success: false,
        message: "Section Not Found",
      });
    }

    // update Section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName: sectionName,
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

    // return a response
    return res.status(200).json({
      success: true,
      message: "Section Updated Successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to update Section, Please try again",
      error: error.message,
    });
  }
};

// deleteSection -> maybe Update
exports.deleteSection = async (req, res) => {
  try {
    // fetch data -> we assume that we are sending ID in parameter
    // const { sectionId } = req.params;
    const { courseId, sectionId } = req.body;
    // validate data
    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // check if section exist or not
    const existingSection = await Section.findById(sectionId);

    if (!existingSection) {
      return res.status(400).json({
        success: false,
        message: "Section Not Found",
      });
    }

    // delete the id of this section from course
    const course = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $pull: { courseContent: sectionId },
      }
    );

    if (existingSection.subSection) {
      await SubSection.deleteMany({ _id: { $in: existingSection.subSection } });
    }

    // delete section
    await Section.findByIdAndDelete(sectionId);

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // return a response
    return res.status(200).json({
      success: true,
      message: "Section Deleted Successfully",
      updatedCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete Section, Please try again",
      error: error.message,
    });
  }
};
