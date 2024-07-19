import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CTAButton from "./../components/core/HomePage/CTAButton";
import { Link } from "react-router-dom";
import { getPasswordResentToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset Password clicked");
    dispatch(getPasswordResentToken(email, setEmailSent));
  };
  return (
    <div className="text-richblack-25">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{emailSent ? "Check your email" : "Reset your password"}</h1>
          <p>
            {emailSent
              ? `We have sent the reset email to your mail :  ${email}`
              : `Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery`}
          </p>
          <form onSubmit={handleSubmit}>
            {!email && (
              <lable>
                <p className="text-richblack-5">Email Address</p>
                <input
                  className="bg-richblack-700 text-richblack-5"
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
              </lable>
            )}
            <button type="submit">Reset Password</button>
            {/* <CTAButton
              type="submit"
              isActive={true}
              changeText={emailSent ? "Resend Mail" : "Reset Password"}
            /> */}
          </form>

          <div>
            <Link to="/login">
              <p>Back to login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
