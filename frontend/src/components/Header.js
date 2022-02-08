import React from 'react';
import { Navbar, Container, Nav, NavDropdown  } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
       <Navbar bg="dark" variant='dark' expand="sm" collapseOnSelect>
         <Container>
            <Navbar.Brand href="#home">Proshop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                <Nav.Link href="/login"><i className='fas fa-user'></i> login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
         </Container>

</Navbar>
    </header>
  )

};

export default Header;
