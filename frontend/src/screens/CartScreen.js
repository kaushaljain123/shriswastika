import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Item,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removefromCart } from "../actions/cartAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Empty from '../images/empty.png'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));

      console.log(cartItems)
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removefromCart(id));
    toast.success("❌ Remove to Cart", {
      position: "top-right",
      autoClose: 10,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const checkoutHandler = (id) => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
        {cartItems.length != 0 ? (
    //   <Row className="cart-container">
    //   <ToastContainer />
    //   <Col md={8} className='product-item'>
    //     <h1>Shopping Cart</h1>
    //     <ListGroup variant="flush">
    //         {cartItems.map((item) => (
    //           <ListGroup.Item key={item.product} className='items'>
    //             <Row>
    //               <Col md={3}>
    //                 <Link to={`/product/${item.product}`} className='productName'>{item.name}</Link>
    //               </Col>
    //               <Col md={2}>Rs {item.price}</Col>
    //               <Col md={2}>
    //                 <Form.Control
    //                   as="select"
    //                   value={item.qty}
    //                   onChange={(e) =>
    //                     dispatch(
    //                       addToCart(item.product, Number(e.target.value))
    //                     )
    //                   }
    //                 >
    //                   {[...Array(item.countInStock).keys()].map((x) => (
    //                     <option key={x + 1} value={x + 1}>
    //                       {x + 1}
    //                     </option>
    //                   ))}
    //                 </Form.Control>
    //               </Col>
    //               <Col md={2}>
    //                 <Button
    //                   type="button"
    //                   variant="light"
    //                   onClick={() => removeFromCartHandler(item.product)}
    //                 >
    //                   {" "}
    //                   <i className="fas fa-trash"></i>{" "}
    //                 </Button>
    //               </Col>
    //             </Row>
    //           </ListGroup.Item>
    //         ))}
    //       </ListGroup>
    //   </Col>
    //   <Col md={4}>
    //     <Card>
    //       <ListGroup variant="flush">
    //         <ListGroup.Item>
    //           <h2>
    //             Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
    //             items
    //           </h2>
    //           Rs{" "}
    //           {cartItems
    //             .reduce((acc, item) => acc + item.qty * item.price, 0)
    //             .toFixed(2)}
    //         </ListGroup.Item>
    //         <ListGroup.Item>
    //           <Button
    //             type="button"
    //             className="btn-block"
    //             disabled={cartItems.length === 0}
    //             onClick={checkoutHandler}
    //           >
    //             Proceed To Checkout
    //           </Button>
    //         </ListGroup.Item>
    //       </ListGroup>
    //     </Card>
    //   </Col>
    // </Row>
    // <h1>dd</h1>
    <section className="cart-section">
      <div className="cart-div">
        <h2>Shopping Cart</h2>
        <hr />

        <div className="cart-container">
          <div className="cart-div">
            {cartItems.map(item => (
              <>
                <div className="product-cart-box">
                  <img src={item.image} alt={item.name} width='180' height='180'/>

                  <div className="product-text">
                    <h3>{item.name}</h3>
                    <p onClick={() => removeFromCartHandler(item.product)}>Delete</p>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="total-box shadow">
               <h2>
                 Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                 items : Rs{" "}{cartItems
                 .reduce((acc, item) => acc + item.qty * item.price, 0)
                 .toFixed(2)}
               </h2>

               <button className="form-btn shadow btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to Checkout</button>
               
          </div>
        </div>
      </div>
    </section>
    ) : (
      <div className="emptyCard">
        <img src={Empty} />
      </div>
    )}
    </>

    
  );
};

export default CartScreen;
