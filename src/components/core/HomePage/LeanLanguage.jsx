import React from "react";
import HighlighText from "./HighlighText";
import Progress from "../../../assets/Images/Know_your_progress.svg";
import Compare from "../../../assets/Images/Compare_with_others.svg";
import Plan from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from "./CTAButton";

const LeanLanguage = () => {
  return (
    <div className="w-11/12 flex flex-col gap-12 items-center">
      <div className="max-w-[760px] flex flex-col gap-3 font-inter">
        <p className="font-semibold text-4xl tracking-tight text-center text-richblack-900">
          Your swiss knife for{" "}
          <HighlighText changeText={"learning any language"} />
        </p>
        <p className="font-medium text-base text-center text-richblack-700">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </p>
      </div>
      <div className="max-w-[1102px] flex flex-row items-center justify-center">
        <img
          src={Progress}
          alt=""
          className="w-[341px] object-contain -mr-24"
        />
        <img src={Compare} alt="" className="w-[341px] object-contain" />
        <img src={Plan} alt="" className="w-[341px] object-contain -ml-24" />
      </div>
      <div className="w-11/12 pt-8 flex justify-center items-end">
        <CTAButton style={"Primary"} changeText={"Learn More"} />
      </div>
    </div>
  );
};

export default LeanLanguage;
