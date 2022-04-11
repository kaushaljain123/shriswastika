import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import image from '../images/banner.jpg'

const ProductCarousel = () => {
  return (
    <Carousel pause='hover' fade>
        <Carousel.Item>
          <Image src={image} className="heroImage" />
        </Carousel.Item>
    </Carousel>
  )
}

export default ProductCarousel