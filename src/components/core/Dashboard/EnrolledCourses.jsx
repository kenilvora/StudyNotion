import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import Spinner from "../../common/Spinner";
import ProgressBar from "@ramonak/react-progress-bar";
import HighlightText from "../HomePage/HighlightText";
import { HiClock } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);

  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getEnrolledCourses = async () => {
    setLoading(true);
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to Fetch Enrolled Courses");
    }
    setLoading(false);
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="flex flex-col gap-12 text-richblack-5 justify-center">
      <div className="text-3xl font-bold">Enrolled Courses</div>

      {loading ? (
        <Spinner></Spinner>
      ) : enrolledCourses === undefined || enrolledCourses?.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border p-2 border-richblack-700">
          <p className="text-2xl text-center font-edu-sa font-bold hover:text-yellow-100">
            You have not enrolled in any{" "}
            <HighlightText text={"Course"}></HighlightText> yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          <header className="flex bg-richblack-700 p-4 rounded-t-lg">
            <div className="text-richblack-50 font-bold w-[60%] max-[720px]:w-full">
              Course Name
            </div>
            <div className="w-[15%] max-[720px]:hidden text-richblack-50 font-bold">
              Duration
            </div>
            <div className="w-[24%] max-[720px]:hidden text-richblack-50 font-bold">
              Progress
            </div>
          </header>
          <div className="flex flex-col border border-richblack-700 rounded-b-lg divide-y divide-richblack-700">
            {enrolledCourses &&
              enrolledCourses.map((course, index) => {
                return (
                  <div
                    className="flex hover:cursor-pointer"
                    key={index}
                    onClick={() =>
                      navigate(
                        `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`
                      )
                    }
                  >
                    <div className="flex max-[542px]:flex-col items-center gap-4 w-[60%] max-[720px]:w-full p-4">
                      <img
                        src={course.thumbnail}
                        alt="courseThumbnail"
                        className=" max-[720px]:w-36 max-[542px]:w-full min-[543px]:aspect-square object-cover rounded-md min-[721px]:h-[3.25rem] min-[721px]:aspect-video"
                      />
                      <div className="flex flex-col w-full">
                        <div className="text-base max-[345px]:text-lg max-[720px]:text-xl font-bold text-richblack-5">
                          {course.courseName.slice(0, 35)}
                          {course.courseName.length > 35 ? "..." : ""}
                        </div>
                        <div className="text-sm text-richblack-300">
                          {course.courseDescription
                            .split(" ")
                            .slice(0, 6)
                            .join(" ") + "..."}
                        </div>
                        <div className="hidden max-[720px]:flex min-w-full justify-between mt-2">
                          <div className="text-richblack-300 font-bold flex gap-2 items-center">
                            <HiClock></HiClock>
                            {course.totalDuration || "00h 00m"}
                          </div>
                          <div className="flex flex-col justify-center gap-1">
                            <div className="text-sm font-bold w-full">
                              Progress : {course.progressPercentage}%
                            </div>
                            <ProgressBar
                              completed={course.progressPercentage}
                              height="8px"
                              bgColor={
                                course.progressPercentage == 100
                                  ? "#06D6A0"
                                  : "#0F7A9D"
                              }
                              isLabelVisible={false}
                              maxCompleted={100}
                              className="w-full"
                            ></ProgressBar>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[14.2%] max-[720px]:hidden text-richblack-5 font-bold flex items-center">
                      {course.totalDuration || "00h 00m"}
                    </div>
                    <div className="flex flex-col justify-center items-start gap-1 w-[24%] max-[720px]:hidden">
                      <div className="text-sm font-bold w-full">
                        Progress : {course.progressPercentage}%
                      </div>
                      <ProgressBar
                        completed={course.progressPercentage}
                        height="8px"
                        bgColor={
                          course.progressPercentage === 100
                            ? "#06D6A0"
                            : "#0F7A9D"
                        }
                        isLabelVisible={false}
                        maxCompleted={100}
                        className="w-full"
                      ></ProgressBar>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
