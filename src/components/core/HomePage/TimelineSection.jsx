import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../assets/Images/TimelineImage.png";

const timeLine = [
  {
    Logo: logo1,
    heading: "Leadership",
    description: "Fully committed to the success company",
  },
  {
    Logo: logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    Logo: logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
  },
  {
    Logo: logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div className="flex justify-between items-center max-[740px]:flex-col max-[940px]:gap-6">
      <div className="flex flex-col w-[50%] max-[940px]:w-[80%] max-[740px]:w-full">
        {timeLine.map((element, index) => {
          return (
            <div key={index} className="flex flex-col">
              <div className="flex gap-7 max-[940px]:gap-4">
                <div className="w-[50px] h-[50px] flex justify-center items-center bg-white rounded-full shadow-circle">
                  <img src={element.Logo} alt="Logo1" loading="lazy"/>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-lg max-[400px]:text-base">{element.heading}</h3>
                  <p className="text-base text-richblack-500 max-[400px]:text-xs max-[940px]:text-xs max-[740px]:text-base">
                    {element.description}
                  </p>
                </div>
              </div>

              {index !== timeLine.length - 1 && (
                <div className="flex ml-6 my-2" style={{ width: "1px" }}>
                  <div
                    className="h-[50px] border-r-2 border-richblack-300 border-dashed max-[740px]:h-[40px] max-[1024px]:h-[25px]"
                    style={{ width: "0", flex: "1" }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative w-[60%] overflow-visible max-[1130px]:w-[55%] max-[1010px]:w-[50%] max-[940px]:w-full">
        <div className="w-[103%] h-[90%] rounded-[45%] top-10 -left-4 opacity-60 blur-lg absolute imageGradient"></div>
        <img
          src={timeLineImage}
          alt="TimeLineImage"
          className="relative w-full h-fit object-cover shadow-white"
          loading="lazy"
        />

        <div className="absolute bg-caribbeangreen-700 justify-between items-center flex py-9 left-[50%] translate-x-[-50%] translate-y-[-50%] max-[1130px]:py-5 max-[940px]:py-3 max-[740px]:py-5 max-[460px]:py-3">
          <div className="flex justify-between gap-7 items-center border-r border-caribbeangreen-300 px-12 max-[1130px]:px-6 max-[1130px]:gap-3 max-[940px]:px-3 max-[740px]:px-6 max-[460px]:px-3">
            <div className="font-bold text-4xl text-white max-[940px]:text-2xl max-[740px]:text-4xl max-[460px]:text-2xl max-[340px]:text-xl">10</div>
            <div className="uppercase text-caribbeangreen-300 text-sm max-[940px]:text-xs max-[340px]:text-[0.5rem] max-[340px]:leading-[0.6rem]">
              Years Of Experiences
            </div>
          </div>
          <div className="flex justify-between gap-7 items-center px-12 max-[1130px]:px-6 max-[1130px]:gap-3 max-[940px]:px-3 max-[740px]:px-6 max-[460px]:px-3">
            <div className="font-bold text-4xl text-white max-[940px]:text-2xl max-[740px]:text-4xl max-[460px]:text-2xl max-[340px]:text-xl">250</div>
            <div className="uppercase text-caribbeangreen-300 text-sm max-[940px]:text-xs max-[340px]:text-[0.5rem] max-[340px]:leading-[0.6rem]">
              Types Of Courses
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
