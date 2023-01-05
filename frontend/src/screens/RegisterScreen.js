import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
    const [name, SetName] = useState('')
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')
    const [confirmPassword, SetConfirmPassword] = useState('')
    const [message, SetMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            SetMessage('Password do not match')
        }else {
            dispatch(register(name, email, password))
        }
    }

  return (
    <FormContainer>
        <div className='shri-form'>
        <h1 className="text-center">Shriswastika</h1>
        {message && <Message varient='danger'>{message}</Message>}
        {error && <Message varient='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler} className='card loginCard shadow'>
            <h3>Sign Up</h3>
            <Form.Group controlId='email'>
                <Form.Label>Enter Name</Form.Label>
                <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => SetName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Enter Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => SetEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Enter Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => SetPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
                <Form.Label>Enter Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Confirm Password' value={confirmPassword} onChange={(e) => SetConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' className='form-btn shadow' variant='primary'>Create An Account</Button>

            <Row className='py-3'>
                <Col>
                    Already have an Account? {' '} <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign in</Link>
                </Col>
            </Row>
        </Form>
        </div>
    </FormContainer>
  )
}

export default RegisterScreen