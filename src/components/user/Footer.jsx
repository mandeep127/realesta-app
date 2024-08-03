import React from 'react';
import './style.css';
import FooterIcon from "../../assets/footerlogo.svg";
import { Container, Row, Col, Form } from 'react-bootstrap';
import { SlSocialFacebook, SlSocialInstagram, SlSocialYoutube } from "react-icons/sl";
import { FaRegUser, FaEnvelope, FaBriefcase, FaCommentDots } from "react-icons/fa";
const IconInput = ({ icon: Icon, type, id, placeholder, className }) => (
    <Form.Group className="mt-2 position-relative">
        <Icon className={`position-absolute top-50 translate-middle-y ms-3 ${className}`} />
        <input type={type} id={id} className="form-control rounded-3 ps-5" placeholder={placeholder} />
    </Form.Group>
);

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white py-5">
            <Container>
                <Row>
                    <Col md={7} className="text-start mt-5 pe-5">
                        <img
                            src={FooterIcon}
                            alt="Realesta logo"
                            className="img-footer-logo mb-3"
                        />
                        <p className='text-start mt-3'>
                            Discover your dream home with Realesta. Whether buying, selling, or
                            investing, we're your trusted partner in real estate. Explore our
                            listings, find expert advice, use advanced calculators, and make
                            informed decisions. Your journey to the perfect property starts here.
                            Partner with Realesta to navigate the dynamic world of real estate
                            investment confidently. Your success is our mission as we strive to
                            deliver unparalleled value and growth potential for our investors.
                        </p>
                        <div className="social-icons mt-3">
                            <a href="#facebook" className="text-primary me-4"><SlSocialFacebook size={30} /></a>
                            <a href="#instagram" className="text-primary me-4"><SlSocialInstagram size={30} /></a>
                            <a href="#youtube" className="text-primary"><SlSocialYoutube size={36} /></a>
                        </div>
                    </Col>

                    <Col md={5} className="mt-4 mt-md-0 border border-secondary rounded-4">
                        <div className='py-4 px-3'>
                            <h5 className='fw-bold'>Contact Us</h5>
                            <form className="contact-form mt-3 bg-dark">
                                <IconInput icon={FaRegUser} type="text" id="name" placeholder="Your Name" className="text-primary" />
                                <IconInput icon={FaEnvelope} type="email" id="email" placeholder="Your Email" className="text-primary" />
                                <IconInput icon={FaBriefcase} type="text" id="service" placeholder="Enter service name" className="text-primary" />
                                <Form.Group className="mt-2 position-relative">
                                    <FaCommentDots className="position-absolute top-50 translate-middle-y ms-3 text-primary" />
                                    <textarea id="message" className="form-control rounded-3 ps-5 custom-textarea" rows="3" placeholder="Your message"></textarea>
                                </Form.Group>
                                <button type="submit" className="btn btn-primary mt-3 rounded-5 px-5 py-2">Submit</button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="footer-bottom text-center mt-5">
                <p className="mb-0">&copy; 2024 . All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
