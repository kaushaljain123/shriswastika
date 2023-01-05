import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import { addToCart } from "../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = ({ product, index }) => {
  const dispatch = useDispatch();

  function addToCartHandler(id, qty) {
    dispatch(addToCart(id, qty));
    toast.success("🛒 Added to Cart", {
      position: "top-right",
      autoClose: 10,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }

  const totalDiff = product.mrp - product.price;

  const totalPercOff = ((totalDiff / product.mrp) * 100).toFixed(2);

  return (
    // <Card className="rounded shadow mainCard">
    //   <ToastContainer />
    //   <Link className="imageContainer" to={`/product/${product._id}`}>
    //     <div className="d-flex justify-content-center productImage">
    //       <Card.Img
    //         className="product-img"
    //         src={product.image ? product.image : product.image}
    //         variant="top"
    //       />
    //     </div>
    //   </Link>

    //   <Card.Body className="cardBody">
    //     <Link to={`/product/${product._id}`}>
    //       <Card.Title as="div">
    //         <strong>{product.name}</strong>
    //       </Card.Title>
    //     </Link>

    //     <Card.Text as="div">
    //       <Rating
    //         value={product.rating}
    //         text={`${product.numReviews} reviews`}
    //       />
    //     </Card.Text>

    //     <Card.Text as="h3">₹ {product.price}</Card.Text>

    //     <Card.Text as="p">
    //       M.R.P.: <del>₹ {product.mrp}</del> ({totalPercOff} % off)
    //     </Card.Text>

    //     <Button
    //       variant="outline-primary btn-block"
    //       disabled={product.countInStock === 0}
    //       onClick={() => addToCartHandler(product._id, 1)}
    //     >
    //       ADD TO CART
    //     </Button>
    //   </Card.Body>
    // </Card>

    <div className='product-card shadow'>
      <ToastContainer />
      <div className="card-con">
        <div className="product-img-div">
          <Link to={`/product/${product._id}`}><img className="product-img" src={product.image ? product.image : product.image} /></Link>
        </div>

        <div className="card-body">
          <h2 className="product-title">{product.name}</h2>

        <div className="card-footer">
            <div className="rating">
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </div>

            <div className="card-price">
              <h3>₹ {product.price}</h3>
            </div>

            <div className="card-mrp">
            <p>M.R.P.: <del>₹ {product.mrp}</del> ({totalPercOff} % off)</p>
            </div>

            <div className="card-button">
              <button className="shadow" disabled={product.countInStock === 0} onClick={() => addToCartHandler(product._id, 1)}>ADD TO CART</button>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
