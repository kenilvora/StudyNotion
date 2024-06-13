import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../common/Spinner";
import { RxCross2 } from "react-icons/rx";
import DragAndDropInput from "../DragAndDropInput";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureVideo", modalData?.videoUrl);
      setValue("lectureTitle", modalData?.title);
      setValue("lectureDesc", modalData?.description);
    }
  });

  const isFormUpdated = () => {
    const currValues = getValues();

    if (
      currValues.lectureTitle !== modalData.title ||
      currValues.lectureDesc !== modalData.description ||
      currValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const submitHandler = async (data) => {
    if (view) {
      return;
    }

    if (edit) {
      if (isFormUpdated()) {
        const formData = new FormData();
        formData.append("courseId", course._id);
        formData.append("subSectionId", modalData._id);
        if (data.lectureTitle !== modalData.title) {
          formData.append("title", data.lectureTitle);
        }
        if (data.lectureDesc !== modalData.description) {
          formData.append("description", data.lectureDesc);
        }
        if (data.lectureVideo !== modalData.videoUrl) {
          formData.append("video", data.lectureVideo);
        }

        setLoading(true);
        const result = await updateSubSection(formData, token);
        if (result) {
          dispatch(setCourse(result));
          setModalData(null);
        }
        setLoading(false);
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    if (add) {
      const formData = new FormData();
      formData.append("courseId", course._id);
      formData.append("sectionId", modalData);
      formData.append("title", data.lectureTitle);
      formData.append("description", data.lectureDesc);
      formData.append("videoFile", data.lectureVideo);

      setLoading(true);
      const result = await createSubSection(formData, token);
      if (result) {
        console.log(result);
        dispatch(setCourse(result));
        setModalData(null);
      }
      setLoading(false);
      return;
    }
  };

  return (
    <>
      {loading ? (
        <div className="bg-richblack-500 bg-opacity-55 z-50 flex justify-center items-center w-screen min-h-screen absolute left-0 -top-[3.6rem] modalbg">
          <Spinner></Spinner>
        </div>
      ) : (
        <div className="bg-richblack-500 bg-opacity-55 z-50 flex justify-center items-center w-screen min-h-screen absolute left-0 -top-[3.6rem] modalbg">
          <div className="bg-richblack-800 text-richblack-5 border border-richblack-200 rounded-lg flex flex-col gap-4 w-[40%] max-w-[600px] min-w-[280px]">
            <div className=" bg-richblack-700 rounded-t-lg p-5 pb-3 max-[930px]:p-3 font-bold text-xl flex justify-between w-full">
              {add
                ? "Create Lecture"
                : view
                ? "Viewing Lecture"
                : edit
                ? "Editing Lecture"
                : ""}
              <button
                onClick={() => setModalData(null)}
                className="rounded-full hover:bg-richblack-400 hover:bg-opacity-55 px-2 py-2"
              >
                <RxCross2></RxCross2>
              </button>
            </div>

            <form
              action="submit"
              className="flex flex-col justify-center gap-3 p-6 min-[931px]:pt-2 max-[930px]:p-3"
              onSubmit={handleSubmit(submitHandler)}
            >
              <DragAndDropInput
                name="lectureVideo"
                label="Lecture Video"
                register={register}
                setValue={setValue}
                errors={errors}
                clearErrors={clearErrors}
                video={true}
                view={view}
                edit={edit}
                data={(view || edit) && modalData.videoUrl}
              ></DragAndDropInput>

              {/* Lecture Title */}
              <label>
                <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
                  Lecture Title
                  <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
                </p>
                <input
                  type="text"
                  placeholder="Enter Lecture Title"
                  name="lectureTitle"
                  autoComplete="on"
                  disabled={view}
                  {...register("lectureTitle", { required: true })}
                  className="bg-richblack-700 text-base p-[0.6rem] rounded-lg text-richblack-200 shadow-input w-full"
                />
                {errors.lectureTitle && (
                  <span className="text-richblack-300 opacity-80 text-sm font-bold">
                    Please Enter Lecture Title
                  </span>
                )}
              </label>

              {/* Lecture TimeDuration */}
              {/* <div className="flex gap-3"></div> */}

              {/* Lecture Description */}
              <label>
                <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
                  Lecture Description
                  <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
                </p>
                <textarea
                  placeholder="Enter Lecture Description"
                  name="lectureDesc"
                  autoComplete="on"
                  disabled={view}
                  {...register("lectureDesc", { required: true })}
                  className="bg-richblack-700 text-base p-[0.6rem] resize-none rounded-lg min-h-28 text-richblack-200 shadow-input w-full"
                />
                {errors.lectureDesc && (
                  <span className="text-richblack-300 opacity-80 text-sm font-bold">
                    Please Enter Lecture Description
                  </span>
                )}
              </label>

              {!view && (
                <div className="flex gap-3 items-center justify-end">
                  {edit && (
                    <button
                      type="button"
                      className="bg-richblack-700 py-2 px-3 rounded-md bg-opacity-65 text-richblack-5 font-bold shadow-black3"
                      onClick={() => setModalData(null)}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-yellow-100 py-2 px-3 shadow-yellow1 rounded-md text-black font-bold"
                  >
                    {edit ? "Save Edit" : "Create"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SubSectionModal;
