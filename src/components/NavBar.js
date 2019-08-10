import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Project manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" />
        <Form inline>
          <FormControl type="text" placeholder="Email" className="mr-sm-2" />
          <FormControl type="password" placeholder="Password" className="mr-sm-2" />
          <Button variant="outline-success">LogIn</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}