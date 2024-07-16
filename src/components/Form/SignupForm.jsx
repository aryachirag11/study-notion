import React, { useState } from "react";
import toast from "react-hot-toast";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const changeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // setIsLoggedIn(true);
    toast.success("Account Created");
    navigate("/dashboard");
  };
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-5">
      <div className="flex gap-5">
        <InputField
          required={true}
          labelText="First Name"
          fieldName="firstName"
          inputType="text"
          placeholderText="Enter first name"
          trailingIcon={false}
          formData={formData}
        />
        <InputField
          required={true}
          labelText="Last Name"
          fieldName="lastName"
          inputType="text"
          placeholderText="Enter last name"
          trailingIcon={false}
          formData={formData}
        />
      </div>
      <InputField
        required={true}
        labelText="Email Address"
        fieldName="email"
        inputType="email"
        placeholderText="Enter email address"
        trailingIcon={false}
        formData={formData}
      />
      <div className="flex gap-5">
        <InputField
          required={true}
          labelText="Create Password"
          fieldName="password"
          inputType={showPassword ? "text" : "password"}
          placeholderText="Enter Password"
          trailingIcon={true}
          showPassword={showPassword}
          setshowPassword={setshowPassword}
          formData={formData}
        />
        <InputField
          required={true}
          labelText="Confirm Password"
          fieldName="confirmPassword"
          inputType={showConfirmPassword ? "text" : "password"}
          placeholderText="Enter Password"
          trailingIcon={true}
          showPassword={showConfirmPassword}
          setshowPassword={setShowConfirmPassword}
          formData={formData}
        />
      </div>
    </form>
  );
};

export default SignupForm;
