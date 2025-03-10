import React from "react";
import "./About.css";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>About <span>Our Company</span></h1>
        <p>Innovating excellence, delivering quality, and earning trust worldwide.</p>
      </div>

      {/* Company Overview */}
      <div className="company-overview">
        <div className="about-text">
          
          <h2>Who We Are</h2>
          <p>
            Established in 2025, Forerver has been providing best quality.  
            We specialize in delivering high-quality products and services that  
            align with modern consumer needs. Our goal is to innovate while  
            maintaining trust and transparency with our customers.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="mission-section">
        <h2>Our Mission</h2>
        <p>
          We strive to enhance the lives of our customers by providing  
          reliable, high-quality products backed by exceptional service.  
          Innovation, sustainability, and customer satisfaction are at the  
          core of our business values.
        </p>
      </div>

      {/* Our Values Section */}
      <div className="core-values">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-box">
            <h3>💡 Innovation</h3>
            <p>We embrace change and continually evolve with new ideas.</p>
          </div>
          <div className="value-box">
            <h3>🤝 Integrity</h3>
            <p>Trust and transparency are at the heart of everything we do.</p>
          </div>
          <div className="value-box">
            <h3>🌍 Sustainability</h3>
            <p>We are committed to environmentally friendly practices.</p>
          </div>
          <div className="value-box">
            <h3>👥 Customer Commitment</h3>
            <p>Our customers are our top priority, always.</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <h2>Get in Touch</h2>
        <p>📩 <strong>Email:</strong> support@yourcompany.com</p>
        <p>📞 <strong>Phone:</strong> +123 456 7890</p>
        <p>📍 <strong>Location:</strong> 123 Business Street, City, Country</p>
      </div>
    </div>
  );
};

export default About;
