import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import Logo from "../../assets/admin.gif";

const AdminLogin = () => {
  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <Col md={4} className="border border-3 rounded-4 p-5">
        <h2 className="text-center mb-4">Admin Login</h2>
        <img
          src={Logo}
          alt="Admin logo"
          className="mb-4 img-fluid d-block mx-auto"
        />
        <hr className="mx-5 my-4" />
        <Form>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="fw-bolder">Email address :</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <Form.Control type="email" placeholder="Enter email" />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="fw-bolder">Password :</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <Form.Control type="password" placeholder="Password" />
            </div>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 rounded-pill mt-3 fw-bolder"
          >
            Login
          </Button>
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
