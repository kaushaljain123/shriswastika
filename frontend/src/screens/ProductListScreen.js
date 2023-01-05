import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate';
import axios from 'axios'
import _ from 'lodash'
import DashboardLink from '../components/DashboardLink'

const ProductListScreen = ({ history, match }) => {

    const [show, setShow] = useState(false)
    const [file, setFile] = useState('')
    const [newFormData, setNewFormData] = useState({})

    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete


    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createProduct, pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            // Delete Products
            dispatch(deleteProduct(id))
            window.location.reload()
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    const createCategory = () => {
        history.push('/add-category')
    }

    const val = Math.floor(1000 + Math.random() * 9000);

    const uploadXlsxHandler = async () => {
        await axios.post('/api/xlxs/uploadXlxs', newFormData).then(function (response) {
            alert('Product Update SuccessFully')
            window.location.reload()
        })
            .catch(function (error) {
                console.error(error)
            })
    }

    const handleClose = () => {
        setShow(false)
    }

    const importProductHandler = () => {
        setShow(true)
    }

    const uploadFileHandler = (e) => {
        const formData = new FormData()

        _.forEach(e.target.files, file => {
            formData.append('file', file)
        })

        setNewFormData(formData)
        setFile(e.target.files[0].name)
    }

    return (
        <>    
        <DashboardLink />    
        <div className='card resuleClass'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Import Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="filename">
                            <Form.Label>Add File</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={file}
                                onChange={(e) => setFile(e.target.value)}
                                readOnly
                            ></Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                                multiple
                            ></Form.File>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={uploadXlsxHandler}>
                        SAVE
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <div className='adminButtons'>
                    <button className='form-btn' onClick={createCategory}>Add Category</button>
                    <button className='form-btn' onClick={createProductHandler}>Create Product</button>
                    <button className='form-btn' href="/api/products/downloadCSVForAllCatlogs">Export Product</button>
                    <button className='form-btn' onClick={importProductHandler}>Import Product</button>
                </div>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message varient='danger'>{error}</Message>}
            {successDelete && <Message varient='info'>Product Delete Successfully</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message varient='danger'>{error}</Message> : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <td>Update/Delete</td>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>Rs {product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>

                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button varient='light' className='btn-sm ml-3'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm ml-3' onClick={() => deleteHandler(product._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </div>
        </>

    )
}

export default ProductListScreen