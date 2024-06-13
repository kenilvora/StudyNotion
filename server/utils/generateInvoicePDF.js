const puppeteer = require("puppeteer");

// Function to generate PDF invoice
exports.generateInvoicePDF = async (data) => {
  try {
    // Generate HTML template
    const htmlTemplate = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Invoice</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 800px;
            margin: 20px auto;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #007bff;
            color: #fff;
            text-align: center;
            padding: 20px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }
          .invoice-details {
            padding: 15px;
            font-size: 1.1rem;
          }
          .invoice-details table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .invoice-details td {
            padding: 6px;
          }
          .invoice-details td:first-child {
            font-weight: bold;
            color: #333;
            width: 21%;
          }
          .invoice-items {
            width: 95%;
            margin: 0 auto;
            border-collapse: collapse;
          }
          .invoice-items th,
          .invoice-items td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
            color: #333;
          }
          .invoice-items th {
            background-color: #f2f2f2;
            font-weight: bold;
            text-transform: uppercase;
          }
          .invoice-items td:last-child {
            text-align: right;
            width: 30%;
          }
          .total {
            margin-top: 20px;
            padding: 20px;
            text-align: right;
            font-size: 18px;
            color: #333;
            background-color: #f2f2f2;
          }
          .footer {
            background-color: #007bff;
            color: #fff;
            text-align: center;
            padding: 20px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Invoice</h1>
          </div>
          <div class="invoice-details">
            <table>
              <tr>
                <td>Invoice Number:</td>
                <td>${data.invoiceNumber}</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>${data.date}</td>
              </tr>
              <tr>
                <td>Student Name:</td>
                <td>${data.userName}</td>
              </tr>
              <tr>
                <td>Email ID:</td>
                <td>${data.email}</td>
              </tr>
              <tr>
                <td>Contact Number:</td>
                <td>${data.contactNumber}</td>
              </tr>
            </table>
          </div>
          <table class="invoice-items">
            <thead>
              <tr>
                <th>Course</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${data.courses
                .map(
                  (course) => `
              <tr>
                <td>${course.courseName}</td>
                <td>₹ ${course.coursePrice}</td>
              </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <div class="total">
            <p><strong>Total:</strong>₹ ${data.totalPrice}</p>
          </div>
          <div class="footer">
            <p>Thank you for your purchase!</p>
            <p>Contact us at support@example.com for any inquiries.</p>
          </div>
        </div>
      </body>
    </html>
    `;

    // Launch a headless browser with increased timeout
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      timeout: 60000, // Increase timeout to 60 seconds
    });

    const page = await browser.newPage();

    // Generate PDF from HTML template with a specific timeout
    await page.setContent(htmlTemplate, { waitUntil: "networkidle0" }); // Wait for network to be idle
    
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      timeout: 60000, // Set timeout to 60 seconds
    });

    // Close the browser
    await browser.close();

    return pdfBuffer;
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    throw error;
  }
};
