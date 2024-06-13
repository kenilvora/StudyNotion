const Contact = require("../models/ContactUs");
const dns = require("dns");

exports.contactUsConttroller = async (req, res) => {
  try {
    const { firstName, lastName, email, contactNumber, message } = req.body;

    if (!firstName || !email || !message || !contactNumber) {
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
        const contactInfo = new Contact({
          firstName: firstName,
          lastName: lastName ? lastName : "",
          email: email,
          contactNumber: contactNumber,
          message: message,
        });

        const contactUsData = await contactInfo.save();

        return res.status(200).json({
          success: true,
          message: "New Data Saved Successfully",
          data: contactUsData,
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while saving data",
      error: error.message,
    });
  }
};
