import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBed, FaBath, FaChartArea, FaMapMarkerAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { applyFilters } from "../../store/PropertyAPI/propertyApiSlice";
import "./Property.css";
import Slider from "@mui/material/Slider";
import sold from "../../assets/sold.png";

const Property = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();
  const {
    properties = [],
    loading,
    error,
  } = useSelector((state) => state.property || {});

  const [filters, setFilters] = useState({
    property_type_id: [],
    min_price: 0,
    max_price: 99999,
    min_bedrooms: "",
    max_bedrooms: "",
    min_bathrooms: "",
    max_bathrooms: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const propertiesPerPage = 6;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("keyword") || "";
    const propertyType = queryParams.get("property_type") || "";

    const newFilters = {
      keyword: keyword || "",
      property_type_id: propertyType || "",
    };

    dispatch(applyFilters(newFilters));
  }, [dispatch, location.search]);

  useEffect(() => {
    dispatch(applyFilters(filters));
  }, [filters, dispatch]);

  const handleTypeChange = (value, checked) => {
    const updatedTypes = checked
      ? [...filters.property_type_id, value]
      : filters.property_type_id.filter((type) => type !== value);

    setFilters((prevFilters) => ({
      ...prevFilters,
      property_type_id: updatedTypes,
    }));
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    Navigate(`/property/${property.id}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handlePriceChange = (event, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      min_price: newValue[0],
      max_price: newValue[1],
    }));
  };

  const isValidNumber = (value) => !isNaN(value) && value !== "";

  const filterProperties = () => {
    let filteredProperties = properties;

    if (filters.property_type_id.length) {
      filteredProperties = filteredProperties.filter((property) =>
        filters.property_type_id.includes(String(property.property_type_id))
      );
    }

    if (isValidNumber(filters.min_price)) {
      filteredProperties = filteredProperties.filter(
        (property) => property.price >= Number(filters.min_price)
      );
    }

    if (isValidNumber(filters.max_price)) {
      filteredProperties = filteredProperties.filter(
        (property) => property.price <= Number(filters.max_price)
      );
    }

    if (filters.bedrooms === "5+") {
      filteredProperties = filteredProperties.filter(
        (property) => property.bedrooms >= 5
      );
    } else if (isValidNumber(filters.bedrooms)) {
      filteredProperties = filteredProperties.filter((property) => {
        return Number(property.bedrooms) === Number(filters.bedrooms);
      });
    }

    if (filters.bathrooms === "5+") {
      filteredProperties = filteredProperties.filter(
        (property) => property.bathrooms >= 5
      );
    } else if (isValidNumber(filters.bathrooms)) {
      filteredProperties = filteredProperties.filter((property) => {
        return Number(property.bathrooms) === Number(filters.bathrooms);
      });
    }

    return filteredProperties;
  };

  const paginatedProperties = filterProperties().slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  const totalPages = Math.ceil(filterProperties().length / propertiesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mb-5">
      <h3 className="mb-4 bg-body-secondary text-dark ps-4 py-4 pt-5 mb-5 rounded-bottom-4">
        Properties :
      </h3>
      <div className="row mb-4 ">
        <div
          className="col-md-2 mt-4 me-5 position-sticky"
          style={{ top: "0", height: "100vh", overflowY: "auto" }}
        >
          <div className="bg-white p-4 rounded-4  border shadow-sm">
            <p className="fw-bold mb-3 fs-4 mt-2">Filter Options:</p>
            <p className="fw-bold fs-5 my-3">Property Type:</p>
            <div className="form-check fs-6 mt-3">
              <input
                className="form-check-input fs-4 ms-2"
                type="checkbox"
                value="1"
                checked={filters.property_type_id.includes("1")}
                onChange={(e) => handleTypeChange("1", e.target.checked)}
                id="type1"
              />
              <label className="form-check-label ms-2 mt-1" htmlFor="type1">
                Residential
              </label>
            </div>
            <div className="form-check fs-6 mt-3 ">
              <input
                className="form-check-input fs-4 ms-2"
                type="checkbox"
                value="2"
                checked={filters.property_type_id.includes("2")}
                onChange={(e) => handleTypeChange("2", e.target.checked)}
                id="type2"
              />
              <label className="form-check-label ms-2 mt-1" htmlFor="type2">
                MultiFamily
              </label>
            </div>
            <div className="mt-4">
              <p className="fw-bold fs-5">Price:</p>
              <Slider
                value={[filters.min_price, filters.max_price]}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={20000}
                step={1000}
                marks
                style={{ marginBottom: "1rem" }}
              />
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <input
                    type="number"
                    name="min_price"
                    className="form-control"
                    placeholder="Min Price"
                    value={filters.min_price}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="number"
                    name="max_price"
                    className="form-control"
                    placeholder="Max Price"
                    value={filters.max_price}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>
              <p className="fw-bold fs-5 my-3">Bedrooms:</p>
              <div className="col-md-11 mb-2">
                <select
                  name="bedrooms"
                  className="form-control"
                  value={filters.bedrooms}
                  onChange={handleInputChange}
                >
                  <option value=""> bedrooms</option>
                  {[1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                  <option value="5+">5+</option>
                </select>
              </div>
              {/* //bathrooms */}
              <p className="fw-bold fs-5 my-3">Bathrooms:</p>
              <div className="col-md-11 mb-2">
                <select
                  name="bathrooms"
                  className="form-control"
                  value={filters.bathrooms}
                  onChange={handleInputChange}
                >
                  <option value=""> bathrooms</option>
                  {[1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                  <option value="5+">5+</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="row">
            {paginatedProperties && paginatedProperties.length > 0 ? (
              paginatedProperties.map((property) => (
                <div className="col-md-4 mb-4" key={property.id}>
                  <div
                    className="card border rounded-4"
                    onClick={() => handlePropertyClick(property)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      class="property-type-overlay"
                      data-property-type-id={property.property_type_id}
                    ></div>
                    {property.status === "0" && (
                      <div className="sold-out-overlay rounded-4">
                        <img src={sold} alt="Sold Out" />
                      </div>
                    )}
                    <img
                      src={
                        property.image
                          ? `http://127.0.0.1:8000/${property.image}`
                          : "https://via.placeholder.com/306x200"
                      }
                      className="card-img-top rounded-top-4"
                      alt={property.address || "No address"}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body mb-2 mx-3">
                      <p className="card-text text-primary fs-3">
                        <strong>$ {property.price || "0.00"}</strong>
                      </p>
                      <div className="d-flex align-items-center bg-body-secondary px-3 py-3 rounded-2">
                        <FaBed className="me-2" />
                        <span>{property.bedrooms || "N/A"} Beds |</span>
                        <FaBath className="ms-3 me-1" />
                        <span>{property.bathrooms || "N/A"} Baths |</span>
                        <FaChartArea className="ms-3 me-1" />
                        <span>{property.size || "N/A"} sq ft</span>
                      </div>
                      <h5 className="card-title mt-3">
                        {" "}
                        <FaMapMarkerAlt
                          size={13}
                          className="me-2 text-primary"
                        />
                        {property.address || "No address"}
                      </h5>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-md-12 text-center mt-5 pt-5">
                <h3>There are no properties as per matching criteria.</h3>
              </div>
            )}
          </div>
          <div className="text-center my-4">
            <nav>
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
