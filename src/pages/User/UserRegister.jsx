import React, { useState } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import userLogo from "../../assets/admin.gif";
import { useDispatch } from "react-redux";
import { Register } from "../../store/authAPI/authApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    role_id: "2",
    agreed: true,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "agreed" ? checked : value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await dispatch(Register(formData));

      if (response.payload.code === 201) {
        navigate("/login");
        toast.success("Registered successfully! You can now log in.");
      } else {
        setError("Failed. Please re-fill & check email.");
        toast.error("Please check your details and try again.");
      }
    } catch (error) {
      setError("Failed to register. Please try again later.");
      toast.error("Registration failed. Please try again later.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Form
        className="shadow-lg p-4 bg-white border border-5 rounded-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-3 text-center">
          <img
            src={userLogo}
            className="mb-3"
            width="40"
            height="40"
            alt="user logo"
          />
          <h4 className="mb-3">Register a new member</h4>

          <p className="text-danger">{error}</p>
          <p>
            <a className="text-primary text-decoration-none" href="/login">
              I already have a membership
            </a>
          </p>
        </div>
        <Row>
          <Form.Group
            className="mb-3 d-flex align-items-center"
            controlId="formGroupName"
          >
            <Form.Control
              className="rounded-1 border border-2 me-2"
              type="text"
              placeholder="Full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FaUser size={20} />
          </Form.Group>
        </Row>

        <Form.Group
          className="mb-3 d-flex align-items-center"
          controlId="formGroupEmail"
        >
          <Form.Control
            className="rounded-1 border border-2 me-2"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <MdEmail size={20} />
        </Form.Group>

        <Row>
          <Form.Group
            as={Col}
            md="6"
            className="mb-3 d-flex align-items-center"
            controlId="formGroupPassword"
          >
            <Form.Control
              className="rounded-1 border border-2 me-2"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <RiLockPasswordFill size={20} />
          </Form.Group>

          <Form.Group
            as={Col}
            md="6"
            className="mb-3 d-flex align-items-center"
            controlId="formGroupConfirmPassword"
          >
            <Form.Control
              className="rounded-1 border border-2 me-2"
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
            <RiLockPasswordFill size={20} />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3 d-flex align-items-center justify-content-between">
          <Form.Check
            type="checkbox"
            label="I agree to the terms and conditions."
            name="agreed"
            checked={formData.agreed}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="primary"
            className="rounded-2 px-4 ms-2"
            disabled={!formData.agreed}
          >
            {formData.agreed ? "Submit" : "Agree to Submit"}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default UserRegister;
