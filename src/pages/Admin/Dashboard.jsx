import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminDashboard } from "../../store/AdminHomeAPI/adminhApiSlice";
import { Table, Container, Spinner, Alert } from "react-bootstrap";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Ensure this matches the key in your store configuration
  const { loading, authData, error } = useSelector((state) => state.dashboard);

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

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Welcome to the Admin Dashboard</h1>
      <p className="mb-4">
        This is your main content area. Add more components and information
        here.
      </p>
      {authData && (
        <div>
          <h2>New Properties:</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Price</th>
                <th>Size</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>Add At</th>
              </tr>
            </thead>
            <tbody>
              {authData.data.map((property) => (
                <tr key={property.id}>
                  <td>{property.id}</td>
                  <td>{property.address}</td>
                  <td>{property.city}</td>
                  <td>{property.state}</td>
                  <td>{property.country}</td>
                  <td>{property.price}</td>
                  <td>{property.size}</td>
                  <td>{property.bedrooms}</td>
                  <td>{property.bathrooms}</td>
                  <td>{new Date(property.updated_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
