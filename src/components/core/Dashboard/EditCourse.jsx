import React from "react";
import { useSelector } from "react-redux";
import RenderSteps from "./AddCourse/RenderSteps";

const EditCourse = () => {
  const { course } = useSelector((state) => state.course);

  return (
    <div className="flex flex-col gap-12 text-richblack-5 justify-center">
      <div className="text-3xl font-bold flex justify-between w-full">
        Edit Course
      </div>

      <div>
        {course ? (
          <RenderSteps></RenderSteps>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border p-2 border-richblack-700">
            <p className="text-2xl text-center font-edu-sa font-bold hover:text-yellow-100">
              Course Not Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCourse;
