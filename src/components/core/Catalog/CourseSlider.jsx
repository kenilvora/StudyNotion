import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  FreeMode,
  Autoplay,
  Scrollbar,
  A11y,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";

import CourseCard from "./CourseCard";

const CourseSlider = ({ courses }) => {
  return (
    <>
      {courses.length > 0 ? (
        <Swiper
          spaceBetween={20}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
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
            // when window width is >= 910px
            910: {
              slidesPerView: 3,
            },
            // you can add more breakpoints here
          }}
          loop={true}
          className="mySwiper"
        >
          {courses.map((course, index) => {
            return (
              <SwiperSlide key={index}>
                <CourseCard course={course} height={"h-56"}></CourseCard>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="w-11/12 max-w-maxContent mx-auto text-4xl border-2 border-richblack-600 flex justify-center items-center py-2 rounded-lg transition-all duration-300 hover:scale-110 text-pink-100 my-5">
          No Course found
        </div>
      )}
    </>
  );
};

export default CourseSlider;
