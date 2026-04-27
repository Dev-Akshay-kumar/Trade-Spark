import Home from "./Components/Home";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
// import ProtectedRoute from "./Pages/ProtectedRoute";
// import { AuthProvider } from "./Pages/AuthContext";
function App() {
  return (
    <>
      {/* <AuthProvider> */}
        <BrowserRouter>
          <Routes>
            {/* <Route path="/login" element={<Login />} /> */}
            <Route
              path="/*"
              element={
                // <ProtectedRoute>
                  <Home />
                // </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
