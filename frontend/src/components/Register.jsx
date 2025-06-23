import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("https://book-store-2eba.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Registration successful! Redirecting to login...");
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred during registration. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center">
      <div className="flex flex-col shadow-xl rounded-lg px-6 py-8 w-full max-w-md">
        <h3 className="text-2xl font-medium text-center mb-6">Create an Account</h3>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className="font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { 
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters"
              }
            })}
            placeholder="Enter your full name"
            className="shadow focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md mb-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
          )}

          <label htmlFor="email" className="font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            placeholder="Enter your email"
            className="shadow focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md mb-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
          )}

          <label htmlFor="password" className="font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            placeholder="Enter your password"
            className="shadow focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md mb-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
          )}

          {message && (
            <p className={`text-sm mb-3 ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`text-white rounded-md bg-blue-700 w-full px-6 py-2 mt-4 mb-4 font-medium
              ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800'}`}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center mb-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 hover:text-blue-800 font-medium">
            Login
          </Link>
        </p>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <button 
          className="flex items-center justify-center gap-2 py-2 bg-black rounded-md text-white w-full hover:bg-gray-800 transition-colors"
          onClick={() => setMessage("Google sign-up will be implemented soon!")}
        >
          <FaGoogle className="size-4" /> Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
