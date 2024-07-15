import React from "react";
import HighlighText from "./HighlighText";
import ExploreMore from "./ExploreMore";
import CTAButton from "./CTAButton";
const ExploreCoursesSection = () => {
  return (
    <div className="w-full h-full flex flex-col gap-24 relative">
      <div
        className="w-11/12 max-h-[560px] max-w-maxContent flex flex-col items-center
         gap-9 mx-auto"
      >
        <div className="h-fit w-11/12 flex flex-col gap-3 z-10">
          <p className="font-semibold text-4xl text-center tracking-tighter text-richblack-5">
            Unlock the <HighlighText changeText={"Power of Code"} />
          </p>
          <p className="font-medium text-base text-center text-richblack-300">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
        <div className="h-fit w-11/12 py-8 px-12 z-20">
          <ExploreMore className="" />
        </div>
        <div className="flex flex-row gap-6 pt-8 z-20">
          <CTAButton
            style={"Primary"}
            changeText={"Explore Full Catalog"}
            linkTo={"/course"}
            trailingIcon={true}
          />
          <CTAButton
            style={"secondary"}
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
