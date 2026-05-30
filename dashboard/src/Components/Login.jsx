import { useState } from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  // CONTEXT
  const {
    setIsLoggedIn,
    setUser,
  } = useAuth();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // UPDATE GLOBAL STATE
      setIsLoggedIn(true);

      setUser(res.data.user);

      alert(res.data.message);

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6"
      >

        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">

          <div className="flex-1 text-center py-2 rounded-md bg-orange-500 text-white text-sm font-medium">
            Login
          </div>

          <Link
            to="/signup"
            className="flex-1 text-center py-2 rounded-md text-sm font-medium text-gray-600 hover:text-orange-600"
          >
            Signup
          </Link>

        </div>

        <h2 className="text-3xl font-semibold text-center text-slate-700">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 text-sm">
          Login to your account
        </p>

        {/* Email */}
        <div>

          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

        </div>

        {/* Password */}
        <div>

          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg cursor-pointer font-medium hover:bg-orange-600 transition"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">

          Don’t have an account?{" "}

          <Link
            to="/signup"
            className="text-orange-600 font-medium hover:underline"
          >
            Sign up here
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;