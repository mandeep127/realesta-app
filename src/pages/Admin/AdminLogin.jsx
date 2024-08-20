import React, { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import Logo from "../../assets/admin.gif";
import { useDispatch, useSelector } from "react-redux";
import { AdminLogins } from "../../store/AdminLoginAPI/adminloginApiSlice";
import { useNavigate } from "react-router";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(""); // Local error state
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, authData } = useSelector((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLocalError("");
      const response = await dispatch(
        AdminLogins({ email, password })
      ).unwrap();
      // Handle successful login
      if (response.data.token) {
        console.log("Login response:", response.data.token);
        localStorage.setItem("adminToken", response.data.token);
        // localStorage.setItem("adminName", response.name);
        // Navigate to the dashboard or home page if needed
        navigate("/admin/dashboard");
      } else {
        setError(response.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      // toast.error("Failed to login. Please try again later.");
      setError("Failed to login. Please try again later.");
    }
  };

  const renderError = () => {
    if (localError) {
      return <div className="text-danger mt-3 text-center">{localError}</div>;
    }
    if (error?.errors) {
      return (
        <div className="text-danger mt-3 text-center">
          {Object.keys(error.errors).map((key) => (
            <div key={key}>
              {error.errors[key].map((msg, idx) => (
                <div key={idx}>{msg}</div>
              ))}
            </div>
          ))}
        </div>
      );
    }
    if (typeof error === "string") {
      return <div className="text-danger mt-3 text-center">{error}</div>;
    }
    return null;
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Col md={4} className="border border-3 rounded-4 p-5 bg-white shadow-lg">
        <h2 className="text-center mb-4">Admin Login</h2>
        {renderError()}
        <img
          src={Logo}
          alt="Admin logo"
          className="mb-4 img-fluid d-block mx-auto"
        />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="fw-bolder">Email Address:</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="fw-bolder">Password:</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 rounded-pill mt-3 fw-bolder"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {authData && !error && (
            <div className="text-success mt-3 text-center">
              Login successful!
            </div>
          )}

          <div className="text-center mt-3">
            <a href="#forgot-password" className="text-muted">
              Forgot Password?
            </a>
          </div>
        </Form>
      </Col>
    </Container>
  );
};

export default AdminLogin;
