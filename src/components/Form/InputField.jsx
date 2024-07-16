import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const InputField = ({
  labelText,
  fieldName,
  inputType,
  placeholderText,
  trailingIcon,
  helperText,
  showPassword,
  setshowPassword,
  formData,
  errorText,
  link,
  required,
}) => {
  return (
    <div className="flex flex-col gap-2 text-inter">
      <label
        htmlFor={fieldName}
        className="text-sm text-richblack-5 font-normal flex"
      >
        {labelText}
        {required ? <p className="text-pink-200 font-normal text-sm">*</p> : ""}
      </label>
      <div className=" flex justify-between w-full bg-richblack-800 p-3 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] items-center rounded-lg">
        <input
          className="bg-richblack-800 text-richblack-200 w-full focus:outline-none "
          type={inputType}
          value={formData.fieldName}
          placeholder={placeholderText}
          name={fieldName}
        />
        {trailingIcon && (
          <span
            onClick={() =>
              fieldName === "confirmPassword"
                ? setshowPassword((prev) => !prev)
                : setshowPassword((prev) => !prev)
            }
            className="text-richblack-300 cursor-pointer"
          >
            {" "}
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        )}
      </div>
      <div className=" w-full flex justify-between text-xs font-normal ">
        <p className="w-1/2 text-right text-blue-100">{errorText}</p>
        <Link to={link} className="w-1/2 text-right text-blue-100">
          {helperText}
        </Link>
      </div>
    </div>
  );
};

export default InputField;
