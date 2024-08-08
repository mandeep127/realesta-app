import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBed, FaBath, FaChartArea } from "react-icons/fa";
import { fetchDetailsProperty } from "../../store/PropertyAPI/propertyApiSlice";
import "./PropertyDetail.css";
import { IoCaretBackCircle } from "react-icons/io5";

const PropertyDetail = () => {
  const { id } = useParams(); // Get property ID from URL
  const dispatch = useDispatch();
  const { propertyDetails, status, error } = useSelector(
    (state) => state.property
  );

  // Mortgage calculator state
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(3.5); // default interest rate
  const [loanTerm, setLoanTerm] = useState(30); // in years
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Fetch property details
  useEffect(() => {
    dispatch(fetchDetailsProperty(id));
  }, [id, dispatch]);

  // Calculate mortgage payment
  useEffect(() => {
    if (propertyDetails?.data?.property) {
      const propertyPrice = propertyDetails.data.property.price || 0;
      setLoanAmount(propertyPrice);
    }
  }, [propertyDetails]);

  useEffect(() => {
    const calculateMortgage = () => {
      const principal = parseFloat(loanAmount);
      const interest = parseFloat(interestRate) / 100 / 12;
      const numberOfPayments = parseFloat(loanTerm) * 12;

      const monthly =
        (principal * interest) /
        (1 - Math.pow(1 + interest, -numberOfPayments));
      setMonthlyPayment(monthly.toFixed(2));
    };

    calculateMortgage();
  }, [loanAmount, interestRate, loanTerm]);

  if (status === "loading") return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  const property = propertyDetails?.data.property;
  const propertyImages = propertyDetails?.property_sub_images || [];

  return (
    <div className="container mt-5 py-4">
      <div className="d-flex justify-content-between mb-4">
        <Link to="/" className="btn btn-secondary">
          <IoCaretBackCircle className="pb-1" size={20} /> Back to Home
        </Link>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              <Link to="/property/">property</Link>
            </li>
          </ol>
        </nav>
      </div>

      {property && (
        <div className="row">
          {/* Image Gallery */}
          <div className="col-md-5 mb-4">
            <div id="propertyCarousel" className="carousel slide">
              <div className="carousel-inner">
                {propertyImages.length > 0 ? (
                  propertyImages.map((image, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        src={`http://127.0.0.1:8000/${image.image_url}`}
                        className="d-block w-100 img-fluid rounded"
                        alt="Property"
                      />
                    </div>
                  ))
                ) : (
                  <div className="carousel-item active">
                    <img
                      src="https://via.placeholder.com/400x300"
                      className="d-block w-100 img-fluid rounded"
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
          </div>

          {/* Property Details */}
          <div className="col-md-7">
            <h2 className="text-primary mb-3">
              {property.address || "No Address"}
            </h2>
            <div className="d-flex align-items-center mb-4 text-muted">
              <FaBed className="me-2" />
              <span>{property.bedrooms || "N/A"} Beds</span>
              <FaBath className="ms-3 me-2" />
              <span>{property.bathrooms || "N/A"} Baths</span>
              <FaChartArea className="ms-3 me-2" />
              <span>{property.size || "N/A"} sq ft</span>
            </div>
            <p className="text-muted mb-4">
              {property.description || "No description available."}
            </p>
            <p className="mb-4">
              <strong className="text-success">
                Price: ${property.price || "0.00"}
              </strong>
            </p>
            <p>
              <strong>
                Location: {property.city || "N/A"}, {property.state || "N/A"}
              </strong>
            </p>
          </div>
        </div>
      )}
      <h4 className="py-4 ps-5 text-light bg-primary rounded-5 rounded-bottom-0">
        Tools
      </h4>
      {/* Mortgage Calculator */}
      <div className="mb-5 bg-light text-dark p-4 rounded d-flex flex-column align-items-center">
        <h3 className="mb-4">Mortgage Calculator</h3>
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <form>
            <div className="mb-3">
              <label htmlFor="loanAmount" className="form-label">
                Loan Amount ($)
              </label>
              <input
                type="number"
                id="loanAmount"
                className="form-control"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="interestRate" className="form-label">
                Interest Rate (%)
              </label>
              <input
                type="number"
                id="interestRate"
                className="form-control"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="loanTerm" className="form-label">
                Loan Term (years)
              </label>
              <input
                type="number"
                id="loanTerm"
                className="form-control"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
              />
            </div>
          </form>
          <h4 className="mt-3">Estimated Monthly Payment: ${monthlyPayment}</h4>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
