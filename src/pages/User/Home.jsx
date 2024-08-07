import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBed, FaBath, FaChartArea } from "react-icons/fa";
import { GrLinkNext } from "react-icons/gr";
import HeroImg from "../../assets/hero1.jpg";
import Img from "../../assets/hero.jpg";
import "./Home.css";
import { fetchHomeProperty } from "../../store/PropertyAPI/propertyApiSlice";
import { useNavigate } from "react-router";

const Home = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("option1");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { propertyHome, status, error } = useSelector(
    (state) => state.property
  );

  useEffect(() => {
    dispatch(fetchHomeProperty());
  }, [dispatch]);

  const handlePropertyClick = (id) => {
    Navigate(`/property/${id}`);
  };

  const handleSearch = () => {
    console.log(`Searching for "${query}" with filter "${filter}"`);
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
          style={{ top: "60px", left: "70px" }}
        >
          <p
            className="fw-bold"
            style={{ fontSize: "90px", lineHeight: "100px" }}
          >
            Get
            <br /> Best <span className="deals-custom">Deals</span> <br />
            In Your Area!
          </p>
        </div>
        <div
          className="position-absolute bg-white p-3 px-4 py-4 pb-5 pt-4 rounded-4 border shadow"
          style={{ top: "390px", left: "90px" }}
        >
          <p className="px-3 fw-bold">
            Any specific deals you are looking for?
          </p>
          <div className="input-group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="form-control rounded-start-pill"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="form-select me-2 rounded-end-pill"
              style={{ maxWidth: "80px" }}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            <button
              onClick={handleSearch}
              className="btn btn-primary ms-3 px-3 py-3 rounded-circle"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GrLinkNext />
            </button>
          </div>
        </div>
      </div>
      <h2 className="my-4 mx-4 fw-bold fs-1">Featured Properties</h2>
      <div className="container mt-4">
        {status === "loading" && <p>Loading properties...</p>}
        {error && <p className="text-danger">{error}</p>}
        <div className="row">
          {propertyHome && propertyHome.data && propertyHome.data.length > 0 ? (
            propertyHome.data.map((property) => (
              <div className="col-md-3 mb-4" key={property.id}>
                <div className="border rounded-3 card">
                  <div
                    className="card position-relative"
                    onClick={() => handlePropertyClick(property.id)} // Add click handler to card
                    style={{ cursor: "pointer" }} // Add cursor style to indicate clickable
                  >
                    <img
                      src={
                        property.image
                          ? `http://127.0.0.1:8000/${property.image}`
                          : "https://via.placeholder.com/306x200"
                      }
                      className="card-img-top"
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
                    <h5 className="card-title">
                      {property.address || "No address"}
                    </h5>
                    <p className="card-text">
                      {property.description || "No description"}
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
          <button className="btn btn-primary mt-3 rounded-5 px-5 py-3 fw-bold">
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
              src="https://stgps.appsndevs.com/digitalplatform/assets/homepageModalVideo-cb3j_YIE.mp4"
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
