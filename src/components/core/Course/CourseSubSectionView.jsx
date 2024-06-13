import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { convertSecondsToDuration } from "../../../utils/secondToDuration";
import { HiTv } from "react-icons/hi2";

const CourseSubSectionView = ({ subSec, sectionRef, setSectionHeight }) => {
  //   For SubSection
  const [isActiveSubSec, setIsActiveSubSec] = useState([]);
  const [activeSubSec, setActiveSubSec] = useState(false);
  const [subSectionHeight, setSubSectionHeight] = useState(0);
  const subSectionRef = useRef(null);

  const handleActiveSubSec = (id) => {
    setIsActiveSubSec(
      !isActiveSubSec.includes(id)
        ? isActiveSubSec.concat(id)
        : isActiveSubSec.filter((e) => e !== id)
    );
  };

  useEffect(() => {
    setActiveSubSec(isActiveSubSec.includes(subSec?._id));
  }, [isActiveSubSec]);

  useEffect(() => {
    setSectionHeight(
      activeSubSec
        ? sectionRef.current.scrollHeight + subSectionRef.current.scrollHeight
        : sectionRef.current.scrollHeight - subSectionRef.current.scrollHeight
    );
    setSubSectionHeight(activeSubSec ? subSectionRef.current.scrollHeight : 0);
  }, [activeSubSec]);

  return (
    <div className="overflow-hidden">
      <div
        className="flex text-richblack-5 items-center hover:cursor-pointer justify-between"
        onClick={() => handleActiveSubSec(subSec?._id)}
      >
        <div className="text-richblack-5 font-bold flex py-2 gap-2.5 max-[450px]:gap-1.5 items-center transition-[0.3s]">
          <HiTv className="text-xl max-[450px]:text-base"></HiTv>
          <span className="max-[450px]:text-sm">{subSec?.title}</span>
          <i className={`${activeSubSec ? "rotate-180" : "rotate-0"}`}>
            <MdKeyboardArrowDown className="text-2xl max-[450px]:text-lg"></MdKeyboardArrowDown>
          </i>
        </div>
        <div className="max-[450px]:text-sm">
          {convertSecondsToDuration(parseInt(subSec.timeDuration))}
        </div>
      </div>

      <div
        ref={subSectionRef}
        className="relative h-0 transition-[height] duration-[0.35s] ease-[ease] overflow-hidden"
        style={{
          height: subSectionHeight,
        }}
      >
        <div className="text-richblack-200 pl-[1.9rem] max-[450px]:text-sm max-[450px]:pl-[1.4rem] pb-2">{subSec.description}</div>
      </div>
    </div>
  );
};

export default CourseSubSectionView;
