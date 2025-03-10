import { useState, useEffect, useContext } from 'react';
import React from 'react';
import './Bestseller.css';
import { ShopContext } from '../context/shopcontext';
import Title from './Title';
import Productitem from './Productitem';

const Bestseller = () => {
 const { products } = useContext(ShopContext);
 const [bestseller, setBestSeller] = useState([]);

 useEffect(() => {
 const bestProduct = products.slice(1, 9); // Get first 5 products
 setBestSeller(bestProduct);
 }, [products]);
 return (
 <section className='bestseller'>
 {/* Bestseller Heading and Description */}
 <div className='bestseller-header'>
 <Title text1={'BEST'} text2={'SELLER'} />
<p className='bestseller-desc'>
🔥 Discover our most popular picks! These bestsellers are loved by thousands for their quality, comfort, and style. Upgrade your wardrobe with the latest trends today!
 </p>
 </div>

 {/* Products Grid */}
 <div className='bestseller-grid'>
 {bestseller.map((item) => (
 <Productitem 
 key={item._id} 
 id={item._id} 
 name={item.name} 
 image={item.image} 
 price={item.price} 
 />
 ))}
 </div>
 </section>
 );
};

export default Bestseller;
