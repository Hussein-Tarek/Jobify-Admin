import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
const Guard = () => {
  let IsAuthenticated;
  IsAuthenticated = localStorage.getItem("role");
  return (
    <>{IsAuthenticated == "admin" ? <Outlet /> : <Navigate to="/login" />}</>
  );
};

export default Guard;
