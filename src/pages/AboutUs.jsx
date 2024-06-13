import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import img1 from "../assets/Images/aboutus1.webp";
import img2 from "../assets/Images/aboutus2.webp";
import img3 from "../assets/Images/aboutus3.webp";
import foundingStoryImage from "../assets/Images/FoundingStory.png";
import Footer from "../components/common/Footer";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import GetInTouch from "../components/core/AboutPage/GetInTouch";
import ReviewSlider from "../components/common/ReviewSlider";

const AboutUs = () => {
  return (
    <div className="flex flex-col text-richblack-5">
      {/* Section 1 */}
      <section className="pt-16 bg-richblack-800">
        <div className="w-11/12 max-w-maxContent mx-auto flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center max-[800px]:text-start max-[800px]:w-full w-8/12 gap-4 relative text-center">
            <header className="text-4xl font-bold max-[400px]:text-3xl">
              Driving Innovation in Online Education for a{" "}
              <HighlightText text={"Brighter Future"}></HighlightText>
            </header>
            <p className="text-richblack-500 font-semibold">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>
        </div>
        <div className="w-11/12 max-w-maxContent mx-auto flex max-[800px]:flex-col max-[800px]:gap-8 justify-between relative top-14">
          <div className="w-[30%] max-[800px]:w-[80%] aboutUsGradient h-[10%] absolute left-[49%] translate-x-[-48%] blur-xl"></div>
          <img
            src={img1}
            alt="AboutUsImage1"
            className="w-[32%] relative max-[800px]:w-full object-contain"
          />
          <img
            src={img2}
            alt="AboutUsImage2"
            className="w-[32%] relative max-[800px]:w-full object-contain"
          />
          <img
            src={img3}
            alt="AboutUsImage3"
            className="w-[32%] relative max-[800px]:w-full object-contain"
          />
        </div>
      </section>

      {/* Section 2 */}
      <section className="border-richblack-600 border-b">
        <div className="w-11/12 flex justify-center items-center max-w-maxContent mx-auto mt-24 mb-16">
          <header className="text-richblack-100 text-3xl font-bold text-center w-[92%] max-[800px]:w-full max-[800px]:text-start max-[570px]:text-2xl max-[440px]:text-xl">
            We are passionate about revolutionizing the way we learn. Our
            innovative platform{" "}
            <HighlightText
              text={"combines technology"}
              bgGradient={"fontGradient2"}
            />
            {", "}
            <HighlightText bgGradient={"fontGradient3"} text={"expertise"} />
            {", "}
            and community to create an{" "}
            <HighlightText
              bgGradient={"fontGradient4"}
              text={"unparalleled educational experience."}
            />
          </header>
        </div>
      </section>

      {/* Section 3 */}
      <section className="w-11/12 max-w-maxContent mx-auto my-16 max-[800px]:mb-0 flex justify-center items-center">
        <div className="flex justify-between items-center min-[801px]:px-8 max-[800px]:flex-col-reverse max-[800px]:gap-6">
          <div className="flex flex-col gap-4 w-[41%] text-left max-[800px]:w-full">
            <header className="text-4xl font-bold max-[1100px]:text-3xl max-[830px]:text-2xl max-[800px]:text-4xl max-[500px]:text-3xl max-[400px]:text-2xl">
              <HighlightText
                text={"Our Founding Story"}
                bgGradient={"fontGradient5"}
              ></HighlightText>
            </header>
            <div className="flex flex-col gap-3 text-richblack-300 font-bold text-base max-[1100px]:text-[0.8rem] max-[1100px]:leading-[1.2rem] max-[830px]:text-xs max-[800px]:text-base max-[500px]:text-sm ">
              <p>
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p>
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
          </div>
          <div className="min-[800px]:p-4 w-[44%] relative max-[800px]:w-full">
            <div className="absolute w-[70%] h-[80%] blur-2xl rounded-[70%] foundingStoryImageGradient"></div>
            <img
              src={foundingStoryImage}
              alt="foundingStoryImage"
              className="relative w-full"
            />
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section>
        <div className="flex max-[530px]:flex-col max-[530px]:gap-7 justify-between min-[801px]:px-8 w-11/12 my-16 mx-auto max-w-maxContent text-richblack-5">
          <div className="flex flex-col gap-6 w-[43%] max-[800px]:w-[47%] max-[530px]:w-full">
            <header className="text-4xl font-bold max-[500px]:text-3xl max-[400px]:text-2xl">
              <HighlightText
                text={"Our Vision"}
                bgGradient={"fontGradient6"}
              ></HighlightText>
            </header>
            <p className="text-richblack-300 font-bold text-base max-[500px]:text-sm">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>
          <div className="flex flex-col gap-6 w-[43%] max-[800px]:w-[47%] max-[530px]:w-full">
            <header className="text-4xl font-bold max-[500px]:text-3xl max-[400px]:text-2xl">
              <HighlightText
                text={"Our Mision"}
                bgGradient={"fontGradient7"}
              ></HighlightText>
            </header>
            <p className="text-richblack-300 font-bold text-base max-[500px]:text-sm">
              Our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="bg-richblack-800">
        <div className="w-11/12 max-w-maxContent mx-auto flex max-[800px]:flex-col items-center justify-between gap-4 max-[800px]:gap-10 my-14">
          <div className="flex gap-4 w-1/2 max-[800px]:w-full">
            <div className="flex flex-col items-center gap-2 justify-between w-1/2">
              <div className="font-bold text-3xl">5K</div>
              <div className=" text-richblack-500 font-bold text-sm">
                Active Students
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 justify-between w-1/2">
              <div className="font-bold text-3xl">10+</div>
              <div className=" text-richblack-500 font-bold text-sm">
                Mentors
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-1/2 max-[800px]:w-full">
            <div className="flex flex-col items-center gap-2 justify-between w-1/2">
              <div className="font-bold text-3xl">200+</div>
              <div className=" text-richblack-500 font-bold text-sm">
                Courses
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 justify-between w-1/2">
              <div className="font-bold text-3xl">50+</div>
              <div className=" text-richblack-500 font-bold text-sm">
                Awards
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 */}
      <section className="my-20">
        <LearningGrid></LearningGrid>
      </section>

      {/* Section 7 */}
      <section className="my-20">
        <GetInTouch></GetInTouch>
      </section>

      <section className="mb-20 w-11/12 flex flex-col gap-6 max-w-maxContent mx-auto">
        <div className=" text-4xl text-richblack-5 font-bold text-center">
          Reviews From Other Learners
        </div>
        <ReviewSlider></ReviewSlider>
      </section>

      <Footer></Footer>
    </div>
  );
};

export default AboutUs;
