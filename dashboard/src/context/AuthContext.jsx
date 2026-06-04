import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  // CHECK LOGIN
  useEffect(() => {

    const checkLogin = async () => {

      try {

        const res = await axios.get(
          "https://trade-spark-backend.onrender.com/me",
          {
            withCredentials: true,
          }
        );

        if (res.data.isLoggedIn) {

          setIsLoggedIn(true);

          setUser(res.data.user);
        }

      } catch (error) {

        console.log(error);
      }

      setLoading(false);
    };

    checkLogin();

  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// CUSTOM HOOK
export const useAuth = () => {
  return useContext(AuthContext);
};