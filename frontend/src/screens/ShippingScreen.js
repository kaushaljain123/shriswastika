import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartAction";
import CheckOutSteps from "../components/CheckOutSteps";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, SetAddress] = useState(shippingAddress.address);
  const [city, SetCity] = useState(shippingAddress.city);
  const [state, SetState] = useState(shippingAddress.state);
  const [phone, SetPhone] = useState(shippingAddress.phone);
  const [email, SetEmail] = useState(shippingAddress.email);
  const [postalCode, SetPostalCode] = useState(shippingAddress.postalCode);
  const [country, SetCountry] = useState(
    shippingAddress.country ? shippingAddress.country : "India"
  );
  const [gstNumber, SetGstNumber] = useState(shippingAddress.gstNumber);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        state,
        phone,
        email,
        postalCode,
        country,
        gstNumber,
      })
    );
    history.push("/payment");
  };

  return (
    <div className="form-container">
      <CheckOutSteps step1 step2 />
      <Form onSubmit={submitHandler} className='shipping-con card shadow'>
      <h1 className="shippingText">Shipping</h1>
        <Form.Group controlId="Address">
          <Form.Label className='input'>Enter Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            className='input'
            onChange={(e) => SetAddress(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="City">
          <Form.Label className='input'>Enter City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            className='input'
            onChange={(e) => SetCity(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="State">
          <Form.Label className='input'>Enter State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter State"
            value={state}
            className='input'
            onChange={(e) => SetState(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="Phone">
          <Form.Label className='input'>Enter Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Mobile Number"
            value={phone}
            className='input'
            onChange={(e) => SetPhone(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className='input' controlId="Email">
          <Form.Label className='input'>Enter Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={email}
            className='input'
            onChange={(e) => SetEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="PostalCode">
          <Form.Label className='input'>Enter Pincode</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Pincode"
            value={postalCode}
            className='input'
            onChange={(e) => SetPostalCode(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="Country">
          <Form.Label className='input'>Enter Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            className='input'
            onChange={(e) => SetCountry(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="Country">
          <Form.Label className='input'>Enter GST Number ( Optional )</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter GST Number"
            value={gstNumber}
            className='input'
            onChange={(e) => SetGstNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="conBtn form-btn btn-block shadow">
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default ShippingScreen;
