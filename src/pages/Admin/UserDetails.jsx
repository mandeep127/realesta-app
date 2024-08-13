import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Property.css";
import { fetchUserInfo } from "../../store/AdminHomeAPI/adminhApiSlice";

const truncateName = (name) => {
  if (!name) return "No Address";
  const words = name.split(" ");
  return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : name;
};

const getStatusClass = (status) => {
  return status === "1" ? "text-success" : "text-danger"; // Green for Active, Red for Not Active
};

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userDetails, status, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchUserInfo(id));
  }, [id, dispatch]);

  if (status === "loading") {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (error) {
    const errorMessage =
      typeof error === "object" ? JSON.stringify(error) : error;
    return <p className="text-center text-danger mt-5">{errorMessage}</p>;
  }

  const user = userDetails?.data?.user;
  const properties = userDetails?.data?.properties || [];

  return (
    <div className="container mt-4 px-4 px-md-5">
      <h4 className="pb-3 mb-4 border-bottom">User Details</h4>
      <div className="row">
        <div className="col-lg-5 col-md-12 mb-4">
          {user && (
            <div className="bg-light rounded-3 shadow-sm p-4">
              <h5 className="text-primary mb-3">{user.name || "No Name"}</h5>
              <p className="mb-2">
                <strong>User ID:</strong> {user.id || "No ID"}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {user.email || "No Email"}
              </p>
              <p className="mb-2">
                <strong>Email Verified At:</strong>{" "}
                {user.email_verified_at || "Not Verified"}
              </p>
              <p className="mb-0">
                <strong>Status:</strong>{" "}
                <span className={getStatusClass(user.status)}>
                  {user.status === "1" ? "Active" : "Not Active"}
                </span>
              </p>
            </div>
          )}
        </div>
        <div className="col-lg-7 col-md-12 mb-4">
          {properties.length > 0 && (
            <div className="bg-light rounded-3 shadow-sm p-4">
              <h5 className="text-primary mb-3">Properties for Sale</h5>
              <ul className="list-unstyled">
                {properties.map((property, index) => (
                  <li
                    key={property.id}
                    className="mb-3 d-flex align-items-center"
                  >
                    <div className="me-3">
                      <span className="badge bg-secondary">{index + 1}</span>
                    </div>
                    <Link
                      to={`/admin/property/${property.id}`}
                      className="text-decoration-none d-flex justify-content-between align-items-center flex-grow-1"
                    >
                      <span>
                        [ID: {property.id}] {truncateName(property.address)}
                      </span>
                      <span className="badge bg-primary">View</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
