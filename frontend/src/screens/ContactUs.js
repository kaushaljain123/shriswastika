import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const ContactUs = () => {
  return (
    <Container>
        <Row>
            <Col>
                <FormContainer>
                    <h3>SEND MESSAGE</h3>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                placeholder='Enter Name'
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                placeholder='Enter Phone'
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                placeholder='Enter Email'
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                placeholder='Enter City'
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                as='textarea'
                                row='5'
                                col='5'
                                placeholder='Enter Message'
                            ></Form.Control>
                        </Form.Group>
                    </Form>
                </FormContainer>
            </Col>
        </Row>
    </Container>
  )
}

export default ContactUs