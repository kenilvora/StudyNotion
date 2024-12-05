import React, { useState } from "react";
import { useEffect } from "react";
import { settingsEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiConnector";
import Spinner from "../../common/Spinner";
import HighlightText from "../HomePage/HighlightText";
import toast from "react-hot-toast";
import logo from "../../../assets/Logo/Logo-Full-Dark.png";
import html2pdf from "html2pdf.js";
import ReactDOMServer from "react-dom/server";

const { PAYMENT_HISTORY_API } = settingsEndpoints;

const PaymentHistory = () => {
  const [paymentHistoryData, setPaymentHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const pdfJSX = (paymentDetails) => {
    const date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(paymentDetails.date));
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="min-w-3xl max-w-3xl mx-auto p-6 bg-white rounded-lg border border-blue-300 shadow-lg">
          <div className="text-center mb-6">
            <img src={logo} alt="Company Logo" className="w-40 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-gray-700">
              Payment Receipt
            </h1>
          </div>

          <div className="mb-6">
            <p>
              <span className="font-bold text-blue-500">Receipt No:</span>{" "}
              {paymentDetails._id}
            </p>
            <p>
              <span className="font-bold text-blue-500">Date:</span> {date}
            </p>
            <p>
              <span className="font-bold text-blue-500">Customer Name:</span>{" "}
              {paymentDetails.userName}
            </p>
            <p>
              <span className="font-bold text-blue-500">Email:</span>{" "}
              {paymentDetails.email}
            </p>
            <p>
              <span className="font-bold text-blue-500">Contact No.:</span>{" "}
              {paymentDetails.contactNumber}
            </p>
            <p>
              <span className="font-bold text-blue-500">Payment ID:</span>{" "}
              {paymentDetails.paymentId}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">Courses Purchased : </h2>
            <table className="w-full border">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="text-left py-2 px-4 border border-black">
                    Course Name
                  </th>
                  <th className="text-left py-2 px-4 border border-black">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentDetails.courses.map((course) => (
                  <tr key={course.courseId}>
                    <td className="py-2 px-4 border border-black">
                      {course.courseName}
                    </td>
                    <td className="py-2 px-4 border border-black">
                      ₹{course.coursePrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-right text-lg font-semibold">
            Total Amount: ₹{paymentDetails.totalAmount}
          </div>

          <div className="mt-8 text-center text-sm">
            <p>Thank you for your purchase!</p>
            <p>
              If you have any questions, contact us at{" "}
              <a
                href="mailto:studynotion111@gmail.com"
                className="text-blue-600 hover:underline"
              >
                inquiry@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Fetch Payment History
    const getPaymentHistory = async () => {
      let toastId;
      try {
        toastId = toast.loading("Fetching Payment History");
        const response = await apiConnector("GET", PAYMENT_HISTORY_API);
        setPaymentHistoryData(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        toast.dismiss(toastId);
      }
    };

    getPaymentHistory();
  }, []);

  const downloadReceiptAsPDF = (paymentDetails) => {
    const pdf = ReactDOMServer.renderToString(pdfJSX(paymentDetails));

    const options = {
      margin: 1,
      filename: "Payment-Receipt.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .set(options)
      .from(pdf)
      .toPdf() // Generate PDF object
      .get("pdf")
      .then((pdf) => {
        // Ensure text is selectable
        pdf.setFont("helvetica", "normal");
      })
      .save();
  };

  return (
    <div className="flex flex-col gap-12 text-richblack-5 justify-center">
      <div className="text-3xl font-bold">Payment History</div>

      {loading ? (
        <Spinner />
      ) : paymentHistoryData.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border p-2 border-richblack-700">
          <p className="text-2xl text-center font-edu-sa font-bold hover:text-yellow-100">
            You have not made any{" "}
            <HighlightText text={"Payments"}></HighlightText> yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          <header className="flex bg-richblack-700 items-center p-4 rounded-t-lg justify-between">
            <div className="text-richblack-50 font-bold text-xl">
              All Payments
            </div>
          </header>

          <div className="flex flex-col border border-richblack-700 rounded-b-lg divide-y divide-richblack-700">
            {paymentHistoryData &&
              paymentHistoryData.map((paymentData, index) => {
                const date = new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }).format(new Date(paymentData.date));

                return (
                  <div
                    key={index}
                    className="flex gap-4 items-center justify-between p-4 hover:bg-richblack-800 hover:cursor-pointer"
                  >
                    <div className="text-richblack-50 font-bold text-lg">
                      <span className="text-yellow-50">Payment successful</span>{" "}
                      for{" "}
                      <HighlightText
                        text={paymentData.courses.length + " course(s)"}
                      ></HighlightText>{" "}
                      on <HighlightText text={date}></HighlightText>.
                      <br />
                      Thank you for enrolling!
                      <div>
                        Payment ID:{" "}
                        <HighlightText text={paymentData.paymentId} />
                        <br />
                        <span className="text-yellow-50">
                          Enrolled Courses:
                        </span>
                        <ul className="list-disc ml-8">
                          {paymentData.courses.map((course, idx) => (
                            <li key={idx}>
                              <HighlightText
                                text={course.courseName}
                              ></HighlightText>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      className="bg-yellow-100 flex gap-2 px-4 py-1.5 border-l-2 border-richblack-25 text-black font-bold rounded-md"
                      title="Download Invoice"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        downloadReceiptAsPDF(paymentData);
                      }}
                    >
                      Download Invoice
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
