import React, { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { HiClock } from "react-icons/hi2";
import { HiMiniPencil } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { COURSE_STATUS } from "../../../utils/constants";
import Spinner from "../../common/Spinner";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {
  deleteAllCourses,
  deleteCourse,
  fetchInstructorCourses,
} from "../../../services/operations/courseDetailsAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import {
  resetCourseState,
  setCourse,
  setEditCourse,
  setStep,
} from "../../../slices/courseSlice";
import { useForm } from "react-hook-form";
import { IoIosCheckbox } from "react-icons/io";
import { FcInfo } from "react-icons/fc";
import { formatDate } from "../../../services/formatDate";
import { convertSecondsToDuration } from "../../../utils/secondToDuration";

const MyCourses = () => {
  const {
    register,
    setValue,
    watch,
  } = useForm();

  const checkBox = watch("deleteAllCourse");

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [myCourses, setMyCourses] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const getMyCourses = async () => {
    try {
      const response = await fetchInstructorCourses(token);
      console.log(response);
      setMyCourses(response);
    } catch (error) {
      console.log("Unable to Fetch Instructor Courses");
    }
  };

  useEffect(() => {
    getMyCourses();
  }, []);

  const deleteBtnHandler = async (courseId, categoryId) => {
    const data = {
      courseId,
      categoryId,
    };
    await deleteCourse(data, token);
    getMyCourses();
    setConfirmationModal(null);
  };

  const deleteAllCourse = async () => {
    await deleteAllCourses(token);
    setValue("deleteAllCourse", false);
    getMyCourses();
    setConfirmationModal(null);
  };

  const editBtnHandler = (course) => {
    dispatch(setCourse(course));
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
    navigate(`/dashboard/edit-course/${course._id}`);
  };

  return (
    <div className="flex flex-col gap-12 text-richblack-5 justify-center">
      <div className="flex justify-between relative">
        <div className="text-3xl font-bold">My Courses</div>

        <button
          className="flex items-center justify-center px-5 py-2 rounded-lg bg-yellow-100 font-bold text-black border border-yellow-5 gap-1 text-lg"
          onClick={() => {
            dispatch(resetCourseState());
            navigate("/dashboard/add-course");
          }}
        >
          <FaCirclePlus className="text-lg"></FaCirclePlus>
          New
        </button>
      </div>

      {myCourses && myCourses.length > 0 && (
        <form
          action="submit"
          className="flex relative items-start min-[401px]:items-center gap-7 min-h-10 max-[400px]:flex-col max-[400px]:gap-3"
        >
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="deleteAllCourse"
              {...register("deleteAllCourse", { required: true })}
              className="h-4 w-4 rounded-md"
            />
            <p className="text-richblack-300 text-lg font-bold">Select All</p>
            <div className="group w-0">
              <FcInfo
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                className="text-sm hover:cursor-pointer relative -left-1 -top-1.5"
              ></FcInfo>
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                className="bg-richblack-500 hidden opacity-0 group-hover:opacity-100 group-hover:flex text-richblack-5 text-xs max-[400px]:text-[0.65rem] absolute -top-9 max-[400px]:-top-[2.6rem] left-0 w-fit font-bold py-2 px-3 rounded-md"
              >
                <div className="w-5 h-5 rotate-45 bg-richblack-500 rounded-sm absolute top-[1.15rem] left-[6.6rem]"></div>
                <div className="z-10">
                  Courses with Enrolled Students cannot be Deleted.
                </div>
              </div>
            </div>
          </label>

          {checkBox && (
            <div className="bg-yellow-100 py-2 px-4 rounded-lg text-black font-bold opacity-75 shadow-yellow1">
              <button
                type="button"
                onClick={() => {
                  setConfirmationModal({
                    text1: "Are You Sure?",
                    text2: "All of your Courses will be Deleted!",
                    btn1: "Delete All Courses",
                    btn2: "Cancel",
                    btn1Handler: deleteAllCourse,
                    btn2Handler: () => {
                      setConfirmationModal(null);
                    },
                  });
                }}
              >
                Delete All Courses
              </button>
            </div>
          )}
        </form>
      )}

      {!myCourses ? (
        <Spinner></Spinner>
      ) : !myCourses.length || !myCourses ? (
        <div className="flex flex-col items-center justify-center rounded-xl border p-2 border-richblack-700">
          <p className="text-2xl text-center font-edu-sa font-bold hover:text-yellow-100">
            You have not created any Course yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center py-4 border border-richblack-600 rounded-lg divide-y divide-richblack-700">
          <div className="flex items-center text-richblack-200 font-semibold pb-4 w-full">
            <div className="w-[70%] max-[1080px]:w-[75%] max-[1020px]:w-[87%] max-[835px]:w-[90%] max-[650px]:w-full pl-4 pr-1 max-[650px]:text-center max-[650px]:text-lg">
              COURSES
            </div>
            <div className="flex justify-center w-[12%] max-[1020px]:hidden max-[1080px]:w-[15%] px-1">
              DURATION
            </div>
            <div className="flex justify-center w-[8%] px-1 max-[1080px]:hidden">
              PRICE
            </div>
            <div className="flex text-center justify-center w-[10%] max-[1020px]:w-[13%] max-[650px]:hidden px-1 max-[1080px]:pr-2 max-[900px]:pr-3 max-[835px]:pr-0 max-[720px]:pr-2">
              ACTION
            </div>
          </div>
          <div className="flex flex-col divide-y divide-richblack-600 gap-4">
            {myCourses.map((course, index) => {
              return (
                <div className="flex pt-4" key={index}>
                  <div className="flex relative w-[70%] max-[1080px]:w-[75%] max-[1020px]:w-[87%] max-[835px]:w-[90%] max-[650px]:w-full gap-6 pl-4 pr-1 max-[920px]:gap-3 max-[650px]:flex-col max-[650px]:gap-4 max-[650px]:justify-center max-[650px]:pr-4">
                    <img
                      src={course?.thumbnail}
                      alt="courseThumbnail"
                      className="rounded-lg object-cover w-[14rem] max-[920px]:w-[11.8rem] max-[835px]:w-[14rem] max-[650px]:w-full min-[650px]:h-40"
                    />

                    {checkBox === true && (
                      <div className="absolute top-2 left-6">
                        <IoIosCheckbox className="checkBox w-5 h-5 font-extrabold"></IoIosCheckbox>
                      </div>
                    )}

                    <div className="flex flex-col justify-between gap-2">
                      <div className="text-richblack-5 font-bold text-2xl max-[835px]:text-2xl max-[886px]:text-lg max-[667px]:text-lg max-[650px]:text-3xl max-[485px]:text-2xl max-[396px]:text-xl max-[340px]:text-lg">
                        {course?.courseName.split(" ").slice(0, 9).join(" ") +
                          "..."}
                      </div>
                      <div className="text-richblack-300 text-sm max-[650px]:text-base max-[396px]:text-sm">
                        {course?.courseDescription
                          .split(" ")
                          .slice(0, 8)
                          .join(" ") + "..."}
                      </div>
                      <div className=" text-richblack-200 text-sm font-bold max-[650px]:text-base max-[396px]:text-sm">
                        Created: {formatDate(course?.createdAt)}
                      </div>

                      <div className="flex gap-5 h-fit max-[970px]:gap-2 w-full min-[595px]:items-center max-[595px]:flex-col-reverse max-[650px]:justify-between max-[650px]:gap-3">
                        <div className="flex gap-5 max-[970px]:gap-2 max-[650px]:gap-5 max-[595px]:justify-between items-center">
                          {course?.status === COURSE_STATUS.DRAFT ? (
                            <div className=" bg-richblack-700 flex justify-center items-center text-sm gap-2 px-3 py-1 max-[650px]:text-lg max-[650px]:py-1.5 max-[650px]:h-fit text-pink-100 max-[396px]:text-sm font-bold rounded-full w-fit">
                              <HiClock className="text-[0.9rem] max-[650px]:text-xl max-[396px]:text-[0.9rem] text-pink-50"></HiClock>
                              Drafted
                            </div>
                          ) : (
                            <div className=" bg-richblack-700 flex justify-center items-center text-sm gap-2 px-3 py-1 max-[650px]:text-lg max-[650px]:py-1.5 max-[650px]:h-fit text-yellow-50 max-[396px]:text-sm font-bold rounded-full w-fit">
                              <FaCircleCheck className="text-[0.9rem] max-[650px]:text-xl max-[396px]:text-[0.9rem]"></FaCircleCheck>
                              Published
                            </div>
                          )}

                          <div className="flex min-[1081px]:hidden justify-center items-center font-bold px-1 text-yellow-100 text-xl max-[970px]:text-base max-[720px]:text-lg w-[52.5px]">
                            ₹{course.price}
                          </div>
                        </div>
                        <div className="flex gap-5 max-[970px]:gap-2 max-[650px]:gap-5 max-[595px]:justify-between min-h-11 items-center">
                          <div className="flex max-[970px]:text-sm justify-center items-center min-[1021px]:hidden font-bold px-1 w-fit text-richblack-300 gap-1 max-[650px]:text-base">
                            <HiClock></HiClock>
                            {course.totalDuration
                              ? convertSecondsToDuration(course.totalDuration)
                              : "00h 00m"}
                          </div>

                          <button
                            onClick={() => editBtnHandler(course)}
                            className="flex justify-center items-center font-bold rounded-lg gap-2 py-2 px-4 text-lg min-[650px]:hidden bg-yellow-100 text-black max-[396px]:p-2 h-fit max-[396px]:text-sm"
                          >
                            <HiMiniPencil></HiMiniPencil>
                            Edit
                          </button>
                          <button
                            className="flex justify-center items-center font-bold rounded-full gap-2 p-3 text-xl min-[650px]:hidden bg-richblack-600 text-richblack-50 max-[396px]:p-2 group relative"
                            onClick={() => {
                              setConfirmationModal({
                                text1: "Are You Sure?",
                                text2: "Confirm deletion?",
                                btn1: "Delete Course",
                                btn2: "Cancel",
                                btn1Handler: () => {
                                  deleteBtnHandler(course._id, course.category);
                                },
                                btn2Handler: () => {
                                  setConfirmationModal(null);
                                },
                              });
                            }}
                          >
                            <RiDeleteBin5Fill></RiDeleteBin5Fill>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-[12%] max-[1020px]:hidden max-[1080px]:w-[15%] font-bold px-1 text-richblack-300">
                    {course.totalDuration
                      ? convertSecondsToDuration(course.totalDuration)
                      : "00h 00m"}
                  </div>
                  <div className="flex justify-center items-center w-[8%] font-bold px-1 text-richblack-300 max-[1080px]:hidden">
                    ₹{course.price}
                  </div>
                  <div className="flex justify-center max-[1020px]:w-[13%] max-[835px]:w-[10%] gap-3 max-[700px]:gap-1 items-center w-[10%] font-bold text-richblack-300 text-lg max-[650px]:hidden">
                    <HiMiniPencil
                      className="text-xl hover:cursor-pointer transition-all duration-200 hover:scale-110"
                      onClick={() => editBtnHandler(course)}
                    ></HiMiniPencil>
                    <RiDeleteBin5Fill
                      className="text-xl hover:cursor-pointer transition-all duration-200 hover:scale-110"
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Are You Sure?",
                          text2: "Confirm deletion?",
                          btn1: "Delete Course",
                          btn2: "Cancel",
                          btn1Handler: () => {
                            deleteBtnHandler(course._id, course.category);
                          },
                          btn2Handler: () => {
                            setConfirmationModal(null);
                          },
                        });
                      }}
                    ></RiDeleteBin5Fill>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {confirmationModal && (
        <ConfirmationModal data={confirmationModal}></ConfirmationModal>
      )}
    </div>
  );
};

export default MyCourses;
