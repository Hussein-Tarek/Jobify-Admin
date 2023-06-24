import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  // const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const signUp = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/v1/signup", {
        ...data,
      });
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("accessToken", response.data.accessToken);
      let fullName = `${response.data.user.first_name} ${response.data.user.last_name}`;

      localStorage.setItem("name", fullName);
      localStorage.setItem("id", response.data.user.id);
      localStorage.setItem("role", response.data.user.role);
      navigate("/user/info", { replace: true });
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.errors[0].message);
      } else if (error.request) {
        setError("Server is not responding. Please try again later.");
      } else {
        setError("Unexpected Error");
      }
    }
    setIsLoading(false);
  };
  // const origin = "http://52.58.155.219:5000/";
  const origin = "http://localhost:5000/";
  const login = async (data) => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await axios.post(`${origin}v1/login`, {
        ...data,
      });
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("accessToken", response.data.accessToken);
      if (response.data.user.name) {
        localStorage.setItem("name", response.data.user.name);
      } else if (response.data.user.first_name) {
        let fullName = `${response.data.user.first_name} ${response.data.user.last_name}`;
        localStorage.setItem("name", fullName);
      }
      localStorage.setItem("id", response.data.user.id);
      localStorage.setItem("role", response.data.user.role);
      if (response.data.user.role != "admin") {
        setError("You are not authorized");
      }
      setIsLoading(false);

      navigate("/", { replace: true });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error.response) {
        setError(error.response.data.errors[0].message);
      } else if (error.request) {
        setError("Server is not responding. Please try again later.");
      } else {
        setError("Unexpected Error");
      }
    }
  };

  const authContextValue = {
    signUp,
    login,
    error,
    isLoading,
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
