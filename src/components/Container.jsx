import React from "react";
import { useLocation } from "react-router-dom";

const Container = ({ children }) => {
  const location = useLocation();

  let navClass;
  if (location.pathname === "/login") {
    navClass = "w-0";
  }
  return <div className={`flex justify-between ${navClass} `}>{children}</div>;
};

export default Container;
