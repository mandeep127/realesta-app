import React from "react";
import { Route, Routes } from "react-router";
import WelcomePage from "./components/user/WelcomePage";
import Layouts from "./components/user/Layouts";
import AdminLogin from "./pages/Admin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route
          path="/"
          element={
            <>
              <Layouts>
                <WelcomePage />
              </Layouts>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
