import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,
  Collapse,
} from "react-bootstrap";
import {
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaUserFriends,
  FaUserShield,
} from "react-icons/fa";
import "./style.css";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isUsersSubMenuOpen, setUsersSubMenuOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleUsersSubMenu = () => setUsersSubMenuOpen(!isUsersSubMenuOpen);

  return (
    <Container fluid className="p-0">
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto float-right">
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                <FaSignOutAlt /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Row noGutters>
        {/* Sidebar */}
        <Col
          xs={isSidebarOpen ? 2 : 1}
          className={`sidebar bg-dark text-light vh-100 d-flex flex-column text-center${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
            {isSidebarOpen && <h4>Admin Dashboard</h4>}
            <FaBars className="toggle-btn" onClick={toggleSidebar} size={24} />
          </div>
          <Collapse in={true}>
            <Nav className="flex-column p-3">
              <Nav.Link href="#dashboard" className="sidebar-link pb-2 mb-2">
                <FaTachometerAlt
                  className={` text-light icon ${
                    !isSidebarOpen ? "icon-large" : ""
                  }`}
                />
                {isSidebarOpen && (
                  <span className="link-text text-light fw-bolder ">
                    Dashboard
                  </span>
                )}
              </Nav.Link>

              <Nav.Link
                href="#users"
                className="sidebar-link pb-2 mb-2"
                onClick={toggleUsersSubMenu}
              >
                <FaUsers
                  className={`text-light icon ${
                    !isSidebarOpen ? "icon-large" : ""
                  }`}
                />
                {isSidebarOpen && (
                  <span className="text-light link-text fw-bolder">Users</span>
                )}
              </Nav.Link>

              <Collapse in={isUsersSubMenuOpen}>
                <Nav className="flex-column ml-3">
                  <Nav.Link
                    href="#all-users"
                    className="sidebar-link pb-2 mb-2"
                  >
                    <FaUserFriends
                      className={`text-light icon ${
                        !isSidebarOpen ? "icon-large" : ""
                      }`}
                    />
                    {isSidebarOpen && (
                      <span className="text-light link-text">All Users</span>
                    )}
                  </Nav.Link>
                  <Nav.Link href="#roles" className="sidebar-link pb-2 mb-2">
                    <FaUserShield
                      className={`text-light icon ${
                        !isSidebarOpen ? "icon-large" : ""
                      }`}
                    />
                    {isSidebarOpen && (
                      <span className="text-light link-text">Roles</span>
                    )}
                  </Nav.Link>
                </Nav>
              </Collapse>

              <Nav.Link href="#settings" className="sidebar-link pb-2 mb-2">
                <FaCog
                  className={`text-light icon ${
                    !isSidebarOpen ? "icon-large" : ""
                  }`}
                />
                {isSidebarOpen && (
                  <span className="link-text text-light fw-bolder">
                    Settings
                  </span>
                )}
              </Nav.Link>
              <Nav.Link
                href="#logout"
                className="sidebar-link mt-auto pb-2 mb-2"
              >
                <FaSignOutAlt
                  className={`text-light icon ${
                    !isSidebarOpen ? "icon-large" : ""
                  }`}
                />
                {isSidebarOpen && (
                  <span className="link-text text-light fw-bolder">Logout</span>
                )}
              </Nav.Link>
            </Nav>
          </Collapse>
        </Col>

        {/* Main Content */}
        <Col xs={isSidebarOpen ? 10 : 11} className="p-4">
          <h1 className="mb-4">Welcome to the Admin Dashboard</h1>
          <p className="mb-4">
            This is your main content area. Add more components and information
            here.
          </p>

          {/* Example Content */}
          <Row>
            <Col md={4} className="mb-4">
              <div className="border rounded p-3 bg-light shadow-sm">
                <h4>Statistics</h4>
                <p>Some statistics or charts can go here.</p>
              </div>
            </Col>
            <Col md={8} className="mb-4">
              <div className="border rounded p-3 bg-light shadow-sm">
                <h4>Recent Activities</h4>
                <p>List recent activities or updates here.</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
