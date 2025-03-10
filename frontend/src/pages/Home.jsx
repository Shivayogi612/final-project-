import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Bestseller from '../components/Bestseller'
import OurPolicy from '../components/OurPolicy'

const Home = () => {
  return (
    <div>
        <Hero/>
        <LatestCollection/>
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          background: "#ff0000",
          color: "#fff",
          fontSize: "20px",
          fontWeight: "bold",
          padding: "10px 0",
          whiteSpace: "nowrap",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            animation: "slideText 10s linear infinite",
          }}
        >
          <p>
            🔥 25% DISCOUNT ON ALL PRODUCTS! SHOP NOW! 🔥 25% DISCOUNT ON ALL PRODUCTS! SHOP NOW! 🔥
          </p>
        </div>
      </div>

      {/* Animation Keyframes (Injected in the Page) */}
      <style>
        {`
          @keyframes slideText {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
        <Bestseller/>
        <OurPolicy/>
    </div>
  )
}

export default Home
