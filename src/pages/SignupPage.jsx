import React from "react";
import signupImg from "../assets/Images/signup.webp";
import Template from "./../components/Form/Template";

const SignupPage = () => {
  return (
    <>
      <Template
        title="Join the millions learning to code with Learn Sphere for free"
        desc1="Build skills for today,tomorrow and beyond."
        desc2="Education to future-proof your career."
        image={signupImg}
        formType="signup"
      />
    </>
  );
};

export default SignupPage;
