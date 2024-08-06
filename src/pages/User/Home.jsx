import React, { useState, useEffect } from "react";
import { FaSearch, FaBed, FaBath, FaInfoCircle } from "react-icons/fa";
import HeroImg from "../../assets/hero1.jpg";
import Img from "../../assets/hero.jpg";
import "./Home.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("option1");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    console.log(`Searching for "${query}" with filter "${filter}"`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const dummyProducts = [
          {
            id: 1,
            name: "Product 1",
            description: "Description for product 1",
            price: 29.99,
            image: "https://via.placeholder.com/306x200",
            status: "sell",
          },
          {
            id: 2,
            name: "Product 2",
            description: "Description for product 2",
            price: 49.99,
            image: "https://via.placeholder.com/306x200",
            status: "not-sell",
          },
          {
            id: 3,
            name: "Product 3",
            description: "Description for product 3",
            price: 79.99,
            image: "https://via.placeholder.com/306x200",
            status: "sell",
          },
          {
            id: 4,
            name: "Product 4",
            description: "Description for product 4",
            price: 99.99,
            image: "https://via.placeholder.com/306x200",
            status: "not-sell",
          },
        ];

        setProducts(dummyProducts.slice(0, 4));
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching the products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
          className="position-absolute bg-white p-3 rounded border shadow"
          style={{ top: "390px", left: "90px" }}
        >
          <p>Any specific deals you are looking for?</p>
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
              className="btn btn-primary rounded-circle"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      <h2 className="my-4 mx-4 fw-bold fs-1">Featured Products</h2>
      <div className="container mt-4">
        {loading && <p>Loading products...</p>}
        {error && <p className="text-danger">{error}</p>}
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3 mb-4 " key={product.id}>
              <div className="border rounded-3 card">
                <div className="card position-relative">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
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
                    <span>2 Beds</span> {/* Dummy data for bedroom */}
                    <FaBath className="ms-3 me-2" />
                    <span>1 Bath</span> {/* Dummy data for bathroom */}
                  </div>
                  <hr />
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">
                    <strong>${product.price}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
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
            className="w-100 rounded-5 "
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
