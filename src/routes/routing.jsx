import React from "react";
import { Route, Routes } from "react-router";
import Dashboard from "../pages/Admin/Dashboard";
import PropertyInfo from "../pages/Admin/PropertyInfo";
import UsersList from "../pages/Admin/UsersList";
import UserDetails from "../pages/Admin/UserDetails";

import AdminLogout from "../components/admin/AdminLogout";
import PropertyList from "../pages/Admin/PropertyList";
import Setting from "../pages/Admin/Setting";
import AdminProfile from "../pages/Admin/AdminProfile";
import AdminChangePass from "../pages/Admin/AdminChangePass";

const routing = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/property/:id" element={<PropertyInfo />} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/user/:id" element={<UserDetails />} />
        <Route path="/admin/property" element={<PropertyList />} />
        <Route path="/admin/settings" element={<Setting />} />
        <Route path="/admin/logout" element={<AdminLogout />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/change-password" element={<AdminChangePass />} />
      </Routes>
    </>
  );
};

export default routing;
