const User = require("../models/User");
const crypto = require("crypto");
const { mailSender } = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const dns = require("dns");
const { resetPassword } = require("../mail/templates/resetPassword");

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
  try {
    // fetch email from req ki body
    const email = req.body.email;
    // validate data
    if (!email) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // Extract domain from email
    const domain = email.split("@")[1];

    // Check if domain exists and has valid MX records
    dns.resolve(domain, "MX", async (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid email domain",
        });
      } else {
        // check if user registered or not
        const user = await User.findOne({ email: email });

        //if user not exist, then return a res
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "User is not registered, Please SignUP first",
          });
        }
        // generate token
        const token = crypto.randomBytes(20).toString("hex");
        console.log(token);
        // update user by adding token and expiration time in User
        const updatedUser = await User.findOneAndUpdate(
          { email: email },
          {
            passwordToken: token,
            tokenExpires: Date.now() + 3600000,
          },
          { new: true }
        );

        console.log("DETAILS ", updatedUser);

        // create Url
        const url = `https://studynotion.kenilvora.tech/reset-password/${token}`;
        // send mail containing the url
        try {
          const name = `${updatedUser.firstName} ${updatedUser.lastName}`;
          const mailResponse = await mailSender(
            email,
            "Reset Your Password",
            resetPassword(url, name)
          );
          console.log("Email sent successfully, ", mailResponse);
        } catch (error) {
          console.log(
            "Error occurred while sending Reset Password mail ",
            error
          );
          return res.status(500).json({
            success: false,
            message: "Something went wrong while  Reset Password mail",
          });
        }

        // return resopnse
        return res.status(200).json({
          success: true,
          message:
            "Reset Password Mail Sent Successfully, Please Check your Email to Continue Further",
        });
      }
    });
  } catch (error) {
    console.log(
      "Something went wrong while sending Reset Password mail ",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending Reset Password mail",
    });
  }
};

// resetPassword
exports.resetPassword = async (req, res) => {
  try {
    // fetch data from req ki body
    const { token, password, confirmPassword } = req.body;
    console.log(req.body);
    // validate data
    if (!token || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password doesn't match",
      });
    }
    // get user details from db using token
    const userDetails = await User.findOne({ passwordToken: token });
    // if no entry -> invalid token
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }
    // check time of token
    if (userDetails.tokenExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token is expired, Please regenerate your token",
      });
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    // upadate the passwowrd
    await User.findOneAndUpdate(
      { passwordToken: token },
      {
        password: hashedPassword,
      },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        userDetails.email,
        "Password Updated Successfully",
        passwordUpdated(
          userDetails.email,
          `${userDetails.firstName} ${userDetails.lastName}`
        )
      );
      console.log("Email sent successfully:", emailResponse);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }
    // return response
    return res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while reset your password",
    });
  }
};
