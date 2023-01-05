import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Magnifier} from 'react-image-magnifiers'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails, createProductReview } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Meta from '../components/Meta';



const ProductScreen = ({ history, match }) => {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [finalImage, setFinalImage] = useState('')
    const [index, setIndex] = useState(0)

    const dispatch = useDispatch()

    const productDetail = useSelector(state => state.productDetail)
    const { loading, error, product } = productDetail

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
      success: successProductReview,
      loading: loadingProductReview,
      error: errorProductReview,
    } = productReviewCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (successProductReview) {
          setRating(0)
          setComment('')
        }

        if (!product._id || product._id !== match.params.id) {
          if(product.image) {

          }
          dispatch(listProductDetails(match.params.id))
          dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }


        
      }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
          createProductReview(match.params.id, {
            rating,
            comment,
          })
        )
      }

      const imageHoverHandler = (index, imageSrc) => {
        setIndex(index)
        setFinalImage(imageSrc)
      }

  return (
    // <Container>
      <div className='product-details shadow'>
      <Link to='/'>
        <Button type="submit" className="form-btn shadow backBtn" variant="primary">
          Go Back
        </Button>
        </Link>
        <div className='text-right'>

        {userInfo && userInfo.isAdmin && (
          <LinkContainer to={`/admin/product/${product._id}/edit`}>
              <Button varient='light' className='btn-sm'>
                  Edit <i className='fas fa-edit'></i>
              </Button>
          </LinkContainer>
        )}

        </div>
        {loading ? <Loader /> : error ? <Message varient='danger'>{error}</Message> : (
            <>
            <Meta title={product.name}/>
              <Row>
              <Col md={2}>
                      <div className='thumb'>
                      {product.image ? <img className='thumbnail' src={product.image} onClick={() => imageHoverHandler(1, product.image)}/> : ''}
                      {product.imageTwo ? <img className='thumbnail' src={product.imageTwo} onClick={() => imageHoverHandler(2, product.imageTwo)}/> : ''}
                      {product.imageThree ? <img className='thumbnail' src={product.imageThree} onClick={() => imageHoverHandler(3, product.imageThree)}/> : ''}
                      </div>
              </Col>
                <Col md={4}>
                    <div className='big-image'>
                      <Magnifier
                        
                          imageSrc= {finalImage ? finalImage : product.image}
                          imageAlt='fefes'
                        
                      />
                      
                      {/* {product.image ? <img class="MagicZoom" id='featured' src={finalImage ? finalImage : product.image} /> : product.image} */}
                    </div>
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
                                        <Form.Control as='select' className='input' value={qty} onChange={(e) => 
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
                            Price: ₹ {product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Video : <a href={product.videoLink} target='_blank'>{product.videoLink}</a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={6} className='py-3'>
                    <Button className='btn-block form-btn shadow' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>Add To Cart</Button>       
                </Col> 
            </Row>


            <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          className='input'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          className='input'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                        className='form-btn shadow'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
            </>
              
        )}   
      </div>            
    // </Container>
  )
}

export default ProductScreen