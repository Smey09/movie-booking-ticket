import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

const Register = () => {
  const navigate = useNavigate();
  const [errorsMessage, setErrorsMessage] = useState("");
  const [isRegistering, SetIsRegistering] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    SetIsRegistering(true);
    try {
      const response = await axios.post("/auth/register", data);
      toast.success("Registration successful!", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: false,
      });
      navigate("/");
    } catch (error) {
      console.error(error.response.data);
      setErrorsMessage(error.response.data);
      toast.error("Error", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: false,
      });
    } finally {
      SetIsRegistering(false);
    }
  };

  const inputClasses = (error) => {
    return `appearance-none rounded-md block w-full px-3 py-2 border ${
      error ? "border-red-500" : "border-gray-300"
    } placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-500`;
  };

  const movie_poster =
    "https://infotainment.ams.com.kh/wp-content/uploads/2023/12/photo_2023-12-18_14-32-01-1024x524.jpg";

  return (
    <div>
      <Navbar />
      <div
        className={`relative flex min-h-screen items-center justify-center bg-[url('${movie_poster}')] bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8`}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl sm:max-w-lg md:max-w-xl lg:max-w-xl xl:max-w-md">
          <div>
            <h2 className="mt-4 text-center text-4xl font-extrabold text-gray-900">
              Register
            </h2>
          </div>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              name="username"
              type="text"
              autoComplete="username"
              {...register("username", { required: true })}
              className={inputClasses(errors.username)}
              placeholder="Username"
            />
            {errors.username && (
              <span className="text-sm text-red-500">Username is required</span>
            )}
            <input
              name="email"
              type="email"
              autoComplete="email"
              {...register("email", { required: true })}
              className={inputClasses(errors.email)}
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-sm text-red-500">Email is required</span>
            )}
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={inputClasses(errors.password)}
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password?.message}
              </span>
            )}
            <div>
              {errorsMessage && (
                <span className="text-sm text-red-500">{errorsMessage}</span>
              )}
              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-blue-600 bg-gradient-to-br from-indigo-600 to-blue-500 py-2 px-4 font-medium text-white drop-shadow-md hover:bg-blue-700 hover:from-indigo-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:from-slate-500 disabled:to-slate-400"
                disabled={isRegistering}
              >
                {isRegistering ? "Processing..." : "Register"}
              </button>
            </div>
            <p className="text-right">
              Already have an account ? {"  "}
              <Link to={"/login"} className="font-bold text-blue-600">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
