import React from "react";
import { Route, Routes } from "react-router";
import Dashboard from "../pages/Admin/Dashboard";

const routing = () => {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default routing;
