import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";
import { useParams } from "react-router-dom";
import { createRating } from "../../../services/operations/courseDetailsAPI";
import Spinner from "../../common/Spinner";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseReview", "");
    setValue("courseRating", 0);
  }, []);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createRating(
        {
          courseId: courseId,
          rating: data.courseRating,
          review: data.courseReview,
        },
        token
      );
    } catch (error) {
      console.log("Error while creating reating and review");
    }
    setLoading(false);
    setReviewModal(false);
  };

  return (
    <>
      <div className="w-screen min-h-screen z-50 flex justify-center items-center left-0 select-none absolute -top-[3.6rem] bg-richblack-500 bg-opacity-45 modalbg">
        {loading ? (
          <div>
            <Spinner></Spinner>
          </div>
        ) : (
          <div
            className="bg-richblack-700 border border-richblack-200 rounded-lg flex flex-col flex-wrap 
                    max-w-[650px] w-[650px] justify-center"
          >
            <div
              className="flex text-richblue-5 font-bold text-xl items-center w-full justify-between 
                  px-5 py-4"
            >
              <div>Add Review</div>
              <RxCross2
                onClick={() => setReviewModal(false)}
                className="hover:cursor-pointer text-2xl"
              ></RxCross2>
            </div>

            <div className="bg-richblack-800 rounded-b-lg flex flex-col w-full py-6 px-10 justify-center gap-5">
              <div className="flex items-center justify-center gap-3">
                <img
                  src={user?.image}
                  alt="userImage"
                  className="w-14 aspect-square rounded-full object-cover"
                />
                <div className="flex flex-col justify-center text-richblack-5">
                  <div className="font-bold text-lg">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-sm">Posting Publicaly</div>
                </div>
              </div>

              <form
                action="submit"
                className="flex flex-col gap-1 justify-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex justify-center">
                  <ReactStars
                    count={5}
                    size={32}
                    isHalf={true}
                    onChange={ratingChanged}
                    emptyIcon={<TiStarOutline></TiStarOutline>}
                    halfIcon={<TiStarHalfOutline></TiStarHalfOutline>}
                    filledIcon={<TiStarFullOutline></TiStarFullOutline>}
                    activeColor="#ffd700"
                  />
                </div>

                <label>
                  <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
                    Add Your Experience
                    <sup className="text-pink-200 text-base top-[-0.1rem]">
                      *
                    </sup>
                  </p>
                  <textarea
                    placeholder="Add Your Experience"
                    name="courseReview"
                    autoComplete="on"
                    {...register("courseReview", { required: true })}
                    className="bg-richblack-700 text-base p-[0.6rem] resize-none rounded-lg min-h-28 text-richblack-200 shadow-input w-full"
                  />
                  {errors.courseReview && (
                    <span className="text-richblack-300 opacity-80 text-sm font-bold">
                      Please Add Your Review
                    </span>
                  )}
                </label>

                <div className="flex justify-end gap-3 items-center mt-3">
                  <button
                    type="button"
                    className="bg-richblue-100 py-1.5 px-4 rounded-md bg-opacity-65 text-black 
                font-bold"
                    onClick={() => setReviewModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-yellow-100 py-1.5 px-4 shadow-yellow1 rounded-md text-black font-bold"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseReviewModal;
