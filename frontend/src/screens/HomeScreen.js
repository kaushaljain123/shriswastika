import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button, Container } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import Category from '../components/Category'
import PartnerSlider from '../components/PartnerSlider';
import Demo from '../images/mobile.jpg'
import '../screens/card.css'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const categoryData = match.params.categoryData
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber, categoryData))

    }, [dispatch, keyword, pageNumber])


    return (
        <>
            <Meta />
            <Category />

            {!keyword && !categoryData ? <ProductCarousel /> : keyword || !categoryData ? <Link to='/' className='btn btn-light'>Go Back</Link>
                : !keyword || categoryData ? <Link to='/' className='btn btn-light'>Go Back</Link> : ''}
            {!keyword ? <h1 className='py-9 text-center'>Discover products</h1> : ''}
            {loading ? <Loader /> : error ? <Message varient='danger'>{error}</Message> :
                (
                    <>
                        {/* <Container> */}
                            {/* <Row>
                                {products.map((product, index) => (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} index={index} />
                                    </Col>
                                ))}
                                <Col sm={12} md={6} lg={4} xl={3} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Card className="rounded shadow mainCard">
                                        <Card.Img variant="top" src={Demo} />
                                            <Card.Body>
                                                <Card.Title className='text-center'>Card Title</Card.Title>
                                            </Card.Body>
                                    </Card>
                                    <Card className="my-3 p-3 rounded shadow mainCard">
                                        <Card.Img variant="top" src={Demo} />
                                            <Card.Body>
                                                <Card.Title className='text-center'>Card Title</Card.Title>
                                            </Card.Body>
                                    </Card>     
                                </Col>
                            </Row> */}
                        {/* </Container> */}
                        <div class="container">
                            <div class="card">
                                <span class="circle"></span>
                                <div class="contents">
                                <img src={Demo} width="100" height="100"/>
                                <p>Heading</p>
                                </div>
                            </div>
                        </div>
                        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} categoryData={categoryData ? categoryData : ''} />
                    </>
                )

            }
            <PartnerSlider />
        </>
    )
}

export default HomeScreen;
