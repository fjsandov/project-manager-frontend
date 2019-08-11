import React from 'react';
import NavBar from './NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default ({ children }) => {
  return (
    <Container>
      <Row>
        <Col>
          <NavBar />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}