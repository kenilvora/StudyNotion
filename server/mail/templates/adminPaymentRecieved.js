exports.adminPaymentRecieved = (
  name,
  email,
  contactNumber,
  courses,
  totalAmount,
  paymentDate
) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Payment Received Notification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    background-color: #ffffff;
                    margin: 50px auto;
                    padding: 20px;
                    max-width: 600px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    background-color: #4CAF50;
                    color: #ffffff;
                    padding: 10px 0;
                }
                .content {
                    margin: 20px 0;
                }
                .content h2 {
                    color: #333333;
                }
                .content p {
                    color: #555555;
                    line-height: 1.6;
                }
                .details {
                    margin: 20px 0;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border: 1px solid #dddddd;
                }
                .details p {
                    margin: 5px 0;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    color: #777777;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Payment Received</h1>
                </div>
                <div class="content">
                    <h2>Hello Admin,</h2>
                    <p>We are pleased to inform you that we have successfully received a payment from a student for the following course(s):</p>
                    <div class="details">
                        <p><strong>Student Name:</strong> ${name}</p>
                        <p><strong>Student Email:</strong> ${email}</p>
                        <p><strong>Contact Number:</strong> ${contactNumber}</p>
                        <p><strong>Course(s) Enrolled:</strong></p>
                        <ul>
                           ${courses
                             .map(
                               (course) =>
                                 `<li>${course.courseName} - ₹${course.coursePrice}</li>`
                             )
                             .join("")}
                        </ul>
                        <p><strong>Total Amount Received:</strong> ₹${totalAmount}</p>
                        <p><strong>Payment Date & Time:</strong> ${paymentDate}</p>
                    </div>
                    <p>Thank you for your continued support.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 StydyNotion. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>

    `;
};
