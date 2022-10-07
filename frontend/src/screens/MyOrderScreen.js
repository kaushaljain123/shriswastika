import React, { useState, useEffect } from 'react'

import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import moment from 'moment'

const MyOrderScreen = ({ history }) => {
  const [name, SetName] = useState('')
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [confirmPassword, SetConfirmPassword] = useState('')
  const [message, SetMessage] = useState(null)
  const [loadingOrder, setLoadingOrder] = useState(true)
  const [dates, setDated] = useState([])

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
        
      } else {
        SetName(user.name)
        SetEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  setTimeout(() => (
    dateFormate(),
    setLoadingOrder(false)
  ), 1000)

  const dateFormate = () => {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    if(orders != undefined) {
        orders.map(order => {
            const d = new Date(order.createdAt);
            let orderMonth = month[d.getMonth()];
            let orderDate = d.getDate()
            let orderYear = d.getFullYear()
            let dateObject = { "month": orderMonth, "date": orderDate, "year": orderYear }
            setDated(dateObject)
            // orders.push(dateObject)
        })
    }
  }

  console.log(orders)

  return (
    <Container>
            <Row>
      <Col>
        <h5 className='orderText'>Your Orders</h5>
        {loadingOrders || loadingOrder ? (
          <Loader />
        ) : errorOrders ? (
          <Message varient="danger">{errorOrders}</Message>
        ) : (
            <div className='container'>
                {orders && orders.length != 0 ? (
                    <>
                        {orders.map((order) => (
                            <div className='order-card js-order-card orderMainCard'>
                                <div className='a-box-group a-spacing-base order js-order-card'>
                                    <div className='a-box a-color-offset-background order-info'>
                                        <div className='a-box-inner'>
                                            <div className='a-fixed-right-grid'>
                                                <div className='a-fixed-right-grid-inner'>
                                                    <div className='a-fixed-right-grid-inner'>
                                                        <div className='a-fixed-right-grid-col a-col-left'>
                                                            <div className='a-row'>
                                                                <div className='a-column a-span3'>
                                                                    <div className='a-row a-size-mini'>
                                                                        <span class="a-color-secondary label">Order placed</span>
                                                                    </div>
                                                                    <div class="a-row a-size-base">
                                                                        <span class="a-color-secondary value">{moment(order.createdAt).format('Do MMMM YYYY')}</span>
                                                                    </div>
                                                                </div>
        
                                                                <div className='a-column a-span2 yohtmlc-order-total'>
                                                                    <div className='a-row a-size-mini'>
                                                                        <span class="a-color-secondary label">Total Price </span>
                                                                    </div>
                                                                    <div class="a-row a-size-base">
                                                                        <span class="a-color-secondary value">₹ {order.totalPrice}.00</span>
                                                                    </div>
                                                                </div>
                                                                <div className='a-column a-span7 recipient a-span-last'>
                                                                    <div className='a-row a-size-mini'>
                                                                        <span class="a-color-secondary label">Ship to</span>
                                                                    </div>
                                                                    <div class="a-row a-size-base">
                                                                        <span class="a-color-secondary value">{name}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='a-box shipment bottomBoxCard'>
                                    <div className='a-box-inner'>
                                        <div className='a-row shipment-top-row js-shipment-info-container'>
                                            <div className='orderDetailBox'>
                                                <div className='a-row'>
                                                    {order.isDelivered ? <span className='a-size-medium a-color-base a-text-bold'>Delivered at {moment(order.deliveredAt).format('Do MMMM YYYY')}</span> : ( <>{order.isShipped ? <span class="a-size-medium a-color-base a-text-bold">Shipping ID: {order.awb_number}</span>: <span className='a-size-medium a-color-base a-text-bold'>Packing Your order</span>}</>)}
                                                </div>
                                                <div className='a-row'>
                                                    {order.isDelivered == false ? (<>{order.isShipped == false ? <span class="a-color-success">Preparing for Dispatch</span> : <span class="a-color-success">Courier Name: {order.courier_name}</span>}</>) : ""}
                                                    
                                                </div>
                                            </div>
                                            <div className='actions buttons'>
                                                <div className='a-row'>
                                                    <div className='a-button-stack'>
                                                    <a class="a-declarative btn btn-dark" href={`order/${order._id}`}>Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='a-fixed-right-grid a-spacing-top-medium'>
                                            <div className='a-fixed-right-grid-inner a-grid-vertical-align a-grid-top image-left'>
                                                {order.orderItems.map(orderItem => (
                                                    <div className='a-fixed-right-grid-col a-col-left'>
                                                        <div className='a-row'>
                                                            <div className='a-fixed-left-grid a-spacing-none'>
                                                                <div className='a-text-center a-fixed-left-grid-col a-col-left newImageLeft'>
                                                                    <div className='item-view-left-col-inner'>
                                                                        <a href='#'>
                                                                            <img src={orderItem.image} width="80" height="80"/>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='a-fixed-left-grid-col yohtmlc-item a-col-right'>
                                                                <div className='a-row'>
                                                                    <a className='a-link-normal'>{orderItem.name}</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>    
                                                ))}                                           
                                                <div className='a-fixed-right-grid-col a-col-right'></div>
                                            </div>
        
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        ))}
                    </>

                ) : (
                    <>
                        <h2>Sorry No Orders yet</h2>
                    </>
                )}

               
            </div>
            )}
      </Col>
    </Row>
    </Container>

  )
}

export default MyOrderScreen
