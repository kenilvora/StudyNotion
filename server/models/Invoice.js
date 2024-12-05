const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  email: {
    type: String,
    required: true,
    trim: true,
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
  totalAmount: {
    type: Number,
    required: true,
    trim: true,
  },
  paymentId: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
