import React from "react";
import "./Discountvideo.css"; // Import CSS for styling
import { assets } from "../assets/assets";

const DiscountVideo = () => {
  return (
    <div className="discount-video-container">
      <video className="discount-video" autoPlay loop muted>
        <source src={assets.DiscountVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
    </div>
  );
};

export default DiscountVideo;
