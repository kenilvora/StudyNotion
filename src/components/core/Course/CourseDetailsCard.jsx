import React from "react";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { FaShareFromSquare } from "react-icons/fa6";
import { GiArrowCursor } from "react-icons/gi";
import { MdOutlineMobileFriendly, MdOutlineWatchLater } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../slices/cartSlice";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";
import { ACCOUNT_TYPE } from "../../../utils/constants";

const CourseDetailsCard = ({
  courseData,
  setConfirmationModal,
  handleBuyCourse,
  avgReviewCount,
}) => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    if (user && user?.accountType !== ACCOUNT_TYPE.STUDENT) {
      toast.error(
        `You are an ${user?.accountType},You can not add Course to the Cart`
      );
      return;
    }
    if (token && user && user?.accountType === ACCOUNT_TYPE.STUDENT) {
      dispatch(
        addToCart({
          ...courseData?.courseDetails,
          avgReviewCount,
        })
      );
      return;
    } else if (!token || !user) {
      setConfirmationModal({
        text1: "You are not Logged In.",
        text2: "Please Login to Add the Course in the Cart",
        btn1: "Login",
        btn2: "Cancel",
        position: true,
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  const handelShare = () => {
    copy(window.location.href);
    toast.success("Link Copied to Clipboard");
  };

  return (
    <div className="flex flex-shrink-0 flex-col bg-richblack-700 w-[95%] min-[500px]:w-[80%] min-[951px]:w-[32%] min-[951px]:absolute top-0 right-0 min-[951px]:max-w-[380px] rounded-xl px-4 py-5 justify-center transition-all duration-300 hover:scale-105 hover:shadow-card max-[951px]:mt-10">
      <img
        src={courseData?.courseDetails?.thumbnail}
        alt="courseThumbnail"
        className=" rounded-xl object-cover aspect-video"
      />

      <div className="flex flex-col gap-3 justify-center px-3 pt-6">
        {/* Course Price */}
        <div className="text-3xl font-bold">
          Rs. {courseData?.courseDetails?.price}
        </div>

        {/* Course Buying/Go to Cart/Go to Course btn */}
        <div className="flex flex-col gap-3 items-center justify-center">
          {user &&
          courseData?.courseDetails?.studentsEnrolled.includes(user?._id) ? (
            <button
              className="bg-yellow-100 text-black font-bold text-xl py-2 rounded-lg w-full shadow-yellow1"
              onClick={() => navigate("/dashboard/enrolled-courses")}
            >
              Go To Course
            </button>
          ) : (
            <>
              <button
                className="bg-yellow-100 text-black font-bold text-xl py-2 rounded-lg w-full shadow-yellow1"
                onClick={handleBuyCourse}
              >
                Buy Now
              </button>
              <button
                className="bg-richblack-800 text-white font-bold py-2 text-xl w-full rounded-lg shadow-black3"
                onClick={addToCartHandler}
              >
                Add To Cart
              </button>
            </>
          )}
        </div>

        {/* Guarantee Text */}
        <div className="text-richblack-50 font-semibold text-sm text-center max-[951px]:text-lg max-[600px]:text-sm">
          30-Days Money-Back Guarantee
        </div>

        {/* Course Instrtuctions */}
        <div className="flex flex-col gap-2 max-[951px]:text-lg max-[600px]:text-base">
          <div className=" text-richblack-5">This course includes :</div>
          <div className="flex flex-col gap-2 text-sm max-[951px]:text-lg text-caribbeangreen-100 font-bold max-[600px]:text-sm">
            <div className="flex items-center gap-2">
              <MdOutlineWatchLater></MdOutlineWatchLater>
              {courseData?.totalDuration} On-Demand Video
            </div>
            <div className="flex items-center gap-2">
              <GiArrowCursor></GiArrowCursor>
              Full Lifetime Access
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineMobileFriendly></MdOutlineMobileFriendly>
              Access on Mobile and TV
            </div>
            <div className="flex items-center gap-2">
              <BsFileEarmarkCheck className="relative left-[1px] font-extrabold"></BsFileEarmarkCheck>
              Cerificate of Completion
            </div>
          </div>
        </div>

        {/* Share btn */}
        <div className="my-2 flex justify-center">
          <button
            className="text-yellow-100 flex gap-2 items-center font-bold text-xl max-[951px]:text-2xl w-fit max-[600px]:text-xl"
            onClick={handelShare}
          >
            <FaShareFromSquare></FaShareFromSquare>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
