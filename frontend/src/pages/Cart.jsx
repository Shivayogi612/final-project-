import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/shopcontext';
import './Cart.css';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import Carttotal from '../components/Carttotal';

const Cart = () => {
  const { products, cartItems, currency, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if(products.length > 0){
      const tempData = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              id: items, // Corrected to match product _id
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }


    
  }, [cartItems,products]);

  return (
    <div className="Cart">
      <div className="Carttitle">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
      {cartData.map((item, index) => {
  const productData = products.find((product) => product._id === item.id);

  if (!productData) return null;

  // Calculate discounted price (25% OFF)
  const discountedPrice = (productData.price * 0.75).toFixed(2);

  return (
    <div key={index} className="Cartdisplay">
      <div className="Cartdisplay1">
        <img className="Cartimage" src={productData?.image?.[0] || 'fallback-image.jpg'} alt={productData?.name || 'Product'} />
        <div>
          <p className="Cartp1">{productData?.name}</p>
          <div className="Cartdisplay2">
            <p className="original-price"><s>{currency}{productData.price}</s></p> 
            <p className="discounted-price">{currency}{discountedPrice}</p>
            <p className="Productsize">Size: {item.size}</p>
          </div>
        </div>
      </div>
      <input
        className="quantity1"
        type="number"
        min={1}
        value={item.quantity}
        onChange={(e) => updateQuantity(item.id, item.size, parseInt(e.target.value, 10))}
      />
      <img onClick={() => updateQuantity(item.id, item.size, 0)} className="bin" src={assets.bin_icon} alt="Delete" />
    </div>
  );
})}
      </div>
      <div className='carttotal'>
        <div className='carttotal1'>
          <Carttotal/>
          <div className='btn'>
            <button onClick={()=>navigate('/place-order')} className='Checkout'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
