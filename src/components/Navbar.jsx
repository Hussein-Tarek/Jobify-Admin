import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  if (location.pathname == "/login") {
    return null;
  } else {
    return (
      <nav
        className={`fixed top-0 z-20 w-full h-auto p-1 pt-2 pb-1 mt-0 bg-gray-800 md:pt-1 `}
      >
        <div className="flex items-center ">
          <div className="flex justify-between flex-1 p-2 text-white md:w-1/3 md:justify-start">
            <div className="flex flex-row">
              <img className="w-20 h-16 mt-[-5px]" src="/logo6-preview.png" />
              <p className="ml-[-15px] mt-2">Jobify</p>
            </div>
          </div>

          {/* <div className="flex content-center justify-between w-full  md:w-1/3 md:justify-end">
            <ul className="flex items-center justify-between flex-1 list-reset md:flex-none">
              <li className="flex-1 md:flex-none md:mr-3"> */}
          <div className="mt-[-15px]">
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="inline-block px-4  font-bold text-white no-underline mr-2"
            >
              Logout
            </button>
          </div>
          {/* </li>
            </ul>
          </div> */}
        </div>
      </nav>
    );
  }
};

export default Navbar;
