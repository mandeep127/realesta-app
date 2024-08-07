import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import {
  fetchPropertyTypes,
  addProperty,
} from "../../store/PropertyAPI/propertyApiSlice";
import "./style.css";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    image: null,
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
  const { status, error, propertyTypes } = useSelector(
    (state) => state.property
  );

  useEffect(() => {
    dispatch(fetchPropertyTypes());
  }, [dispatch]);

  console.log("Property Types from Redux:", propertyTypes.data);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description) {
      alert("Description is required.");
      return;
    }

    const formDataWithNumbersOnly = {
      ...formData,
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      size: parseInt(formData.size),
      price: parseFloat(formData.price),
    };

    // Create FormData object to handle multipart form data
    const formDataToSend = new FormData();
    Object.entries(formDataWithNumbersOnly).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    formDataToSend.append("image", formData.image);

    // Dispatch action to add property with formDataToSend
    try {
      await dispatch(addProperty(formDataToSend));
      // Handle success (show success message, reset form, etc.)
      alert("Property added successfully!");
      setFormData({
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        image: null,
        property_type_id: "",
        basement: "",
        parking_number: "",
        bedrooms: "",
        bathrooms: "",
        size: "",
        price: "",
        description: "",
      });
    } catch (err) {
      alert("Failed to add property. Please try again.");
    }
  };

  return (
    <div className="property-form-container rounded-5 pb-5 my-5">
      <Form onSubmit={handleSubmit} className="property-form">
        <h2>Property Address</h2>
        <Row>
          <Col md={6}>
            <Form.Group controlId="address">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
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
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="state">
              <Form.Label>State:</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="pincode">
              <Form.Label>Pincode:</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="country">
              <Form.Label>Country:</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="image">
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h2 className="pt-5">Property Summary</h2>
        <Row>
          <Col md={6}>
            <Form.Group controlId="property_type_id">
              <Form.Label>Property Type:</Form.Label>
              <Form.Control
                as="select"
                name="property_type_id"
                value={formData.property_type_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Property Type</option>
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
                value={formData.basement}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="parking_number">
              <Form.Label>Parking Number:</Form.Label>
              <Form.Control
                type="text"
                name="parking_number"
                value={formData.parking_number}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h2 className="pt-5">Building</h2>
        <Row>
          <Col md={4}>
            <Form.Group controlId="bedrooms">
              <Form.Label>Bedrooms:</Form.Label>
              <Form.Control
                type="number"
                name="bedrooms"
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
                value={formData.bathrooms}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="size">
              <Form.Label>Size (sq ft):</Form.Label>
              <Form.Control
                type="number"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
          </Col>
        </Row>

        <h2 className="pt-5">Price</h2>
        <Row>
          <Col md={6}>
            <Form.Group controlId="price">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
          </Col>
        </Row>

        <h2 className="pt-5">Description</h2>
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          type="submit"
          className="btn btn-primary mt-3 rounded-5 px-5 py-2"
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </Button>

        {status === "failed" && <Alert variant="danger">{error}</Alert>}
        {status === "succeeded" && (
          <Alert variant="success">Property created successfully!</Alert>
        )}
      </Form>
    </div>
  );
};

export default PropertyForm;
