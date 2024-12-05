import React, { useState } from "react";
import { useEffect } from "react";
import { settingsEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiConnector";
import Spinner from "../../common/Spinner";
import HighlightText from "../HomePage/HighlightText";
import toast from "react-hot-toast";
import logo from "../../../assets/Logo/Logo-Full-Dark.png";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile from "../../common/PDFFile";

const { PAYMENT_HISTORY_API } = settingsEndpoints;

const PaymentHistory = () => {
  const [paymentHistoryData, setPaymentHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

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
                    >
                      <PDFDownloadLink
                        document={
                          <PDFFile
                            date={date}
                            logo={logo}
                            paymentDetails={paymentData}
                          ></PDFFile>
                        }
                        fileName={`Payment-Receipt-${paymentData.paymentId}.pdf`}
                      >
                        {({ loading }) =>
                          loading ? "Loading..." : "Download Invoice"
                        }
                      </PDFDownloadLink>
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
