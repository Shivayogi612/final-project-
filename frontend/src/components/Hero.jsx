import React, { useState, useEffect } from "react";
import "./Hero.css";
import { assets } from "../assets/assets"; // Importing images

const images = [
  assets.banner1, // Replace these with actual image paths
  assets.banner2,
  assets.banner3,
  assets.banner4,
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Banner ${index + 1}`}
          className={`bannerimg ${index === currentImage ? "active" : ""}`}
        />
      ))}
    </div>
  );
};

export default Hero;
