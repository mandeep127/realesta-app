import React from "react";
import { Route, Routes } from "react-router";
import Dashboard from "../pages/Admin/Dashboard";
import PropertyInfo from "../pages/Admin/PropertyInfo";
import UsersList from "../pages/Admin/UsersList";
import UserDetails from "../pages/Admin/UserDetails";

const routing = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/property/:id" element={<PropertyInfo />} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/user/:id" element={<UserDetails />} />
      </Routes>
    </>
  );
};

export default routing;
