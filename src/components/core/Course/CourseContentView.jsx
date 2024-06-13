import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { convertSecondsToDuration } from "../../../utils/secondToDuration";
import CourseSubSectionView from "./CourseSubSectionView";

const CourseContentView = ({ section, isActive, setIsActive }) => {
  const [active, setActive] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [sectionTime, setSectionTime] = useState(0);
  const sectionRef = useRef(null);

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e !== id)
    );
  };

  useEffect(() => {
    setActive(isActive.includes(section._id));
  }, [isActive]);

  useEffect(() => {
    setSectionHeight(active ? sectionRef.current.scrollHeight : 0);
  }, [active]);

  useEffect(() => {
    let totalTime = 0;
    section?.subSection.map((subSec) => {
      totalTime += parseInt(subSec.timeDuration);
    });

    setSectionTime(convertSecondsToDuration(totalTime));
  }, [section]);

  return (
    <div className="overflow-hidden bg-richblack-700">
      <div
        className="flex py-5 px-7 max-[450px]:p-4 w-full justify-between hover:cursor-pointer transition-[0.3s]"
        onClick={() => handleActive(section?._id)}
      >
        <div className="flex gap-2 max-[450px]:gap-1 items-center font-bold">
          <i
            className={`text-richblack-5
            ${active ? "rotate-180" : "rotate-0"}
        `}
          >
            <MdKeyboardArrowDown className="text-2xl max-[450px]:text-lg"/>
          </i>
          <div className="text-richblack-5 max-[450px]:text-sm">{section?.sectionName}</div>
        </div>

        <div className="flex gap-4">
          <div className="text-yellow-100 font-bold max-[450px]:text-sm">
            {section?.subSection?.length || 0} Lecture(s)
          </div>

          <div className="text-richblack-5 max-[450px]:text-sm">{sectionTime}</div>
        </div>
      </div>

      <div
        ref={sectionRef}
        className={`h-0 relative bg-richblack-900 overflow-hidden transition-[height] duration-[0.35s] ease-[ease]`}
        style={{
          height: sectionHeight,
        }}
      >
        <div className="flex flex-col px-[1.85rem] max-[450px]:px-4 py-4 justify-center">
          {section?.subSection.map((subSec, index) => {
            return (
              <CourseSubSectionView
                subSec={subSec}
                key={index}
                sectionRef={sectionRef}
                setSectionHeight={setSectionHeight}
              ></CourseSubSectionView>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseContentView;
