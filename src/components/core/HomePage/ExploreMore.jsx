import React, { useState } from "react";
import ExploreCard from "./ExploreCard";
import { tabsName, HomePageExplore } from "../../../data/homepage-explore";

const ExploreMore = () => {
  const [currentTab, setcurrentTab] = useState("Free");
  const [taggedCourses, setTaggedCourses] = useState(
    HomePageExplore[0].courses
  );
  const [currentCard, setcurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCard = (value) => {
    setcurrentTab(value.innerText);
    const currentTagCourses = HomePageExplore.filter(
      (course) => course.tag === value.innerText
    );
    setTaggedCourses(currentTagCourses[0].courses);
    setcurrentCard(currentTagCourses[0].courses[0].heading);
  };
  console.log(" currentTab: ", currentTab);
  console.log("taggedCourses : ", taggedCourses);
  console.log(" currentCard: ", currentCard);

  return (
    <div className="md:h-full flex flex-col items-center gap-10">
      <div className="max-w-max h-fit mx-4 px-4 md:px-6 py-1 md:py-[6px] rounded-xl md:rounded-full xl text-base flex items-center gap-4 md:gap-8 bg-richblack-800 text-richblack-400 ">
        {tabsName.map((tag, index) => (
          <button
            key={index}
            className={`${
              currentTab === tag
                ? "bg-richblack-900 text-richblack-25 rounded-full px-4 py-[4px]"
                : ""
            }  hover:text-richblack-25 hover:rounded-full hover:px-4 hover:py-[4px] transition-all duration-200`}
            onClick={(e) => setMyCard(e.target)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="md:max-w-[1096px] h-[260px] md:h-[300px]  flex flex-col items-center md:flex-row gap-6 md:gap-9">
        {taggedCourses.map((course, index) => (
          <ExploreCard
            key={index}
            isActive={currentCard === course.heading}
            title={course.heading}
            description={course.description}
            level={course.level}
            lessonNumber={course.lesson}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
