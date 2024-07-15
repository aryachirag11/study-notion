import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "../components/core/HomePage/CTAButton";
import HighlighText from "../components/core/HomePage/HighlighText";
import CodeSection from "../components/core/HomePage/CodeSection";
import bannerVideo from "../assets/Images/banner.mp4";
import "./Home.css";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LeanLanguage from "../components/core/HomePage/LeanLanguage";
import InstructionHome from "../components/core/HomePage/InstructionHome";
import Footer from "../components/common/Footer";
import ExploreCoursesSection from "../components/core/HomePage/ExploreCoursesSection";
import GetSkills from "../components/core/HomePage/GetSkills";
const Home = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Landing Section */}
      <div className=" w-11/12 self-center flex flex-col items-center gap-20">
        {/* Section - 1 */}
        <div>
          <div className="max-h-[276px] mx-auto flex flex-col max-w-[913px] items-center text-white justify-between gap-9">
            <Link to={"/signup"}>
              <div className="h-[44px]  group mt-16 p-1 mx-auto rounded-[500px] bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit gap-[10px] shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset]">
                <div className=" h-[36px] w-[227px] flex flex-row items-center gap-[10px] rounded-[100px] px-[18px] py-[6px] transition-all duration-200 group-hover:bg-richblack-900">
                  <p className="font-medium text-[16px] text-center text-richblack-200">
                    Become an Instructor
                  </p>
                  <FaArrowRight height="16px" width="16px" />
                </div>
              </div>
            </Link>

            <div className="flex flex-col gap-4 w-full min-h[108px]">
              <p className=" text-richblack-25 w-full h-11 font-semibold  font-inter text-4xl text-center tracking-tight">
                Empower Your Future with{" "}
                <HighlighText changeText={"Coding Skils"} />
              </p>
              <p className="h-11 w-full font-medium text-base text-center text-richblack-300">
                With our online coding courses, you can learn at your own pace,
                from anywhere in the world, and get access to a wealth of
                resources, including hands-on projects, quizzes, and
                personalized feedback from instructors.
              </p>
            </div>

            <div className="max-w-[308px] max-h-12 flex gap-6">
              <CTAButton
                style={"Primary"}
                changeText={"Learn More"}
                linkTo={"/signup"}
              />
              <CTAButton
                style={"Secondary"}
                changeText={"Book a Demo"}
                linkTo={"/login"}
              />
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="max-w-fit h-fit m-10 relative">
          <video
            muted
            loop
            autoPlay
            className="w-fit h-[515px] mx-auto mt-10 shadow-[20px_20px_0px_0px_#F5F5F5]  -z-10"
          >
            <source src={bannerVideo} type="video/mp4" />
          </video>
          <div
            className=" z-10 w-full h-[295px] absolute top-5 mx-auto opacity-40
            bg-gradient-to-br from-[#9CECFB] -from-9.12% via-[#65c7f7] via-48.59% to-[#0052D4] to-106.3%
          blur-3xl "
          ></div>
        </div>

        {/* code section */}
        <div className=" w-full flex flex-col items-center gap-24 py-10 px-28">
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
              style: "Primary",
              changeText: "Try it Yourself",
              trailingIcon: true,
              linkTo: "/courses",
            }}
            secondaryButton={{
              style: "secondary",
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
              style: "Primary",
              changeText: "Continue Lesson",
              trailingIcon: true,
              linkTo: "/courses",
            }}
            secondaryButton={{
              style: "secondary",
              changeText: "Learn More",
              trailingIcon: false,
              linkTo: "",
            }}
          />
        </div>
      </div>

      {/* Explore Courses Section */}
      <div className="w-full h-[820px] pt-16 ">
        <ExploreCoursesSection />
      </div>

      {/* get skills section */}
      <div className="bg-pure-greys-5 h-fit py-24 px-32 w-full">
        <GetSkills />
      </div>

      {/* learn language section */}
      <div className="w-full max-h-[940px] py-24 px-28 bg-pure-greys-5">
        <LeanLanguage />
      </div>

      {/* Become instrutor section */}
      <div className="w-11/12 py-24 px-32">
        <InstructionHome />
      </div>

      {/* Review Section */}

      {/* Footer */}
      <div className="w-full border-t-[1px] border-richblack-600 bg-richblack-800 py-12 px-32">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
