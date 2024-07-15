import React, { useState } from "react";
import HighlighText from "./HighlighText";
import CTAButton from "./CTAButton";
import { TypeAnimation } from "react-type-animation";
import CardSideInformation from "./CardSideInformation";
import DynamicCode from "./DynamicCode";

const CodeSection = ({
  gradient,
  isFlexReverse,
  headingPartA,
  headingPartB,
  highlightHeading,
  description,
  primaryButton,
  secondaryButton,
}) => {
  const renderIndex = () => {
    const indexList = [];
    for (let i = 1; i <= 11; i++)
      indexList.push(
        <p className=" tracking-tighter text-center text-richblack-400">{i}</p>
      );
    return indexList;
  };
  const [textColor, setTextColor] = useState("#C5C7D4");

  return (
    <div
      className={`w-11/12 h-fit flex ${
        isFlexReverse ? "flex-row-reverse" : "flex-row"
      } gap-20  items-center px-4`}
    >
      {/* Card information */}
      <CardSideInformation
        headingPartA={headingPartA}
        headingPartB={headingPartB}
        highlightHeading={highlightHeading}
        description={description}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
      />
      {/* Code section */}
      <div className="w-[50%] min-h-fit flex gap-[2px] relative">
        {/* gradient */}
        <div
          className={`w-[372.95px] h-[257.05px] opacity-20 z-10 absolute left-0 top-1
          ${
            gradient === "orange"
              ? "bg-gradient-to-br from-[#8A2BE2] -from-6.46% via-[#FFA500] via-59.04% to-[#F8F8FF] to-124.53%"
              : "bg-gradient-to-br from-[#1FA2FF] -from-3.62% via-[#12D8FA] via-50.44% to-[#A6FFCB] to-104.51%"
          }
          blur-3xl`}
        ></div>
        {/* Code */}
        <DynamicCode />
      </div>
    </div>
  );
};

export default CodeSection;
