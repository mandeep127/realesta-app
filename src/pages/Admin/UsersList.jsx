import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Container,
  Spinner,
  Alert,
  Pagination,
  Button,
} from "react-bootstrap";
import { fetchUsers } from "../../store/AdminHomeAPI/adminhApiSlice";
import { AiOutlineLink } from "react-icons/ai";
import { format } from "date-fns";

const UsersList = () => {
  const dispatch = useDispatch();
  const {
    users = [],
    loading,
    error,
    pagination = {},
  } = useSelector((state) => state.dashboard);

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= pagination.last_page) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) => {
    switch (filter) {
      case "buyer":
        return user.type === "2";
      case "seller":
        return user.type === "3";
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <div className="mt-3">Loading...</div>
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
      <h1 className="mb-4">Users List</h1>
      <div className="mb-4">
        <Button
          variant={filter === "buyer" ? "primary" : "outline-primary"}
          onClick={() => handleFilterChange("buyer")}
          className="me-2"
        >
          Buyer
        </Button>
        <Button
          variant={filter === "seller" ? "primary" : "outline-primary"}
          onClick={() => handleFilterChange("seller")}
          className="me-2"
        >
          Seller
        </Button>
        <Button
          variant={filter === "all" ? "primary" : "outline-primary"}
          onClick={() => handleFilterChange("all")}
          className="me-2"
        >
          All Users
        </Button>
      </div>
      {filteredUsers.length > 0 ? (
        <>
          <Table striped bordered hover responsive="lg">
            <thead className="table-dark">
              <tr className="fs-5">
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {user.created_at
                      ? format(new Date(user.created_at), "dd MMM yy, hh:mm a")
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
          <Pagination className="justify-content-center mt-4">
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: pagination.last_page || 1 }, (_, index) => (
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
              disabled={currentPage === pagination.last_page}
            />
          </Pagination>
        </>
      ) : (
        <p className="text-center mt-4">No users available.</p>
      )}
    </Container>
  );
};

export default UsersList;
