import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import Spinner from "../../common/Spinner";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();

  const { courseEntireData, courseSectionData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [markLectureLoading, setMarkLectureLoading] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    let timer;
    if (showPlayIcon) {
      timer = setTimeout(() => {
        setShowPlayIcon(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showPlayIcon]);

  const handleVideoClick = () => {
    if (!videoEnded) {
      setShowPlayIcon(true);
      setIsPlay(!isPlay);
    }
  };

  useEffect(() => {
    const setVideoDetails = async () => {
      if (!courseSectionData.length) {
        return;
      }

      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-course");
      } else {
        setLoading(true);
        const filteredSection = courseSectionData.filter(
          (section) => section._id === sectionId
        );

        const filteredSubSection = filteredSection?.[0]?.subSection.filter(
          (subSection) => subSection._id === subSectionId
        );

        setVideoData(filteredSubSection[0]);
        setLoading(false);
        setVideoEnded(false);
      }
    };

    setVideoDetails();
  }, [courseEntireData, courseSectionData, location.pathname]);

  useEffect(() => {
    const videoElement = playerRef.current.getInternalPlayer();
    if (videoElement) {
      videoElement.setAttribute("controlsList", "nodownload");
    }
    setIsPlay(false);
    setVideoEnded(false);
  }, [videoData, playerRef]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex]?.subSection.length;

    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex]?.subSection.length;

    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    // Same Section & Next Video
    if (currentSubSectionIndex !== noOfSubSections - 1) {
      const nextSubSectionId =
        courseSectionData?.[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex + 1
        ]._id;
      navigate(
        `/view-course/${courseEntireData._id}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData?.[currentSectionIndex + 1]?._id;
      const firstSubSectionId =
        courseSectionData?.[currentSectionIndex + 1]?.subSection?.[0]._id;

      navigate(
        `/view-course/${courseEntireData._id}/section/${nextSectionId}/sub-section/${firstSubSectionId}`
      );
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    // Same Section & Prev Video
    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionData?.[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex - 1
        ]._id;
      navigate(
        `/view-course/${courseEntireData._id}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData?.[currentSectionIndex - 1]?._id;
      const noOfSubSections =
        courseSectionData?.[currentSectionIndex - 1]?.subSection.length;
      const lastSubSectionId =
        courseSectionData?.[currentSectionIndex - 1]?.subSection?.[
          noOfSubSections - 1
        ]._id;

      navigate(
        `/view-course/${courseEntireData._id}/section/${prevSectionId}/sub-section/${lastSubSectionId}`
      );
    }
  };

  const handleLectureCompleted = async () => {
    setMarkLectureLoading(true);
    try {
      const res = await markLectureAsComplete({
        courseId: courseId,
        subSectionId: subSectionId,
      });
      if (res) {
        dispatch(updateCompletedLectures(subSectionId));
      }
    } catch (error) {
      console.log("Mark As Completed Lecture Api Error");
    }
    setMarkLectureLoading(false);
  };

  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="flex flex-col gap-8 max-[1000px]:h-[83vh] max-[860px]:h-[75vh]">
          {!videoData ? (
            <div className="flex flex-col items-center justify-center rounded-xl border p-2 border-richblack-700">
              <p className="text-2xl text-center font-edu-sa font-bold hover:text-yellow-100">
                Video Not Found!
              </p>
            </div>
          ) : (
            <div
              className="text-richblack-5 relative w-fit"
              onClick={handleVideoClick}
            >
              <ReactPlayer
                ref={playerRef}
                playsinline={true}
                controls={true}
                url={videoData?.videoUrl}
                width="100%"
                height="100%"
                onEnded={() => {
                  setIsPlay(false);
                  setVideoEnded(true);
                }}
                onBuffer={() => setIsPlay(false)}
                onBufferEnd={() => setIsPlay(true)}
              />

              {/* Play and Pause Icon */}
              {showPlayIcon && (
                <div
                  className={`bg-richblack-400 bg-opacity-55 opacity-0 p-4 rounded-full absolute top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center
                transition-all duration-700 ${showPlayIcon ? "opacity-100" : ""}
              `}
                >
                  {isPlay ? (
                    <FaPlay className="text-2xl text-richblack-5" />
                  ) : (
                    <FaPause className="text-2xl text-richblack-5" />
                  )}
                </div>
              )}

              {videoEnded && (
                <div
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                  }}
                  className="full absolute inset-0 z-[20] grid h-full place-content-center font-inter"
                >
                  {!completedLectures.includes(subSectionId) && (
                    <button
                      className="absolute text-lg z-20 top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-100 text-black font-bold px-4 py-2 
                      rounded-md max-[700px]:px-2 max-[700px]:py-1 max-[700px]:text-sm max-[500px]:text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLectureCompleted();
                      }}
                    >
                      {markLectureLoading ? "Loading..." : "Mark As Completed"}
                    </button>
                  )}

                  <button
                    className="absolute text-lg z-20 top-[58%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-richblack-700 text-richblack-5 font-bold px-4 py-2 
                    rounded-md max-[700px]:px-2 max-[700px]:py-1 max-[700px]:text-sm max-[500px]:text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (playerRef?.current) {
                        playerRef?.current?.seekTo(0);
                        setVideoEnded(false);
                        const internalPlayer =
                          playerRef.current.getInternalPlayer();
                        internalPlayer.play();
                        setIsPlay(true);
                      }
                    }}
                  >
                    Rewatch
                  </button>

                  <div className="absolute text-lg z-20 top-[78%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-10">
                    {!isFirstVideo() && (
                      <button
                        className="bg-yellow-100 text-black font-bold px-4 py-2 
                        rounded-md max-[700px]:px-2 max-[700px]:py-1 max-[700px]:text-sm max-[500px]:text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToPrevVideo();
                        }}
                      >
                        Previous
                      </button>
                    )}

                    {!isLastVideo() && (
                      <button
                        className="bg-richblack-700 text-richblack-5 font-bold px-4 py-2 
                        rounded-md max-[700px]:px-2 max-[700px]:py-1 max-[700px]:text-sm max-[500px]:text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToNextVideo();
                        }}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col justify-center gap-3">
            <div className="text-richblack-5 font-bold text-3xl max-[600px]:text-2xl">
              {videoData?.title}
            </div>
            <div className="text-richblack-300">{videoData?.description}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoDetails;
