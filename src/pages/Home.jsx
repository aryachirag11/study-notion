import React from "react";
import { Link } from "react-router-dom";
import CTAButton from "../components/core/HomePage/CTAButton";
import HighlighText from "../components/core/HomePage/HighlighText";
import CodeSection from "../components/core/HomePage/CodeSection";
import bannerVideo from "../assets/Images/banner.mp4";
import "./Home.css";
import LeanLanguage from "../components/core/HomePage/LeanLanguage";
import InstructionHome from "../components/core/HomePage/InstructionHome";
import Footer from "../components/common/Footer";
import ExploreCoursesSection from "../components/core/HomePage/ExploreCoursesSection";
import GetSkills from "../components/core/HomePage/GetSkills";
import { FiArrowRight } from "react-icons/fi";
const Home = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Landing Section */}
      <div className="lg:max-w-[913px] h-fit flex flex-col items-start md:items-center gap-9 mt-20 mx-2">
        <Link className="flex gap-2 px-4 py-2 bg-richblack-800 text-richblack-200 rounded-full items-center shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] hover:scale-95 transition-all duration-200">
          <p className="text-base font-medium text-center">
            Become an Instructor
          </p>
          <FiArrowRight className="w-4 h-4" />
        </Link>

        <div className="flex flex-col gap-4 font-inter md:items-center">
          <h2 className=" text-3xl md:text-4xl  font-semibold  tracking-tight text-richblack-5">
            Empower Your Future with{" "}
            <HighlighText changeText={"Coding Skills"} />
          </h2>
          <p className="text-base md:text-center text-richblack-300  font-medium">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.{" "}
          </p>
        </div>
        <div className="flex gap-6 max-h-12">
          <CTAButton isActive={true} changeText={"Learn More"} />
          <CTAButton changeText={"Book a Demo"} />
        </div>
      </div>
      {/* Video Section */}
      <div className="flex justify-center shadow-item h-fit m-10">
        <video
          muted
          loop
          autoPlay
          className="md:max-w-5xl h-full shadow-[8px_8px_0px_0px_#F5F5F5] md:shadow-[20px_20px_0px_0px_#F5F5F5]"
        >
          <source src={bannerVideo} type="video/mp4" />
        </video>
      </div>

      {/* code section */}
      <div className=" w-11/12 flex flex-col md:items-center gap-8 md:gap-24 py-10 px-4 md:px-28">
        {/* code section */}

        <CodeSection
          gradient={"orange"}
          isFlexReverse={false}
          headingPartA={"Unlock your "}
          headingPartB={"with our online courses."}
          highlightHeading={"coding potenial"}
          description={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }
          primaryButton={{
            isActive: true,
            changeText: "Try it Yourself",
            trailingIcon: true,
            linkTo: "/courses",
          }}
          secondaryButton={{
            isActive: false,
            changeText: "Learn More",
            trailingIcon: false,
            linkTo: "",
          }}
        />
        {/* code section - 2 */}
        <CodeSection
          gradient={"blue"}
          isFlexReverse={true}
          headingPartA={"Start"}
          headingPartB={""}
          highlightHeading={"coding in seconds"}
          description={
            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          }
          primaryButton={{
            isActive: true,
            changeText: "Continue Lesson",
            trailingIcon: true,
            linkTo: "/courses",
          }}
          secondaryButton={{
            isActive: false,
            changeText: "Learn More",
            trailingIcon: false,
            linkTo: "",
          }}
        />
      </div>

      {/* Explore Courses Section */}
      <div className="w-full h-[1400px] md:h-[820px] md:pt-16 ">
        <ExploreCoursesSection />
      </div>

      {/* get skills section */}
      <div className="bg-pure-greys-5 h-fit py-2 md:py-24 px-2 md:px-32 w-full">
        <GetSkills />
      </div>

      {/* learn language section */}
      <div className="w-full md:max-h-[940px] py-4 md:py-24 px-2 md:px-28 bg-pure-greys-5">
        <LeanLanguage />
      </div>

      {/* Become instrutor section */}
      <div className="w-11/12 py-4 md:py-24 md:px-32">
        <InstructionHome />
      </div>

      {/* Review Section */}

      {/* Footer */}
      <div className="w-full border-t-[1px] border-richblack-600 bg-richblack-800 py-12 md:px-32">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
