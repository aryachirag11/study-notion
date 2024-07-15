import React from "react";
import CardSideInformation from "./CardSideInformation";
import Instructor from "../../../assets/Images/Instructor.png";

const InstructionHome = () => {
  return (
    <div className="w-11/12 flex gap-24 items-center justify-center">
      <div>
        <img
          src={Instructor}
          alt="Instructor"
          className="w-[616px] h-[545px] shadow-[-20px_-20px_0px_0px_#FFFFFF] object-cover"
        />
      </div>
      <CardSideInformation
        headingPartA={"Become an"}
        highlightHeading={"instructor"}
        description={
          "Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love."
        }
        primaryButton={{
          style: "Primary",
          changeText: "Start Teaching Today",
          trailingIcon: true,
          linkTo: "/signup",
        }}
      />
    </div>
  );
};

export default InstructionHome;
