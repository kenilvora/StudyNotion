import React from "react";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/CTAButton";

const LearningGrid = () => {
  return (
    <div className="w-11/12 min-[581px]:px-11 max-w-maxContent mx-auto grid grid-cols-4 max-[1080px]:grid-cols-3 max-[860px]:grid-cols-2 max-[580px]:flex max-[580px]:flex-col">
      <div className="flex flex-col gap-3 items-start col-span-2 min-[721px]:pr-10 max-[860px]:mb-6">
        <div className="text-4xl font-bold max-[1011px]:text-3xl max-[350px]:text-2xl min-h-20">
          World-Class Learning for{" "}
          <HighlightText text={"Anyone, Anywhere"}></HighlightText>
        </div>
        <div className="flex flex-col items-start max-[343px]:gap-5">
          <p className="text-richblack-300 h-fit font-bold text-sm min-h-[100px]">
            Studynotion partners with more than 275+ leading universities and
            companies to bring flexible, affordable, job-relevant online
            learning to individuals and organizations worldwide.
          </p>
          <CTAButton active={true} linkto={"/login"}>
            Learn More
          </CTAButton>
        </div>
      </div>
      <div className="flex flex-col items-start gap-6 p-6 bg-richblack-700 max-[1080px]:bg-richblack-800 min-h-72">
        <h2 className="text-base font-bold min-h-12">
          Curriculum Based on Industry Needs
        </h2>
        <p className="text-richblack-300 text-sm">
          Save time and money! The Belajar curriculum is made to be easier to
          understand and in line with industry needs.
        </p>
      </div>
      <div className="flex flex-col items-start gap-6 p-6 bg-richblack-800 max-[860px]:bg-richblack-700 min-h-72 max-[1080px]:col-start-2">
        <h2 className="text-base font-bold min-h-12">Our Learning Methods</h2>
        <p className="text-richblack-300 text-sm">
          The learning process uses the namely online and offline.
        </p>
      </div>
      <div className="flex flex-col items-start gap-6 p-6 bg-richblack-700 max-[580px]:bg-richblack-800 min-[1081px]:col-start-2 min-h-72">
        <h2 className="text-base font-bold min-h-12">Certification</h2>
        <p className="text-richblack-300 text-sm">
          You will get a certificate that can be used as a certification during
          job hunting.
        </p>
      </div>
      <div className="flex flex-col items-start gap-6 p-6 bg-richblack-800 max-[580px]:bg-richblack-700 min-h-72">
        <h2 className="text-base font-bold min-h-12">Rating "Auto-grading"</h2>
        <p className="text-richblack-300 text-sm">
          You will immediately get feedback during the learning process without
          having to wait for a response from the mentor.
        </p>
      </div>
      <div className="flex flex-col items-start gap-6 p-6 bg-richblack-700 max-[860px]:bg-richblack-800 min-h-72">
        <h2 className="text-base font-bold min-h-12">Ready to Work</h2>
        <p className="text-richblack-300 text-sm">
          Connected with over 150+ hiring partners, you will have the
          opportunity to find a job after graduating from our program.
        </p>
      </div>
    </div>
  );
};

export default LearningGrid;
