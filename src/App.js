import React from "react";
import { Route, Routes } from "react-router";
// import WelcomePage from "./components/user/WelcomePage";
import Layouts from "./components/user/Layouts";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminLayout from "./components/admin/Layout";
import Home from "./pages/User/Home";
import UserLogin from "./pages/User/UserLogin";
import Register from "./pages/User/UserRegister";
import PropertyForm from "./pages/User/PropertyForm";
import PropertyDetail from "./pages/User/PropertyDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<AdminLayout />} />

        <Route
          path="/"
          element={
            <>
              <Layouts>
                <Home />
              </Layouts>
            </>
          }
        />
        <Route
          path="/add-property"
          element={
            <>
              <Layouts>
                <PropertyForm />
              </Layouts>
            </>
          }
        />
        <Route
          path="/property/:id"
          element={
            <>
              <Layouts>
                <PropertyDetail />
              </Layouts>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
