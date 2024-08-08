import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBed, FaBath, FaChartArea, FaEdit, FaTrash } from "react-icons/fa";
import { AdminPropertyInfo } from "../../store/AdminHomeAPI/adminhApiSlice";

const PropertyInfo = () => {
  const { id } = useParams(); // Get property ID from URL
  const dispatch = useDispatch();
  //* const navigate = useNavigate();
  const { propertyDetails, status, error } = useSelector(
    (state) => state.property
  );

  // Fetch property details
  useEffect(() => {
    dispatch(AdminPropertyInfo(id));
  }, [id, dispatch]);

  // Handle different states
  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  const property = propertyDetails?.data.property;
  const propertyImages = propertyDetails?.property_sub_images || [];

  return (
    <div className="container mt-5 admin-panel">
      {property && (
        <div>
          <div id="propertyCarousel" className="carousel slide mb-5">
            <div className="carousel-inner">
              {propertyImages.length > 0 ? (
                propertyImages.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={`http://127.0.0.1:8000/${image.image_url}`}
                      className="d-block w-100"
                      alt="Property"
                    />
                  </div>
                ))
              ) : (
                <div className="carousel-item active">
                  <img
                    src="https://via.placeholder.com/800x400"
                    className="d-block w-100"
                    alt="Placeholder"
                  />
                </div>
              )}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#propertyCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#propertyCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <div className="d-flex justify-content-between mb-4">
            <h2>{property.address || "No Address"}</h2>
            <div>
              <button className="btn btn-primary me-2" onClick={handleEdit}>
                <FaEdit /> Edit
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>

          <div className="d-flex align-items-center mb-3">
            <FaBed className="me-2" />
            <span>{property.bedrooms || "N/A"} Beds</span>
            <FaBath className="ms-3 me-2" />
            <span>{property.bathrooms || "N/A"} Baths</span>
            <FaChartArea className="ms-3 me-2" />
            <span>{property.size || "N/A"} sq ft</span>
          </div>
          <p>{property.description || "No description available."}</p>
          <p>
            <strong>Price: ${property.price || "0.00"}</strong>
          </p>
          <p>
            <strong>
              Location: {property.city || "N/A"}, {property.state || "N/A"}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyInfo;
