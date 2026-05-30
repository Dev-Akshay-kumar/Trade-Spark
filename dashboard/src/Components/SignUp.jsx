import { useState } from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function SignUp() {

  const navigate = useNavigate();

  // GLOBAL AUTH CONTEXT
  const {
    setIsLoggedIn,
    setUser,
  } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      username: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:3000/signup",
        formData,
        {
          withCredentials: true,
        }
      );

      // AUTO LOGIN AFTER SIGNUP
      setIsLoggedIn(true);

      setUser(res.data.user);

      alert("Signup successful!");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Signup failed"
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6"
      >

        {/* LOGIN / SIGNUP TABS */}
        <div className="flex bg-gray-100 rounded-lg p-1">

          <Link
            to="/login"
            className="flex-1 text-center py-2 rounded-md text-sm font-medium text-gray-600 hover:text-orange-600"
          >
            Login
          </Link>

          <div className="flex-1 text-center py-2 rounded-md bg-orange-500 text-white text-sm font-medium">
            Signup
          </div>

        </div>

        {/* HEADING */}
        <h2 className="text-3xl font-semibold text-center text-slate-700">
          Create Account
        </h2>

        <p className="text-center text-gray-500 text-sm">
          Sign up to start trading
        </p>

        {/* EMAIL */}
        <div>

          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

        </div>

        {/* USERNAME */}
        <div>

          <label className="block text-sm font-medium text-gray-600 mb-1">
            Username
          </label>

          <input
            type="text"
            name="username"
            placeholder="yourname"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

        </div>

        {/* PASSWORD */}
        <div>

          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition"
        >
          Sign Up
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-orange-600 font-medium hover:underline"
          >
            Login here
          </Link>

        </p>

      </form>

    </div>
  );
}

export default SignUp;  