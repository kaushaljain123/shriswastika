import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const CategoryAdd = () => {
    const [categoryName, setCategoryName] = useState('')
    const [subCategoryName, setSubCategoryName] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categoryData, setCategoryData] = useState([])
    const [getAllCategory, setGetAllCategory] = useState([])


    const getCategory = async() => {
        var cateData = []
        try {
            const { data } = await axios.get('/api/category')
                cateData.push(data)
                setCategoryData(cateData[0])


        } catch (error) {
            console.error(error)
        }
    }

    const getSubCategory = async() => {
        try {
            const getAllCateData = await axios.get('/api/category/all')
            console.log(getAllCateData.data)
            setGetAllCategory(getAllCateData.data)

        } catch (error) {
            
        }
    }

    const addCategoryHandler = async (e) => {
        e.preventDefault()
        const userData = JSON.parse(localStorage.getItem('userInfo'))
        const categoryFormData = {
            name: categoryName
        }
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userData.token}`
            }
        }
        try {
            const { addCate } = await axios.post('/api/category/create', categoryFormData, config)
            alert('Category Add Successfully!')
            document.location.href = '/add-category'
        } catch (error) {
            
        }
    }

    const addSubCategoryHandler = async (e) => {
        e.preventDefault()
        const userTokenData = JSON.parse(localStorage.getItem('userInfo'))
        const headerConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userTokenData.token}`
            }
        }

        const subCategoryFormData = {
            name: subCategoryName,
            parentId: categoryId
        }
        
        const { subCategoryData } = await axios.post('/api/category/create', subCategoryFormData, headerConfig)
        alert('Subcategory Add Successfully!')
        document.location.href = '/add-category'
    }

    const deleteHandler = async(id) => {
        const userTokenForDelete = JSON.parse(localStorage.getItem('userInfo'))

        const deleteHeaderConfig = {
            headers: {
                Authorization: `Bearer ${userTokenForDelete.token}`
            }
        }

        console.log(deleteHeaderConfig)

        const { deleteCategory } = await axios.delete(`/api/category/${id}`, deleteHeaderConfig)
        alert('Category Delete Successfully!')
        document.location.href = '/add-category'

    }

    useEffect(() => {
        getCategory()
        getSubCategory()
    }, [])

    console.log(getAllCategory)
  return (
    <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>

        <Row>
            <Col>
                <FormContainer>
                     <h1>Add Category</h1>
                     <Form onSubmit={addCategoryHandler}>
                         <Form.Group controlId='name'>
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Category Name'
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            >
                            </Form.Control>
                         </Form.Group>
                         <Button type='submit' variant='primary'>SAVE</Button>
                     </Form>
                </FormContainer>
            </Col>
            <Col>
                <FormContainer>
                    <h1>Add SubCategory</h1>
                    <Form onSubmit={addSubCategoryHandler}>
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control 
                                as='select' 
                                onChange={(e) => setCategoryId(e.target.value)}
                                >
                                <option>Select Category</option>
                                {categoryData.map(x => (
                                <option key={x._id} value={x._id}>{x.name}</option>
                                ))}

                            </Form.Control>
                        </Form.Group>
                         <Form.Group controlId='name'>
                            <Form.Label>SubCategory Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Category Name'
                                value={subCategoryName}
                                onChange={(e) => setSubCategoryName(e.target.value)}
                            >
                            </Form.Control>
                         </Form.Group>
                         <Button type='submit' variant='primary'>SAVE</Button>
                     </Form>
                </FormContainer>
            </Col>
        </Row>
        <Row>
            <h4 className='my-3'>Remove Category & SubCategory</h4>
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                </tr>
            </thead>

            <tbody>
                {getAllCategory.map(cateName => (
                    <tr key={cateName._id}>
                        <td>{cateName._id}</td>
                        <td>{cateName.name}</td>
                        <td><Button variant='danger' className='btn-sm' onClick={() => deleteHandler(cateName._id)}><i className='fas fa-trash'></i></Button></td>
                    </tr>
                ))}
            </tbody>
            </Table>
        </Row>
    </>
  )
}

export default CategoryAdd