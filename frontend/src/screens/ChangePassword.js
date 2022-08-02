import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { userUpdatePassword } from '../actions/userActions'

const ChangePassword = ({ location, history }) => {
    const [code, SetCode] = useState('')
    const [password, SetPassword] = useState('')
    const [passwordOpen, SetPasswordOpen] = useState(false)
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const updatePassword = useSelector((state) => state.updatePassword)
    const { passwordLoading, passwordError, passwordInfo } = updatePassword

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const emailData = JSON.parse(localStorage.getItem('emailDataInfo'))
    console.log(emailData)

    useEffect(() => {

        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect, passwordInfo])

    const checkVerifyHandler = (e) => {
        e.preventDefault()
        if (!code) {
            return alert('Please Enter Code')
        }
        if (emailData.data.code === code) {
            SetPasswordOpen(true)
        } else {
            alert('Please Check Code Onces Again!')
        }
    }


    const updatePasswordHandler = (e) => {
        e.preventDefault()
        dispatch(userUpdatePassword(emailData.data.email, code, password))
    }

    return (
        <FormContainer>
            <h1>Chanege Password</h1>
            {passwordInfo ? passwordInfo.status ? <Message varient='info'>{passwordInfo.message}</Message> : <Message varient='danger'>{passwordInfo.message}</Message> : ''}
            <Form>
                {!passwordOpen && <Form.Group controlId='code'>
                    <Form.Label>Enter Code</Form.Label>
                    <Form.Control type='number' placeholder='Enter Code' value={code} onChange={(e) => SetCode(e.target.value)}></Form.Control>
                </Form.Group>}
                {passwordOpen && <Form.Group controlId='code'>
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => SetPassword(e.target.value)}></Form.Control>
                </Form.Group>}
                <Button type='submit' variant='primary' onClick={passwordOpen ? updatePasswordHandler : checkVerifyHandler}>{passwordOpen ? 'Change Password' : 'Verify Code'}</Button>
            </Form>
        </FormContainer>
    )
}

export default ChangePassword