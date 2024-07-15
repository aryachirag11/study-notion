import React from "react";
import HighlighText from "./HighlighText";
import CTAButton from "./CTAButton";
const CardSideInformation = ({
  headingPartA,
  headingPartB,
  highlightHeading,
  description,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <div className="flex flex-col w-[50%] max-h-72 gap-3">
      <p className="w-full h-fit font-inter font-semibold text-4xl tracking-tight text-richblack-5">
        {headingPartA} <HighlighText changeText={highlightHeading} />{" "}
        {headingPartB}
      </p>
      <p className="w-full h-fit font-medium text-base font-inter text-richblack-300">
        {description}
      </p>
      <div className="w-fit flex py-[52px] gap-6">
        {primaryButton && (
          <CTAButton
            style={primaryButton.style}
            changeText={primaryButton.changeText}
            trailingIcon={primaryButton.trailingIcon}
            linkTo={primaryButton.linkTo}
          />
        )}
        {secondaryButton && (
          <CTAButton
            style={secondaryButton.style}
            changeText={secondaryButton.changeText}
            linkTo={secondaryButton.linkTo}
          />
        )}
      </div>
    </div>
  );
};

export default CardSideInformation;
