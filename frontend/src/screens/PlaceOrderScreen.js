import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckOutSteps from '../components/CheckOutSteps'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  // calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  // cart.shippingPrice = addDecimals(cart.itemsPrice > 500 ? 0 : 50)
  cart.shippingPrice = 0

  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      if (cart.paymentMethod === 'CoD') {
        history.push(`/thankyou`)
      } else {
        history.push(`/order/${order._id}`)
      }
    }
    // eslint-disable-next-line
  }, [history, success])

  const PlaceOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p className='orderMo'>
                <strong>Address:</strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Mathod</h2>
              <strong className='orderMo'>Mathod: </strong>{' '}
              <span className='orderMo'>
              {cart.paymentMethod === 'CoD'
                ? 'Pay on Delivery'
                : cart.paymentMethod}
              </span>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index} style={{ fontSize: 14 }}>
                      <Row>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x Rs {item.price} = Rs{' '}
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup.Item>
              <h2>Order Summery</h2>
            </ListGroup.Item>
            <div className='orderSummery'>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>Rs {cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping Price</Col>
                <Col>Rs {cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>Rs {cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            </div>
            {error && <Message varient="danger">{error}</Message>}
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block form-btn"
                disabled={cart.cartItems === 0}
                onClick={PlaceOrderHandler}>
                Place Order
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
