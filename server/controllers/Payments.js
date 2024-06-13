const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const Invoice = require("../models/Invoice");
const CourseProgress = require("../models/CourseProgress");
const User = require("../models/User");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { mailSender } = require("../utils/mailSender");
const {
  paymentSuccessfullEmail,
} = require("../mail/templates/paymentSuccessfullEmail");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const {
  adminPaymentRecieved,
} = require("../mail/templates/adminPaymentRecieved");
require("dotenv").config();

// For Multiple Course Purchase Only

// Capturing Payment
exports.capturePayment = async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || courses.length === 0 || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let totalAmount = 0;

    for (const course_id of courses) {
      let course;
      try {
        course = await Course.findById(course_id);
        if (!course) {
          return res.status(400).json({
            success: false,
            message: "Couldn't find Course",
          });
        }

        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
          return res.status(200).json({
            success: false,
            message: "You already purchased this Course",
          });
        }

        totalAmount += course?.price;
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          message:
            "Something went wrong while finding course with given Course Id",
          error: error.message,
        });
      }
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: Date.now() + Math.floor(Math.random() * 10000).toString(),
    };

    try {
      const paymentResponse = await instance.orders.create(options);

      return res.status(200).json({
        success: true,
        message: paymentResponse,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Couldn't create Payment Order",
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating Payment Order",
      error: error.message,
    });
  }
};

// Verifying Payment
exports.verifyPayment = async (req, res) => {
  try {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Payment Verified Successfully
      console.log("Payment Verified Successfully");
      await enrollStudent(courses, userId, res);

      // return res
      return res.status(200).json({
        success: true,
        message: "Payment Verified Successfully",
      });
    }

    return res.status(403).json({
      success: false,
      message: "Payment Failed",
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      mesage: "Couldn't Verify Payment",
      error: error.message,
    });
  }
};

const enrollStudent = async (courses, userId, res) => {
  try {
    if (!courses || courses.length === 0 || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide UserId or Courses",
      });
    }

    // For Invoice Purpose
    let courseData = [];
    let totalAmount = 0;
    let firstName = "";
    let lastName;
    let contactNumber;
    let id;
    let email;
    for (const courseId of courses) {
      try {
        const enrolledCourse = await Course.findByIdAndUpdate(
          courseId,
          {
            $inc: { sold: 1 },
            $push: {
              studentsEnrolled: userId,
            },
          },
          { new: true }
        );

        if (!enrolledCourse) {
          return res.status(404).json({
            success: false,
            message: "Cousre Not Found",
          });
        }

        courseData.push({
          courseId: enrolledCourse._id,
          courseName: enrolledCourse.courseName,
          coursePrice: enrolledCourse.price,
        });

        const courseProgress = await CourseProgress.create({
          courseID: courseId,
          userId: userId,
          completedVideos: [],
        });

        const enrolledStudent = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              courses: courseId,
              courseProgress: courseProgress._id,
            },
          },
          { new: true }
        );

        if (!enrolledStudent) {
          return res.status(404).json({
            success: false,
            message: "Student Not Found",
          });
        }

        if (firstName === "") {
          firstName = enrolledStudent.firstName;
          lastName = enrolledStudent.lastName;
          contactNumber = enrolledStudent.contactNumber;
          id = enrolledStudent._id;
          email = enrolledStudent.email;
        }

        totalAmount += enrolledCourse.price;
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message:
            "Something went wrong while enrolling student into the Course",
          error: error.message,
        });
      }
    }

    let userName = `${firstName} ${lastName}`;

    try {
      await mailSender(
        email,
        "Course Registration Successfully",
        courseEnrollmentEmail(courseData, userName)
      );

      await mailSender(
        process.env.ADMIN_MAIL_ID,
        "Payment Received Successfully",
        adminPaymentRecieved(
          userName,
          email,
          contactNumber,
          courseData,
          totalAmount,
          Date.now()
        )
      );

      console.log("Email sent successfully, ", mailResponse);
    } catch (error) {
      console.log(
        "Error occurred while sending Course Registration mail ",
        error
      );
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while enrolling student in the course",
    });
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;

    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Details Not Found",
      });
    }

    await mailSender(
      user.email,
      "Payment Successful",
      paymentSuccessfullEmail(
        `${user.firstName} ${user.lastName}`,
        paymentId,
        orderId,
        amount / 100
      )
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while sending Payment Successful Mail",
    });
  }
};