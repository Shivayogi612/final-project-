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
    setLatestProducts(products.slice(2,12));

    // GSAP Animation for smooth entrance
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
