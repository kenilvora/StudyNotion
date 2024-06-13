import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { BiSolidTrash } from "react-icons/bi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { removeFromCart } from "../../../slices/cartSlice";
import RatingStars from "../../common/RatingStars";
import { buyCourse } from "../../../services/operations/paymentAPI";
import { useNavigate } from "react-router-dom";
import Spinner from "../../common/Spinner";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { paymentLoading } = useSelector((state) => state.course);

  const handleBuyCourse = () => {
    const courses = cart.cart.map((course) => course?._id);
    console.log(courses);
    buyCourse(user, token, dispatch, navigate, courses);
    return;
  };
  return (
    <div className="flex flex-col gap-12 text-richblack-5 justify-center">
      <div className="text-3xl font-bold">My Cart</div>

      {cart.cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border p-2 border-richblack-700">
          <p className="text-2xl text-center font-edu-sa font-bold hover:text-yellow-100">
            Your Cart is Empty.
          </p>
        </div>
      ) : paymentLoading ? (
        <div className="relative flex justify-center">
          <Spinner></Spinner>
          <div className="mt-8 absolute top-[52%] text-center text-3xl text-yellow-100 font-bold">
            Please wait, Your payment is being Verified.
          </div>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-richblack-600">
          <div className="text-richblack-300 font-bold pb-3">
            {cart.totalItems} Course(s) in the Cart
          </div>
          <div className="flex max-[1140px]:flex-col gap-4">
            <div className="w-[73%] max-[1140px]:w-full flex flex-col divide-y divide-richblack-700">
              {cart.cart.map((course, index) => {
                return (
                  <div
                    className="flex max-[570px]:flex-col py-5 gap-4 items-center"
                    key={index}
                  >
                    <img
                      src={course?.thumbnail}
                      alt="courseThumbnail"
                      className="aspect-video rounded-lg object-cover w-full min-[570px]:h-28 min-[570px]:w-[23%]"
                    />
                    <div className="flex w-full min-[570px]:w-[75%] justify-between gap-3 max-[605px]:flex-col">
                      <div className="flex flex-col gap-1 justify-between">
                        <div className=" text-richblack-5 font-bold text-xl max-[890px]:text-lg max-[570px]:text-[1.35rem]">
                          {course?.courseName.slice(0, 28)}
                          {course.courseName.length > 28 ? "..." : ""}
                        </div>
                        <div className=" text-richblack-300 text-sm">
                          {course?.courseDescription.slice(0, 40)}
                          {course.courseDescription.length > 40 ? "..." : ""}
                        </div>
                        <div className="flex gap-2 items-center">
                          <div className="text-yellow-100 font-bold">
                            {course?.avgReviewCount || 4.5}
                          </div>
                          <div className="flex justify-center items-center">
                            <RatingStars
                              Review_Count={course?.avgReviewCount || 4.5}
                              Star_Size={24}
                            ></RatingStars>
                          </div>
                          <div className="text-richblack-300 flex items-center">
                            [ Reviews : {`${course?.ratingAndReviews?.length}`}{" "}
                            ]
                          </div>
                        </div>
                      </div>
                      <div className="flex min-[605px]:flex-col gap-5 items-center justify-start h-full">
                        <button
                          className=" bg-richblack-800 text-pink-200 border border-pink-200 flex gap-2 items-center p-2 text-lg rounded-lg font-semibold max-[605px]:text-xs"
                          onClick={() => dispatch(removeFromCart(course?._id))}
                        >
                          <BiSolidTrash className="text-xl max-[605px]:text-sm"></BiSolidTrash>
                          Remove
                        </button>

                        <div className="text-2xl text-yellow-100 font-bold">
                          Rs. {course?.price}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-[27%] max-[1140px]:w-full max-[1140px]:items-start h-fit p-5 my-5 rounded-lg flex flex-col gap-3 bg-richblack-800 border border-richblack-600">
              <div className="flex flex-col gap-1">
                <div className="text-richblack-300 font-bold">Total:</div>
                <div className="text-yellow-100 font-bold text-4xl">
                  Rs. {cart.total}
                </div>
                <div className="text-richblack-300 line-through">
                  Rs. {cart.total + cart.total * 0.2}
                </div>
              </div>

              <button
                className="bg-yellow-100 text-lg font-bold text-black p-4 py-2.5 border border-yellow-5 rounded-lg"
                onClick={handleBuyCourse}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
