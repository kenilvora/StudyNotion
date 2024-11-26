import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../common/Spinner";
import {
  resetCourseState,
  setCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("publishCourse", true);
    }
  });

  const submitHandler = async (data) => {
    console.log(course);
    console.log(data.publishCourse);
    console.log(course?.status);
    if (data.publishCourse && course?.status === COURSE_STATUS.DRAFT) {
      const formData = new FormData();
      formData.append("courseId", course._id);
      formData.append("status", "Published");
      setLoading(true);
      const result = await editCourseDetails(formData, );
      if (result) {
        dispatch(setCourse(result));
      }
      setLoading(false);
      dispatch(resetCourseState());
      setValue("publishCourse", false);
      navigate("/dashboard/my-courses");
    } else {
      toast.error("Course is Already Published");
      dispatch(resetCourseState());
      navigate("/dashboard/my-courses");
    }
  };

  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="flex flex-col gap-4 bg-richblack-800 p-5 text-richblack-5 justify-center rounded-lg border border-richblack-600">
          <div className="font-bold text-2xl">PublishCourse</div>

          <form
            action="submit"
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-4"
          >
            <label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="publishCourse"
                  autoComplete="on"
                  {...register("publishCourse", { required: true })}
                  className="h-4 w-4 transition duration-150 ease-in-out hover:cursor-pointer"
                />
                <p className=" text-richblack-50 font-semibold text-base flex gap-[0.1rem]">
                  Make this Course Publish
                  <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
                </p>
              </div>
              {errors.publishCourse && (
                <span className="text-richblack-300 opacity-80 text-sm font-bold">
                  Please Tick the Checkbox
                </span>
              )}
            </label>

            <div className="flex gap-3 items-center justify-end">
              <button
                type="button"
                className="bg-blue-200 py-2 px-3 rounded-md text-black font-bold"
                onClick={() => {
                  dispatch(setStep(2));
                }}
              >
                Back
              </button>

              <button
                type="submit"
                className="bg-yellow-100 py-2 px-3 shadow-yellow1 rounded-md text-black font-bold"
              >
                Save and Publish
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default PublishCourse;
