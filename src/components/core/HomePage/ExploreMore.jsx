import React, { useState } from "react";
import HighlightText from "./HighlightText";
import HomePageExplore from "../../../data/homepage-explore";
import ExploreMoreCard from "./ExploreMoreCard";

const tabsName = [
  "Free",
  "New To Coding",
  "Most Popular",
  "Skill Paths",
  "Career Paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);

    const result = HomePageExplore.filter((course) => course.tag === value);

    setCourses(result[0].courses);

    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="flex flex-col gap-2 mx-auto justify-center items-center mt-14 relative">
      <div className="text-4xl text-center font-bold max-[320px]:text-start">
        {" "}
        Unlock the <HighlightText text={"Power of Code"}></HighlightText>
      </div>
      <div className="text-richblack-300 text-center text-lg max-[320px]:text-start max-[600px]:text-base">
        Learn to Build Anything You Can Imagine
      </div>
      <div className="flex justify-center items-center gap-1 bg-richblack-700 py-2 px-[0.6rem] rounded-full w-fit max-[670px]:px-2 mt-9 max-[460px]:gap-[0.1rem] max-[460px]:rounded-lg max-[460px]:px-1">
        {tabsName.map((tab, index) => {
          return (
            <div
              key={index}
              className={`py-[0.4rem] px-4 transition-all duration-200 hover:text-richblack-5 hover:bg-richblack-900 rounded-full flex justify-center items-center text-center hover:cursor-pointer text-richblack-200 max-[670px]:px-2 max-[670px]:py-1 max-[670px]:text-sm max-[520px]:text-xs max-[460px]:text-[0.7rem] max-[460px]:rounded-md 
              ${currentTab === tab ? "bg-richblack-900 text-richblack-5" : ""}
              `}
              onClick={() => setMyCards(tab)}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div className="flex max-[820px]:flex-col gap-8 mx-auto justify-center items-center relative top-20 max-[820px]:items-start">
        {courses.map((course, index) => {
          return (
            <ExploreMoreCard
              key={index}
              heading={course.heading}
              description={course.description}
              level={course.level}
              lessionNumber={course.lessionNumber}
              setCurrentCard={setCurrentCard}
              currentCard={currentCard}
            ></ExploreMoreCard>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
