import React from "react";
import InstructorImage from "../../../assets/Images/Instructor.png";
import CTAButton from "./CTAButton";
import { HiArrowNarrowRight } from "react-icons/hi";
import HighlightText from "./HighlightText";

const InstructorSection = () => {
  return (
    <div className="flex justify-between relative max-[830px]:flex-col max-[830px]:gap-10">
      <img src={InstructorImage} alt="Instructor" className="shadow-white2 max-[1200px]:w-[50%] max-[940px]:shadow-respwhite2 max-[830px]:w-full" loading="lazy"/>

      <div className="flex flex-col gap-3 items-start justify-center text-white w-[40%] max-[830px]:w-full">
        <h1 className="text-start text-4xl font-bold">
          Become an
          <br />
          <HighlightText text={"Instructor"}></HighlightText>
        </h1>

        <p className="text-start text-richblack-500 font-bold ">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>

        <div className="mt-16 max-[830px]:mt-5">
          <CTAButton active={true} linkto={"/signup"}>
            <div className="flex gap-2 items-center">
              Start Teaching Today
              <HiArrowNarrowRight></HiArrowNarrowRight>
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
