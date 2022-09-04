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
    <Card className="my-3 p-3 rounded shadow mainCard">
      <ToastContainer />
      <Link className="imageContainer" to={`/product/${product._id}`}>
        <div className="d-flex justify-content-center productImage">
          <Card.Img
            className="rounded mx-auto d-block images"
            src={product.image ? product.image : product.image}
            variant="top"
          />
        </div>
      </Link>

      <Card.Body className="cardBody">
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">₹ {product.price}</Card.Text>

        <Card.Text as="p">
          M.R.P.: <del>₹ {product.mrp}</del> ({totalPercOff} % off)
        </Card.Text>

        <Button
          variant="outline-primary btn-block"
          disabled={product.countInStock === 0}
          onClick={() => addToCartHandler(product._id, 1)}
        >
          ADD TO CART
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
