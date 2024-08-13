import React, { useState } from "react";
import { FaTachometerAlt, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Header.css";
import Img from "../../assets/dark.gif";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("/admin/dashboard");

  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  return (
    <aside className="sidebar p-3">
      <div className="welcome-message mb-4 text-center">
        <img src={Img} alt="Admin" className="img-fluid" />
        <h4 className="mt-2">Welcome Admin</h4>
        <hr />
      </div>
      <nav className="nav flex-column">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `nav-link d-flex fw-bold align-items-center mb-2 ${
              isActive ? "active" : ""
            }`
          }
          onClick={() => handleNavClick("/admin/dashboard")}
        >
          <FaTachometerAlt className="me-2" /> Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `nav-link d-flex fw-bold align-items-center mb-2 ${
              isActive ? "active" : ""
            }`
          }
          onClick={() => handleNavClick("/admin/users")}
        >
          <FaUser className="me-2" /> Users
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `nav-link d-flex fw-bold align-items-center mb-2 ${
              isActive ? "active" : ""
            }`
          }
          onClick={() => handleNavClick("/admin/settings")}
        >
          <FaCog className="me-2" /> Settings
        </NavLink>

        <NavLink
          to="/admin/logout"
          className={({ isActive }) =>
            `nav-link d-flex fw-bold align-items-center mb-2 ${
              isActive ? "active" : ""
            }`
          }
          onClick={() => handleNavClick("/admin/logout")}
        >
          <FaSignOutAlt className="me-2" /> Logout
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
