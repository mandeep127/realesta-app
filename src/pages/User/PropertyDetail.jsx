import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBed, FaBath, FaChartArea } from "react-icons/fa";
import { fetchDetailsProperty } from "../../store/PropertyAPI/propertyApiSlice";
import { Carousel, Image } from "react-bootstrap";
import "./PropertyDetail.css";
import { IoCaretBackCircle } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineDescription } from "react-icons/md";

const PropertyDetail = () => {
  const { id } = useParams(); // Get property ID from URL
  const dispatch = useDispatch();
  const { propertyDetails, status, error } = useSelector(
    (state) => state.property
  );

  const propertyType = {
    1: "Residential",
    2: "Multi-Family",
  };

  const [activeIndex, setActiveIndex] = useState(0);

  // Mortgage calculator state
  const [loanAmount, setLoanAmount] = useState(1234);
  const [downPayment, setDownPayment] = useState(234);
  const [interestRate, setInterestRate] = useState(24);
  const [loanTerm, setLoanTerm] = useState(2);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Fetch property details
  useEffect(() => {
    dispatch(fetchDetailsProperty(id));
  }, [id, dispatch]);

  // Update loan amount and down payment based on fetched property details
  useEffect(() => {
    if (propertyDetails?.data?.property) {
      const propertyPrice = propertyDetails.data.property.price || 0;
      setLoanAmount(propertyPrice);
      setDownPayment(0); // Reset down payment when property price changes
    }
  }, [propertyDetails]);

  // Calculate mortgage payment
  useEffect(() => {
    const calculateMortgage = () => {
      const principal = parseFloat(loanAmount) - parseFloat(downPayment);
      const interest = parseFloat(interestRate) / 100 / 12;
      const numberOfPayments = parseFloat(loanTerm) * 12;

      const monthly =
        (principal * interest) /
        (1 - Math.pow(1 + interest, -numberOfPayments));
      setMonthlyPayment(monthly.toFixed(2));
    };

    calculateMortgage();
  }, [loanAmount, downPayment, interestRate, loanTerm]);

  if (status === "loading") return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  const property = propertyDetails?.data.property;
  const propertyImages = propertyDetails?.data?.property_sub_images || [];

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

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
              <Link to="/property/">Property</Link>
            </li>
          </ol>
        </nav>
      </div>

      {property && (
        <div className="row">
          {/* Image Gallery */}
          <div className="col-md-6 mb-4">
            <Carousel
              id="imageSlider"
              activeIndex={activeIndex}
              onSelect={handleSelect}
              pause={false}
              interval={2000}
              nextIcon={
                <span className="carousel-control-next-icon bg-black rounded-1" />
              }
              prevIcon={
                <span className="carousel-control-prev-icon bg-black rounded-1" />
              }
            >
              {property.image && (
                <Carousel.Item key="main-image">
                  <Image
                    width="100%"
                    height="400"
                    src={`http://127.0.0.1:8000/${property.image}`}
                    className="d-block mx-auto rounded-3"
                    alt="Main Property Image"
                    style={{
                      width: "600px",
                      height: "360px",
                      objectFit: "cover",
                    }}
                    fluid
                  />
                </Carousel.Item>
              )}
              {propertyImages.map((image, index) => (
                <Carousel.Item key={index}>
                  <Image
                    src={`http://127.0.0.1:8000/${image.sub_images}`}
                    className="d-block mx-auto rounded-3"
                    alt={`Slide ${index + 1}`}
                    style={{
                      width: "600px",
                      height: "360px",
                      objectFit: "cover",
                    }}
                    fluid
                  />
                </Carousel.Item>
              ))}
            </Carousel>

            <div className="d-flex justify-content-center mb-3 pt-4">
              {property.image && (
                <a
                  key="main-thumbnail"
                  className={`border mx-1 rounded-2 imgHover ${
                    activeIndex === 0 ? "active" : ""
                  }`}
                  onClick={() => setActiveIndex(0)}
                >
                  <Image
                    width="60"
                    height="60"
                    className="rounded-2"
                    src={`http://127.0.0.1:8000/${property.image}`}
                    style={{ objectFit: "cover" }}
                  />
                </a>
              )}
              {propertyImages.map((image, index) => (
                <a
                  key={index + 1}
                  className={`border mx-1 rounded-2 imgHover ${
                    activeIndex === index + 1 ? "active" : ""
                  }`}
                  onClick={() => setActiveIndex(index + 1)}
                >
                  <Image
                    width="60"
                    height="60"
                    className="rounded-2"
                    src={`http://127.0.0.1:8000/${image.sub_images}`}
                    style={{ objectFit: "cover" }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="col-md-6 pt-3 px-5">
            <p>
              <strong className="text-dark fs-3 ">
                $ {property.price || "0.00"}
              </strong>
            </p>
            <p className="text-primary mb-3 fs-1">
              {property.address || "No Address"}
            </p>
            <div className="d-flex flex-wrap align-items-center mb-4 bg-light rounded p-3 shadow-sm">
              <div className="align-items-center me-1">
                <div className="ms-3">
                  <div className="fw-light ">Property Type</div>
                  <div className="fw-bold fs-5">
                    {propertyType[property.property_type_id] || "Unknown"}
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center me-4 ms-5">
                <FaBed size={19} />
                <div className="ms-2 fs-5">
                  {property.bedrooms || "N/A"} Beds
                </div>
              </div>

              <div className="d-flex align-items-center me-4 ms-2">
                <FaBath size={19} />
                <div className="ms-2 fs-5">
                  {property.bathrooms || "N/A"} Baths
                </div>
              </div>

              <div className="d-flex align-items-center  ms-2">
                <FaChartArea size={19} />
                <div className="ms-2 fs-5">{property.size || "N/A"} sq ft</div>
              </div>
            </div>
            <div>
              <p className="fs-5">
                <AiFillHome className="me-2 " />
                Property Details :
              </p>
            </div>

            <p>
              <strong>
                Location: {property.city || "N/A"}, {property.state || "N/A"}
              </strong>
            </p>
            <p className="text-muted mb-4">
              <MdOutlineDescription />{" "}
              {property.description || "No description available."}
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
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="downPayment" className="form-label">
                Down Payment ($)
              </label>
              <input
                type="number"
                id="downPayment"
                className="form-control"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
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
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="loanTerm" className="form-label">
                Loan Term (years)
              </label>
              <select
                id="loanTerm"
                className="form-control"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
              >
                <option value={5}>5 years</option>
                <option value={10}>10 years</option>
                <option value={15}>15 years</option>
              </select>
            </div>
          </form>
          <h4 className="mt-3">Estimated Monthly Payment: ${monthlyPayment}</h4>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
