const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const commonRoutes = require("./routes/Common");

const { dbConnect } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

// connect with database
dbConnect();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://studynotion.kenilvora.tech",
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// connect with cloudinary
cloudinaryConnect();

//  routes mount
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1", commonRoutes);

// default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your Server is Up and Running...",
  });
});

// activate server
app.listen(PORT, () => {
  console.log(`Server started successfully at Port ${PORT}`);
});
