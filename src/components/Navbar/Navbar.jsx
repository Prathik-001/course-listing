import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as authLogout } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import conf from "../../conf/conf";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const adminStatus = useSelector((state) => state.adminauth.status);

  // this below code is defining useNavigate hook to navigate user
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutUser = async () => {
    try {
      const res = await authService.logout();
      dispatch(authLogout(res));
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <nav className="w-full h-20 flex items-center justify-between bg-[#fffefa]">
        <Link to={"/"} className=" border-none outline-none">
          <h1 className=" text-2xl text-black p-5 font-semibold ml-14 font-playwrite bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-purple-400">
            DotLib
          </h1>
        </Link>

        {/* nav list start here */}
        <div className="text-black hidden text-md tracking-wide lg:block font-figtree">
          <Link to={"/"} className="text-black mr-4 hover:text-purple-600 ">
            Home
          </Link>
          <Link
            to={"/courses"}
            className="text-black mr-4 hover:text-purple-600"
          >
            Courses
          </Link>
          <Link
            to={"/wishlist"}
            className="text-black mr-4 hover:text-purple-600"
          >
            Wishlist
          </Link>

          <Link to={"/about"} className="text-black mr-4 hover:text-purple-600">
            About
          </Link>
          {adminStatus ? (
            <Link
              className="text-black mr-4 hover:text-purple-600"
              to={conf.adminRouteLink}
            >
              Admin
            </Link>
          ) : (
            false
          )}
          {!authStatus ? (
            <Link
              to={"/login"}
              className=" text-black mr-4 hover:text-purple-600 ease-in-out transition"
            >
              Login
            </Link>
          ) : null}
        </div>
        {/*nav list ends here */}

        {/*  hamburger starts here*/}

        <div className="lg:hidden" onClick={() => setShowLinks(!showLinks)}>
          <IoMenu size={40} color="white" />
        </div>
        {/* hamburger ends here */}

        {/* <!-- create account button statrs here --> */}
        <div className="hidden lg:block p-3 text-white mr-5 font-poppins">
          {authStatus ? (
            <button
              className="rounded-xl font-medium px-6 py-3 bg-purple-500  text-white"
              onClick={() => logoutUser()}
            >
              Sign out
            </button>
          ) : (
            <Link to={"/signup"}>
              <button className="rounded-xl font-medium btn-hover-animation color-7">
                Create new account
              </button>
            </Link>
          )}
        </div>
        {/*create account button ends here */}

        {/*navbar for smaller devices */}
        {showLinks ? (
          <div id="toggleMenue" className=" bg-white fixed inset-0 lg:hidden">
            <div className="w-full h-20 bg-slate-950  flex items-center justify-between border-b-2">
              <Link to={"/"}>
                <h1 className=" text-3xl text-white p-5 font-semibold ml-5 font-inter">
                  DotLib
                </h1>
              </Link>
              <div
                className="lg:block"
                onClick={() => setShowLinks(!showLinks)}
              >
                <RxCross2 size={40} color="white" />
              </div>
            </div>
            <div className="mt-6">
              <Link
                to={"/"}
                className="mr-4 hover:text-cyan-500 hover:bg-gray-50 rounded-lg m-4 p-3 font-medium font-inter block"
                onClick={() => setShowLinks(!showLinks)}
              >
                Home
              </Link>
              <Link
                to={"/courses"}
                className="mr-4 hover:text-cyan-500 hover:bg-gray-50 rounded-lg m-4 p-3 font-medium font-inter block"
                onClick={() => setShowLinks(!showLinks)}
              >
                Courses
              </Link>
              <Link
                to={"/wishlist"}
                className="mr-4 hover:text-cyan-500 hover:bg-gray-50 rounded-lg m-4 p-3 font-medium font-inter block"
                onClick={() => setShowLinks(!showLinks)}
              >
                Wishlist
              </Link>
              <Link
                to={"/aboutus"}
                className="mr-4 hover:text-cyan-500 hover:bg-gray-50 rounded-lg m-4 p-3 font-medium font-inter block"
                onClick={() => setShowLinks(!showLinks)}
              >
                About us
              </Link>
              <Link
                to={"/login"}
                className="mr-4 hover:text-cyan-500 hover:bg-gray-50 rounded-lg m-4 p-3 font-medium font-inter block"
                onClick={() => setShowLinks(!showLinks)}
              >
                log in
              </Link>
            </div>
            <div className="w-full h-[1px] bg-gray-300"></div>
            <div className=" bg-cyan-600 px-2 py-4 text-white rounded-sm font-inter w-48 ml-5 mt-6 text-center">
              <Link to={"/signup"}>
                <button>Create new account</button>
              </Link>
            </div>
          </div>
        ) : null}
        {/*navbar for smaller devices*/}
      </nav>
      {/*navbar ends here*/}
    </div>
  );
}

export default Navbar;
