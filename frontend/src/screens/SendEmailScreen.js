import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { sendEmailCode } from "../actions/userActions";

const SendEmailScreen = ({ location, history }) => {
  const [email, SetEmail] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const sendEmail = useSelector((state) => state.sendEmail);
  const { emailLoading, emailError, emailInfo } = sendEmail;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect, emailInfo]);

  const sendEmailHandler = (e) => {
    e.preventDefault();
    dispatch(sendEmailCode(email));
  };

  if (emailInfo) {
    setTimeout(() => {
      if (emailInfo.message == "Email send Please check Your Email") {
        history.push("/change-password");
      }
    }, 3000);
  }

  return (
    <FormContainer>
      <h1 className="text-center">Shriswastika</h1>
      {emailError && <Message varient="danger">{error}</Message>}
      {emailLoading && <Loader />}
      {/* {!emailInfo.status && <Message varient='danger'>{emailInfo.message}</Message>} */}
      {emailInfo ? (
        emailInfo.status ? (
          <Message varient="info">{emailInfo.message}</Message>
        ) : (
          <Message varient="danger">{emailInfo.message}</Message>
        )
      ) : (
        ""
      )}
      <Form onSubmit={sendEmailHandler} className='card loginCard shadow'>
        <h3>Forgot Password</h3>
        <Form.Group controlId="email">
          <Form.Label>Enter Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Send Code
        </Button>
      </Form>
    </FormContainer>
  );
};

export default SendEmailScreen;
