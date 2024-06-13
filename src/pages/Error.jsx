import React from "react";
import errorImage from "../assets/Images/not-found.png";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center text-richblack-5 w-11/12 max-w-maxContent mx-auto min-h-[calc(100vh-3.53rem)]">
      <img
        src={errorImage}
        alt="Error-404"
        className="w-[30rem] transition-all duration-200 hover:cursor-pointer hover:scale-105 object-contain"
      />
      <div className="text-4xl max-[450px]:text-3xl max-[380px]:text-2xl font-bold hover:text-pink-100 hover:cursor-pointer transition-all duration-200 hover:scale-110 font-edu-sa">
        Error - 404 Not Found
      </div>
    </div>
  );
};

export default Error;
