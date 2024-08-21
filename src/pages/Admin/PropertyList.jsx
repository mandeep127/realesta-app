import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Container, Spinner, Alert, Pagination } from "react-bootstrap";
import { AiOutlineLink } from "react-icons/ai";
import { FetchAllProperty } from "../../store/AdminHomeAPI/adminhApiSlice";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { format } from "date-fns";

const PropertyList = () => {
  const dispatch = useDispatch();
  const {
    property = [],
    loading,
    error,
    pagination = {},
  } = useSelector((state) => state.dashboard);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(FetchAllProperty(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= pagination.lastPage) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <div className="mt-3">Loading...</div>
      </Container>
    );
  }

  if (error) {
    const errorMessage =
      typeof error === "object" ? JSON.stringify(error) : error;
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error: {errorMessage}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Properties List</h1>
      {property.length > 0 ? (
        <>
          <Table striped bordered hover responsive="lg">
            <thead className="table-dark">
              <tr className="fs-5 text-center">
                <th>S.No</th>
                <th>Address</th>
                <th>City</th>
                {/* <th>State</th>
                <th>Country</th> */}
                <th>Price</th>
                <th>Size</th>
                {/* <th>Bedrooms</th>
                <th>Bathrooms</th> */}
                <th>Status</th>
                <th>Add At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {property.map((property, index) => (
                <tr
                  key={property.id}
                  className="text-center fs-6 font-weight-bold"
                >
                  <td>{(currentPage - 1) * 10 + index + 1}</td>
                  <td>{property.address}</td>
                  <td>{property.city}</td>
                  {/* <td>{property.state}</td>
                  <td>{property.country}</td> */}
                  <td>{property.price}</td>
                  <td>{property.size}</td>
                  {/* <td>{property.bedrooms}</td>
                  <td>{property.bathrooms}</td> */}
                  <td>
                    {property.status === "1" ? (
                      <span style={{ color: "green" }}>
                        <FaCheckCircle /> Active
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>
                        <FaTimesCircle /> Inactive
                      </span>
                    )}
                  </td>
                  {/* <td>{new Date(property.created_at).toLocaleString()}</td> */}
                  <td>
                    {property.created_at
                      ? format(
                          new Date(property.created_at),
                          "dd MMM yy, hh:mm a"
                        )
                      : "N/A"}
                  </td>
                  <td>
                    <a
                      href={`/admin/property/${property.id}`}
                      className="text-primary text-decoration-none"
                    >
                      <AiOutlineLink /> View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination className="justify-content-center mt-4">
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </Pagination.Prev>
            {Array.from({ length: pagination.lastPage || 1 }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.lastPage}
            >
              Next
            </Pagination.Next>
          </Pagination>
        </>
      ) : (
        <p className="text-center mt-4">No properties available.</p>
      )}
    </Container>
  );
};

export default PropertyList;
