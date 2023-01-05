import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = ({ location, history }) => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <div className="shri-form">
      <h1 className="text-center">Shriswastika</h1>
      {error && <Message varient="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className='card loginCard shadow'>
        <h3>Sign in</h3>
        <Form.Group controlId="email">
          <Form.Label>Enter Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          ></Form.Control>
          <Row className="py-3">
            <Col>
              <Link to={"/send-email"}>Forgot Password </Link>
            </Col>
          </Row>
        </Form.Group>

        <Button type="submit" className="btn-block form-btn shadow" variant="primary">
          Login
        </Button>
      </Form>

      <Row className="py-3">
          <Col>
          <div className="a-divider a-divider-break">
            <h5 className="shri-user">New to Shriswastika</h5>
          </div>
            <Link className="btn btn-light btn-block form-btn shadow createBtn" variant="secondary"
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
