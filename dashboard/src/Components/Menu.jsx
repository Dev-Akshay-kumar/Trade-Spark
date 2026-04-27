import { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logoSrc from "../assets/logo2.png";

export default function Menu() {
  const [selectedMenu, setSelectedMenu] = useState();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };
  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };
    useEffect(() => {
      const isLogin = async () => {
        const res = await axios.get("http://localhost:3000/login",{
          withCredentials: true,
        });
       if (res.data.isLoggedIn) {
  setisLoggedIn(true);   // ✅ CORRECT
}

      };
      isLogin();
    }, []);
  return (
    <div className="w-full flex items-center md:space-x-6 h-10 space-x-3 justify-end">
      <Link to="/">
        <img src={logoSrc} alt="logo" className="w-100% h-20 object-contain" />
      </Link>
      <nav className="hidden md:flex space-x-6">
        <Link
          className="*:text-sm hover:text-orange-600 cursor-pointer"
          onClick={() => handleMenuClick(0)}
          to="/"
        >
          Home
        </Link>
        <Link
          className="*:text-sm hover:text-orange-600 cursor-pointer"
          onClick={() => handleMenuClick(1)}
          to="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="*:text-sm hover:text-orange-600 cursor-pointer"
          onClick={() => handleMenuClick(2)}
          to="/Orders"
        >
          Orders
        </Link>
        <Link
          className={`text-sm hover:text-orange-600 cursor-pointer ${
            selectedMenu === 2 ? "text-orange-600" : ""
          }`}
          onClick={() => handleMenuClick(3)}
          to="/Holdings"
        >
          Holdings
        </Link>
        <Link
          className={`text-sm hover:text-orange-600 cursor-pointer ${
            selectedMenu === 3 ? "text-orange-600" : ""
          }`}
          onClick={() => handleMenuClick(4)}
          to="/Positions"
        >
          Positions
        </Link>
        <Link
          className={`text-sm hover:text-orange-600 cursor-pointer ${
            selectedMenu === 4 ? "text-orange-600" : ""
          }`}
          onClick={() => handleMenuClick(5)}
          to="/Funds"
        >
          Funds
        </Link>
        <Link
          className={`text-sm hover:text-orange-600 cursor-pointer ${
            selectedMenu === 5 ? "text-orange-600" : ""
          }`}
          onClick={() => handleMenuClick(6)}
          to="/apps"
        >
          Apps
        </Link>
      </nav>
          
      {/* RIGHT SIDE AUTH SECTION */}
      {!isLoggedIn ? (
        /* LOGIN BUTTON (Before Login) */
        <Link
          to="/login"
          className="px-4 py-2 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
        >
          Login
        </Link>
      ) : (
        /* PROFILE ICON (After Login) */
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-xs font-semibold">
            AK
          </div>
          <div className="text-sm hover:text-orange-600">USERID</div>
        </div>
      )}

      {isProfileDropdownOpen && (
        <div className="absolute right-0 top-14 bg-white border shadow-md rounded-md transition-all duration-300 ease-in-out w-40 p-3 md:hidden z-20">
          <Link
            className="block py-1 text-sm hover:text-orange-600"
            onClick={() => setIsProfileDropdownOpen(false)}
            to="/"
          >
            Home
          </Link>
          <Link
            className="block py-1 text-sm hover:text-orange-600"
            to="/dashboard"
            onClick={() => setIsProfileDropdownOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            className="block py-1 text-sm hover:text-orange-600"
            to="/Orders"
            onClick={() => setIsProfileDropdownOpen(false)}
          >
            Orders
          </Link>

          <Link
            className="block py-1 text-sm hover:text-orange-600"
            to="/Holdings"
            onClick={() => setIsProfileDropdownOpen(false)}
          >
            Holdings
          </Link>

          <Link
            className="block py-1 text-sm hover:text-orange-600"
            to="/Positions"
            onClick={() => setIsProfileDropdownOpen(false)}
          >
            Positions
          </Link>

          <Link
            className="block py-1 text-sm hover:text-orange-600"
            to="/Funds"
            onClick={() => setIsProfileDropdownOpen(false)}
          >
            Funds
          </Link>

          <Link
            className="block py-1 text-sm hover:text-orange-600"
            to="/apps"
            onClick={() => setIsProfileDropdownOpen(false)}
          >
            Apps
          </Link>

          {/* Logout */}
          <Link
            className="block py-1 text-sm mt-2 border-t pt-2 hover:text-red-500"
            to="/logout"
            onClick={() => setIsProfileDropdownOpen(false)}
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}
