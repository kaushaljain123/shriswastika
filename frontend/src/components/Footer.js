import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="site-footer shadow">
      <div className="container-fluid footerContainer">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-3 ml-auto">
                <h2 className="footer-heading mb-4">Shriswastika Infotech</h2>
                <ul className="list-unstyled">
                  <li><i className='fa fa-home'></i> 137 JAIN NAGAR ,GUFA MANDIR ROAD LALGHATI BHOPAL 462001</li><br />
                  <li><i className='fa fa-phone'></i> Order Related:- 9589330716</li><br />
                  <li><i className='fa fa-phone'></i> Admin:- 9179330716</li><br />
                  <li><i className='fa fa-envelope'></i> <a href="mailto:contactswastika2021@gmail.com" style={{ color: 'black' }}>contactswastika2021@gmail.com</a></li><br />
                  <li><i className='fa fa-clock'></i> Mon - Sat/ 9:00 AM - 7:00 PM</li><br />
                </ul>
              </div>
              <div className="col-md-3 ml-auto">
                <h2 className="footer-heading mb-4">My Accounts</h2>
                <ul className="list-unstyled">
                  <li><Link to="/profile" className="smoothscroll">My Account</Link></li><br />
                  <li><Link to="/cart" className="smoothscroll">My Cart</Link></li><br />
                </ul>
              </div>
              <div className="col-md-3 ml-auto">
                <h2 className="footer-heading mb-4">Quick Links</h2>
                <ul className="list-unstyled">

                  <li><Link to="/privacy-policy" className="smoothscroll">Privacy Policy</Link></li><br />
                  <li><Link to="/about-us" className="smoothscroll">About Us</Link></li><br />
                  <li><Link to="/term-and-condition" className="smoothscroll">Terms and Condition</Link></li><br />
                  <li><Link to="/our-policies" className="smoothscroll">Cancel & Return Policy</Link></li><br />
                  <li><Link to="/contact-us" className="smoothscroll">Contact Us</Link></li><br />
                </ul>
              </div>
              <div className="col-md-3">
                <h2 className="footer-heading mb-4">Follow Us</h2>
                <ul className="list-unstyled">
                  <li><a href="https://www.facebook.com/Shriswastika-335078239863456" className="smoothscroll iconss"><i class="fa-brands fa-facebook fa-2xl"></i></a></li><br />
                  <li><a href="https://twitter.com/ShriswastikaI?t=FaNrhWeKGRMpzouR01E0pg&s=09" className="smoothscroll iconss"><i class="fa-brands fa-twitter fa-2xl"></i></a></li><br />
                  <li><a href="https://www.linkedin.com/in/shriswastika-infotech-60409a187" className="smoothscroll iconss"><i class="fa-brands fa-linkedin fa-2xl"></i></a></li><br />
                  <li><a href="https://wa.me/message/MERDGJLEUS3AN1" className="smoothscroll iconss"><i class="fa-brands fa-whatsapp fa-2xl"></i></a></li><br />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-5 mt-5 text-center">
          <div className="col-md-12">
            <div className="border-top pt-3">
              <p>
            Copyright ©<script>document.write(new Date().getFullYear());</script> All rights reserved by Shriswastika Infotech Pvt. Ltd.</p>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  )
};

export default Footer;

