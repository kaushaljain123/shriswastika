import React from 'react'
import { Row, Col } from 'react-bootstrap'
import about from '../images/about.jpg'
import start1 from '../images/start.jpg'
import start2 from '../images/start1.jpeg'
import start3 from '../images/start3.jpeg'

const AboutUs = () => {
  return (
    <>
        <h1 className='text-center'>About Us</h1>
        <Row>
            <Col md={8}>
                <h2>Company</h2>
                <h2>Shriswastika Infotech Pvt. Ltd. </h2>
                <p>
                Shriswastika Infotech Pvt. Ltd. came into being in the year since 2009 with a modest beginning in IT Industry. Keeping pace with growth in this sector, the company made rapid strides in the business of memory modules. Product-mix offered by the Company serves every type of memory modules is extensively used by the producers of various brands of PCs marketed by them..
                Shriswastika is a customer driven company with focus on providing the highest quality products with efficient and attentive after sales service and support that ensures total customer satisfaction. As a matter of fact reliability factor has been the corner stone in its success. The marketing strategy adopted by the company is wholly customer oriented. The corporate culture that exists within Shriswastika is one of professionalism and teamwork. In this regard Company firmly believes that every individual has to contribute and play key role in fulfilling customer’ s aspirations of highest quality of Shriswastika range of products. In accordance with declaration of its commitment to quality, Total Quality Control concept is in vogue and on this basis It became one of the first memory module suppliers in India to have received ISO 9001 Certification. Our commitment to deliver quality products involves strict and most rigid testing procedures making use of latest technology gadgets so as to keep ourselves at the forefront of the industry leaving the competitors far behind.
                </p>
            </Col>
            <Col md={4}>
                <img src={about} alt='about'  className='about-img'/>
            </Col>
        </Row>
        <h1 className='text-center'>Our Acheivments</h1>
        <Row>
          <Col>
          <img src={start1} alt='about'  className='start-img'/>
          </Col>
          <Col>
          <img src={start2} alt='about'  className='start-img'/>
          </Col>
          <Col>
          <img src={start3} alt='about'  className='start-img'/>
          </Col>
        </Row>

        <h1 className='text-center'>Our Address</h1>
        <Row style={{ marginBottom: 50 }}>
          <Col>
          <h5 className='text-center'>Branch office:-
          ShriSwastika Infotech private limited Mahamaya Mata Mandir wali gali Jain Mandir road morena MP 476001</h5>
          </Col>
          <Col>
          <h5 className='text-center'>
          Corporate office:-
Shriswastika Infotech private limited 
137 Jain Nagar ,lalghati Bhopal 462030
          </h5>
          </Col>

        </Row>
    </>
  )
}

export default AboutUs