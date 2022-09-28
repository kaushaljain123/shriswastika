import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUsers } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {

    const userId = match.params.id

    const [name, SetName] = useState('')
    const [email, SetEmail] = useState('')
    const [isAdmin, SetIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if(!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                SetName(user.name)
                SetEmail(user.email)
                SetIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, history, userId, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUsers({ _id: userId, name, email, isAdmin }))
    }

  return (
      <>
        <Link to='/admin/userList' className='btn btn-light my-3'>Go Back</Link>

        <FormContainer>
            <h1>Update User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message varient='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message varient='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Enter Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => SetName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Enter Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => SetEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='isadmin'>
                        <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => SetIsAdmin(e.target.checked)}></Form.Check>
                    </Form.Group>
    
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            )}

        </FormContainer>
      </>

  )
}

export default UserEditScreen