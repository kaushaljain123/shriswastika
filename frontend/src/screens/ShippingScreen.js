import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartAction'
import CheckOutSteps from '../components/CheckOutSteps'

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, SetAddress] = useState(shippingAddress.address)
    const [city, SetCity] = useState(shippingAddress.city)
    const [postalCode, SetPostalCode] = useState(shippingAddress.postalCode)
    const [country, SetCountry] = useState(shippingAddress.country ? shippingAddress.country : 'India')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }
    
  return (
    <FormContainer>
        <CheckOutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='Address'>
                    <Form.Label>Enter Address</Form.Label>
                    <Form.Control type='text' placeholder='Enter Address' value={address} onChange={(e) => SetAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='City'>
                    <Form.Label>Enter City</Form.Label>
                    <Form.Control type='text' placeholder='Enter City' value={city} onChange={(e) => SetCity(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='PostalCode'>
                    <Form.Label>Enter Pincode</Form.Label>
                    <Form.Control type='number' placeholder='Enter Pincode' value={postalCode} onChange={(e) => SetPostalCode(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='Country'>
                    <Form.Label>Enter Country</Form.Label>
                    <Form.Control type='text' placeholder='Enter Country' value={country} onChange={(e) => SetCountry(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen