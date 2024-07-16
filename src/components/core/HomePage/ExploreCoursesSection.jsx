import React from "react";
import HighlighText from "./HighlighText";
import ExploreMore from "./ExploreMore";
import CTAButton from "./CTAButton";
const ExploreCoursesSection = () => {
  return (
    <div className="w-full h-full flex flex-col gap-12 md:gap-24 relative">
      <div
        className="w-11/12 h-[1300px] md:max-h-[560px] max-w-maxContent flex flex-col items-start md:items-center
         gap-4 md:gap-9 mx-4 md:mx-auto"
      >
        <div className="md:h-fit w-11/12 flex flex-col gap-3">
          <p className="font-semibold text-3xl md:text-4xl md:text-center tracking-tighter text-richblack-5">
            Unlock the <HighlighText changeText={"Power of Code"} />
          </p>
          <p className="font-medium text-base md:text-center text-richblack-300">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
        <div className="h-[1100px] md:h-fit w-11/12 md:py-8 px-4 md:px-12 z-20">
          <ExploreMore className="" />
        </div>
        <div className="flex flex-row gap-6 md:pt-8 z-20">
          <CTAButton
            isActive={true}
            changeText={"Explore Full Catalog"}
            linkTo={"/course"}
            trailingIcon={true}
          />
          <CTAButton
            isActive={false}
            changeText={"Learn More"}
            linkTo={"/course"}
          />
        </div>
      </div>
      <div className="homepage_bg bg-pure-greys-5 w-screen h-[320px] absolute bottom-0 z-10"></div>
    </div>
  );
};

export default ExploreCoursesSection;
