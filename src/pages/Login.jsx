import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { AuthContext } from "../context/auth-context";
import Loading from "../components/Loading";

const Login = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const { login, error, isLoading, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    // if (role == "admin") {
    //   navigate("/");
    // }
  }, []);

  const [showPassword, setShowPassword] = useState(true);

  // handling submit

  const onSubmit = async function (data) {
    login(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // if (role == "admin") {
  //   navigate("/");
  // } else {
  return (
    <>
      <div className="items-center justify-center m-auto mb-10 lg:flex ">
        <div
          className={` flex w-[100%] lg:w-[50%] flex-col items-center absolute lg:left-0 lg:top-0 m-auto mt-20 `}
        >
          <h1 className="mb-10 text-5xl font-bold text-primary ">
            <Link to="/">Jobify</Link>
          </h1>
          <div className="lg:w-[65%] lg:p-0 px-10 w-full">
            <h1 className="mb-5 text-xl font-semibold lg:text-3xl">Login</h1>
            <div className="mb-5">
              <span className="mr-1 text-sm text-neutral400 lg:text-lg">
                Don't have an account?
              </span>
              <Link className="text-sm text-primary lg:text-lg" to="/signup">
                SignUp
              </Link>
            </div>
          </div>
          <div className="lg:w-[65%] lg:p-0 px-10 w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full mb-5 form-control">
                <label className="label" htmlFor="email">
                  <span className="font-bold label-text font-Jakarta">
                    Email
                  </span>
                </label>
                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="text"
                  placeholder="Email"
                  className="w-full transition-all duration-300 ease-in-out border-white shadow-md outline-none input focus:border-primary focus:outline-none"
                />
                {errors["email"] && (
                  <p className="m-1 text-sm text-red-500">
                    {errors["email"].message}
                  </p>
                )}
              </div>
              <label className="label" htmlFor="password">
                <span className="font-bold label-text font-Jakarta">
                  Password
                </span>
              </label>
              <div className="relative flex w-full mb-5 form-control">
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                    minLength: {
                      value: 8,
                      message: "Password should be more than 8 characters",
                    },
                  })}
                  type={showPassword ? "password" : "text"}
                  placeholder="Password"
                  className="w-full pr-10 transition-all duration-300 ease-in-out border-white shadow-md outline-none input focus:border-primary focus:outline-none"
                />

                <div
                  className="absolute flex items-center justify-center w-10 h-10 cursor-pointer right-3 top-1"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </div>
                {errors["password"] && (
                  <p className="m-1 text-sm text-red-500">
                    {errors["password"].message}
                  </p>
                )}
              </div>

              {error && (
                <p className="mb-5 text-center text-red-500">{error}</p>
              )}

              {isLoading ? (
                <Loading />
              ) : (
                <button className="w-full mt-2 mb-10 border-none btn bg-primary hover:bg-secondary text-gray-100">
                  Login
                  <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#FFFFFF"
                    className="w-6 h-6 ml-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </button>
              )}
            </form>
          </div>
        </div>

        <div
          style={{ backgroundImage: `url("../../src/assets/auth-img.png")` }}
          className={` w-[50%]  fixed top-0 right-0 bottom-0 hidden lg:block bg-no-repeat bg-center h-full bg-cover   `}
        ></div>
      </div>
    </>
  );
  // }
};

export default Login;
