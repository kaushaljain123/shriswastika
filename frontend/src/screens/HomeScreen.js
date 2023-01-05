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
            
            {loading ? <Loader /> : error ? <Message varient='danger'>{error}</Message> :
                (
                    <>
                        <div className='products'>
                            {products.map((product, index) => (
                                <div key={product._id} className='product-container'>
                                    <Product product={product} index={index} />
                                </div>
                            ))}
                        </div> 
                        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} categoryData={categoryData ? categoryData : ''} />
                    </>
                )
            }
            {/* <PartnerSlider /> */}
        </>
    )
}

export default HomeScreen;
