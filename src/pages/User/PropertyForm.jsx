import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import {
  fetchPropertyTypes,
  addProperty,
} from "../../store/PropertyAPI/propertyApiSlice";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { IoCaretBackCircle } from "react-icons/io5";
import { toast } from "react-toastify";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    image: null,
    subImages: [],
    property_type_id: "",
    basement: "",
    parking_number: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    price: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, propertyTypes } = useSelector(
    (state) => state.property
  );

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      navigate("/login");
      toast.warning(
        "Please log in to your account before listing a property for sale."
      );
    } else {
      dispatch(fetchPropertyTypes());
    }
  }, [dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (name === "image") {
        setFormData((prevState) => ({
          ...prevState,
          image: files[0],
        }));
      } else if (name === "subImages") {
        setFormData((prevState) => ({
          ...prevState,
          subImages: Array.from(files),
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description) {
      toast.error("Description is required.");
      return;
    }

    const formDataWithNumbersOnly = {
      ...formData,
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      size: parseInt(formData.size),
      price: parseFloat(formData.price),
    };

    const formDataToSend = new FormData();
    Object.entries(formDataWithNumbersOnly).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    formData.subImages.forEach((image) => {
      formDataToSend.append("sub_images[]", image);
    });

    try {
      const resultAction = await dispatch(addProperty(formDataToSend));
      const result = resultAction.payload;
      if (result.code === 201) {
        setFormData({
          address: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
          image: null,
          subImages: [],
          property_type_id: "",
          basement: "",
          parking_number: "",
          bedrooms: "",
          bathrooms: "",
          size: "",
          price: "",
          description: "",
        });
        toast.success("Property added successfully!");
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (err) {
      toast.error("Failed to add property. Please try again.");
      console.error("Error adding property:", err);
    }
  };

  return (
    <div className="property-form-container rounded-5 pb-5 my-5">
      <Link to="/" className="btn btn-secondary mb-3">
        <IoCaretBackCircle className="pb-1" size={20} /> Back to Home
      </Link>
      <Form onSubmit={handleSubmit} className="property-form">
        <h2 className="py-3 bg-primary ps-3 text-light rounded-2">
          Property Address
        </h2>
        <Row>
          <Col md={6}>
            <Form.Group controlId="address">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="city">
              <Form.Label>City:</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mt-3" controlId="state">
              <Form.Label>State:</Form.Label>
              <Form.Control
                type="text"
                name="state"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mt-3" controlId="pincode">
              <Form.Label>Pincode:</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mt-3" controlId="country">
              <Form.Label>Country:</Form.Label>
              <Form.Control
                type="text"
                name="country"
                placeholder="Enter country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mt-3" controlId="image">
              <Form.Label>Main Image:</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mt-3" controlId="subImages">
              <Form.Label>Sub Images:</Form.Label>
              <Form.Control
                type="file"
                name="subImages"
                multiple
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h2 className="mt-5 py-3 bg-primary ps-3 text-light rounded-2">
          Property Summary
        </h2>
        <Row>
          <Col md={6}>
            <Form.Group controlId="property_type_id">
              <Form.Label>Property Type:</Form.Label>
              <Form.Control
                as="select"
                className="fw-bold"
                name="property_type_id"
                value={formData.property_type_id}
                onChange={handleChange}
                required
              >
                <option className="fw-bold" value="">
                  Select Property Type
                </option>
                {Array.isArray(propertyTypes.data) &&
                propertyTypes.data.length > 0 ? (
                  propertyTypes.data.map((propertyType) => (
                    <option key={propertyType.id} value={propertyType.id}>
                      {propertyType.name}
                    </option>
                  ))
                ) : (
                  <option value="">No Property Types Available</option>
                )}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="basement">
              <Form.Label>Basement:</Form.Label>
              <Form.Control
                type="text"
                name="basement"
                placeholder="Enter basement"
                value={formData.basement}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mt-3" controlId="parking_number">
              <Form.Label>Parking Number:</Form.Label>
              <Form.Control
                type="text"
                name="parking_number"
                placeholder="Enter number of parking spaces"
                value={formData.parking_number}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h2 className="mt-5 py-3 bg-primary ps-3 text-light rounded-2">
          Building
        </h2>
        <Row>
          <Col md={4}>
            <Form.Group controlId="bedrooms">
              <Form.Label>Bedrooms:</Form.Label>
              <Form.Control
                type="number"
                name="bedrooms"
                placeholder="Enter number of bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="bathrooms">
              <Form.Label>Bathrooms:</Form.Label>
              <Form.Control
                type="number"
                name="bathrooms"
                placeholder="Enter number of bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
          </Col>
          {/* <Col md={4}>
            <Form.Group controlId="bathrooms">
              <Form.Label>Bathrooms:</Form.Label>
              <Form.Control
                type="number"
                name="bathrooms"
                placeholder="Enter number of bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
          </Col> */}
          <Col md={4}>
            <Form.Group controlId="size">
              <Form.Label>Size (sq ft):</Form.Label>
              <Form.Control
                type="number"
                name="size"
                placeholder="Enter size in square feet"
                value={formData.size}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
          </Col>
        </Row>

        <h2 className="mt-5 py-3 bg-primary ps-3 text-light rounded-2">
          Price
        </h2>
        <Row>
          <Col md={6}>
            <Form.Group controlId="price">
              <Form.Label>Estimate Price:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter estimated price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
          </Col>
        </Row>

        <h2 className="mt-5 py-3 bg-primary ps-3 text-light rounded-2">
          Description
        </h2>
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Label>Description (maxLength:500):</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter description"
                maxLength={500}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          type="submit"
          className="btn btn-primary mt-4 rounded-5 px-5 py-3"
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </Button>

        {/* {status === "failed" && <Alert variant="danger">{error}</Alert>}
        {status === "succeeded" && (
          <Alert variant="success">Property created successfully!</Alert>
        )} */}
      </Form>
    </div>
  );
};

export default PropertyForm;
