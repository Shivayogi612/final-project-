import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./productitem.css";

const ProductCard = ({ id, image, name, price, currency }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (e) => {
      const { width, height, left, top } = card.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 20;
      const y = (e.clientY - top - height / 2) / 20;
      gsap.to(card, { rotationY: x, rotationX: -y, duration: 0.3, ease: "power1.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.5, ease: "power1.out" });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Link className="productitem" to={`/product/${id}`}>
      <div className="productitem1" ref={cardRef}>
        {/* Discount Badge */}
        <div className="discount-badge">25% OFF</div>
        
        <img className="productimage" src={image[0]} alt={name} />
      </div>
      <div className="productinfo">
        <p className="productp1">{name}</p>
        <p className="productp2">{currency} ₹ {price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;

