import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../../../../common/Spinner";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleRight } from "react-icons/fa6";
import NestedView from "./NestedView";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";

const CourseBuilderForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { course } = useSelector((state) => state.course);

  const [loading, setLoading] = useState(false);
  const [editSectionId, setEditSectionId] = useState(null); // Contains SectionID
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
  };

  const goNext = () => {
    if (!course?.courseContent || course?.courseContent.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }
    if (
      course?.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one Lecture in the section");
      return;
    }
    dispatch(setStep(3));
  };

  const cancelEdit = () => {
    setEditSectionId(null);
    setValue("courseSectionName", null);
  };

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      let result;

      if (editSectionId) {
        result = await updateSection({
          sectionName: data.courseSectionName,
          sectionId: editSectionId,
          courseId: course._id,
        });
      } else {
        result = await createSection({
          sectionName: data.courseSectionName,
          courseId: course._id,
        });
      }

      // update course
      if (result) {
        dispatch(setCourse(result));
        setEditSectionId(null);
        setValue("courseSectionName", null);
      }
    } catch (error) {
      console.log("Error in Submitting Section Name -> ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionId === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionId(sectionId);
    setValue("courseSectionName", sectionName);
  };

  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="flex flex-col gap-4 bg-richblack-800 p-5 text-richblack-5 justify-center rounded-lg border border-richblack-600">
          <div className="font-bold text-2xl">Course Builder</div>
          <form
            action="submit"
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-4"
          >
            <label>
              <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
                Section Name
                <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
              </p>
              <input
                type="text"
                placeholder="Add a Section to build your course"
                name="courseSectionName"
                autoComplete="on"
                {...register("courseSectionName", { required: true })}
                className="bg-richblack-700 text-base p-[0.6rem] rounded-lg text-richblack-200 shadow-input w-full"
              />
              {errors.courseSectionName && (
                <span className="text-richblack-300 opacity-80 text-sm font-bold">
                  Please Enter Course Section Name
                </span>
              )}
            </label>

            <div className="flex gap-3 items-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-yellow-100 font-bold border border-yellow-100 border-l-richblack-200 border-b-richblack-200 flex gap-2 items-center text-lg w-fit"
              >
                <AiOutlinePlusCircle className="text-xl"></AiOutlinePlusCircle>
                {editSectionId ? "Edit Section Name" : "Create Section"}
              </button>

              {editSectionId && (
                <div
                  className="text-sm underline hover:cursor-pointer hover:text-yellow-100 text-richblack-300"
                  onClick={cancelEdit}
                >
                  Cancel Edit
                </div>
              )}
            </div>
          </form>

          {course?.courseContent.length > 0 && (
            <NestedView
              handleChangeEditSectionName={handleChangeEditSectionName}
            ></NestedView>
          )}

          <div className="flex gap-2 text-richblack-900 justify-end font-bold">
            <button
              type="button"
              className="bg-blue-50 py-2 px-4 rounded-lg"
              onClick={goBack}
            >
              Back
            </button>

            <button
              type="button"
              className="flex items-center gap-1 bg-yellow-100 py-2 px-4 rounded-lg"
              onClick={goNext}
            >
              Next
              <FaAngleRight></FaAngleRight>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseBuilderForm;
