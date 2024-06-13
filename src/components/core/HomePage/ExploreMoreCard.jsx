import React from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { FcFlowChart } from "react-icons/fc";

const ExploreMoreCard = ({
  heading,
  description,
  level,
  lessionNumber,
  setCurrentCard,
  currentCard,
}) => {
  const changeCard = (heading) => {
    setCurrentCard(heading);
  };
  return (
    <div
      className={`flex flex-col gap-2 bg-richblack-800 pt-6 h-[19rem] w-full justify-between
         transition-all duration-200 hover:cursor-pointer ${
           heading === currentCard ? "bg-white shadow-yellow2" : ""
         }
    `}
      onClick={() => changeCard(heading)}
    >
      <div className="px-4 flex flex-col gap-2">
        <div
          className={`text-lg font-bold ${
            heading === currentCard ? " text-black" : "text-white"
          }`}
        >
          {heading}
        </div>
        <div
          className={`text-base font-medium text-richblack-300 max-[1172px]:text-sm max-[820px]:text-base`}
        >
          {description}
        </div>
      </div>
      <div className="flex justify-between items-center text-richblack-300 border-t-2 border-dashed border-richblack-400 py-3 px-4 font-bold max-[1172px]:text-sm max-[820px]:text-base">
        <div className="flex gap-1 items-center justify-center">
          <HiMiniUsers></HiMiniUsers>
          <div>{level}</div>
        </div>
        <div className="flex gap-1 items-center justify-center">
          <FcFlowChart></FcFlowChart>
          {lessionNumber} Lessons
        </div>
      </div>
    </div>
  );
};

export default ExploreMoreCard;
