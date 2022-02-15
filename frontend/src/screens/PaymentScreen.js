import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartAction'
import CheckOutSteps from '../components/CheckOutSteps'

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, SetPaymentMethod] = useState('CoD')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        console.log(e.target.value)
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    
  return (
    <FormContainer>
        <CheckOutSteps step3/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Payment Method</Form.Label>
                <Col>
                    <Form.Check type='radio' label='Paypal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' onChange={(e) => SetPaymentMethod(e.target.value)}>

                    </Form.Check>
                    <Form.Check type='radio' label='Cash On Delivery' id='COD' name='paymentMethod' value='CoD' checked onChange={(e) => SetPaymentMethod(e.target.value)}>
                        
                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen