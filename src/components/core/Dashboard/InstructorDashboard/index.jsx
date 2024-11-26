import React, { useEffect, useState } from "react";
import Spinner from "../../../common/Spinner";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import HighlightText from "../../HomePage/HighlightText";
import InstructorChart from "./InstructorChart";
import InstructorCourses from "./InstructorCourses";
import { NavLink } from "react-router-dom";

const InstructorDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);
      try {
        const coursesData = await fetchInstructorCourses();
        if (coursesData) {
          setCourses(coursesData);
        }

        const data = await getInstructorData();
        if (data) {
          setInstructorData(data);
        }
      } catch (error) {
        console.log("Error while fetching course data with stats");
        toast.error("Could not get instructor dashboard data");
      }
      setLoading(false);
    };

    getCourseDataWithStats();
  }, []);

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );

  return (
    <div className="flex flex-col justify-center gap-5">
      <div className=" text-richblack-5 flex flex-col gap-2 justify-center font-bold">
        <div className="text-2xl">Hello, {user?.firstName}👋</div>
        <div className=" text-richblack-300">Let's start something new</div>
      </div>
      {loading ? (
        <Spinner />
      ) : courses.length === 0 ? (
        <div className="flex flex-col gap-3 text-richblack-5 items-center justify-center rounded-xl border p-2 border-richblack-700">
          <p className="text-2xl text-center font-edu-sa font-bold hover:text-yellow-100">
            You have not create in any{" "}
            <HighlightText text={"Course"}></HighlightText> yet.
          </p>

          <NavLink
            className="px-4 py-2 mb-2 rounded-lg bg-yellow-100 text-black font-bold shadow-yellow1"
            to={"/dashboard/add-course"}
          >
            Create a Course
          </NavLink>
        </div>
      ) : (
        <div className="flex flex-col justify-center gap-5 w-full">
          <div className="flex max-[1000px]:flex-col min-[1001px]:items-center gap-4">
            <div className="w-[75%] max-[1000px]:w-full">
              <InstructorChart courses={instructorData}></InstructorChart>
            </div>
            <div
              className="flex flex-col gap-3 p-6 bg-richblack-800 rounded-lg 
            w-[23%] max-[1000px]:w-full min-[1001px]:h-[491px]"
            >
              <div className=" text-richblack-5 font-bold text-xl">
                Statistics
              </div>
              <div className="flex flex-col">
                <div className=" text-richblack-300 text-lg">Total Courses</div>
                <div className=" text-richblack-5 font-bold text-3xl max-[1151px]:text-2xl max-[1060px]:text-xl">
                  {instructorData.length}
                </div>
              </div>
              <div className="flex flex-col">
                <div className=" text-richblack-300 text-lg">
                  Total Students
                </div>
                <div className=" text-richblack-5 font-bold text-3xl max-[1151px]:text-2xl max-[1060px]:text-xl">
                  {totalStudents}
                </div>
              </div>
              <div className="flex flex-col">
                <div className=" text-richblack-300 text-lg">Total Income</div>
                <div className=" text-richblack-5 font-bold text-3xl max-[1151px]:text-2xl max-[1060px]:text-xl">
                  Rs. {totalAmount}
                </div>
              </div>
            </div>
          </div>
          <InstructorCourses courses={courses}></InstructorCourses>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
