import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import Rating from '../components/Rating'

const ProductScreen = ({ match }) => {
    const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        }
        fetchProduct()
    }, [match])
    
  return (
    <>
        <Link className='btn btn-light my-3' to='/'>Go Back</Link>
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
                <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Add To Cart</Button>       
            </Col>
        </Row>
    </>
  )
}

export default ProductScreen