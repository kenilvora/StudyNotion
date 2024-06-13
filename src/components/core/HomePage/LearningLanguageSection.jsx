import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./CTAButton";

const LearningLanguageSection = () => {
  return (
    <div className="mt-20 max-sm:mt-10 max-[1130px]:mt-15">
      <div className="flex flex-col gap-5 items-center max-[830px]:gap-0">
        <div className="flex flex-col items-center gap-2 max-sm:items-start">
          <div className="text-center text-4xl font-semibold max-sm:text-start max-sm:text-3xl">
            Your swiss knife for{" "}
            <HighlightText text={"learning any language"}></HighlightText>
          </div>

          <div className="text-richblack-600 text-center w-[70%] text-[1.1rem] max-sm:text-start max-sm:w-full">
            Using spin making learning multiple languages easy. with 20+
            languages realistic voice-over, progress tracking, custom schedule
            and more.
          </div>
        </div>

        <div className="flex justify-center items-center ml-10 max-[1150px]:w-[90%] max-[830px]:ml-0 max-[830px]:w-full">
          <div className="flex justify-center items-center max-[830px]:flex-col relative max-[830px]:top-20">
            <img
              src={know_your_progress}
              alt="KnowYourProgress"
              className="object-contain -mr-32 mb-14 max-[1150px]:w-[45%] max-[830px]:w-[90%] max-[830px]:ml-0 max-[830px]:mb-0 max-[830px]:mr-0"
              loading="lazy"
            />
            <img
              src={compare_with_others}
              alt="CompareWithOthers"
              className="object-contain relative max-[1150px]:w-[56%] max-[830px]:w-full max-[830px]:-top-[3rem]"
              loading="lazy"
            />
            <img
              src={plan_your_lessons}
              alt="PlanYourLessons"
              className="object-contain relative -ml-36 mb-12 max-[1150px]:w-[56%] max-[830px]:w-full max-[830px]:mb-0 max-[830px]:ml-0 max-[830px]:-top-[7.6rem] max-[830px]:h-[10%]"
              loading="lazy"
            />
          </div>
        </div>

        <CTAButton active={true} linkto={"/signup"} className="absolute max-[830px]: top-44">
          Learn More
        </CTAButton>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
