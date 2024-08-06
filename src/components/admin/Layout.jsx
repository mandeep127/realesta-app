import React from "react";
import AdminHeader from "./Header";
import AdminSidebar from "./SideBar";
import AdminFooter from "./Footer";
import Routing from "../../routes/routing";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = () => {
  const params = useLocation();

  return (
    <div className="d-flex flex-column vh-100">
      <div className="d-flex flex-grow-1">
        <div className="sidebar bg-light border-end" style={{ width: "220px" }}>
          <AdminSidebar />
        </div>
        <div className="flex-grow-1 d-flex flex-column">
          <AdminHeader />
          <div className="flex-grow-1 overflow-auto mx-4 my-3">
            <Routing />
          </div>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
};

export default Layout;
