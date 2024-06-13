const express = require('express');
const { contactUsConttroller } = require('../controllers/ContactUs');
const router = express.Router();

// Route for contactUs form
router.post("/reach/contact", contactUsConttroller);

module.exports = router;