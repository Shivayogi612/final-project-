import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await axios.post("https://final-backend-two.vercel.app/api/contact", formData);
      if (response.data.success) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(" Failed to send message.");
      }
    } catch (error) {
      setStatus(" Error sending message. Try again later.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Reach out to us with any questions.</p>
      </div>

      <div className="contact-container">
        {/* Contact Form */}
        <div className="contact-form">
          <h2>📩 Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>👤 Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>📧 Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>💬 Message</label>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">🚀 Send Message</button>
          </form>
          <p className="status-message">{status}</p>
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <h1>📞 Contact Information</h1>
          <div className="info-box">
            <span>📍</span>
            <p>Belagavi, Karnataka</p>
          </div>
          <div className="info-box">
            <span>☎️</span>
            <p>+123 456 7890</p>
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default Contact;
