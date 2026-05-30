import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import logoSrc from "../assets/logo2.png";

import { useAuth } from "../context/AuthContext";

export default function Menu() {

  const navigate = useNavigate();

  // GLOBAL AUTH CONTEXT
  const {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
  } = useAuth();

  const [selectedMenu, setSelectedMenu] =
    useState(0);

  const [
    isProfileDropdownOpen,
    setIsProfileDropdownOpen,
  ] = useState(false);

  // ================= MENU =================
  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  // ================= PROFILE =================
  const handleProfileClick = () => {
    setIsProfileDropdownOpen(
      !isProfileDropdownOpen
    );
  };

  // ================= LOGOUT =================
  const handleLogout = async () => {

    try {

      await axios.get(
        "http://localhost:3000/logout",
        {
          withCredentials: true,
        }
      );

      // CLEAR GLOBAL STATE
      setIsLoggedIn(false);

      setUser(null);

      navigate("/login");

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="w-full flex items-center md:space-x-7 h-10 space-x-3 justify-end">

      {/* LOGO */}
      <Link to="/">
        <img
          src={logoSrc}
          alt="logo"
          className="w-100% h-20 object-contain flex flex-start"
        />
      </Link>

      {/* DESKTOP NAV */}
      <nav className="hidden md:flex items-center space-x-5">

        <Link
          className="text-sm hover:text-orange-600"
          onClick={() => handleMenuClick(0)}
          to="/"
        >
          Home
        </Link>

        <Link
          className="text-sm hover:text-orange-600"
          onClick={() => handleMenuClick(1)}
          to="/dashboard"
        >
          Dashboard
        </Link>

        <Link
          className="text-sm hover:text-orange-600"
          onClick={() => handleMenuClick(2)}
          to="/Orders"
        >
          Orders
        </Link>

        <Link
          className="text-sm hover:text-orange-600"
          onClick={() => handleMenuClick(3)}
          to="/Holdings"
        >
          Holdings
        </Link>

        <Link
          className="text-sm hover:text-orange-600"
          onClick={() => handleMenuClick(4)}
          to="/Positions"
        >
          Positions
        </Link>

        <Link
          className="text-sm hover:text-orange-600"
          onClick={() => handleMenuClick(5)}
          to="/Funds"
        >
          Funds
        </Link>

        <Link
          className="text-sm hover:text-orange-600"
          onClick={() => handleMenuClick(6)}
          to="/apps"
        >
          Apps
        </Link>

      </nav>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {!isLoggedIn ? (

          // LOGIN BUTTON
          <Link
            to="/login"
            className="px-4 py-2 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            Login
          </Link>

        ) : (

          <>
            {/* DESKTOP PROFILE */}
            <div className="hidden md:flex items-center gap-4">

              <div className="flex items-center gap-2">

                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-xs font-semibold">

                  {user?.email
                    ?.charAt(0)
                    .toUpperCase()}

                </div>

                <div className="text-sm font-medium">

                  {user?.username}

                </div>

              </div>

              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
              >
                Logout
              </button>

            </div>

            {/* MOBILE PROFILE ICON */}
            <div
              className="md:hidden flex items-center cursor-pointer"
              onClick={handleProfileClick}
            >

              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-xs font-semibold">

                {user?.email
                  ?.charAt(0)
                  .toUpperCase()}

              </div>

            </div>
          </>
        )}
      </div>

      {/* MOBILE DROPDOWN */}
      {isProfileDropdownOpen && (

        <div className="absolute right-4 top-16 bg-white border shadow-lg rounded-md w-44 p-3 z-50 md:hidden">

          <Link
            className="block py-2 text-sm hover:text-orange-600"
            to="/"
            onClick={() =>
              setIsProfileDropdownOpen(false)
            }
          >
            Home
          </Link>

          <Link
            className="block py-2 text-sm hover:text-orange-600"
            to="/dashboard"
            onClick={() =>
              setIsProfileDropdownOpen(false)
            }
          >
            Dashboard
          </Link>

          <Link
            className="block py-2 text-sm hover:text-orange-600"
            to="/Orders"
            onClick={() =>
              setIsProfileDropdownOpen(false)
            }
          >
            Orders
          </Link>

          <Link
            className="block py-2 text-sm hover:text-orange-600"
            to="/Holdings"
            onClick={() =>
              setIsProfileDropdownOpen(false)
            }
          >
            Holdings
          </Link>

          <Link
            className="block py-2 text-sm hover:text-orange-600"
            to="/Positions"
            onClick={() =>
              setIsProfileDropdownOpen(false)
            }
          >
            Positions
          </Link>

          <button
            className="block w-full text-left py-2 text-sm border-t mt-2 pt-2 text-red-500 hover:text-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      )}

    </div>
  );
}