import React from "react";
import { Route, Routes } from "react-router";
import Dashboard from "../pages/Admin/Dashboard";
import PropertyInfo from "../pages/Admin/PropertyInfo";

const routing = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/property/:id" element={<PropertyInfo />} />
      </Routes>
    </>
  );
};

export default routing;
