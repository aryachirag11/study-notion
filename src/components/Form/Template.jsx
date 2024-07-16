import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import FrameImage from "../../assets/Images/frame.png";

const Template = ({ title, desc1, desc2, image, formType }) => {
  const [role, setrole] = useState("Student");
  return (
    <div className="w-11/12 max-w-[1160px] py-12 mx-auto gap-20 justify-between flex items-center mt-20">
      {/* Left Section */}
      <div className="w-11/12 max-w-[450px] flex flex-col p-8 gap-9">
        {/* Heading */}
        <div className="flex flex-col gap-3 font-inter">
          <h1 className="text-3xl text-richblack-5 font-semibold">{title}</h1>
          <p className="text-lg text-richblack-100 font-normal">
            {desc1}
            <br />
            <span className="text-base text-blue-100 font-bold font-edu-sa italic">
              {desc2}
            </span>
          </p>
        </div>
        {/* Role Button */}
        <div className="max-w-[230px] flex bg-richblack-800 gap-8 py-1 px-2 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] rounded-full text-base font-medium text-center text-richblack-200 justify-center">
          <button
            className={`${
              role === "Student"
                ? "bg-richblack-900 text-richblack-25 rounded-full px-4 py-[4px]"
                : ""
            }  hover:text-richblack-25 hover:rounded-full hover:px-4 hover:py-[4px] transition-all duration-200`}
            onClick={(e) => setrole(e.target.innerText)}
          >
            Student
          </button>
          <button
            className={`${
              role === "Instructor"
                ? "bg-richblack-900 text-richblack-25 rounded-full px-4 py-[4px]"
                : ""
            }  hover:text-richblack-25 hover:rounded-full hover:px-4 hover:py-[4px] transition-all duration-200`}
            onClick={(e) => setrole(e.target.innerText)}
          >
            Instructor
          </button>
        </div>
        {/* Form */}
        {formType === "login" ? <LoginForm /> : <SignupForm />}
      </div>
      {/* Image */}
      <div className="relative w-11/12 max-w-[450px]relative">
        <img src={FrameImage} alt="Frame Pattern" />
        <img
          src={image}
          alt={`${formType} iamge`}
          className="absolute -top-5 -left-5"
        />
      </div>
    </div>
  );
};

export default Template;
