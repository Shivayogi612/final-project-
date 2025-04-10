import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/shopcontext";
import { Link } from "react-router-dom";
import "./LatestCollection.css";
import Title from "./Title";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const collectionRef = useRef(null);

  useEffect(() => {
    setLatestProducts(products.slice(2, 12));

    // GSAP Scroll Animation
    gsap.from(collectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: collectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  useEffect(() => {
  const cards = document.querySelectorAll(".productitem");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const xAxis = (e.clientX - rect.left - rect.width / 2) / 50; // Reduced intensity
      const yAxis = (e.clientY - rect.top - rect.height / 2) / 50;

      gsap.to(card, {
        rotateY: xAxis * 5, // Limits rotation angle
        rotateX: -yAxis * 5, 
        scale: 1.05, // Adds slight scaling for better effect
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        scale: 1, // Reset scale
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });

  return () => {
    cards.forEach((card) => {
      card.removeEventListener("mousemove", () => {});
      card.removeEventListener("mouseleave", () => {});
    });
  };
}, [latestProducts]);


  return (
    <div className="latestcollection" ref={collectionRef}>
      <div className="latestcollection1">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="latestp1">
          ✨ Discover our premium collection with unique styles, luxurious fabrics, and modern cuts.
          Refresh your wardrobe and make a bold fashion statement today! 💎
        </p>
      </div>

      {/* Rendering Products */}
      <div className="renderproduct">
        {latestProducts.map((item, index) => (
          <Link className="productitem" to={`/product/${item._id}`} key={index}>
            <div className="productitem1">
              <img className="productimage" src={item.image[0]} alt={item.name} />
            </div>
            <div className="productinfo">
              <p className="productp1">{item.name}</p>
              <p className="productp2">₹{item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
