import React, { useEffect, useRef } from "react";
import "./Title.css";
import gsap from "gsap";

const Title = ({ text1, text2 }) => {
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(lineRef.current, {
      width: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3,
    });

    gsap.from(spanRef.current, {
      letterSpacing: "0px",
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.5,
    });
  }, []);

  return (
    <div className="title" ref={titleRef}>
      <p className="titlep1">
        {text1} <span className="titlespan" ref={spanRef}>{text2}</span>
      </p>
      <p className="titlep2" ref={lineRef}></p>
    </div>
  );
};

export default Title;
