import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import Footer from "../components/common/Footer";

const RefundPolicy = () => {
  return (
    <div className="text-richblack-5 pt-10">
      <section className="w-11/12 max-w-maxContent mx-auto flex flex-col justify-center items-center">
        <div className="text-4xl font-bold">
          <HighlightText
            text={"Cancellation and Refund Policy"}
          ></HighlightText>
        </div>
      </section>
      <section className="mt-5 mb-10 w-11/12 max-w-maxContent mx-auto">
        <div className="space-y-6 text-left">
          <p className="text-2xl font-bold">
            At StudyNotion, we strive to provide quality education and services.
            This policy outlines our terms for cancellations and refunds to
            ensure a transparent process.
          </p>

          {/* Cancellation Policy */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"1. Cancellation Policy"}
              bgGradient={"fontGradient3"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            <ul className="list-disc list-inside ml-5 mt-2">
              <li>
                Cancellations can be made within 24 hours of purchase, provided
                the course has not been accessed.
              </li>
              <li>
                To cancel, contact us at studynotion111@gmail.com with your
                order details.
              </li>
              <li>
                After 24 hours, cancellations will not be accepted unless due to
                exceptional circumstances (e.g., technical issues).
              </li>
            </ul>
          </p>

          {/* Refund Policy */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"2. Refund Policy"}
              bgGradient={"fontGradient1"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            Refunds are issued based on the following conditions:
            <ul className="list-disc list-inside ml-5 mt-2">
              <li>
                If the cancellation request is approved within 24 hours of
                purchase and the course has not been accessed, a full refund
                will be provided.
              </li>
              <li>
                Partial refunds may be issued in case of exceptional
                circumstances (e.g., technical difficulties that prevent course
                access).
              </li>
              <li>
                Refunds will not be provided if the course has been accessed or
                completed.
              </li>
              <li>
                Any promotional or discounted courses are non-refundable unless
                required by law.
              </li>
            </ul>
          </p>

          {/* Refund Process */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"3. Refund Process"}
              bgGradient={"fontGradient3"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            <ul className="list-disc list-inside ml-5 mt-2">
              <li>
                Refund requests can be initiated by contacting
                studynotion111@gmail.com with your order details.
              </li>
              <li>
                Once your refund request is approved, the amount will be
                credited back to your original payment method within 7-10
                business days.
              </li>
              <li>
                We will notify you via email once your refund has been
                processed.
              </li>
            </ul>
          </p>

          {/* Non-Refundable Items */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"4. Non-Refundable Items"}
              bgGradient={"fontGradient1"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            The following items are non-refundable:
            <ul className="list-disc list-inside ml-5 mt-2">
              <li>Courses that have been accessed or completed.</li>
              <li>
                Any add-ons or downloadable materials purchased separately.
              </li>
              <li>Gift cards or promotional vouchers.</li>
            </ul>
          </p>

          {/* Changes to Policy */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"5. Changes to This Policy"}
              bgGradient={"fontGradient3"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            We reserve the right to modify this Cancellation and Refund Policy
            at any time. Any changes will be communicated via the platform or
            email. Please review this policy periodically to stay informed.
          </p>

          {/* Contact Information */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"6. Contact Information"}
              bgGradient={"fontGradient1"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            If you have questions or concerns regarding this policy, please
            contact us at studynotion111@gmail.com or through our Help Center.
          </p>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default RefundPolicy;
