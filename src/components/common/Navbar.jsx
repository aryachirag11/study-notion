import React, { useState } from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { FaAngleDown, FaSearch, FaUserAstronaut } from "react-icons/fa";
// import SecondaryButton from "./SecondaryButton";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../../redux/slices/authSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
const Navbar = () => {
  const [currNavPath, setCurrNavPath] = useState("Home");
  const location = useLocation();
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log("Login / Sign in clicked");
  };
  // const matchRoute = (route) => {
  //   return matchRoute({ path: route }, location.pathname);
  // };

  return (
    <div className="w-full h-14 border-b  border-b-richblack-700 py-3 px-28">
      <div className="w-11/12 max-w-maxContent justify-center items-center flex gap-8">
        <Link className="w-40 h-8" to={"/"}>
          <img src={Logo} alt="Logo" />
        </Link>
        <nav className=" grow h-8 flex gap-6 justify-center items-center text-base text-richblack-25 font-normal font-inter">
          {NavbarLinks.map((item, index) => (
            <li
              key={index}
              className="list-none hover:text-yellow-50 hover:scale-95 transition-all duration-200"
            >
              {item.title === "Catalog" ? (
                <div className="flex gap-1 items-center cursor-pointer">
                  <p
                    className={` ${
                      currNavPath === item?.title ? "text-yellow-50" : ""
                    }
              `}
                  >
                    {item.title}
                  </p>
                  <FaAngleDown className="w-4 h-4" />
                </div>
              ) : (
                <Link
                  to={item?.path}
                  onClick={(e) => setCurrNavPath(e.target.innerText)}
                  className={` ${
                    currNavPath === item?.title ? "text-yellow-50" : ""
                  }
              `}
                >
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </nav>
        <div>
          {token !== null ? (
            <div className="w-40 h-10 flex gap-2 items-center text-richblack-200 justify-evenly">
              <FiSearch className="w-5 h-5 cursor-pointer" />
              {user && user?.accountType !== "Instructor" && (
                <Link to={"/dashboard/cart"} className="relative">
                  <FiShoppingCart className="w-5 h-5 cursor-pointer" />
                  {totalItems > 0 && (
                    <span className="absolute -top-3 -right-2 text-yellow-200 font-inter text-base font-light">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              <FiUser
                onClick={() => dispatch(logoutUser())}
                className="w-7 h-7 rounded-full cursor-pointer"
              />
            </div>
          ) : (
            <div className="w-40 max-h-10 flex gap-5">
              <Link
                to={"/login"}
                onClick={() => dispatch(loginUser())}
                className="h-8 flex items-center justify-center w-full rounded-md px-2 bg-richblack-800 border-b border-richblack-700 text-base font-medium text-richblack-100 hover:scale-95 transition-all duration-200"
              >
                Log in
              </Link>
              <Link
                to={"/signup"}
                onClick={() => dispatch(loginUser())}
                className="h-8 flex items-center justify-center w-full rounded-md  px-2 bg-richblack-800 border-b border-richblack-700 text-base font-medium text-richblack-100 hover:scale-95 transition-all duration-200"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
