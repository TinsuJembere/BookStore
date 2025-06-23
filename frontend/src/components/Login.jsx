import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("https://book-store-2eba.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      const result = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        // Show success message
        setMessage("Login successful! Redirecting...");
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setMessage(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center">
      <div className="flex flex-col shadow-xl rounded-lg px-6 py-8 w-full max-w-md">
        <h3 className="text-2xl font-medium text-center mb-6">Welcome Back!</h3>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mb-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-700 hover:text-blue-800 font-medium">
            Register
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
          onClick={() => setMessage("Google sign-in will be implemented soon!")}
        >
          <FaGoogle className="size-4" /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
