
import React, { useState } from 'react';
import { FaTachometerAlt, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Nav } from 'react-bootstrap';
import './Header.css';
import Img from '../../assets/dark.gif'; 

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('#dashboard');

  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  return (
    <aside className="sidebar p-3">
      
      <div className="welcome-message mb-4 text-center">
        
      <img src={Img} alt="Admin" />
        <h4>Welcome Admin</h4>
        <hr/>
      </div>
      <Nav className="flex-column">
        <Nav.Link
          href="#dashboard"
          className={`d-flex fw-bold align-items-center mb-1 ${activeLink === '#dashboard' ? 'active' : ''}`}
          onClick={() => handleNavClick('#dashboard')}
        >
          <FaTachometerAlt className="me-2 fw-bold" /> Dashboard
        </Nav.Link>
        <Nav.Link
          href="#users"
          className={`d-flex fw-bold align-items-center mb-1 ${activeLink === '#users' ? 'active' : ''}`}
          onClick={() => handleNavClick('#users')}
        >
          <FaUser className="me-2 " /> Users
        </Nav.Link>
        <Nav.Link
          href="#settings"
          className={`d-flex fw-bold align-items-center mb-1 ${activeLink === '#settings' ? 'active' : ''}`}
          onClick={() => handleNavClick('#settings')}
        >
          <FaCog className="me-2" /> Settings
        </Nav.Link>
        <Nav.Link
          href="#logout"
          className={`d-flex fw-bold align-items-center mb-1 ${activeLink === '#logout' ? 'active' : ''}`}
          onClick={() => handleNavClick('#logout')}
        >
          <FaSignOutAlt className="me-1" /> Logout
        </Nav.Link>
      </Nav>
    </aside>
  );
};

export default Sidebar;
