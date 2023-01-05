import React, { useState, useEffect } from 'react'

import { Route, Link } from "react-router-dom";
import { Form, Button, Row, Col, Table, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import moment from 'moment'
import Empty from '../images/empty.png'
import '../css/order.css'

const MyOrderScreen = ({ history }) => {
  const [name, SetName] = useState('')
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
        // SetEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  setTimeout(() => (
    setLoadingOrder(false)
  ), 1000)

  return (  

<>
{loadingOrders || loadingOrder ? (
<Loader />
) : errorOrders ? (
<Message varient="danger">{errorOrders}</Message>
) : (
<div className='order-container'>
    
    {orders && orders.length != 0 ? (
        <>
        <h5 className='orderText'>Your Orders</h5>
            {orders.map((order) => (
                <div className='card-container' key={order._id}>
                    <div className="header-container">
                            <div className="one">
                                <div className="one-child-one">
                                    <div className="one-child">
                                        <p>ORDER PLACED</p>
                                        <p>{moment(order.createdAt).format('Do MMMM YYYY')}</p>
                                    </div>
                            
                                    <div className="two-child">
                                        <p>TOTAL</p>
                                        <p>&#8377; {order.totalPrice}.00</p>
                                    </div>
                            
                                    <div className="third-child">
                                        <p>SHIP TO</p>
                                        <p>Kaushal Kumar Jain</p>
                                    </div>
                                </div>
                                <div className="one-child-two">
                                    <div className="order-id-div">
                                        <p>Order # 402-2240277</p>
                                        <div className="order-child">
                                            <p className="view-order">View Order Details</p>
                                            <span className="line"></span>
                                            <p>Invoice</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="product-detail">
                        <h4></h4>
                        <div className='a-row'>
                                {order.isDelivered ? <span className='a-size-medium a-color-base a-text-bold'>Delivered at {moment(order.deliveredAt).format('Do MMMM YYYY')}</span> : ( <>{order.isShipped ? <span class="a-size-medium a-color-base a-text-bold">Shipping ID: {order.awb_number}</span>: <span className='a-size-medium a-color-base a-text-bold'>Packing Your order</span>}</>)}
                        </div>
                        <div className='a-row'>
                            {order.isDelivered == false ? (<>{order.isShipped == false ? <span class="a-color-success">Preparing for Dispatch</span> : <span class="a-color-success">Courier Name: {order.courier_name}</span>}</>) : ""}
                        </div>
                        <div className="order-info">
                            {order.orderItems.map(orderItem => (
        
                                <div className='order-info-one'>
                                    <div className='order-info-one-one'>
                                        <img src={orderItem.image} width="80" height="80"/>
                            
                                        <div className="product-text">
                                            <p>{orderItem.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}                                           
    
                            <div className='order-info-two'>
                            <div className="buttons">
                                <button className="yellow btnn btn-1"><Link to={`order/${order._id}`}>Track Package</Link></button>
                                <button className="yellow btnn">Get Product Support</button>
                                <button className="btnn">Request cancellation</button>
                                <button className="btnn">Return or replace items</button>
                                <button className="btnn">Share gift recipt</button>
                                <button className="btnn">Leave seller feedback</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>

    ) : (
        <div className="emptyCard">
        <img src={Empty} />
      </div>
    )}

   
</div>
)}
</>
  )
}

export default MyOrderScreen
