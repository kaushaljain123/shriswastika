import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footerContainer">
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-5">
                <h2 className="footer-heading mb-4">About Us</h2>
                <p>Shriswastika Infotech Pvt. Ltd. came into being in the year since 2009 with a modest beginning in IT Industry. Keeping pace with growth in this sector....</p>
              </div>
              <div className="col-md-3 ml-auto">
                <h2 className="footer-heading mb-4">Quick Links</h2>
                <ul className="list-unstyled">
                  <li><Link to="/about-us" className="smoothscroll">About Us</Link></li>
                  <li><Link to="/term-and-condition" className="smoothscroll">Terms and Condition</Link></li>
                  <li><Link to="/our-policies" className="smoothscroll">Cancel & Return Policy</Link></li>
                  <li><Link to="/contact-us" className="smoothscroll">Contact Us</Link></li>
                </ul>
              </div>
              <div className="col-md-3">
                <h2 className="footer-heading mb-4">Follow Us</h2>
                <ul className="list-unstyled">
                  <li><a href="https://www.facebook.com/Shriswastika-335078239863456" className="smoothscroll iconss"><i class="fa-brands fa-facebook fa-2xl"></i></a></li>
                  <li><a href="https://twitter.com/ShriswastikaI?t=FaNrhWeKGRMpzouR01E0pg&s=09" className="smoothscroll iconss"><i class="fa-brands fa-twitter fa-2xl"></i></a></li>
                  <li><a href="https://www.linkedin.com/in/shriswastika-infotech-60409a187" className="smoothscroll iconss"><i class="fa-brands fa-linkedin fa-2xl"></i></a></li>
                  <li><a href="https://wa.me/message/MERDGJLEUS3AN1" className="smoothscroll iconss"><i class="fa-brands fa-whatsapp fa-2xl"></i></a></li>
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

