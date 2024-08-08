import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDetailProperty,
  UpdatePropertyStatus,
} from "../../store/AdminHomeAPI/adminhApiSlice";
import "./Property.css";

const PropertyInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { propertyDetails, status, error } = useSelector(
    (state) => state.dashboard
  );
  const [isStatusActive, setIsStatusActive] = useState(true);
  console.log("Property ID:", id);
  useEffect(() => {
    dispatch(fetchDetailProperty(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (propertyDetails?.data?.property?.status === "1") {
      setIsStatusActive(true);
    } else {
      setIsStatusActive(false);
    }
  }, [propertyDetails]);

  if (status === "loading")
    return <p className="text-center mt-5">Loading...</p>;
  if (error) {
    const errorMessage =
      typeof error === "object" ? JSON.stringify(error) : error;
    return <p className="text-center text-danger mt-5">{errorMessage}</p>;
  }

  const property = propertyDetails?.data.property;

  const handleStatusChange = () => {
    dispatch(
      UpdatePropertyStatus({
        id,
        status: isStatusActive ? "0" : "1",
      })
    );
    setIsStatusActive(!isStatusActive);
  };

  return (
    <div className="container mt-5">
      <h4 className="pb-3">Property Details:</h4>
      <div className="row">
        {/* Center Section */}
        <div className="col-lg-6 col-md-8 col-sm-12 mb-4">
          {property && (
            <div className="property-container rounded bg-white shadow-lg p-4">
              {/* Property Image */}
              <img
                src={
                  property.image
                    ? `http://127.0.0.1:8000/${property.image}`
                    : "https://via.placeholder.com/600x300"
                }
                alt={property.address || "No address"}
                className="img-fluid rounded mb-4"
                style={{ objectFit: "cover", height: "250px", width: "100%" }}
              />

              <div className="d-flex justify-content-between mb-4">
                {/* Property Details */}
                <div className="flex-grow-1 me-3">
                  <h2 className="text-primary mb-3">
                    {property.address || "No Address"}
                  </h2>

                  <div className="mb-3">
                    <h5 className="text-secondary">Property Details</h5>
                    <p className="mb-2">
                      <strong>Bedrooms:</strong> {property.bedrooms || "N/A"}
                    </p>
                    <p className="mb-2">
                      <strong>Bathrooms:</strong> {property.bathrooms || "N/A"}
                    </p>
                    <p className="mb-2">
                      <strong>Size:</strong> {property.size || "N/A"} sq ft
                    </p>
                  </div>
                </div>

                {/* Price and Location */}
                <div className="custom-padding d-flex flex-column pt-5">
                  <div className="mb-3">
                    <h5 className="text-secondary">Price</h5>
                    <p className="fw-bold">${property.price || "0.00"}</p>
                  </div>

                  <div className="mb-3">
                    <h5 className="text-secondary">Location</h5>
                    <p className="fw-bold">
                      {property.city || "N/A"}, {property.state || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-secondary">Description</h5>
                <p>{property.description || "No description available."}</p>
              </div>

              <button
                className={`btn ${
                  isStatusActive ? "btn-danger" : "btn-success"
                } rounded-pill`}
                onClick={handleStatusChange}
              >
                {isStatusActive ? "Deactivate Property" : "Activate Property"}
              </button>
            </div>
          )}
        </div>

        {/* Left Section */}
        <div className="col-lg-3 col-md-4 col-sm-12 mb-4">
          <div className="p-3 bg-light rounded shadow-sm fixed-size">
            <h5 className="text-primary">Additional Information</h5>
            <p>
              <strong>Created At:</strong> {property?.created_at || "N/A"}
            </p>
            <p>
              <strong>Updated At:</strong> {property?.updated_at || "N/A"}
            </p>
            <p>
              <strong>Country:</strong> {property?.country || "N/A"}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-lg-3 col-md-4 col-sm-12 mb-4">
          <div className="p-3 bg-light rounded shadow-sm fixed-size">
            <h5 className="text-primary">Property Overview</h5>
            <p>
              <strong>Address:</strong> {property?.address || "N/A"}
            </p>
            <p>
              <strong>Price:</strong> ${property?.price || "0.00"}
            </p>
            <p>
              <strong>Status:</strong> {isStatusActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
