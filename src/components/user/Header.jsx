import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import "./style.css";
import Logo from "../../assets/logo.svg";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    const storedUsername = localStorage.getItem("User_Name");

    if (token) {
      setIsAuthenticated(true);
      setUsername(storedUsername || "User");
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      <div className="top-bar text-center py-4 ">
        <span className="fs-6">
          Meet Your Personalized Assistant: Expert Guidance, Contact Us!
        </span>
        <Button className="bg-white rounded-pill ms-3 py-2 px-3 btn-blue-text fw-bold ">
          Beta User Feedback
        </Button>
      </div>
      <Navbar expand="lg" className="bg-body-tertiary navbar-light">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <img
              src={Logo}
              className="d-inline-block align-top img-custom-size"
              alt="Realesta logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isAuthenticated ? (
                <>
                  <Navbar.Text className="me-2 pt-3">
                    Welcome, {username}!
                  </Navbar.Text>
                  <Nav.Link href="/profile">
                    <Button
                      variant="outline-primary"
                      className="rounded-pill fw-bold px-5 py-2"
                    >
                      Profile
                    </Button>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">
                    <Button
                      variant="outline-primary"
                      className="rounded-pill fw-bold px-5 py-2"
                    >
                      Login
                    </Button>
                  </Nav.Link>
                  <Nav.Link href="/register">
                    <Button
                      variant="primary"
                      className="rounded-pill fw-bold px-5 py-2"
                    >
                      Sign up
                    </Button>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar className="custom-bg-head fw-bold">
        <Container>
          <Nav className="mx-auto fs-5">
            <Nav.Link href="/property" className="py-3 px-5">
              Buy
            </Nav.Link>
            <Nav.Link href="/add-property" className="py-3 px-5">
              Sell
            </Nav.Link>
            <Nav.Link href="/coming-soon" className="py-3 px-5">
              PROfinder
            </Nav.Link>
            <Nav.Link href="/coming-soon" className="py-3 px-5 nav-item-custom">
              Realesta Page
            </Nav.Link>
            <Nav.Link href="/coming-soon" className="py-3 px-5 nav-item-custom">
              My Learning
            </Nav.Link>
            <Nav.Link href="/coming-soon" className="py-3 px-5 nav-item-custom">
              Tools
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
