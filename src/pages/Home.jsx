import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex flex-col items-center max-w-maxContent text-white w-11/12 justify-between">
        {/* Button */}
        <div className="group mt-16 mx-auto rounded-full bg-richblack-800 font-semibold text-richblack-400 transition-all duration-200 hover:scale-95 shadow-black2 w-fit p-1 hover:cursor-pointer">
          <NavLink
            to={"/signup"}
            className="flex items-center gap-2 px-5 py-1 transition-all duration-200 group-hover:bg-richblack-900 rounded-full"
          >
            <p>Become an Instructor</p>
            <HiArrowNarrowRight className="text-xl" />
          </NavLink>
        </div>

        {/* Heading and Subheading */}
        <div className="flex flex-col items-center gap-4 mt-6 max-sm:items-start">
          <div className="text-center text-4xl font-semibold max-sm:text-start">
            Empower Your Future with{" "}
            <HighlightText text={"Coding Skills"}></HighlightText>
          </div>

          <div className="text-richblack-300 text-center w-[70%] text-[1.1rem] max-sm:text-start max-sm:w-full">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        {/* Video */}
        <div className="shadow-white1 mx-4 my-14 max-md:shadow-respwhite1 max-[890px]:w-full max-[890px]:my-10">
          <video
            muted
            autoPlay
            loop
            className="lg:border-blue-200 lg:border-4 z-20 relative shadow-blue1"
          >
            <source src={Banner} type="video/mp4"></source>
          </video>
        </div>

        {/* CodeSection 1 */}
        <CodeBlocks
          position={"lg:flex-row"}
          heading={
            <div className="text-4xl font-semibold">
              Unlock your{" "}
              <HighlightText text={"coding potential"}></HighlightText> with our
              online courses.
            </div>
          }
          subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }
          ctabtn1={{
            text: "Try it Yourself",
            active: true,
            linkto: "/signup",
          }}
          ctabtn2={{
            text: "Learn More",
            active: false,
            linkto: "/login",
          }}
          codeblock={`<html lang="en">
<head>
<title>StudyNotion</title>
</head>
<body>
<h1>
<a href="/">Hello Friends</a>
</h1>
<nav><a href="/one">One</a></nav>
</body>
</html>`}
          codeColor={"text-yellow-100"}
          backgroundGradient={"codeOne"}
        ></CodeBlocks>

        {/* CodeSection 2 */}
        <CodeBlocks
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-4xl font-semibold">
              Start <HighlightText text={`coding`}></HighlightText>
              <br />
              <HighlightText text={"in seconds"}></HighlightText>
            </div>
          }
          subheading={
            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          }
          ctabtn1={{
            text: "Continue Lesson",
            active: true,
            linkto: "/signup",
          }}
          ctabtn2={{
            text: "Learn More",
            active: false,
            linkto: "/login",
          }}
          codeblock={`<html lang="en">
<head>
<title>StudyNotion</title>
</head>
<body>
<h1>
<a href="/">Hello Dosto!!</a>
</h1>
<nav><a href="/two">Two</a></nav>
</body>
</html>`}
          codeColor={"text-yellow-100"}
          backgroundGradient={"codeTwo"}
        ></CodeBlocks>

        <ExploreMore></ExploreMore>
      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homePage_bg h-[321px]">
          <div className="w-11/12 max-w-maxContent flex flex-col mx-auto gap-4 items-center">
            <div className="h-[125px]"></div>
            <div className="flex gap-6 text-white max-[500px]:gap-3">
              <CTAButton active={true} linkto={"/course"}>
                <div className="flex gap-2 items-center">
                  Explore Full Catalog <HiArrowNarrowRight></HiArrowNarrowRight>
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"} className="">
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto max-w-maxContent py-20 flex flex-col gap-14 max-[850px]:py-10 max-[1130px]:gap-5">
          <div className="flex gap-44 max-[850px]:flex-col max-[850px]:gap-5">
            <div className="font-bold text-4xl w-[43.5%] max-[850px]:w-full">
              Get the skills you need for a{" "}
              <HighlightText text={"job"}></HighlightText>{" "}
              <HighlightText text={"that is in demand."} />
            </div>
            <div className="w-[42%] flex flex-col items-start gap-12 max-[850px]:w-full max-[850px]:gap-5">
              <p className="text-richblack-600  font-inter font-semibold">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>

              <div>
                <CTAButton active={true} linkto={"/signup"}>
                  Learn More
                </CTAButton>
              </div>
            </div>
          </div>

          <TimelineSection></TimelineSection>
          <LearningLanguageSection></LearningLanguageSection>
        </div>
      </div>

      {/* Section 3 */}
      <div className="flex mx-auto w-11/12 max-w-maxContent gap-20 justify-between items-center py-20">
        <InstructorSection></InstructorSection>
      </div>

      <section className="flex flex-col gap-6 w-11/12 max-w-maxContent mx-auto mt-10 mb-20">
        <div className=" text-4xl text-richblack-5 font-bold text-center">
          Reviews From Other Learners
        </div>
        <ReviewSlider></ReviewSlider>
      </section>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default Home;
