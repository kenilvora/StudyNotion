import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Error from "../../../pages/Error";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { MdLabelImportant } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { HiTv } from "react-icons/hi2";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const {
    courseEntireData,
    courseSectionData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");
  const [activeVideo, setActiveVideo] = useState("");
  const slidingTextRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sideBarRef = useRef(null);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) {
        return;
      }

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData?.[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;

      setActiveSection(courseSectionData?.[currentSectionIndex]?._id);

      setActiveVideo(activeSubSectionId);
    })();
  }, [courseEntireData, courseSectionData, location.pathname]);

  useEffect(() => {
    const slidingText = slidingTextRef.current;
    if (!slidingText) {
      return;
    }
    const textWidth = slidingText.offsetWidth;
    const containerWidth = slidingText.parentElement.offsetWidth;
    const animationDuration = (textWidth + containerWidth) / 60; // Adjust the divisor to control speed

    slidingText.style.animationDuration = `${animationDuration}s`;

    const keyframes = `
      @keyframes slide-text {
        0% {
          transform: translateX(${containerWidth}px);
        }
        100% {
          transform: translateX(-${textWidth}px);
        }
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);
  }, []);

  useOnClickOutside(sideBarRef, () => setIsSidebarOpen(false));

  return (
    <>
      {activeSection === undefined || activeVideo === undefined ? (
        <Error></Error>
      ) : (
        <>
          <div
            className="relative max-[1000px]:hidden left-0 min-w-[280px] bg-richblack-800 text-richblack-5 border-r border-richblack-600 flex flex-col justify-start py-5 gap-3 
            h-[calc(100vh-3.53rem)] overflow-auto"
          >
            {/* Heading and Btns */}
            <div className="flex flex-col gap-4">
              {/* BackBtn and ReviewBtn */}
              <div className="flex w-full justify-between items-center h-fit px-4">
                <div className="relative w-fit group">
                  <button
                    className=" text-black bg-richblue-50 flex justify-center items-center rounded-full"
                    onClick={() => navigate("/dashboard/enrolled-courses")}
                  >
                    <MdOutlineKeyboardArrowLeft className="text-3xl"></MdOutlineKeyboardArrowLeft>
                  </button>
                  <div
                    className=" text-white bg-richblack-900 border absolute border-richblack-200 
                px-2 text-[0.6rem] -bottom-6 left-4 hidden group-hover:flex py-0.5"
                  >
                    Back
                  </div>
                </div>
                <button
                  className=" text-black font-bold text-lg px-3 py-1.5 rounded-lg bg-yellow-100 shadow-yellow1"
                  onClick={() => setReviewModal(true)}
                >
                  Add Review
                </button>
              </div>

              {/* Sliding Text and Completed Lectures */}
              <div className="text-richblue-50 w-[250px] font-bold text-xl mx-4 whitespace-nowrap overflow-hidden inline-block">
                <div
                  className={`w-fit`}
                  ref={slidingTextRef}
                  style={
                    courseEntireData?.courseName.length >= 22
                      ? { animation: "slide-text linear infinite" }
                      : {}
                  }
                >
                  {courseEntireData?.courseName}
                </div>

                <div className="text-richblack-500 text-base font-bold">
                  {completedLectures.length} / {totalNoOfLectures}
                </div>
              </div>
            </div>

            <div className="mx-auto w-[90%] h-1 border-t border-richblack-600"></div>

            {/* All Sections */}
            <div className="flex flex-col gap-2 justify-center">
              {courseSectionData.map((section, index) => {
                return (
                  <div
                    key={index}
                    className="bg-richblack-600 opacity-70 w-full flex flex-col justify-center"
                  >
                    {/* One Section */}
                    <div
                      className="flex items-center justify-between px-4 py-3 hover:cursor-pointer"
                      onClick={() =>
                        setActiveSection(
                          activeSection === section._id ? "" : section._id
                        )
                      }
                    >
                      <div className="text-richblack-5 flex gap-2 items-center font-bold">
                        <MdLabelImportant></MdLabelImportant>
                        {section.sectionName}
                      </div>
                      <MdOutlineKeyboardArrowUp
                        className={`text-xl ${
                          activeSection === section._id
                            ? "rotate-0"
                            : " rotate-180"
                        }`}
                      ></MdOutlineKeyboardArrowUp>
                    </div>

                    {/* All SubSections */}
                    {activeSection === section._id ? (
                      <div className="flex flex-col justify-center h-fit bg-richblack-800">
                        {section?.subSection.map((subSection, index) => {
                          return (
                            <div
                              key={index}
                              className={`flex gap-2 items-center px-4 py-2 hover:cursor-pointer
                                  ${
                                    activeVideo === subSection._id
                                      ? "bg-yellow-100 text-black font-bold"
                                      : " hover:bg-richblack-900 text-white"
                                  }
                              `}
                              onClick={() => {
                                navigate(
                                  `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subSection._id}`
                                );
                              }}
                            >
                              {completedLectures.includes(subSection._id) ? (
                                <MdCheckBox className=" colorBlue"></MdCheckBox>
                              ) : (
                                <MdCheckBoxOutlineBlank className=""></MdCheckBoxOutlineBlank>
                              )}

                              <HiTv className=""></HiTv>

                              <div className="">{subSection?.title}</div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            className="relative hidden max-[1000px]:flex justify-center items-center text-richblack-5 p-2 bg-richblack-700 opacity-60 rounded-full text-xl h-fit top-7 left-4 font-bold"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <IoMenu></IoMenu>
          </button>

          {isSidebarOpen ? (
            <div
              className={`absolute z-50 min-[1001px]:hidden left-0 min-w-[280px] bg-richblack-800 
            text-richblack-5 border-r border-richblack-600 flex flex-col justify-start py-5 gap-3 
              overflow-auto h-[calc(100vh-3.53rem)] overflow-x-hidden
                    ${
                      isSidebarOpen
                        ? "animate-sidebar-slide-out"
                        : "animate-sidebar-slide-in"
                    }
              `}
              ref={sideBarRef}
            >
              {/* Heading and Btns */}
              <div className="flex flex-col gap-4">
                {/* BackBtn and ReviewBtn */}
                <div className="flex w-full justify-between items-center h-fit px-4">
                  <button
                    className="p-2 flex justify-center items-center text-black font-bold bg-richblack-50 rounded-full"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <RxCross2></RxCross2>
                  </button>
                  <div className="relative w-fit group">
                    <button
                      className=" text-black bg-richblue-50 flex justify-center items-center rounded-full"
                      onClick={() => navigate("/dashboard/enrolled-courses")}
                    >
                      <MdOutlineKeyboardArrowLeft className="text-3xl"></MdOutlineKeyboardArrowLeft>
                    </button>
                    <div
                      className=" text-white bg-richblack-900 border absolute border-richblack-200 
                px-2 text-[0.6rem] -bottom-6 left-4 hidden group-hover:flex py-0.5"
                    >
                      Back
                    </div>
                  </div>
                  <button
                    className=" text-black font-bold text-lg px-3 py-1.5 rounded-lg bg-yellow-100 shadow-yellow1"
                    onClick={() => setReviewModal(true)}
                  >
                    Add Review
                  </button>
                </div>

                {/* Sliding Text and Completed Lectures */}
                <div className="text-richblue-50 w-[250px] font-bold text-xl mx-4 whitespace-nowrap overflow-hidden inline-block">
                  <div
                    className={`w-fit`}
                    ref={slidingTextRef}
                    style={
                      courseEntireData?.courseName.length >= 75
                        ? { animation: "slide-text linear infinite" }
                        : {}
                    }
                  >
                    {courseEntireData?.courseName}
                  </div>

                  <div className="text-richblack-500 text-base font-bold">
                    {completedLectures.length} / {totalNoOfLectures}
                  </div>
                </div>
              </div>

              <div className="mx-auto w-[90%] h-1 border-t border-richblack-600"></div>

              {/* All Sections */}
              <div className="flex flex-col gap-2 justify-center">
                {courseSectionData.map((section, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-richblack-600 opacity-70 w-full flex flex-col justify-center"
                    >
                      {/* One Section */}
                      <div
                        className="flex items-center justify-between px-4 py-3 hover:cursor-pointer"
                        onClick={() =>
                          setActiveSection(
                            activeSection === section._id ? "" : section._id
                          )
                        }
                      >
                        <div className="text-richblack-5 flex gap-2 items-center font-bold">
                          <MdLabelImportant></MdLabelImportant>
                          {section.sectionName}
                        </div>
                        <MdOutlineKeyboardArrowUp
                          className={`text-xl ${
                            activeSection === section._id
                              ? "rotate-0"
                              : " rotate-180"
                          }`}
                        ></MdOutlineKeyboardArrowUp>
                      </div>

                      {/* All SubSections */}
                      {activeSection === section._id ? (
                        <div className="flex flex-col justify-center h-fit bg-richblack-800">
                          {section?.subSection.map((subSection, index) => {
                            return (
                              <div
                                key={index}
                                className={`flex gap-2 items-center px-4 py-2 hover:cursor-pointer
                                  ${
                                    activeVideo === subSection._id
                                      ? "bg-yellow-100 text-black font-bold"
                                      : " hover:bg-richblack-900 text-white"
                                  }
                              `}
                                onClick={() => {
                                  navigate(
                                    `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subSection._id}`
                                  );
                                }}
                              >
                                {completedLectures.includes(subSection._id) ? (
                                  <MdCheckBox className=" colorBlue"></MdCheckBox>
                                ) : (
                                  <MdCheckBoxOutlineBlank className=""></MdCheckBoxOutlineBlank>
                                )}

                                <HiTv className=""></HiTv>

                                <div className="">{subSection?.title}</div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default VideoDetailsSidebar;
