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

    function generateUniqueInvoiceNumber() {
      // Generate a random string
      const randomString = crypto.randomBytes(16).toString("hex").toUpperCase();

      // Format the current date as YYYYMMDD
      const today = new Date();
      const dateComponent = `${today.getFullYear()}${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`;

      // Combine random string and date component to form the invoice number
      const invoiceNumber = `INV-${dateComponent}-${randomString}`;

      return invoiceNumber;
    }

    const invoiceData = new Invoice({
      invoiceNumber: generateUniqueInvoiceNumber(),
      email: email,
      userId: id,
      userName: `${firstName} ${lastName}`,
      courses: courseData,
      contactNumber: contactNumber,
      totalPrice: totalAmount,
    });

    await invoiceData.save();
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

// For Single Course Purchase Only
// // capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {
//   try {
//     // fetch data
//     const { courseId } = req.body;
//     const userId = req.user.id;

//     // validation
//     if (!courseId) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide valid CourseID",
//       });
//     }

//     let course;
//     try {
//       // check if course exist or not
//       course = await Course.findById(courseId);

//       if (!course) {
//         return res.status(404).json({
//           success: false,
//           message: "Course Not Found",
//         });
//       }

//       // check if user already buy this course or not
//       const uid = new mongoose.Types.ObjectId.createFromHexString(userId);
//       if (course.studentsEnrolled.includes(uid)) {
//         return res.status(200).json({
//           success: false,
//           message: "Student is already enrolled",
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }

//     // create order
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//       amount: amount * 100,
//       currency: currency,
//       receipt: Date.now() + Math.floor(Math.random() * 10000).toString(),
//       notes: {
//         courseId: courseId,
//         userId: userId,
//       },
//     };

//     try {
//       // initiate the payment using razorpay
//       const paymentResponse = await instance.orders.create(options);
//       console.log(paymentResponse);

//       // return response
//       return res.status(200).json({
//         success: true,
//         courseName: course.courseName,
//         courseDescription: course.courseDescription,
//         thumbnail: course.thumbnail,
//         orderId: paymentResponse.id,
//         amount: paymentResponse.amount,
//         currency: paymentResponse.currency,
//         message: "Order initiated Successfully",
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(402).json({
//         success: false,
//         message: "Could not initiate the Order",
//       });
//     }
//   } catch (error) {
//     console.log("Something went wrong while capturing Payment : ", error);
//     return res.status(402).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Hashing -> convert data into fixed length of encrypted form and that cannot be decrypted

// // webHook -> a backend api store in our Razorpay account with secret
// //            whenever any (specified) event occur, razorpay hits that backend api and send a secret in headers
// //            Razorpay do not send secret in string format but it send in hashed format that we cannot decrypt
// //            So we have to convert our secret in that format to compare

// // we have to compare two secrets
// // 1 : server Secret which is store in our server
// // 2 : header Secret, come from razorpay when any specified event occur -> ex. Successfull Payment

// // verifying the Signature of Razorpay and Server
// exports.verifyPayment = async (req, res) => {
//   try {
//     const webHookSecret = "vw34EQ34Khdi329H392d92i0Jdr3n49JDI4dDREdwe";

//     const signature = req.headers["x-razorpay-signature"];

//     // hash webHookSecret
//     const shaSum = crypto.createHmac("sha256", webHookSecret);
//     shaSum.update(JSON.stringify(req.body));
//     const digest = shaSum.digest("hex");

//     if (signature === digest) {
//       console.log("Payment is Authorised");

//       const { courseId, userId } = req.body.payload.payment.entity.notes;

//       // fulfill action after successful payment
//       try {
//         // add user in the studentEnrolled of Course schema -> means enroll the student in the course
//         const enrolledCourse = await Course.findOneAndUpdate(
//           { _id: courseId },
//           {
//             $push: { studentsEnrolled: userId },
//           },
//           { new: true }
//         );

//         if (!enrolledCourse) {
//           return res.status(500).json({
//             success: false,
//             message: "Course not Found",
//           });
//         }

//         enrolledCourse.sold += 1;

//         await enrolledCourse.save();
//         console.log("Enrolled Course : ", enrolledCourse);

//         // add course in the courses of User schema -> means add the course in the User
//         const enrolledStudent = await User.findOneAndUpdate(
//           { _id: userId },
//           {
//             $push: { courses: courseId },
//           },
//           { new: true }
//         );

//         if (!enrolledStudent) {
//           return res.status(500).json({
//             success: false,
//             message: "User not Found",
//           });
//         }

//         console.log("Enrolled Student : ", enrolledStudent);

//         function generateUniqueInvoiceNumber() {
//           // Generate a random string
//           const randomString = crypto
//             .randomBytes(16)
//             .toString("hex")
//             .toUpperCase();

//           // Format the current date as YYYYMMDD
//           const today = new Date();
//           const dateComponent = `${today.getFullYear()}${(today.getMonth() + 1)
//             .toString()
//             .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`;

//           // Combine random string and date component to form the invoice number
//           const invoiceNumber = `INV-${dateComponent}-${randomString}`;

//           return invoiceNumber;
//         }

//         const invoiceData = new Invoice({
//           invoiceNumber: generateUniqueInvoiceNumber(),
//           email: enrolledStudent.email,
//           userId: userId,
//           userName: `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
//           courseId: courseId,
//           courseName: enrolledCourse.courseName,
//           price: enrolledCourse.price,
//           contactNumber: enrolledStudent.contactNumber,
//         });

//         await invoiceData.save();

//         return res.status(200).json({
//           success: true,
//           message:
//             "Signature verified Successfully and Course Added Successfully",
//         });
//       } catch (error) {
//         console.error("Error occurred while Enrolling Student:", error);
//         return res.status(500).json({
//           success: false,
//           message: "Error occurred while Enrolling Student",
//           error: error.message,
//         });
//       }
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Request",
//       });
//     }
//   } catch (error) {
//     console.log("Something went wrong while verifying Signature : ", error);
//     return res.status(402).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
