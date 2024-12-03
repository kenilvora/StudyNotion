import React, { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import { NavLink } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRatings";

const CourseCard = ({ course, height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgReviewCount(count);
    console.log(course.courseName + " -> " + count + " -> " + course.ratingAndReviews);
  }, [course]);

  return (
    <NavLink to={`/courses/${course._id}`}>
      <div className="flex flex-col text-richblack-5 gap-2 justify-center h-fit">
        <img
          src={course?.thumbnail}
          alt="courseImage"
          className={`aspect-video rounded-lg object-cover w-full border border-richblack-100
              ${height ? height : ""}
          `}
        />

        <div className="font-bold text-xl">{course?.courseName}</div>

        <div className="text-richblack-300">
          Created By: {course?.instructor?.firstName}{" "}
          {course?.instructor?.lastName}
        </div>

        <div className="flex gap-2 items-center text-yellow-100 font-bold">
          {avgReviewCount !== 0 ? avgReviewCount : "0"}
          <RatingStars
            Review_Count={avgReviewCount !== 0 ? avgReviewCount : 0}
            Star_Size={24}
          ></RatingStars>
          <div className="text-richblack-300">
            ( {course?.ratingAndReviews.length} Ratings)
          </div>
        </div>

        <div className="text-lg font-bold">Rs. {course?.price}</div>
      </div>
    </NavLink>
  );
};

export default CourseCard;
