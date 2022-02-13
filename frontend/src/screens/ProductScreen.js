import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetail)
    const { loading, error, product } = productDetail

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

  return (
    <>
        <Link className='btn btn-light my-3' to='/'>Go Back</Link>
        {loading ? <Loader /> : error ? <Message varient='danger'>{error}</Message> : (
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
    
                <Col md={6}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Status: {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                        </ListGroup.Item>
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <Form.Control as='select' value={qty} onChange={(e) => 
                                            setQty(e.target.value)}>

                                            {[...Array(product.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>{ x + 1 }</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: Rs {product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: Rs {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={6} className='py-3'>
                    <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>Add To Cart</Button>       
                </Col> 
            </Row>
        )}               
    </>
  )
}

export default ProductScreen