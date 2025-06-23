import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Registration successful! Please login.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setMessage(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center">
      <div className="flex flex-col shadow-xl rounded-lg px-3 py-6">
        <h3 className="text-2xl font-medium">Create Account</h3>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className="font-medium mb-2 mt-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            placeholder="Full Name"
            className="shadow focus:outline-none px-6 py-1 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">Name is required</p>
          )}

          <label htmlFor="email" className="font-medium mb-2 mt-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            placeholder="Email Address"
            className="shadow focus:outline-none px-6 py-1 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">Email is required</p>
          )}

          <label htmlFor="password" className="font-medium mb-2 mt-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            placeholder="Password"
            className="shadow focus:outline-none px-6 py-1 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              Password must be at least 6 characters
            </p>
          )}

          <label htmlFor="confirmPassword" className="font-medium mb-2 mt-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", { required: true })}
            placeholder="Confirm Password"
            className="shadow focus:outline-none px-6 py-1 rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs italic">Confirm password is required</p>
          )}

          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="text-white rounded-md bg-blue-700 w-fit px-6 py-1 mt-3 mb-3"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mb-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700">
            Login
          </Link>
        </p>
        <button className="flex items-center justify-center gap-2 py-1 bg-black rounded-md text-white">
          <FaGoogle className="size-4" /> Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
