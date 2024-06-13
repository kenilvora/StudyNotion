import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";

import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";
import RatingStars from "./RatingStars";

const ReviewSlider = () => {
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const getAllReviews = async () => {
      try {
        const res = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );

        const { data } = res;

        if (data?.success) {
          setAllReviews(data?.data);
        }
      } catch (error) {
        console.log("Error while fetching all ratings and reviews ", error);
      }
    };

    getAllReviews();
  }, []);

  return (
    <div>
      {allReviews ? (
        <Swiper
          spaceBetween={20}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 2,
            },
            930: {
              slidesPerView: 3,
            },
            // when window width is >= 910px
            1190: {
              slidesPerView: 4,
            },
            // you can add more breakpoints here
          }}
          loop={true}
          className="mySwiper"
        >
          {allReviews.map((review, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  className="flex flex-col justify-start gap-3 p-4 bg-richblack-800 
                    min-h-[200px]"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={review?.user?.image}
                      alt="userImage"
                      className=" rounded-full object-cover w-12 aspect-square"
                    />
                    <div className="flex flex-col">
                      <div className="text-richblack-5 font-bold">
                        {review?.user?.firstName} {review?.user?.lastName}
                      </div>
                      <div className="text-richblack-300 text-sm">
                        {review?.course?.courseName?.slice(0, 20)}
                        {review?.course?.courseName?.length > 20 ? "..." : ""}
                      </div>
                    </div>
                  </div>

                  <div className="text-richblack-5">
                    {review?.review?.slice(0, 50)}
                    {review?.review?.length > 50 ? "..." : ""}
                  </div>

                  <div className="flex text-yellow-100 font-bold items-center gap-2">
                    <div className="">{review?.rating.toFixed(1)}</div>
                    <RatingStars
                      Review_Count={review?.rating}
                      Star_Size={24}
                    ></RatingStars>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="w-11/12 max-w-maxContent mx-auto text-4xl border-2 border-richblack-600 flex justify-center items-center py-2 rounded-lg transition-all duration-300 hover:scale-110 text-pink-100 my-5">
          No Reviews found
        </div>
      )}
    </div>
  );
};

export default ReviewSlider;
