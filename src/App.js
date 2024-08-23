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
import Property from "./pages/User/Property";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserProfile from "./pages/User/UserProfile";
import UserLogout from "./components/user/UserLogout";
import UserChangePass from "./pages/User/UserChangePass";
import ComingSoon from "./pages/User/ComingSoon";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<UserLogout />} />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />

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
        <Route
          path="/property"
          element={
            <>
              <Layouts>
                <Property />
              </Layouts>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Layouts>
                <UserProfile />
              </Layouts>
            </>
          }
        />

        <Route
          path="/change-password"
          element={
            <>
              <Layouts>
                <UserChangePass />
              </Layouts>
            </>
          }
        />

        <Route
          path="/coming-soon"
          element={
            <>
              <Layouts>
                <ComingSoon />
              </Layouts>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
