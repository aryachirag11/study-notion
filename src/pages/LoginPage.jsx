import React from "react";
import LoginImage from "../assets/Images/login.webp";
import Template from "./../components/Form/Template";

const LoginPage = () => {
  return (
    <>
      <Template
        title="Welcome Back"
        desc1="Build skills for today, tomorrow and beyond."
        desc2="Education to future-proof your career."
        image={LoginImage}
        formType="login"
      />
    </>
  );
};

export default LoginPage;
