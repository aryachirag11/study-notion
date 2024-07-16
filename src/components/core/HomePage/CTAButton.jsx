import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CTAButton = ({ isActive, changeText, linkTo, trailingIcon }) => {
  return (
    <>
      <Link
        to={linkTo}
        className={`w-fit max-h-12 rounded-lg px-6 py-3 ${
          isActive
            ? "bg-yellow-50 text-richblack-900"
            : "bg-richblack-800 text-richblack-5"
        } shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset] font-medium font-inter text-base text-center  hover:scale-95 transition-all duration-200 flex gap-2 items-center`}
      >
        {changeText}
        {trailingIcon && <FaArrowRight height="16px" width="16px" />}
      </Link>
    </>
  );
};

export default CTAButton;
