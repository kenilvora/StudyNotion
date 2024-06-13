import React, { useState } from "react";

const ConfirmationModal = ({ data }) => {
  const [isAnimate, setIsAnimate] = useState(true);
  return (
    <div
      className={`flex justify-center z-50 items-center w-screen absolute 
          ${data?.position ? "" : "-top-[3.6rem]"}
       min-h-screen bg-richblack-500 bg-opacity-45 modalbg left-0 select-none
          ${isAnimate ? "animate-modal-slide-in" : "animate-modal-slide-out"}
     `}
    >
      <div className="flex flex-col justify-center gap-4 text-richblack-5 bg-richblack-900 border-richblack-200 border rounded-xl p-9 max-[510px]:p-5">
        <p className="text-4xl font-bold max-[835px]:text-2xl max-[370px]:text-xl">
          {data.text1}
        </p>
        <p className="text-richblack-300 text-2xl max-[835px]:text-lg max-[450px]:text-base max-[370px]:text-sm">
          {data.text2}
        </p>
        <div className="flex gap-4 text-black font-bold">
          <button
            className="bg-yellow-100 px-5 py-2 rounded-lg h-fit text-xl max-[510px]:px-3 max-[450px]:text-lg max-[370px]:text-sm max-[370px]:p-2"
            onClick={data?.btn1Handler}
          >
            {data.btn1}
          </button>
          <button
            className="bg-pink-50 px-5 py-2 rounded-lg text-xl max-[510px]:px-3 max-[450px]:text-lg max-[370px]:text-sm max-[370px]:p-2"
            onClick={() => {
              setIsAnimate(false);
              setTimeout(() => {
                data?.btn2Handler();
                setIsAnimate(true);
              }, 500);
            }}
          >
            {data.btn2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
