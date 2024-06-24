import React from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { HiGlobeEuropeAfrica } from "react-icons/hi2";
import { HiPhone } from "react-icons/hi2";
import ContactUsForm from "../components/common/ContactUsForm";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";

const ContactUs = () => {
  return (
    <div className="text-richblack-5">
      <section className="w-11/12 my-20 max-w-maxContent mx-auto flex justify-between max-[820px]:flex-col max-[820px]:gap-9">
        <div className="flex flex-col gap-10 p-8 bg-richblack-800 rounded-xl h-fit w-[38%] max-[820px]:w-full">
          <div className="flex gap-2">
            <div className="text-[1.31rem]">
              <HiChatBubbleLeftRight></HiChatBubbleLeftRight>
            </div>
            <div className="flex flex-col">
              <div className="font-bold">Chat with us</div>
              <div className="text-richblack-200 text-sm">
                Our friendly team is here to help.
              </div>
              <a
                href="mailto:studynotion111@gmail.com"
                className="text-richblack-300 font-black text-sm hover:underline"
              >
                Chat with StudyNotion
              </a>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="text-[1.31rem]">
              <HiGlobeEuropeAfrica></HiGlobeEuropeAfrica>
            </div>
            <div className="flex flex-col">
              <div className="font-bold">Visit us</div>
              <div className="text-richblack-200 text-sm">
                Come and say hello at our office HQ.
              </div>
              <div className="text-richblack-300 font-black text-sm">
                123 Sunshine Avenue, Sapphire City, Emerald State, Pin Code:
                567890, India.
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="text-[1.31rem]">
              <HiPhone></HiPhone>
            </div>
            <div className="flex flex-col">
              <div className="font-bold">Call us</div>
              <div className="text-richblack-200 text-sm">
                Mon - Fri From 8am to 5pm
              </div>
              <a
                href="tel:+911234567890"
                className="text-richblack-300 font-black text-sm hover:underline"
              >
                +91 12345 67890
              </a>
            </div>
          </div>
        </div>

        <div className="w-[58%] p-12 max-[600px]:p-6 flex flex-col gap-10 border-richblack-600 border rounded-xl items-center justify-center max-[820px]:w-full">
          <div className="flex flex-col gap-2 justify-center">
            <div className="text-4xl font-bold max-[1000px]:text-3xl max-[430px]:text-2xl">
              Got a Idea? We've got the skills. Let's team up
            </div>
            <div className="text-richblack-300 font-bold max-[430px]:text-sm">
              Tell us more about yourself and what you're got in mind.
            </div>
          </div>
          <ContactUsForm width={"w-full"}></ContactUsForm>
        </div>
      </section>

      <section className="mb-20 flex flex-col gap-6 w-11/12 max-w-maxContent mx-auto">
        <div className=" text-4xl text-richblack-5 font-bold text-center max-[560px]:text-2xl max-[380px]:text-xl">
          Reviews From Other Learners
        </div>
        <ReviewSlider></ReviewSlider>
      </section>

      <Footer></Footer>
    </div>
  );
};

export default ContactUs;
