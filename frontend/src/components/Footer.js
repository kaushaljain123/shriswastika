import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-5">
                <h2 className="footer-heading mb-4">About Us</h2>
                <p>Hey there guys We are Web Developer and we will give free Websites Codes.. We will  give you guys free website stuff like Navbars, Footers, Gallery  etc...</p>
              </div>
              <div className="col-md-3 ml-auto">
                <h2 className="footer-heading mb-4">Quick Links</h2>
                <ul className="list-unstyled">
                  <li><a href="#about-section" className="smoothscroll">About Us</a></li>
                  <li><a href="#services-section" className="smoothscroll">Services</a></li>
                  <li><a href="#testimonials-section" className="smoothscroll">Testimonials</a></li>
                  <li><a href="#contact-section" className="smoothscroll">Contact Us</a></li>
                </ul>
              </div>
              <div className="col-md-3">
                <h2 className="footer-heading mb-4">Follow Us</h2>
                <ul className="list-unstyled">
                  <li><a href="#about-section" className="smoothscroll iconss"><i class="fa-brands fa-facebook fa-2xl"></i></a></li>
                  <li><a href="#services-section" className="smoothscroll iconss"><i class="fa-brands fa-twitter fa-2xl"></i></a></li>
                  <li><a href="#testimonials-section" className="smoothscroll iconss"><i class="fa-brands fa-linkedin fa-2xl"></i></a></li>
                  <li><a href="#contact-section" className="smoothscroll iconss"><i class="fa-brands fa-whatsapp fa-2xl"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-5 mt-5 text-center">
          <div className="col-md-12">
            <div className="border-top pt-3">
              <p>
            Copyright ©<script>document.write(new Date().getFullYear());</script> All rights reserved</p>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  )
};

export default Footer;

