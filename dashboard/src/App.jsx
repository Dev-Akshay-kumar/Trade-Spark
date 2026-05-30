import Home from "./Components/Home";
import Login from "./Components/Login";

import "./App.css";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          <Route
            path="/*"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;