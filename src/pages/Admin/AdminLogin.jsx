import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Logo from "../../assets/admin.gif";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AdminLogins } from "../../store/AdminLoginAPI/adminloginApiSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard");
      toast.warning("You are already logged in!");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setValidationErrors({});
    console.log("Form Values:", { email, password });

    try {
      const response = await dispatch(AdminLogins({ email, password }));
      console.log("API Response:", response);

      const result = response.payload;

      if (result.data && result.data.token) {
        localStorage.setItem("token", result.data.token);
        // localStorage.setItem("adminName", result.data.user.name);
        navigate("/admin/dashboard");
        toast.success("Logged in successfully");
      } else if (result.errors) {
        setValidationErrors(result.errors);
        toast.error(result.errors);
      } else {
        setValidationErrors({
          general: "Invalid credentials. Please try again.",
        });
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Login error:", error.message);

      setValidationErrors({
        general: "Failed to login. Please try again later.",
      });
    }
  };

  const renderErrors = () => {
    const errorMessages = [];

    if (validationErrors.general) {
      errorMessages.push(validationErrors.general);
    }

    if (validationErrors.email) {
      errorMessages.push(...validationErrors.email);
    }

    if (validationErrors.password) {
      errorMessages.push(...validationErrors.password);
    }

    if (errorMessages.length > 0) {
      return (
        <div className="text-danger mb-3">
          {errorMessages.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Form
        className="shadow-lg p-5 bg-white border border-5 rounded-4"
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", width: "100%" }} // Set a max width for the form
      >
        <div className="text-center">
          <img
            src={Logo}
            className="mb-3"
            width="50"
            height="50"
            alt="Admin logo"
          />
          <h2 className="mb-3">Admin Sign In</h2>
          {renderErrors()}
          <p>
            <a className="text-primary text-decoration-none" href="/register">
              Register Now
            </a>
          </p>
        </div>
        <Form.Group
          className="mb-3 d-flex align-items-center"
          controlId="formEmail"
        >
          <Form.Control
            className="rounded-1 border border-3 me-2"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <MdEmail size={25} />
        </Form.Group>
        <Form.Group
          className="mb-3 d-flex align-items-center"
          controlId="formPassword"
        >
          <Form.Control
            className="rounded-1 border border-3 me-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <RiLockPasswordFill size={25} />
        </Form.Group>
        <Form.Group className="mb-3 d-flex align-items-center justify-content-between">
          <Form.Check type="checkbox" label="Remember Me" />
          <Button
            type="submit"
            variant="primary" // Changed to primary variant for blue color
            className="rounded-2 px-4"
          >
            Submit
          </Button>
        </Form.Group>
        <p className="mb-1">
          <a className="text-primary" href="/forgot-password">
            Forgot Password?
          </a>
        </p>
      </Form>
    </Container>
  );
};

export default AdminLogin;
