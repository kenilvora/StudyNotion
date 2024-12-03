import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../common/Spinner";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import DragAndDropInput from "../DragAndDropInput";
import ChipInput from "./ChipInput";
import CourseInstructionInput from "./CourseInstructionInput";
import { FaAngleRight } from "react-icons/fa6";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";

const CourseInformationForm = () => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { course, editCourse } = useSelector((state) => state.course);

  const getCategories = async () => {
    try {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCategory(categories);
      }
    } catch (error) {
      console.log("Error in getCategories -> ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (editCourse && course) {
      setValue("courseName", course?.courseName);
      setValue("courseDescription", course?.courseDescription);
      setValue("coursePrice", course?.price);
      setValue("courseCategory", course?.category);
      setValue("courseTags", course?.tag);
      setValue("courseThumbnail", course?.thumbnail);
      setValue("courseBenefites", course?.whatYouWillLearn);
      setValue("courseInstructions", course?.instructions);
    } else if (!editCourse && !course) {
      reset();
    }
  }, [editCourse]);

  const isFormUpdated = () => {
    const currValues = getValues();

    if (
      currValues.courseName !== course?.courseName ||
      currValues.courseDescription !== course?.courseDescription ||
      currValues.coursePrice !== course?.price ||
      currValues.courseCategory !== course?.category ||
      currValues.courseTags.toString() !== course?.tag.toString() ||
      currValues.courseThumbnail !== course?.thumbnail ||
      currValues.courseBenefites !== course?.whatYouWillLearn ||
      currValues.courseInstructions.toString() !==
        course?.instructions.toString()
    ) {
      return true;
    }
  };

  // handles next btn click
  const formSubmitHandler = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const formData = new FormData();
        formData.append("courseId", course?._id);
        if (data.courseName !== course?.courseName) {
          formData.append("courseName", data.courseName);
        }
        if (data.courseDescription !== course?.courseDescription) {
          formData.append("courseDescription", data.courseDescription);
        }
        if (data.coursePrice !== course?.price) {
          formData.append("price", data.coursePrice);
        }
        if (data.courseCategory !== course?.category) {
          formData.append("category", data.courseCategory);
        }
        if (data.courseTags.toString() !== course?.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (data.courseThumbnail !== course?.thumbnail) {
          formData.append("thumbnailImage", data.courseThumbnail);
        }
        if (data.courseBenefites !== course?.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefites);
        }
        if (
          data.courseInstructions.toString() !== course?.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseInstructions)
          );
        }
        try {
          setLoading(true);
          const result = await editCourseDetails(formData);
          if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
          }
        } catch (error) {
          console.log("Error in editCourseDetails -> ", error);
        } finally {
          setLoading(false);
        }
      } else {
        toast.error("No Changes Made to the Form");
      }
      return;
    }

    // create a new Course
    const formData = new FormData();
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.coursePrice);
    formData.append("category", data.courseCategory);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("thumbnailImage", data.courseThumbnail);
    formData.append("whatYouWillLearn", data.courseBenefites);
    formData.append("instructions", JSON.stringify(data.courseInstructions));
    formData.append("status", COURSE_STATUS.DRAFT);

    try {
      setLoading(true);
      const result = await addCourseDetails(formData);
      if (result) {
        dispatch(setStep(2));
        dispatch(setCourse(result));
      }
    } catch (error) {
      console.log("Error in addCourseDetails -> ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="flex select-none flex-col gap-4 bg-richblack-800 p-5 text-richblack-5 justify-center rounded-lg border border-richblack-600">
          <form
            action="submit"
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(formSubmitHandler)}
          >
            {/* Course Name */}
            <label>
              <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
                Course Name
                <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
              </p>
              <input
                type="text"
                placeholder="Enter Course Name"
                name="courseName"
                autoComplete="on"
                {...register("courseName", { required: true })}
                className="bg-richblack-700 text-base p-[0.6rem] rounded-lg text-richblack-200 shadow-input w-full"
              />
              {errors.courseName && (
                <span className="text-richblack-300 opacity-80 text-sm font-bold">
                  Please Enter Course Name
                </span>
              )}
            </label>

            {/* Course Description */}
            <label>
              <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
                Course Description
                <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
              </p>
              <textarea
                placeholder="Enter Course Description"
                name="courseDescription"
                autoComplete="on"
                {...register("courseDescription", { required: true })}
                className="bg-richblack-700 text-base p-[0.6rem] resize-none rounded-lg min-h-28 text-richblack-200 shadow-input w-full"
              />
              {errors.courseDescription && (
                <span className="text-richblack-300 opacity-80 text-sm font-bold">
                  Please Enter Course Description
                </span>
              )}
            </label>

            {/* Course Price */}
            <label>
              <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
                Price
                <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
              </p>
              <div className="relative">
                <RiMoneyRupeeCircleLine className="text-richblack-300 absolute text-2xl top-[24%] left-2"></RiMoneyRupeeCircleLine>
                <input
                  type="number"
                  placeholder="Enter Course Price"
                  name="coursePrice"
                  autoComplete="on"
                  {...register("coursePrice", {
                    required: {
                      value: true,
                      message: "Please Enter Course Price",
                    },
                    maxLength: {
                      value: 4,
                      message: "Price must be less than 10,000₹",
                    },
                  })}
                  className="bg-richblack-700 text-base p-[0.6rem] pl-10 rounded-lg text-richblack-200 shadow-input w-full"
                />
              </div>
              {errors.coursePrice && (
                <span className="text-richblack-300 opacity-80 text-sm font-bold">
                  {errors.coursePrice.message}
                </span>
              )}
            </label>

            {/* Course Category*/}
            <label>
              <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
                Course Category
                <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
              </p>
              <select
                name="courseCategory"
                {...register("courseCategory", { required: true })}
                className={`bg-richblack-700 w-full text-base py-1 px-1 text-richblack-200 rounded-lg shadow-input h-[2.7rem]`}
                defaultValue={""}
              >
                <option value="" disabled>
                  Choose a Category
                </option>
                {category.map((category, index) => (
                  <option value={category._id} key={index}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.courseCategory && (
                <span className="text-richblack-300 opacity-80 text-sm font-bold">
                  Please Choose a Category
                </span>
              )}
            </label>

            {/* Course Tags*/}
            <ChipInput
              name="courseTags"
              register={register}
              setValue={setValue}
              getValues={getValues}
              errors={errors}
              clearErrors={clearErrors}
            ></ChipInput>

            {/* Course Thubnail*/}
            <DragAndDropInput
              name="courseThumbnail"
              label="Course Thumbnail"
              register={register}
              setValue={setValue}
              errors={errors}
              clearErrors={clearErrors}
              video={false}
            ></DragAndDropInput>

            {/* Course Benefits*/}
            <label>
              <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
                Benefits of the Course
                <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
              </p>
              <textarea
                placeholder="Enter Benefits of the Course"
                name="courseBenefites"
                autoComplete="on"
                {...register("courseBenefites", { required: true })}
                className="bg-richblack-700 text-base p-[0.6rem] resize-none rounded-lg min-h-28 text-richblack-200 shadow-input w-full"
              />
              {errors.courseBenefites && (
                <span className="text-richblack-300 opacity-80 text-sm font-bold">
                  Please Enter Benefits of the Course
                </span>
              )}
            </label>

            {/* Course Instruction */}
            <CourseInstructionInput
              name="courseInstructions"
              register={register}
              setValue={setValue}
              getValues={getValues}
              clearErrors={clearErrors}
              errors={errors}
            ></CourseInstructionInput>

            <div
              className={`flex gap-2 justify-end
                ${
                  editCourse
                    ? " max-[505px]:flex-col max-[1012px]:text-sm max-[980px]:text-base"
                    : ""
                }
            `}
            >
              {editCourse && (
                <button
                  type="button"
                  className="text-richblack-800 font-bold bg-blue-50 py-2 px-4 rounded-lg"
                  onClick={() => {
                    dispatch(setStep(2));
                  }}
                >
                  Continue Without Saving
                </button>
              )}
              <button
                type="submit"
                className="text-richblack-800 flex justify-center items-center gap-1 font-bold bg-yellow-100 py-2 px-4 rounded-lg"
              >
                {editCourse ? "Save Changes" : "Next"}{" "}
                <FaAngleRight></FaAngleRight>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CourseInformationForm;
