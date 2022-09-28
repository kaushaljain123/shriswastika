import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import { PaytmButton } from "../components/PaytmButton";

const OrderScreen = ({ history, match }) => {
  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }

  const [show, setShow] = useState(false);
  const [productWeight, setProductWeight] = useState(0);
  const [productHeight, setProductHeight] = useState(0);
  const [productLength, setProductLength] = useState(0);
  const [productBreadth, setProductBreadth] = useState(0);
  const [warehouse, setWarehouse] = useState("");
  const [name, setName] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [city, setCity] = useState("Morena");
  const [state, setState] = useState("Madhya Pradesh");
  const [pincode, setPincode] = useState("476001");
  const [phone, setPhone] = useState("");

  const orderId = match.params.id;

  const [sdkReady, SetSdkReady] = useState(false);

  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  // const orderPay = useSelector((state) => state.orderPay)
  // const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const GenerateOrderId = 8522 + Math.floor(1000 + Math.random() * 9000);

  if (!loading) {
    // calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (!order || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
      } else {
        SetSdkReady(true);
      }
    }
  }, [order, orderId, successDeliver]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const shipMentLoginHandler = () => {
    var loginData = JSON.stringify({
      email: "shriswastikainfotechpvtltd@gmail.com",
      password: "Admin@123",
    });

    var config = {
      method: "post",
      url: "https://api.nimbuspost.com/v1/users/login",
      headers: {
        "content-type": "application/json",
      },
      data: loginData,
    };

    axios(config)
      .then(function (res) {
        localStorage.setItem("shipmentToken", res.data.data);
        setShow(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleClose = () => {
    setShow(false);
  };

  const updateShipment = () => {
    const updateShippingHeader = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios.put(`/api/orders/${orderId}/shipped`, updateShippingHeader);
  };

  const updateCourior = (data) => {
    const couriorData = {
      awb_number: data.awb_number,
      courier_name: data.courier_name,
      label: data.label,
      order_id: data.order_id,
      shipment_id: data.shipment_id,
      status: data.status,
    };
    const updateCouriorDetails = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios.put(
      `/api/orders/${orderId}/updateCourier`,
      couriorData,
      updateCouriorDetails
    );
  };

  const createShipmentHandler = () => {
    console.log(order.shippingAddress);
    let orderDetails = order.orderItems.map((item, index) => {
      return {
        name: item.name,
        qty: item.qty,
        price: item.price,
        sku: item.name,
      };
    });

    const shipmentData = JSON.stringify({
      order_number: GenerateOrderId,
      shipping_charges: order.shippingPrice,
      discount: 0,
      cod_charges: 0,
      payment_type: order.paymentMethod == "CoD" ? "cod" : "prepaid",
      order_amount: order.totalPrice,
      package_weight: productWeight,
      package_length: productLength,
      package_breadth: productBreadth,
      package_height: productLength,
      consignee: {
        name: userInfo.name,
        address: order.shippingAddress.address,
        address_2: order.shippingAddress.address,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        pincode: order.shippingAddress.postalCode,
        phone: order.shippingAddress.phone,
      },
      pickup: {
        warehouse_name: warehouse,
        name: name,
        address: addressOne,
        address_2: addressTwo,
        city: city,
        state: state,
        pincode: pincode,
        phone: phone,
      },
      order_items: orderDetails,
    });

    let shippingToken = localStorage.getItem("shipmentToken");
    var config = {
      method: "post",
      url: "https://api.nimbuspost.com/v1/shipments",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${shippingToken}`,
      },
      data: shipmentData,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.status) {
          updateShipment();
          updateCourior(response.data.data);
          setShow(false);
          alert(response.data.message);
        } else {
          setShow(false);
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getData = (data) => {
    return fetch(`/api/orders/${orderId}/pay`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  const makePayment = () => {
    getData({
      amount: order.totalPrice,
      email: order.shippingAddress.email,
      mobile: order.shippingAddress.phone,
      orderId: order._id + Math.random(),
      orderIds: order._id,
      customerName: userInfo.name,
    }).then((response) => {
      var information = {
        action: "https://securegw.paytm.in/order/process",
        params: response,
      };
      post(information);
    });
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message varient="danger">{error}</Message>
  ) : (
    <>
      <h1>Order ID: {order._id}</h1>
      {order.shippingAddress.gstNumber && (
        <h4>GST Number: {order.shippingAddress.gstNumber}</h4>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Shipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="packageWeight">
              <Form.Label>Package Weight</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Package Weight"
                value={productWeight}
                onChange={(e) => setProductWeight(e.target.value)}
              />
              <Form.Text className="text-muted">
                Package weight must be in Number.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="packagelength">
              <Form.Label>Package Length</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Package Length"
                value={productLength}
                onChange={(e) => setProductLength(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="packageBreath">
              <Form.Label>Package Breath</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Package Breadth"
                value={productBreadth}
                onChange={(e) => setProductBreadth(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="packageheight">
              <Form.Label>Package Height</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Package Height"
                value={productHeight}
                onChange={(e) => setProductHeight(e.target.value)}
              />
            </Form.Group>
            <h4>Pickup Address</h4>
            <Form.Group className="mb-3" controlId="packageheight">
              <Form.Label>Enter Warehouse</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Package Height"
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="packageheight">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="packageheight">
              <Form.Label>Enter Address 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address 1"
                value={addressOne}
                onChange={(e) => setAddressOne(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="packageheight">
              <Form.Label>Enter Address 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address 2"
                value={addressTwo}
                onChange={(e) => setAddressTwo(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="packageheight">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="packageheight">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="packageheight">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="packageheight">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createShipmentHandler}>
            Create Shipment
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {order.isShipped ? (
                <h2>Order Shipped</h2>
              ) : (
                <h2>Order Is Not Shipped Yet</h2>
              )}
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
                {order.isDelivered ? (
                  <Message varient="success">
                    Delivered On {order.deliveredAt}
                  </Message>
                ) : (
                  <Message varient="danger">Not Delivered</Message>
                )}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Mathod</h2>
              <p>
                <strong>Mathod: </strong>{" "}
                {order.paymentMethod == "CoD"
                  ? "Pay on Delivery"
                  : order.paymentMethod}
                <br />
                {order.PAYMENTMODE && (
                  <strong>Pay Via: {order.PAYMENTMODE}</strong>
                )}
                {order.isPaid ? (
                  <Message varient="success">Paid On {order.TXNDATE}</Message>
                ) : (
                  <Message varient="danger">Not Paid</Message>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x Rs {item.price} = Rs{" "}
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
          <ListGroup variant="flush">
            <Card>
              <ListGroup.Item>
                <h2>Order Sumery</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>Rs {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {order.paymentMethod == "paytm" ? (
                    <Button className="btn btn-block" onClick={makePayment}>
                      PAY
                    </Button>
                  ) : (
                    <p className="text-center">Pay To Our Delivery Partner</p>
                  )}
                </ListGroup.Item>
              )}
            </Card>

            {order.isShipped ? (
              <Card>
                <ListGroup.Item>
                  <h2>Courior Details</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>AWB Number</Col>
                    <Col>{order.awb_number}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Courier Name</Col>
                    <Col>{order.courier_name}</Col>
                  </Row>
                </ListGroup.Item>
              </Card>
            ) : (
              ""
            )}
            {userInfo && userInfo.isAdmin && !order.isDelivered && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </Button>
              </ListGroup.Item>
            )}

            {userInfo && userInfo.isAdmin && !order.isShipped && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={shipMentLoginHandler}
                >
                  Ready To Ship
                </Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
