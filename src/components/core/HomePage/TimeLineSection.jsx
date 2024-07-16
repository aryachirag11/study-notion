import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../assets/Images/TimelineImage.png";
const timelineData = [
  {
    logo: Logo1,
    heading: "Leadership",
    description: "Fully committed to the success company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];
const TimeLineSection = () => {
  return (
    <>
      <div className="w-11/12 h-fit flex flex-col : md:flex-row gap-10 md:gap-20 relative">
        <div className="md:w-[410px] h-max flex flex-col gap-8 my-auto">
          {timelineData.map((item, index) => (
            <div key={index} className="max-w-[410px] flex gap-6 py-4 px-3">
              <div
                className="w-[52px] h-[52px] rounded-full p-1 bg-white shadow-[0_0_62px_0_#0000001F] flex justify-center
            "
              >
                <img
                  src={item.logo}
                  alt="leadership"
                  width="24px"
                  height="24px"
                />
              </div>
              <div className="flex flex-col gap-1 font-inter">
                <p className="text-lg font-semibold text-richblack-800">
                  {item.heading}
                </p>
                <p className="text-sm font-normal text-richblack-700">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-maxContent max-h-fit relative">
          <img
            src={timeLineImage}
            alt="time line"
            className=" w-screen md:w-[714px] h-[545px] shadow-[20px_20px_0px_0px_#F5F5F5] z-10"
          ></img>
          {/* <div
            className=" z-10 w-[750px] h-[479px] absolute top-20 left-1 mx-auto opacity-40
            bg-gradient-to-br from-[#9CECFB] -from-9.12% via-[#65c7f7] via-48.59% to-[#0052D4] to-106.3%
          blur-3xl "
          ></div> */}
          <div className="absolute max-w-[511px] md:max-h-[128px] p-10 flex flex-col md:flex-row gap-10 bg-caribbeangreen-700 items-center md:right-[50px] md:-bottom-[55px] right-2 bottom-4">
            <div className="max-w-[161px] max-h-[44px] gap flex gap-5">
              <p className="font-bold text-4xl font-inter text-center tracking-tight text-white">
                10
              </p>
              <p className="font-medium text-sm text-caribbeangreen-300">
                YEARS EXPERIENCES
              </p>
            </div>
            <div className="w-[44px] h-0 border-[1px] border-[#037957] md:rotate-90"></div>
            <div className="max-w-[161px] max-h-[44px] gap flex gap-5">
              <p className="font-bold text-4xl font-inter text-center tracking-tight text-white">
                250
              </p>
              <p className="font-medium text-sm text-caribbeangreen-300">
                TYPES OF COURSES
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeLineSection;
