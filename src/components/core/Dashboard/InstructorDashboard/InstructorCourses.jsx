import React from "react";
import { NavLink } from "react-router-dom";

const InstructorCourses = ({ courses }) => {
  return (
    <div className="w-full flex flex-col gap-4 p-6 rounded-lg bg-richblack-800">
      <div className="flex w-full justify-between items-center">
        <div className=" text-richblack-5 font-bold text-xl">Your Courses</div>
        <NavLink
          to={"/dashboard/my-courses"}
          className="text-yellow-100 font-bold text-sm"
        >
          View All
        </NavLink>
      </div>
      <div className="w-full flex max-[720px]:flex-col max-[720px]:gap-8 justify-between">
        {courses.slice(0, 3).map((course, index) => {
          return (
            <div key={index} className="w-[32%] max-[720px]:w-full flex flex-col gap-2">
              <img
                src={course.thumbnail}
                alt="courseThumbnail"
                className="rounded-lg object-cover aspect-video w-full min-[721px]:h-[210px]"
              />

              <div className="text-richblue-100 font-bold">
                {course.courseName}
              </div>
              <div className="flex text-richblack-300 divide-x-2 divide-richblack-200 items-center text-sm font-bold">
                <div className="pr-2">
                  {course?.studentsEnrolled.length} Students
                </div>
                <div className="pl-2">Rs. {course.price}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InstructorCourses;
