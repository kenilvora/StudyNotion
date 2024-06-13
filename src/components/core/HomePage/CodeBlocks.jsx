import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import CTAButton from "./CTAButton";
import { TypeAnimation } from "react-type-animation";


const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div
      className={`flex gap-20 max-[785px]:flex-col justify-center items-center w-[100%] ${position} my-20 max-[960px]:my-7 max-[960px]:gap-10`}
    >
      {/* Section 1 */}
      <div className="w-[50%] flex flex-col gap-5 max-[960px]:w-full">
        {heading}
        <div className="text-richblack-300 text-[1.1rem]">{subheading}</div>
        <div className="flex gap-6 mt-12 max-[1060px]:mt-5 max-[960px]:gap-3">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.text}
              <HiArrowNarrowRight></HiArrowNarrowRight>
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.text}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 -> Codeblock */}
      <div className="w-[50%] h-fit relative overflow-visible max-[960px]:w-full transition-all duration-500 hover:scale-105">
        <div
          className={`${backgroundGradient} opacity-20 w-[70%] h-[90%] absolute -top-5 -left-4 rounded-[40%] blur-2xl`}
        ></div>
        <div className="flex flex-row border-t-[1px] border-l-[1px] border-blue-500 p-2 applyGradient relative rounded-lg">
          <div className="flex flex-col justify-center text-center w-[5%] text-richblack-400 font-inter font-bold mr-2">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
          </div>

          <div
            className={`w-[95%] flex flex-col font-bold gap-2 font-mono ${codeColor} pr-1 max-[350px]:pr-0`}
          >
            <TypeAnimation
              sequence={[codeblock, 2000, ""]}
              repeat={Infinity}
              omitDeletionAnimation={true}
              style={{
                whiteSpace: "pre-line",
                display: "block",
                width: "100%",
              }}
              className="max-[500px]:text-[0.9rem] max-[350px]:text-[0.82rem] max-[500px]:leading-6 max-[500px]:items-center "
              cursor={true}
              speed={1}
            ></TypeAnimation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
