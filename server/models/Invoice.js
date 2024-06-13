const mongoose = require("mongoose");
const { mailSenderWithAttachment, mailSender } = require("../utils/mailSender");
const { generateInvoicePDF } = require("../utils/generateInvoicePDF");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const {
  adminPaymentRecieved,
} = require("../mail/templates/adminPaymentRecieved");

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      courseName: {
        type: String,
        required: true,
        trim: true,
      },
      coursePrice: {
        type: Number,
        required: true,
        trim: true,
      },
    },
  ],
  contactNumber: {
    type: String,
    required: true,
    trim: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

async function sendEmail(email, data) {
  try {
    const mailResponse = await mailSender(
      email,
      "Course Registration Successfully",
      courseEnrollmentEmail(data.courses, data.userName),
    );

    await mailSender(
      process.env.ADMIN_MAIL_ID,
      "Payment Received Successfully",
      adminPaymentRecieved(
        data.userName,
        email,
        data.contactNumber,
        data.courses,
        data.totalPrice,
        data.date
      )
    );
    console.log("Email sent successfully, ", mailResponse);
  } catch (error) {
    console.log(
      "Error occurred while sending Course Registration mail ",
      error
    );
  }
}

invoiceSchema.pre("save", function (next) {
  this.wasNew = this.isNew;
  next();
});

invoiceSchema.post("save", async function (doc) {
  console.log("New Invoice saved to database");

  if (doc.wasNew) {
    const {
      userName,
      courses,
      totalPrice,
      invoiceNumber,
      date,
      email,
      contactNumber,
    } = doc;
    console.log("Invoice Data -> ", doc);

    const data = {
      userName,
      courses,
      totalPrice,
      invoiceNumber,
      date,
      email,
      contactNumber,
    };

    try {
      await sendEmail(email, data);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
});

module.exports = mongoose.model("Invoice", invoiceSchema);
