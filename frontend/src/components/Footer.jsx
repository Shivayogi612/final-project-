import React from "react";
import { assets } from "../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <img src={assets.logo} className="footer-logo" alt="Forever Logo" />
          <p className="footer-text">
            Elevate your style with Forever. Discover exclusive collections that 
            blend elegance and sophistication, tailored for the modern trendsetter.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-links">
          <a href="/About">Home</a> 
             <a href="/About">About Us</a> 
             <a href="/Collection">Collections</a> 
             <a href="/About">Policy</a> 

           
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Get in Touch</h3>
          <ul className="footer-links">
            <a>📞 +91 1234567890</a>
            <a >✉️ contact@foreveryou.com</a>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <hr />
        <p className="footer-copyright">
          © 2024 Forever. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
