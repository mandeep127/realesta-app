import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,
  Collapse,
} from "react-bootstrap";





const Dashboard = () => {
  

  return (
    <Container fluid className="p-0">
    

      <Row noGutters>



          <h1 className="mb-4">Welcome to the Admin Dashboard</h1>
          <p className="mb-4">
            This is your main content area. Add more components and information here.
          </p>

          <Row>
            <Col md={4} className="mb-4">
              <div className="border rounded p-3 bg-light shadow-sm">
                <h4>Statistics</h4>
                <p>Some statistics or charts can go here.</p>
              </div>
            </Col>
            <Col md={8} className="mb-4">
              <div className="border rounded p-3 bg-light shadow-sm">
                <h4>Recent Activities</h4>
                <p>List recent activities or updates here.</p>
              </div>
            </Col>
          </Row>
    
      </Row>

      
    </Container>
  );
};

export default Dashboard;
