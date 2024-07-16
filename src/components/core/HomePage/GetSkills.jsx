import React from "react";
import HighlighText from "./HighlighText";
import CTAButton from "./CTAButton";
import TimeLineSection from "./TimeLineSection";
const GetSkills = () => {
  return (
    <div className="flex flex-col gap-10 md:gap-20 w-full md:w-11/12 items-center">
      <div className="w-full max-fit-[144px] md:mx-auto flex flex-col md:flex-row gap-5 md:gap-10 md:justify-center">
        <div className="w-full md:w-[45%] font-semibold text-3xl md:text-4xl tracking-tight text-richblack-900">
          Get the skills you need for a{" "}
          <HighlighText changeText={"job that is in demand."} />
        </div>
        <div className="md:w-[45%] flex flex-col gap-5 justify-end">
          <p className="font-medium text-base text-richblack-700 mb-2">
            The modern StudyNotion is the dictates its own terms. Today, to be a
            competitive specialist requires more than professional skills.
          </p>
          <CTAButton isActive={true} changeText={"Learn More"} linkTo={"/"} />
        </div>
      </div>
      <TimeLineSection />
    </div>
  );
};

export default GetSkills;
