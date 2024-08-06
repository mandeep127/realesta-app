import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Form, Button } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import Logo from "../../assets/admin.gif";
import { AdminLogins } from "../../store/AdminLoginAPI/adminloginApiSlice";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(""); // Local error state

  const dispatch = useDispatch();
  const { loading, error, authData } = useSelector((state) => state.login);

  console.log({ email, password });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Clear any previous local errors
      setLocalError("");
      await dispatch(AdminLogins({ email, password })).unwrap();
    } catch (err) {
      // Handle errors from the API or Redux thunk
      if (err?.errors) {
        setLocalError(
          Object.keys(err.errors)
            .map((key) => err.errors[key].join(", "))
            .join(", ")
        );
      } else {
        setLocalError("An unexpected error occurred.");
      }
    }
  };

  const renderError = () => {
    // Use localError state to display errors
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
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <Col md={4} className="border border-3 rounded-4 p-5">
        <h2 className="text-center mb-4">Admin Login</h2>
        {renderError()}
        <img
          src={Logo}
          alt="Admin logo"
          className="mb-4 img-fluid d-block mx-auto"
        />
        <hr className="mx-5 my-4" />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="fw-bolder">Email address :</Form.Label>
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
            <Form.Label className="fw-bolder">Password :</Form.Label>
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
