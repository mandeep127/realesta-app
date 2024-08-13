import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminDashboard } from "../../store/AdminHomeAPI/adminhApiSlice";
import { Table, Container, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";

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
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  const properties = Array.isArray(authData?.data.properties)
    ? authData.data.properties
    : [];

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Welcome to the Admin Dashboard</h1>
      <p className="mb-4">
        This is your main content area. Add more components and information
        here.
      </p>
      {properties.length > 0 ? (
        <div>
          <h2>New Properties:</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Price</th>
                <th>Size</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>Add At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property, index) => (
                <tr key={property.id}>
                  <td>{index + 1}</td>
                  <td>{property.address}</td>
                  <td>{property.city}</td>
                  <td>{property.state}</td>
                  <td>{property.country}</td>
                  <td>{property.price}</td>
                  <td>{property.size}</td>
                  <td>{property.bedrooms}</td>
                  <td>{property.bathrooms}</td>
                  <td>{new Date(property.updated_at).toLocaleString()}</td>
                  <td>
                    <a
                      href={`/admin/property/${property.id}`}
                      style={{ color: "blue" }}
                    >
                      <AiOutlineLink /> View Details
                    </a>
                  </td>
                  {/* <td>
                    <Link
                      to={`/admin/property/${property.id}`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p>No properties available.</p>
      )}
    </Container>
  );
};

export default Dashboard;
