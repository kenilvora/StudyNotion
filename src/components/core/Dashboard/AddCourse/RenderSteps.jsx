import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import CourseInformationForm from "./CourseInformationForm/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilderForm/CourseBuilderForm";
import PublishCourse from "./PublishCourseForm/PublishCourse";

const RenderSteps = () => {
  const { step: currStep, editCourse } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <div
      className={`flex flex-col min-[981px]:w-[60%] gap-8
        ${editCourse ? "mx-auto" : ""}
    `}
    >
      <div className="flex w-full">
        {steps.map((step) => {
          return (
            <div className="w-[33%] relative" key={step.id}>
              <div className="flex flex-col gap-2.5 items-center justify-center text-richblack-5">
                <div
                  className={`bg-richblack-800 z-20 w-9 h-9 flex justify-center items-center text-xl py-1.5 px-4 rounded-full border border-richblack-600
                    ${
                      currStep === step.id
                        ? "text-yellow-100 bg-yellow-900 border-2 border-yellow-100"
                        : ""
                    }
                    ${
                      step.id < currStep
                        ? "text-black bg-yellow-100 border-2 border-yellow-100"
                        : ""
                    }
              `}
                >
                  {step.id < currStep ? (
                    <div className="flex justify-center items-center">
                      <FaCheck></FaCheck>
                    </div>
                  ) : (
                    step.id
                  )}
                </div>
                <div
                  className={`text-richblack-300 max-[535px]:text-sm max-[435px]:text-xs text-center
                ${
                  currStep === step.id || step.id < currStep
                    ? "font-bold text-richblack-5"
                    : ""
                }
              `}
                >
                  {step.title}
                </div>
              </div>
              {step.id !== 3 && (
                <div
                  className={`border-t-2 flex-grow border-richblack-600 border-dashed absolute w-full left-[50%] top-[18px]
                    ${currStep > step.id ? "border-yellow-100" : ""}
                `}
                ></div>
              )}
            </div>
          );
        })}
      </div>
      {currStep === 1 && <CourseInformationForm></CourseInformationForm>}

      {currStep === 2 && <CourseBuilderForm></CourseBuilderForm>}

      {currStep === 3 && <PublishCourse></PublishCourse>}
    </div>
  );
};

export default RenderSteps;
