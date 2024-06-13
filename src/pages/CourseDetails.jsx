import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/paymentAPI";
import toast from "react-hot-toast";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import Spinner from "../components/common/Spinner";
import GetAvgRating from "../utils/avgRatings";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from "../services/formatDate";
import { GrLanguage } from "react-icons/gr";
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { ACCOUNT_TYPE } from "../utils/constants";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import CourseContentView from "../components/core/Course/CourseContentView";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isActive, setIsActive] = useState([]);

  const handleBuyCourse = () => {
    if (user && user?.accountType !== ACCOUNT_TYPE.STUDENT) {
      toast.error(`You are an ${user?.accountType},You can not buy Course`);
      return;
    }
    if (token && user && user?.accountType === ACCOUNT_TYPE.STUDENT) {
      buyCourse(user, token, dispatch, navigate, [courseId]);
      return;
    } else if (!token || !user) {
      setConfirmationModal({
        text1: "You are not Logged In.",
        text2: "Please Login to Purchase the Course",
        btn1: "Login",
        btn2: "Cancel",
        position: true,
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  useEffect(() => {
    const getCourseDetails = async () => {
      setLoading(true);
      const res = await fetchCourseDetails(courseId);
      setCourseData(res);
      setLoading(false);
    };
    getCourseDetails();
  }, [courseId]);

  useEffect(() => {
    const count = GetAvgRating(courseData?.courseDetails?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [courseData]);

  useEffect(() => {
    let lectures = 0;
    courseData?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec?.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [courseData]);

  const whatYouWillLearn =
    courseData?.courseDetails?.whatYouWillLearn.split("\n");
  // console.log(whatYouWillLearn);

  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : courseData?.success === false ? (
        <Error></Error>
      ) : paymentLoading ? (
        <div className="relative flex justify-center">
          <Spinner></Spinner>
          <div className="mt-8 absolute top-[52%] text-center text-3xl text-yellow-100 font-bold">
            Please wait, Your payment is being Verified.
          </div>
        </div>
      ) : (
        <div className="flex justify-center flex-col">
          {/* Top Part */}
          <section className="bg-richblack-800 text-richblack-5">
            <div className="w-11/12 max-w-maxContent max-[951px]:flex max-[951px]:flex-col-reverse items-center mx-auto relative">
              <div className="flex min-[951px]:max-w-[65%] flex-col justify-center gap-3 my-12 min-[951px]:border-r border-richblack-600">
                <div className="text-richblack-300">
                  <span
                    className="hover:underline hover:cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </span>{" "}
                  / Learning /{" "}
                  <span className="text-yellow-100 font-bold">
                    {courseData?.courseDetails?.category?.name}
                  </span>
                </div>
                <div className="text-3xl font-bold max-[510px]:text-xl">
                  {courseData?.courseDetails?.courseName}
                </div>
                <div className="text-richblack-300 max-[510px]:text-sm">
                  {courseData?.courseDetails?.courseDescription}
                </div>
                <div className="flex max-[510px]:flex-col min-[510px]:items-center gap-2">
                  <div className="flex gap-2 items-center">
                    <div className="text-yellow-100 flex items-center gap-2">
                      <div>{avgReviewCount || 4.5}</div>
                      <RatingStars
                        Review_Count={avgReviewCount || "4.5"}
                        Star_Size={24}
                      ></RatingStars>
                    </div>
                    <div>
                      ( {courseData?.courseDetails?.ratingAndReviews.length}{" "}
                      Reviews )
                    </div>
                  </div>
                  <div>
                    {courseData?.courseDetails?.studentsEnrolled.length}{" "}
                    Enrolled Student(s)
                  </div>
                </div>
                <div>
                  Created By :{" "}
                  <span className=" font-semibold">
                    {courseData?.courseDetails?.instructor?.firstName}{" "}
                    {courseData?.courseDetails?.instructor?.lastName}
                  </span>
                </div>
                <div className="flex gap-5 min-[410px]:items-center max-[410px]:flex-col">
                  <div>
                    Created At:{" "}
                    {formatDate(courseData?.courseDetails?.createdAt)}
                  </div>
                  <div className="flex gap-1 items-center">
                    <GrLanguage></GrLanguage>
                    Hinglish
                  </div>
                </div>
              </div>

              {/* Course Details Card */}
              <CourseDetailsCard
                courseData={courseData}
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse={handleBuyCourse}
                avgReviewCount={avgReviewCount}
              ></CourseDetailsCard>
            </div>
          </section>

          <section className="w-11/12 max-w-maxContent mx-auto my-10">
            <div className="min-[951px]:max-w-[65%] border border-richblack-600 p-8 max-[500px]:p-3 flex flex-col gap-3">
              <div className="text-richblack-5 font-bold text-3xl max-[500px]:text-xl">
                What You'll Learn
              </div>
              <ul className="text-richblack-300 flex flex-col space-y-2 text-sm max-[500px]:text-xs pl-3 font-bold">
                {whatYouWillLearn &&
                  whatYouWillLearn.map((point, index) => {
                    return (
                      <li key={index} className="list-disc">
                        {point}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </section>

          <section className="w-11/12 max-w-maxContent mx-auto mb-10">
            <div className="min-[951px]:max-w-[65%] flex flex-col gap-2 justify-center">
              <div className="text-3xl text-richblack-5 font-bold">
                Course Content
              </div>
              <div className="flex w-full justify-between items-end">
                <ul className="flex max-[555px]:flex-col m-0 max-[555px]:items-start min-[555px]:space-x-6 max-[620px]:text-sm list-disc text-richblack-300 pl-4 max-[555px]:text-base max-[400px]:text-[0.8rem] max-[400px]:leading-[1.2rem]">
                  <ul className="flex space-x-6 list-disc max-[555px]:space-x-10 max-[555px]:w-full max-[430px]:flex-col max-[430px]:space-x-0">
                    <li>
                      {courseData?.courseDetails?.courseContent.length}{" "}
                      Section(s)
                    </li>
                    <li>{totalNoOfLectures} Lecture(s)</li>
                  </ul>
                  <li>{courseData?.totalDuration} Total Length</li>
                </ul>
                <button
                  className="text-yellow-100 font-bold max-[620px]:text-sm max-[400px]:text-xs"
                  onClick={() => setIsActive([])}
                >
                  Collapse All Sections
                </button>
              </div>

              <div className="flex flex-col mt-3 justify-center border border-richblack-600 divide-y divide-richblack-600">
                {courseData?.courseDetails?.courseContent.map(
                  (section, index) => {
                    return (
                      <CourseContentView
                        section={section}
                        key={index}
                        isActive={isActive}
                        setIsActive={setIsActive}
                      ></CourseContentView>
                    );
                  }
                )}
              </div>
            </div>
          </section>

          <section className="w-11/12 max-w-maxContent mx-auto mb-10">
            <div className="min-[951px]:max-w-[65%] flex flex-col gap-3 justify-center">
              <div className=" text-2xl font-bold text-richblack-5">Author</div>
              <div className="flex gap-3 items-center">
                <img
                  src={courseData?.courseDetails?.instructor?.image}
                  alt="intructorImage"
                  className="w-16 rounded-full max-[650px]:w-10"
                />
                <div className="text-richblack-5 font-bold text-2xl max-[650px]:text-lg">
                  {courseData?.courseDetails?.instructor?.firstName}{" "}
                  {courseData?.courseDetails?.instructor?.lastName}
                </div>
              </div>
              <div className="text-richblack-100 max-[650px]:text-sm">
                {
                  courseData?.courseDetails?.instructor?.additionalDetails
                    ?.about
                }
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6 w-11/12 max-w-maxContent mx-auto mt-10 mb-20">
            <div className=" text-4xl text-richblack-5 font-bold text-center">
              Reviews From Other Learners
            </div>
            <ReviewSlider></ReviewSlider>
          </section>

          <Footer></Footer>
        </div>
      )}

      {confirmationModal ? (
        <ConfirmationModal data={confirmationModal}></ConfirmationModal>
      ) : (
        ""
      )}
    </>
  );
};

export default CourseDetails;
