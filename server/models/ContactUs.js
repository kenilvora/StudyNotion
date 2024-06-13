const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");

const contactUsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
});

async function sendEmail(email, data) {
  try {
    const userMailBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            h1, p {
                margin-bottom: 20px;
            }
            ul {
                list-style-type: none;
                padding: 0;
            }
            ul li {
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Thank You for Getting in Touch!</h1>
            <p>Dear ${data.firstName} ${data.lastName},</p>
            <p>We hope this message finds you well.</p>
            <p>Thank you for reaching out to us through our contact form. We have received your inquiry and your information has been successfully recorded in our system.</p>
            <h2>Your Details:</h2>
            <ul>
                <li><strong>First Name:</strong> ${data.firstName}</li>
                <li><strong>Last Name:</strong> ${data.lastName}</li>
                <li><strong>Contact Number:</strong> ${data.contactNumber}</li>
                <li><strong>Message:</strong> ${data.message}</li>
            </ul>
            <p>Our team will review your message and get back to you as soon as possible. If you have any further questions or concerns, please feel free to reach out to us again.</p>
            <p>Thank you for contacting us. We value your interest in our services and look forward to assisting you.</p>
            <p>Best regards,<br>StudyNotion Team</p>
        </div>
    </body>
</html>
    `;

    const adminMailBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            h1, p {
                margin-bottom: 20px;
            }
            ul {
                list-style-type: none;
                padding: 0;
            }
            ul li {
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>New User Contact Submission</h1>
            <p>Dear Admin,</p>
            <p>We have received a new contact form submission. Below are the details provided by the user:</p>
            <h2>User Details:</h2>
            <ul>
                <li><strong>First Name:</strong> ${data.firstName}</li>
                <li><strong>Last Name:</strong> ${data.lastName}</li>
                <li><strong>Contact Number:</strong> ${data.contactNumber}</li>
                <li><strong>Message:</strong> ${data.message}</li>
            </ul>
            <p>Please review the user's message and take the necessary actions. If you have any questions or need further assistance, do not hesitate to contact us.</p>
            <p>Best regards,<br>StudyNotion Team</p>
        </div>
    </body>
</html>
    `;

    const userMailResponse = await mailSender(
      email,
      "Thank You for Contacting Us!",
      userMailBody
    );

    const adminMailResponse = await mailSender(
      process.env.ADMIN_MAIL_ID,
      "New User Contact Information",
      adminMailBody
    );

    console.log("Email sent to User successfully, ", userMailResponse);

    console.log("Email sent to Admin successfully, ", adminMailResponse);
  } catch (error) {
    console.log("Error occurred while sending ContactUs mail ", error);
  }
}

contactUsSchema.pre("save", async function (next) {
  console.log("New User saved to database");

  // Only send an email when a new document is created
  if (this.isNew) {
    const firstName = this.firstName;
    const lastName = this.lastName === "" ? "Not Provided" : this.lastName;
    const contactNumber = this.contactNumber;
    const message = this.message;

    const data = {
      firstName,
      lastName,
      contactNumber,
      message,
    };
    await sendEmail(this.email, data);
  }
  next();
});

module.exports = mongoose.model("ContactUs", contactUsSchema);
