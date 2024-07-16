import React from "react";
import HighlighText from "./HighlighText";
import Progress from "../../../assets/Images/Know_your_progress.svg";
import Compare from "../../../assets/Images/Compare_with_others.svg";
import Plan from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from "./CTAButton";

const LeanLanguage = () => {
  return (
    <div className="w-11/12 flex flex-col gap-6 md:gap-12 items-start md:items-center">
      <div className="max-w-[760px] flex flex-col gap-3 font-inter">
        <p className="font-semibold text-3xl md:text-4xl tracking-tight md:text-center text-richblack-900">
          Your swiss knife for{" "}
          <HighlighText changeText={"learning any language"} />
        </p>
        <p className="font-medium text-base md:text-center text-richblack-700">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </p>
      </div>
      <div className="max-w-[1102px] flex flex-col md:flex-row items-center md:justify-center">
        <img
          src={Progress}
          alt=""
          className="w-[341px] object-contain md:-mr-24 -mb-12"
        />
        <img src={Compare} alt="" className="w-[341px] object-contain" />
        <img
          src={Plan}
          alt=""
          className="w-[341px] object-contain -mt-16 md:-ml-24"
        />
      </div>
      <div className="w-11/12 pt-8 flex justify-center items-end">
        <CTAButton isActive={true} changeText={"Learn More"} />
      </div>
    </div>
  );
};

export default LeanLanguage;
