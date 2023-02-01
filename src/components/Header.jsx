import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../config/firebaseConfig';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  const auth = getAuth(firebaseApp)
  const [user ] = useAuthState(auth)
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
      <Container className="fs-5" >
        <Navbar.Brand as={Link} to="/"><h3>Gomez</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <NavDropdown title="Goods" id="collasible-nav-dropdown">
              <NavDropdown.Item href="action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Price" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          </Nav>
          <Nav>
          {!user && <Nav.Link as={Link} to="/login">Enter</Nav.Link>}
          {!user && <Nav.Link as={Link} to="/register" className="bg-primary rounded text-light ">
            Create Free Menu</Nav.Link>}
            {user && (
              <div className="d-flex">
              <Nav.Link as={Link} to="/profile"><p className='text-dark mb-0'>
                Halo, {user.email.split('@')[0]} !</p>
              </Nav.Link>
              <Nav.Link as={Link} to="/" onClick={() => signOut(auth)}>Logout</Nav.Link>
              </div>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header