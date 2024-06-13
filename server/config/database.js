const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connected to Database Successfully");
    })
    .catch((error) => {
      console.log("Error while connecting to Database");
      console.error(error);
      process.exit(1);
    });
};
