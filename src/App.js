import React from "react";
import { FaBeer } from "react-icons/fa";
import { Button, Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6} className="text-center">
          <h1>Welcome to React with Bootstrap!</h1>
          <p>
            <FaBeer /> Cheers!
          </p>
          <Button variant="primary">Click Me</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
