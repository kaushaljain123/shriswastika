import React from 'react'
import { Row, Col } from 'react-bootstrap'
import about from '../images/about.jpg'

const AboutUs = () => {
  return (
    <>
        <h1 className='text-center'>About Us</h1>
        <Row>
            <Col md={8}>
                <h2>Company</h2>
                <h2>Shriswastika Infotech Pvt. Ltd. </h2>
                <p className='about-text'>
                Shriswastika Infotech Pvt. Ltd. came into being in the year since 2009 with a modest beginning in IT Industry. Keeping pace with growth in this sector, the company made rapid strides in the business of memory modules. Product-mix offered by the Company serves every type of memory modules is extensively used by the producers of various brands of PCs marketed by them..
                Shriswastika is a customer driven company with focus on providing the highest quality products with efficient and attentive after sales service and support that ensures total customer satisfaction. As a matter of fact reliability factor has been the corner stone in its success. The marketing strategy adopted by the company is wholly customer oriented. The corporate culture that exists within Shriswastika is one of professionalism and teamwork. In this regard Company firmly believes that every individual has to contribute and play key role in fulfilling customer’ s aspirations of highest quality of Shriswastika range of products. In accordance with declaration of its commitment to quality, Total Quality Control concept is in vogue and on this basis It became one of the first memory module suppliers in India to have received ISO 9001 Certification. Our commitment to deliver quality products involves strict and most rigid testing procedures making use of latest technology gadgets so as to keep ourselves at the forefront of the industry leaving the competitors far behind.
                </p>
            </Col>
            <Col md={4}>
                <img src={about} alt='about'  className='about-img'/>
            </Col>
        </Row>
    </>
  )
}

export default AboutUs