import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import Footer from "../components/common/Footer";

const TermsConditions = () => {
  return (
    <div className="w-full text-richblack-5 pt-10">
      <section className="w-11/12 max-w-maxContent mx-auto flex flex-col justify-center items-center">
        <div className="text-4xl font-bold">
          <HighlightText text={"Terms & Conditions"}></HighlightText>
        </div>
      </section>
      <section className="mt-5 mb-10 w-11/12 max-w-maxContent mx-auto">
        <div className="space-y-6 text-left">
          <p className="text-2xl font-bold">
            Welcome to StudyNotion. These terms and conditions govern your use
            of our platform for purchasing and accessing educational courses.
          </p>

          {/* Definitions and Scope */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"1. Definitions and Scope"}
              bgGradient={"fontGradient3"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            In these terms, "Platform" refers to StudyNotion, "User" refers to
            anyone accessing or using our platform, and "Courses" refer to
            educational content available for purchase or free access.
          </p>

          {/* User Accounts */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"2. User Accounts"}
              bgGradient={"fontGradient1"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            Users must create an account to purchase and access courses. You are
            responsible for maintaining the confidentiality of your account
            information and for all activities under your account.
          </p>

          {/* Payments and Refunds */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"3. Payments and Refunds"}
              bgGradient={"fontGradient3"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            All course fees must be paid in full before accessing the content.
            Payments are processed securely via third-party providers. Refunds
            are granted only under specific conditions, such as technical issues
            preventing access to the course, and must be requested within 14
            days of purchase. No refunds will be issued for partially completed
            courses.
          </p>

          {/* Content Ownership */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"4. Content Ownership and Licensing"}
              bgGradient={"fontGradient1"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            StudyNotion and its licensors retain ownership of all course
            materials. Users are granted a limited, non-exclusive license to
            access the courses for personal, non-commercial use only.
          </p>

          {/* Prohibited Activities */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"5. Prohibited Activities"}
              bgGradient={"fontGradient3"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            Users are prohibited from sharing, distributing, or reselling course
            materials. Unauthorized access, hacking, or misuse of the platform
            is strictly forbidden.
          </p>

          {/* Privacy Policy */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"6. Privacy Policy"}
              bgGradient={"fontGradient1"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            By using this platform, you agree to our privacy policy, which
            outlines how we collect, use, and protect your personal data.
          </p>

          {/* Dispute Resolution */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"7. Dispute Resolution"}
              bgGradient={"fontGradient3"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            Any disputes arising from these terms will be resolved through
            arbitration under the laws of [Your Country/Region]. The decision of
            the arbitrator will be final and binding.
          </p>

          {/* Termination */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"8. Termination"}
              bgGradient={"fontGradient1"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            We reserve the right to suspend or terminate your account if you
            violate these terms or engage in prohibited activities.
          </p>

          {/* Disclaimer */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"9. Disclaimer"}
              bgGradient={"fontGradient3"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            StudyNotion makes no guarantees about the completeness, accuracy, or
            reliability of the course content. Your use of the platform is at
            your own risk.
          </p>

          {/* Modifications */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"10. Modifications to Terms"}
              bgGradient={"fontGradient1"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            We reserve the right to update these terms at any time. Continued
            use of the platform constitutes your acceptance of the revised
            terms.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TermsConditions;
