import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBed, FaBath, FaChartArea } from "react-icons/fa";
import { fetchDetailsProperty } from "../../store/PropertyAPI/propertyApiSlice";
import "./PropertyDetail.css";

const PropertyDetail = () => {
  const { id } = useParams(); // Get property ID from URL
  const dispatch = useDispatch();
  const { propertyDetails, status, error } = useSelector(
    (state) => state.property
  );

  // State for mortgage calculator
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(3.5); // Default interest rate
  const [loanTerm, setLoanTerm] = useState(30); // Default loan term in years
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(20); // Default down payment percentage
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Fetch property details
  useEffect(() => {
    dispatch(fetchDetailsProperty(id));
  }, [id, dispatch]);

  // Update loan amount when property details are fetched
  useEffect(() => {
    if (propertyDetails?.data?.property) {
      setLoanAmount(propertyDetails.data.property.price || 0);
    }
  }, [propertyDetails]);

  // Calculate mortgage payment when any input changes
  useEffect(() => {
    const calculateMortgage = () => {
      const price = parseFloat(propertyDetails?.data?.property.price || 0);
      const downPayment = (price * parseFloat(downPaymentPercentage)) / 100;
      const principal = price - downPayment;
      const interest = parseFloat(interestRate) / 100 / 12;
      const numberOfPayments = parseFloat(loanTerm) * 12;

      const monthly =
        (principal * interest) /
        (1 - Math.pow(1 + interest, -numberOfPayments));
      setMonthlyPayment(monthly.toFixed(2));
    };

    calculateMortgage();
  }, [
    loanAmount,
    interestRate,
    loanTerm,
    downPaymentPercentage,
    propertyDetails,
  ]);

  // Handle different states
  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  // Render property details
  const property = propertyDetails?.data.property;
  const propertyImages = propertyDetails?.property_sub_images || [];

  return (
    <div className="container mt-5">
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

          <h2>{property.address || "No Address"}</h2>
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

          {/* Mortgage Calculator */}
          <div className="mortgage-calculator mt-5">
            <h3>Mortgage Calculator</h3>
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
              <div className="mb-3">
                <label htmlFor="downPaymentPercentage" className="form-label">
                  Down Payment (%)
                </label>
                <input
                  type="number"
                  id="downPaymentPercentage"
                  className="form-control"
                  step="0.01"
                  value={downPaymentPercentage}
                  onChange={(e) => setDownPaymentPercentage(e.target.value)}
                />
              </div>
            </form>
            <h4>Estimated Monthly Payment: ${monthlyPayment}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
