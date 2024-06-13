exports.paymentSuccessfullEmail = (name, paymentId, orderId, amount) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Payment Successful</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f0f0f0;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding-top: 20px;
                }
                .header img {
                    max-width: 120px;
                }
                .content h1 {
                    color: #333333;
                    font-size: 28px;
                    text-align: center;
                }
                .content p {
                    color: #666666;
                    line-height: 1.6;
                    font-size: 16px;
                }
                .content .highlight {
                    color: black;
                    font-weight: bolder;
                }
                .button {
                    display: block;
                    width: fit-content;
                    margin: 20px auto;
                    padding: 12px 24px;
                    background-color: #28a745;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 18px;
                    text-align: center;
                }
                .button:hover {
                    background-color: #218838;
                }
                .footer {
                    text-align: center;
                    padding: 15px;
                    background-color: #f0f0f0;
                    color: #888888;
                    font-size: 14px;
                    border-top: 1px solid #dddddd;
                    margin-top: 20px;
                }
                .footer p {
                    margin: 5px 0;
                }
                .footer a {
                    color: #888888;
                    text-decoration: none;
                }
                .footer a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion_Logo">
                </div>
                <div class="content">
                    <h1>Congratulations!</h1>
                    <p>Dear <span class="highlight">${name}</span>,</p>
                    <p>We are thrilled to inform you that your payment of <span class="highlight">₹${amount}</span> has been successfully processed.</p>
                    <p>Your Payment Id: <span class="highlight">${paymentId}</span></p>
                    <p>Your Order Id: <span class="highlight">${orderId}</span> </p>
                    <p>You can now access your course and start your learning journey right away!</p>
                    <a href="http://localhost:3000/dashboard/enrolled-courses" class="button">Access Your Course</a>
                    <p>If you have any questions or need further assistance, please feel free to reach out to us at any time.</p>
                    <p>Thank you for choosing <span class="highlight">StudyNotion</span>. We are excited to have you with us and wish you the best of luck in your studies!</p>
                    <p>Best regards,</p>
                    <p>The <span class="highlight">StudyNotion</span> Team</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 StudyNotion. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`;
};
