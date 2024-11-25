const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const { mailSender } = require("../utils/mailSender");
const dns = require("dns");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

// signUp
exports.signUp = async (req, res) => {
  try {
    // fetch data from req ki body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // validate the data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
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
        // match both passwords fetch from user
        if (password !== confirmPassword) {
          return res.status(400).json({
            success: false,
            message:
              "Password and ConfirmPassword value doesn't match, Please try again",
          });
        }

        // check if user already exist or not
        const existingUser = await User.findOne({ email: email });

        //if user already exist, then return a res
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "User is already registered, Please Login to continue",
          });
        }

        // fetch most recent OTP stored for the user
        const recentOTP = await OTP.findOne({ email: email })
          .sort({ createdAt: -1 })
          .limit(1);

        // validate the OTP
        if (!recentOTP || recentOTP.length === 0) {
          // OTP not found
          return res.status(400).json({
            success: false,
            message: "OTP Not Found",
          });
        } else if (otp !== recentOTP.otp) {
          // Invalid OTP
          return res.status(400).json({
            success: false,
            message: "Invalid OTP",
          });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create an entry in db
        let approved = "";
        accountType === "Instructor" ? (approved = false) : (approved = true);

        const profileDetails = await Profile.create({
          gender: null,
          dateOfBirth: null,
          about: null,
          contactNumber: contactNumber ? contactNumber : null,
        });

        const user = await User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          accountType: accountType,
          contactNumber,
          approved: approved,
          additionalDetails: profileDetails._id,
          image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        user.password = undefined;
        // return a response
        return res.status(200).json({
          success: true,
          message: "User is Registered Successfully",
          user,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User can't be registered, Please try again",
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    // fetch data from req ki body
    const { email, password } = req.body;

    // validate data
    if (!email || !password) {
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
        const user = await User.findOne({ email })
          .populate("additionalDetails")
          .exec();

        //if user not exist, then return a res
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "User is not registered, Please SignUP first to continue",
          });
        }

        // match password and generate JWT
        if (await bcrypt.compare(password, user.password)) {
          const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET);
          //   user = user.toObject();
          // user.token = token;
          // user.password = undefined;

          // create cookie and send response
          res.cookie("token", token, {
            secure: true,
            sameSite: "none",
          });

          res.status(200).json({
            success: true,
            message: "Logged In Successfully",
            token: token,
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "Incorrect Password",
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure, Please try again",
    });
  }
};

// send OTP
exports.sendOTP = async (req, res) => {
  try {
    // fetch email from req ki body
    const { email } = req.body;
    console.log(email);

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
        //check if user already exist
        const checkUserPresent = await User.findOne({ email });

        //if user already exist, then return a res
        if (checkUserPresent) {
          return res.status(400).json({
            success: false,
            message: "User is Already Registered",
          });
        }

        // generate OTP
        var otp = otpGenerator.generate(6, {
          digits: true,
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });

        // check if otp is unique or not
        let result = await OTP.findOne({ otp: otp });

        while (result) {
          otp = otpGenerator.generate(6, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
          });
          result = await OTP.findOne({ otp: otp });
        }

        // make otp-payload to make entry in db
        const otpPayload = { email, otp };

        //create an entry in db
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body ", otpBody);

        //return response
        return res.status(200).json({
          success: true,
          message: "OTP Sent Successfully",
          otp,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// changePassword -> may be changes needed
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    // Match new password and confirm new password
    if (newPassword !== confirmNewPassword) {
      // If new password and confirm new password do not match, return a 400 (Bad Request) error
      return res.status(400).json({
        success: false,
        message: "The password and confirm password does not match",
      });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password Updated Successfully",
        passwordUpdated(
          updatedUserDetails.email,
          `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
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

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};

// me route
exports.me = async (req, res) => {
  try {
    const token = req.user.id;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token Missing",
      });
    }

    const user = await User.findById(token).populate("additionalDetails");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "User Found",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unathorized Access",
    });
  }
};

// logout
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout Failure",
    });
  }
};
