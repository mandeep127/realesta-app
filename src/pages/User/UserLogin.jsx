import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import userLogo from "../../assets/admin.gif";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Login } from "../../store/authAPI/authApiSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      navigate("/");
      toast.warning("You are already logged in!");
    }
  }, [navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await dispatch(Login({ email, password }));
      console.log("Response:", response);
      if (response && response.payload.data.token) {
        console.log("Token:", response.payload.data.token);
        localStorage.setItem("user_token", response.payload.data.token);
        localStorage.setItem("User_Name", response.payload.data.user.name);
        console.log("User_Name:", response.payload.data.user.name);
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        setError(response.message || "Invalid credentials. Please try again.");
        toast.error(
          response.message || "Invalid credentials. Please try again."
        );
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Failed to login. Please try again later.");
      setError("Failed to login. Please try again later.");
    }
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
            src={userLogo}
            className="mb-3"
            width="50"
            height="50"
            alt="user logo"
          />
          <h2 className="mb-3">Sign In</h2>
          <p className="text-danger">{error}</p>
          <p>
            <a className="text-primary text-decoration-none" href="/register">
              Register Now
            </a>
          </p>
        </div>
        <Form.Group
          className="mb-3 d-flex align-items-center"
          controlId="formGroupLogin"
        >
          <Form.Control
            className="rounded-1 border border-3 me-2"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <MdEmail size={25} />
        </Form.Group>
        <Form.Group
          className="mb-3 d-flex align-items-center"
          controlId="formGroupPassword"
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

export default UserLogin;
