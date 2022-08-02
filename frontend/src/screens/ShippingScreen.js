import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartAction'
import CheckOutSteps from '../components/CheckOutSteps'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, SetAddress] = useState(shippingAddress.address)
  const [city, SetCity] = useState(shippingAddress.city)
  const [state, SetState] = useState(shippingAddress.state)
  const [phone, SetPhone] = useState(shippingAddress.phone)
  const [email, SetEmail] = useState(shippingAddress.email)
  const [postalCode, SetPostalCode] = useState(shippingAddress.postalCode)
  const [country, SetCountry] = useState(
    shippingAddress.country ? shippingAddress.country : 'India'
  )

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({
        address,
        city,
        state,
        phone,
        email,
        postalCode,
        country,
      })
    )
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="Address">
          <Form.Label>Enter Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => SetAddress(e.target.value)}
            required></Form.Control>
        </Form.Group>
        <Form.Group controlId="City">
          <Form.Label>Enter City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => SetCity(e.target.value)}
            required></Form.Control>
        </Form.Group>
        <Form.Group controlId="State">
          <Form.Label>Enter State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter State"
            value={state}
            onChange={(e) => SetState(e.target.value)}
            required></Form.Control>
        </Form.Group>
        <Form.Group controlId="Phone">
          <Form.Label>Enter Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Mobile Number"
            value={phone}
            onChange={(e) => SetPhone(e.target.value)}
            required></Form.Control>
        </Form.Group>
        <Form.Group controlId="Email">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
            required></Form.Control>
        </Form.Group>
        <Form.Group controlId="PostalCode">
          <Form.Label>Enter Pincode</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Pincode"
            value={postalCode}
            onChange={(e) => SetPostalCode(e.target.value)}
            required></Form.Control>
        </Form.Group>
        <Form.Group controlId="Country">
          <Form.Label>Enter Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => SetCountry(e.target.value)}
            required></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className='profileUpdateButton'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
