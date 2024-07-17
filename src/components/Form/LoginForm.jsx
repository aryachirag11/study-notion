import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CTAButton from "./../core/HomePage/CTAButton";
import toast from "react-hot-toast";
import InputField from "./InputField";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setshowPassword] = useState(false);
  const changeHandler = (event) => {
    setformData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };
  const submitHandler = (event) => {
    event.preventDefault();
    toast.success("Logged In");
    navigate("/dashboard");
  };
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-5">
      {/* <label htmlFor="email">
        <p>
          Email Address<sup className="text-yellow-200">*</sup>
        </p>
        <input
          type="email"
          required
          value={FormData.email}
          placeholder="Enter email address"
          name="email"
        />
      </label> */}
      <InputField
        labelText="Email Address"
        fieldName="email"
        inputType="email"
        placeholderText="Enter email address"
        trailingIcon={false}
        showPassword={showPassword}
        setshowPassword={setshowPassword}
        formData={formData}
      />
      <InputField
        labelText="Password"
        fieldName="password"
        inputType={showPassword ? "text" : "password"}
        placeholderText="Enter Password"
        trailingIcon={true}
        helperText="Forgot password?"
        showPassword={showPassword}
        setshowPassword={setshowPassword}
        formData={formData}
      />
      {/* <label htmlFor="password">
        <p>
          Password<sup className="text-yellow-200">*</sup>
        </p>
        <input
          type={showPassword ? "text" : "password"}
          required
          value={FormData.password}
          placeholder="Enter Password"
          name="password"
        />
        <span onClick={() => setshowPassword((prev) => !prev)}></span>
        <Link>
          <p>Forgot Passowrd</p>
        </Link>
      </label> */}
      <div className="w-full flex justify-center">
        <CTAButton isActive={true} changeText={"Sign In"} />
      </div>
    </form>
  );
};

export default LoginForm;
