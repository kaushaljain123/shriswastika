import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'
import { deletePendingOrderAction } from '../actions/userActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderLists = useSelector((state) => state.orderLists)
  const { loading, error, orders } = orderLists

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const deletePendingOrder = useSelector((state) => state.deletePendingOrder)
  const { orderLoading, orderError, orderInfo } = deletePendingOrder

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, orderInfo])

  const pendingOrderHandler = (orderId) => {
    if (window.confirm('Are You Sure To Delete This Order'))
      dispatch(deletePendingOrderAction(orderId))
    alert('Your Order is SuccessFully Delete')
    window.location.reload()
  }

  return (
    <>
      <h1>Orders</h1>
      {orderInfo ? orderInfo.status ? <Message variant="danger">{orderInfo.message}</Message> : <Message variant="danger">{orderInfo.message}</Message> : ''}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAYMENT METHOD</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt}</td>
                <td>Rs {order.totalPrice}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  {order.isPaid ? (
                    'Paid'
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                  {order.paymentMethod == 'paytm' && !order.isPaid && <div className='deleteButton'>
                    <Button variant="danger" className="btn-sm" onClick={() => pendingOrderHandler(order._id)}>
                      Delete
                    </Button>
                  </div>}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
