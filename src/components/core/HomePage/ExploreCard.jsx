import React from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { PiTreeStructureFill } from "react-icons/pi";

const ExploreCard = ({ isActive, title, description, level, lessonNumber }) => {
  return (
    <div
      className={`${
        isActive
          ? "bg-white shadow-[12px_12px_0px_0px_#FFD60A]"
          : "bg-richblack-800"
      } max-w-[343.33px] max-h-[300px] flex flex-col gap-3`}
    >
      <div
        className={` w-full max-h-fit flex flex-col gap-3 pt-8 px-6 pb-12 font-inter`}
      >
        <p
          className={`${
            isActive ? "text-richblack-800" : "text-richblack-25"
          } text-xl font-semibold`}
        >
          {title}
        </p>
        <p
          className={`${
            isActive ? "text-richblack-500" : "text-richblack-400"
          } text-base font-normal`}
        >
          {description}
        </p>
      </div>
      <div
        className={`${
          isActive
            ? "border-richblack-50 text-blue-500"
            : "border-richblack-600 text-richblack-300"
        } w-full max-h-[56px] mt-4 pt-4 pb-0 px-6 flex items-center gap-4 border-t-[2px] border-dashed justify-between`}
      >
        <div className="max-w-[97px] max-[24px] flex items-center gap-2">
          <div className="w-[20px] h-[20px] flex justify-center items-center">
            <HiMiniUsers className="w-[17.74px] h-[16px]" />
          </div>
          <div className="text-base font-medium text-center">{level}</div>
        </div>
        <div className="flex items-center gap-2 max-h-6">
          <div>
            <PiTreeStructureFill className="w-[18px] h-[18px]" />
          </div>
          <p className="text-base font-medium text-center">{`${lessonNumber} Lessons`}</p>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
