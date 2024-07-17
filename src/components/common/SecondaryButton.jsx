import React from "react";
import { Link } from "react-router-dom";

const SecondaryButton = ({ changeText }) => {
  return (
    <Link
      onClick={() => {
        console.log(`${changeText} clicked`);
      }}
      className="h-8 flex items-center justify-center w-full rounded-lg px-2 bg-richblack-800 border-b border-richblack-700 text-base font-medium text-richblack-100 hover:scale-95 transition-all duration-200"
    >
      {changeText}
    </Link>
  );
};

export default SecondaryButton;
