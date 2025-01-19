import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import Footer from "../components/common/Footer";

const ShippingPolicy = () => {
  return (
    <div className="w-full text-richblack-5 pt-10">
      <section className="w-11/12 max-w-maxContent mx-auto flex flex-col justify-center items-center">
        <div className="text-4xl font-bold">
          <HighlightText text={"Shipping Policy"}></HighlightText>
        </div>
      </section>
      <section className="mt-5 mb-10 w-11/12 max-w-maxContent mx-auto">
        <div className="space-y-6 text-left">
          <p className="text-2xl font-bold">
            This Shipping Policy outlines the terms related to the delivery of
            digital and physical products offered on StudyNotion.
          </p>

          {/* Delivery of Digital Products */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"1. Delivery of Digital Products"}
              bgGradient={"fontGradient3"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            Upon successful payment, digital courses will be made available
            immediately in your account. Users can access their purchased
            courses by logging into their accounts on the platform. Please
            ensure you have a stable internet connection to download or stream
            course content.
          </p>

          {/* Contact Information */}
          <div className="text-2xl font-semibold mt-4">
            <HighlightText
              text={"2. Contact Information"}
              bgGradient={"fontGradient1"}
            ></HighlightText>
          </div>
          <p className="text-lg leading-relaxed">
            If you have any questions about this shipping policy, please contact
            us at studynotion111@gmail.com or through our Help Center on the
            platform.
          </p>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default ShippingPolicy;
