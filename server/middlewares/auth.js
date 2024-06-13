const jwt = require("jsonwebtoken");

// authorization
exports.auth = async (req, res, next) => {
  try {
    // extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    // if token missing then return res
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is Missing",
      });
    }

    // verify the token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);
      req.user = payload;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying the token",
    });
  }
};

// isStudent
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students only!!",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User Role can't be verified, Please try again",
    });
  }
};

// isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructors only!!",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User Role can't be verified, Please try again",
    });
  }
};

// isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only!!",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User Role can't be verified, Please try again",
    });
  }
};
