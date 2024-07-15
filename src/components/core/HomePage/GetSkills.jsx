import React from "react";
import HighlighText from "./HighlighText";
import CTAButton from "./CTAButton";
import TimeLineSection from "./TimeLineSection";
const GetSkills = () => {
  return (
    <div className="flex flex-col gap-20 w-11/12 items-center">
      <div className="w-full max-fit-[144px] mx-auto flex gap-10 justify-center">
        <div className="w-[45%] font-semibold text-4xl tracking-tight text-richblack-900">
          Get the skills you need for a{" "}
          <HighlighText changeText={"job that is in demand."} />
        </div>
        <div className="w-[45%] flex flex-col gap-5 justify-end">
          <p className="font-medium text-base text-richblack-700 mb-2">
            The modern StudyNotion is the dictates its own terms. Today, to be a
            competitive specialist requires more than professional skills.
          </p>
          <CTAButton style={"Primary"} changeText={"Learn More"} linkTo={"/"} />
        </div>
      </div>
      <TimeLineSection />
    </div>
  );
};

export default GetSkills;
