// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FaBed, FaBath, FaChartArea } from "react-icons/fa";
// import { GrLinkNext } from "react-icons/gr";
// import HeroImg from "../../assets/hero1.jpg";
// import Img from "../../assets/hero.jpg";
// import "./Home.css";
// import {
//   fetchHomeProperty,
//   fetchPropertyTypes,
// } from "../../store/PropertyAPI/propertyApiSlice";
// import { useNavigate } from "react-router";

// const Home = () => {
//   const [query, setQuery] = useState("");
//   const [filter, setFilter] = useState("option1");
//   const dispatch = useDispatch();
//   const Navigate = useNavigate();
//   const { propertyHome, status, error, propertyTypes } = useSelector(
//     (state) => state.property
//   );

//   const handleViewDeals = () => {
//     Navigate("/property");
//   };
//   useEffect(() => {
//     dispatch(fetchHomeProperty());
//     dispatch(fetchPropertyTypes());
//   }, [dispatch]);

//   const handlePropertyClick = (id) => {
//     Navigate(`/property/${id}`);
//   };
//   console.log(propertyTypes?.data);

//   const handleSearch = () => {
//     console.log(`Searching for "${query}" with filter "${filter}"`);
//   };

//   return (
//     <div className="container position-relative">
//       <div className="carousel-container">

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBed, FaBath, FaChartArea } from "react-icons/fa";
import { GrLinkNext } from "react-icons/gr";
import HeroImg from "../../assets/hero1.jpg";
import Img from "../../assets/hero.jpg";
import Loading from "../../assets/wait.gif";
import "./Home.css";
import {
  fetchHomeProperty,
  fetchPropertyTypes,
} from "../../store/PropertyAPI/propertyApiSlice";
import { useNavigate } from "react-router";

const Home = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(" ");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { propertyHome, status, error, propertyTypes } = useSelector(
    (state) => state.property
  );

  useEffect(() => {
    dispatch(fetchPropertyTypes());
    dispatch(fetchHomeProperty());
  }, [dispatch]);

  const handleViewDeals = () => {
    navigate("/property");
  };

  const handlePropertyClick = (id) => {
    navigate(`/property/${id}`);
  };

  const handleSearch = () => {
    navigate(
      `/property?keyword=${encodeURIComponent(query)}&property_type=${filter}`
    );
  };
  return (
    <div className="container position-relative">
      <div className="carousel-container">
        <div
          id="carouselExampleIndicators"
          className="carousel slide mb-5"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="carousel-img-container">
                <img
                  src={HeroImg}
                  className="d-block w-100"
                  alt="First slide"
                />
                <div className="carousel-overlay white-overlay"></div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="carousel-img-container">
                <img src={Img} className="d-block w-100" alt="Second slide" />
                <div className="carousel-overlay white-overlay"></div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
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
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div
          className="position-absolute p-3"
          style={{ top: "40px", left: "90px" }}
        >
          <p
            className="fw-bold"
            style={{ fontSize: "80px", lineHeight: "80px" }}
          >
            Get
            <br /> Best <span className="deals-custom">Deals</span> <br />
            In Your Area!
          </p>
        </div>
      </div>
      <div
        className="position-absolute bg-body-tertiary bg-opacity-50 px-5 py-5 pb-5 pt-4 rounded-4 border shadow"
        style={{ top: "360px", left: "120px" }}
      >
        <p className="mx-2 mt-3 fs-4 pb-2">
          Any specific deals you are looking for?
        </p>
        <div className="input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search By City / Postal Code"
            className="form-control rounded-start-pill py-4 px-5 fs-5"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-select me-3 rounded-end-pill px-3 fs-5"
            style={{ maxWidth: "110px" }}
          >
            <option value="all">All</option>
            {Array.isArray(propertyTypes?.data) &&
              propertyTypes?.data.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
          </select>
          <button
            onClick={handleSearch}
            className="btn btn-primary me-4 ms-4 ps-4 pe-3 rounded-circle"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GrLinkNext size={22} />
          </button>
        </div>
      </div>
      <h2 className=" mx-4 fw-bold fs-1">New Deals In Your Area</h2>

      <div className="container mt-4">
        {status === "loading" && (
          <img src={Loading} className="rounded mx-auto d-block pt-3" />
        )}
        {error && <p className="text-danger">{error}</p>}
        <div className="row">
          {propertyHome && propertyHome.data && propertyHome.data.length > 0 ? (
            propertyHome.data.map((property) => (
              <div className="col-md-3 mb-4" key={property.id}>
                <div
                  className="border rounded-4 card"
                  onClick={() => handlePropertyClick(property.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className=" position-relative">
                    <img
                      src={
                        property.image
                          ? `http://127.0.0.1:8000/${property.image}`
                          : "https://via.placeholder.com/306x200"
                      }
                      className="card-img-top rounded-top-4 rounded-bottom-0"
                      alt={property.address || "No address"}
                      style={{
                        width: "306px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="card-body mx-3 my-2">
                    <div className="d-flex align-items-center mb-2">
                      <FaBed className="me-2" />
                      <span>{property.bedrooms || "N/A"} Beds</span>
                      <FaBath className="ms-3 me-2" />
                      <span>{property.bathrooms || "N/A"} Baths</span>
                      <FaChartArea className="ms-3 me-2" />
                      <span>{property.size || "N/A"} sq ft</span>
                    </div>
                    <hr />
                    {/* <h5 className="card-title">
                      {property.address || "No address"}
                    </h5> */}
                    <h5 className="card-text">
                      {property.address
                        ? property.address.split(" ").slice(0, 5).join(" ") +
                          (property.address.split(" ").length > 5 ? "..." : "")
                        : "No address"}
                    </h5>
                    <p className="card-text">
                      {property.description
                        ? property.description
                            .split(" ")
                            .slice(0, 10)
                            .join(" ") +
                          (property.description.split(" ").length > 10
                            ? "..."
                            : "")
                        : "No description"}
                    </p>

                    <p className="card-text">
                      <strong>${property.price || "0.00"}</strong>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No properties available.</p>
          )}
        </div>
        <div className="text-center my-4">
          <button
            className="btn btn-primary mt-3 rounded-5 px-5 py-3 fw-bold"
            onClick={handleViewDeals}
          >
            View All New Deals
          </button>
        </div>
      </div>

      <div className="pt-5 py-5 my-5 bg-light">
        <h1 className="text-center pb-2 fw-bolder fs-1">
          Optimizing Website Functionality & Processes
        </h1>
        <p className="text-center pb-3">
          Dive into step-by-step instructions for seamless user experiences,
          covering account management and advanced features.
        </p>
        <div className="video-container">
          <video
            className="w-100 rounded-5"
            controls
            style={{
              borderRadius: "8px",
              border: "2px solid #ddd",
              width: "1470px",
              height: "550px",
              objectFit: "cover",
            }}
          >
            <source
              src="https://media.istockphoto.com/id/1411479325/video/aerial-real-estate-in-south-orange-county-california.mp4?s=mp4-640x640-is&k=20&c=qVHnUajX8TvKHWtsln7SWuAx_ofEiOhzDv8nNyG1agU="
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Home;
