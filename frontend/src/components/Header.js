import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        bg="light"
        variant="info"
        expand="sm"
        className="backgroundHeader shadow"
        collapseOnSelect
      >
        <LinkContainer to="/">
          <Navbar.Brand>Shriswastika</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Route render={({ history }) => <SearchBox history={history} />} />
          <Nav className="ml-auto">

            {userInfo ? (
              // When User/Admin Login
              <NavDropdown title="Accounts & Lists" id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Your Accounts</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orders">
                  <NavDropdown.Item>Your Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Your Wish List</NavDropdown.Item>
                </LinkContainer>
                <hr />
                {userInfo && userInfo.isAdmin && (
                  <>
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <hr />
                  </>
                )}
                <NavDropdown.Item onClick={logoutHandler}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // When User/Admin is not Login
              <NavDropdown title="Accounts & Lists" id="username">
                <LinkContainer to="/login">
                  <NavDropdown.Item>Sign in</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}

            <LinkContainer to="/cart">
              <Nav.Link href="/cart">
                <i className="fas fa-shopping-cart"></i> Cart (
                {cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
