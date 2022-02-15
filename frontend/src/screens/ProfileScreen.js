import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileScreen = ({ history }) => {
    const [name, SetName] = useState('')
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')
    const [confirmPassword, SetConfirmPassword] = useState('')
    const [message, SetMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                SetName(user.name)
                SetEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            SetMessage('Password do not match')
        }else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

  return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {success && <Message varient='success'>Profile Update SuccessFully</Message>}
                {message && <Message varient='danger'>{message}</Message>}
                {error && <Message varient='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
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

                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h1>My Orders</h1>
            </Col>
        </Row>
  )
}

export default ProfileScreen