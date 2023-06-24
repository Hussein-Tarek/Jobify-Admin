import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  let navClass;
  if (
    location.pathname === "/signup" ||
    location.pathname === "/login" ||
    location.pathname === "/employer/signup"
  ) {
    navClass = "hidden";
    return null;
  } else {
    return (
      <div
        className={`${navClass} fixed bottom-0 z-10 w-full h-16 mt-16 bg-gray-800 shadow-xl md:relative md:h-screen md:w-56   `}
      >
        <div className="content-center justify-between text-left md:mt-20 md:w-48 md:fixed md:left-0 md:top-0 md:content-start">
          <ul className="flex flex-row px-1 py-0 text-center list-reset md:flex-col md:py-3 md:px-2 md:text-left">
            <li className="flex-1 mr-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block py-1 pl-1 text-white  no-underline align-middle border-b-2  md:py-3 hover:text-white border-purple-50"
                    : `block py-1 pl-1 text-gray-400 no-underline align-middle border-b-2 border-gray-800 md:py-3 hover:text-white hover:border-purple-50 `
                }
              >
                <i className="pr-0 fas fa-tasks md:pr-3"></i>
                Employers
              </NavLink>
            </li>
            <li className="flex-1 mr-3">
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive
                    ? "block py-1 pl-1 text-white  no-underline align-middle border-b-2 md:py-3 hover:text-white border-purple-50"
                    : `block py-1 pl-1 text-gray-400 no-underline align-middle border-b-2 border-gray-800 md:py-3 hover:text-white hover:border-purple-50 `
                }
              >
                <i className="pr-0 fa fa-envelope md:pr-3"></i>
                users
              </NavLink>
            </li>
            <li className="flex-1 mr-3">
              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  isActive
                    ? "block py-1 pl-1 text-white  no-underline align-middle border-b-2  md:py-3 hover:text-white border-purple-50"
                    : `block py-1 pl-1 text-gray-400 no-underline align-middle border-b-2 border-gray-800 md:py-3 hover:text-white hover:border-purple-50 `
                }
              >
                <i className="pr-0 text-blue-600 fas fa-chart-area md:pr-3"></i>
                Jobs
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

export default Sidebar;
