import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import {
  getIsSignedIn,
  login,
  logout,
} from '../store/ducks/session';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import LoginForm from './LoginForm';

function NavBar({ isSignedIn, onLogin, onLogout }) {
  const handleLogout = useCallback(
    () => onLogout(),
    [onLogout],
  );
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        Project manager
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!isSignedIn && <Link to="/sign-up">Sign up</Link>}
        </Nav>
        {isSignedIn
          ? (
            <Button
              variant="outline-error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )
          : <LoginForm onLogin={onLogin} />}
      </Navbar.Collapse>
    </Navbar>
  )
}

function mapStateToProps(state) {
  return {
    isSignedIn: getIsSignedIn(state),
  };
}

const mapDispatchToProps = {
  onLogin: login,
  onLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);