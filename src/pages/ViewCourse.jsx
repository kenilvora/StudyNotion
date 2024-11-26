import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import Spinner from "../components/common/Spinner";

const ViewCourse = () => {
  const { courseId } = useParams();
  const [reviewModal, setReviewModal] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    console.log("View Course Page Render");
    const getFullCourseDetails = async () => {
      setLoading(true);
      try {
        const courseData = await getFullDetailsOfCourse(courseId);
        dispatch(setEntireCourseData(courseData?.courseDetails));
        dispatch(
          setCourseSectionData(courseData?.courseDetails?.courseContent)
        );
        dispatch(setTotalNoOfLectures(courseData?.totalNoOfLectures));
        dispatch(setCompletedLectures(courseData?.completedVideos));
      } catch (error) {
        console.log("Could Not Get Full Course Details ...", error);
      }
      setLoading(false);
    };

    getFullCourseDetails();
  }, []);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("contextmenu", handleContextMenu);
    }
    return () => {
      if (container) {
        container.removeEventListener("contextmenu", handleContextMenu);
      }
    };
  }, [containerRef, containerRef.current]);

  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div
          className="relative flex min-h-[calc(100vh-3.6rem)]"
          ref={containerRef}
        >
          <VideoDetailsSidebar
            setReviewModal={setReviewModal}
          ></VideoDetailsSidebar>

          <div className="h-[calc(100vh-3.6rem)] flex-1 w-full overflow-auto">
            <div className="w-11/12 max-w-[1150px] min-[1001px]:mx-auto py-8 max-[1000px]:ml-8 max-[860px]:ml-0 max-[860px]:mt-12">
              <Outlet></Outlet>
            </div>
          </div>

          {reviewModal && (
            <CourseReviewModal
              setReviewModal={setReviewModal}
            ></CourseReviewModal>
          )}
        </div>
      )}
    </>
  );
};

export default ViewCourse;
