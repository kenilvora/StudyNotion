import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import Footer from "../components/common/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="text-richblack-5 pt-10">
      <section className="w-11/12 max-w-maxContent mx-auto flex flex-col justify-center items-center">
        <div className="text-4xl font-bold">
          <HighlightText text={"Privacy Policy"}></HighlightText>
        </div>
      </section>
      <section className="mt-5 mb-10 w-11/12 max-w-maxContent mx-auto">
        <div className="space-y-6 text-left">
          <p className="text-2xl font-bold">
            This Privacy Policy outlines how StudyNotion collects, uses, and
            protects your information when you use our platform.
          </p>

          {/* Information We Collect */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"1. Information We Collect"}
              bgGradient={"fontGradient3"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            We collect the following types of information when you interact with
            our platform:
            <ul className="list-disc list-inside ml-5 mt-2">
              <li>Personal Information: Name, email address, phone number.</li>
              <li>
                Payment Information: Credit/debit card details, billing address.
              </li>
              <li>
                Usage Data: IP address, browser type, and activity on the
                website.
              </li>
            </ul>
          </p>

          {/* How We Use Your Information */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"2. How We Use Your Information"}
              bgGradient={"fontGradient1"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            We use your information to:
            <ul className="list-disc list-inside ml-5 mt-2">
              <li>Provide and improve our services.</li>
              <li>Process payments and deliver products or services.</li>
              <li>Send important updates and promotional materials.</li>
              <li>Ensure the security of your account.</li>
            </ul>
          </p>

          {/* Data Sharing and Disclosure */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"3. Data Sharing and Disclosure"}
              bgGradient={"fontGradient3"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            We do not sell or share your personal information with third parties
            except:
            <ul className="list-disc list-inside ml-5 mt-2">
              <li>
                With service providers for payment processing or customer
                support.
              </li>
              <li>To comply with legal obligations or enforce our policies.</li>
              <li>In case of business mergers or acquisitions.</li>
            </ul>
          </p>

          {/* Data Retention */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"4. Data Retention"}
              bgGradient={"fontGradient1"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            We retain your information as long as necessary to fulfill the
            purposes outlined in this policy unless a longer retention period is
            required by law.
          </p>

          {/* Cookies and Tracking */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"5. Cookies and Tracking"}
              bgGradient={"fontGradient3"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            Our platform uses cookies to enhance your experience. You can manage
            your cookie preferences through your browser settings. Note that
            disabling cookies may impact your user experience.
          </p>

          {/* Your Rights */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"6. Your Rights"}
              bgGradient={"fontGradient1"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            You have the right to:
            <ul className="list-disc list-inside ml-5 mt-2">
              <li>Access and update your personal information.</li>
              <li>Request the deletion of your data.</li>
              <li>Opt out of promotional communications.</li>
            </ul>
          </p>

          {/* Security Measures */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"7. Security Measures"}
              bgGradient={"fontGradient3"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            We implement industry-standard security measures to protect your
            data. However, no method of transmission or storage is 100% secure,
            and we cannot guarantee absolute security.
          </p>

          {/* Changes to This Policy */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"8. Changes to This Policy"}
              bgGradient={"fontGradient1"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            We may update this Privacy Policy periodically. Any changes will be
            communicated through the platform or via email.
          </p>

          {/* Contact Information */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"9. Contact Information"}
              bgGradient={"fontGradient3"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            If you have questions about this Privacy Policy, contact us at
            studynotion111@gmail.com or through our Help Center.
          </p>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default PrivacyPolicy;
