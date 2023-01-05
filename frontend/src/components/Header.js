import React from "react";
import { Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import Cart from '../images/icons/shopping-cart.png'

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
    // <header className="header">
    //   <Navbar>
    //     <LinkContainer to="/">
    //       <Navbar.Brand className="brand-name">Shriswastika</Navbar.Brand>
    //     </LinkContainer>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Route render={({ history }) => <SearchBox history={history} />} />
    //       <Nav className="ml-auto">

    //         {userInfo ? (
    //           // When User/Admin Login
    //           <NavDropdown title="Accounts & Lists" id="username">
    //             <LinkContainer to="/profile">
    //               <NavDropdown.Item>Your Accounts</NavDropdown.Item>
    //             </LinkContainer>
    //             <LinkContainer to="/orders">
    //               <NavDropdown.Item>Your Orders</NavDropdown.Item>
    //             </LinkContainer>
    //             <LinkContainer to="/profile">
    //               <NavDropdown.Item>Your Wish List</NavDropdown.Item>
    //             </LinkContainer>
    //             <hr />
    //             {userInfo && userInfo.isAdmin && (
    //               <>
    //                 <LinkContainer to="/admin/dashboard">
    //                   <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
    //                 </LinkContainer>
    //                 <hr />
    //               </>
    //             )}
    //             <NavDropdown.Item onClick={logoutHandler}>
    //               Sign Out
    //             </NavDropdown.Item>
    //           </NavDropdown>
    //         ) : (
    //           // When User/Admin is not Login
    //           <NavDropdown title="Accounts & Lists" id="username">
    //             <LinkContainer to="/login">
    //               <NavDropdown.Item>Sign in</NavDropdown.Item>
    //             </LinkContainer>
    //           </NavDropdown>
    //         )}

    //         <LinkContainer to="/cart">
    //           <Nav.Link href="/cart">
    //             <i className="fas fa-shopping-cart"></i> Cart (
    //             {cartItems.reduce((acc, item) => acc + item.qty, 0)})
    //           </Nav.Link>
    //         </LinkContainer>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Navbar>
    // </header>
    <header className="header">
      <Link to='/'><h1 className="logo">Shriswastika</h1></Link>
      <nav class="main-nav">
            <ul class="main-nav-list">
              {userInfo ? (
                <>  
                    <li><Link class="main-nav-links" to="/profile">Account</Link></li>
                    <li><Link class="main-nav-links" to="/orders">Orders</Link></li>
                    {/* <li><Link class="main-nav-links" href="#">Bulk Order</Link></li> */}

                  {userInfo && userInfo.isAdmin && (
                    <li><Link class="main-nav-links" to="/admin/userlist">Dashboard</Link></li>
                  )}

                    <li><Link class="main-nav-links" onClick={logoutHandler}>Logout</Link></li>
                </>
              ) : (
                <>
                  {/* <li><Link class="main-nav-links" href="#">Bulk Order</Link></li> */}
                  <li><Link class="main-nav-links" to='/login'>SignIn</Link></li>
                </>
              )}
                <li className="cart">
                  <Link to='/cart'><img className="icon" src={Cart}/></Link>
                  </li>
            </ul>
        </nav>
    </header>
  );
};

export default Header;
