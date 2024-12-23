import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminDashboard } from "../../store/AdminHomeAPI/adminhApiSlice";
import { Table, Container, Spinner, Alert, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";
import { format } from "date-fns";
import { FaHome, FaUser } from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { loading, authData, error } = useSelector((state) => state.dashboard);
  console.log("Loading", authData);

  useEffect(() => {
    dispatch(AdminDashboard());
  }, [dispatch]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    // Check if error is an object and has a message property
    const errorMessage =
      typeof error === "object" && error.message ? error.message : error;
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error: {errorMessage}</Alert>
      </Container>
    );
  }

  // Use optional chaining and default values to handle null or undefined values
  const properties = Array.isArray(authData?.data?.properties)
    ? authData.data.properties
    : [];

  const users = Array.isArray(authData?.data?.users) ? authData.data.users : [];

  return (
    <Container className="mt-4 px-4">
      <h1 className="mb-4">Welcome to the Admin Dashboard</h1>
      <p className="mb-4">
        This is your main content area. Add more components and information
        here.
      </p>
      <div className="d-flex justify-content-between mb-4">
        <div className="p-3 border rounded shadow-sm w-100 w-md-45 me-md-2 mb-4 mb-md-0 text-center">
          <FaHome className="fs-1 mb-2" />
          <h2 className="mb-2">Properties Count</h2>
          <p className="fs-4">
            <span className="fw-bold">
              {authData?.data?.properties_count || 0}{" "}
            </span>
            <span className="fs-6">(Active + De-active)</span>
          </p>
        </div>
        <div className="p-3 border rounded shadow-sm w-100 w-md-50 ms-md-2 text-center">
          <FaUser className="fs-1 mb-2" />
          <h2 className="mb-2">Users Count</h2>
          <p className="fs-4 fw-bold">{authData?.data?.users_count || 0}</p>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="w-100 w-md-45 me-md-2 mb-4 mb-md-0">
          {properties.length > 0 ? (
            <div className="p-3 border rounded shadow-sm">
              <h2 className="mb-3">New Properties:</h2>
              <Table striped bordered hover>
                <thead className="table-dark">
                  <tr>
                    <th>S.No</th>
                    <th>Address</th>
                    <th>ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property, index) => (
                    <tr key={property.id}>
                      <td>{index + 1}</td>
                      <td>{property.address}</td>
                      <td>{property.id}</td>
                      <td>
                        <Link
                          to={`/admin/property/${property.id}`}
                          className="text-primary text-decoration-none"
                        >
                          <AiOutlineLink /> View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="p-3 border rounded shadow-sm">
              <p>No properties available.</p>
            </div>
          )}
        </div>
        <div className="w-100 w-md-50 ms-md-2">
          <div className="p-3 border rounded shadow-sm">
            <h2 className="mb-3">New Users:</h2>
            <Table striped bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Email</th>
                  <th>ID</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.email}</td>
                    <td>{user.id}</td>
                    <td>
                      {user.created_at
                        ? format(
                            new Date(user.created_at),
                            "dd MMM yy, hh:mm a"
                          )
                        : "N/A"}
                    </td>
                    <td>
                      <a
                        href={`/admin/user/${user.id}`}
                        className="text-primary text-decoration-none"
                      >
                        <AiOutlineLink /> View Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
