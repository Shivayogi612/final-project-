import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/shopcontext';
import './Orders.css';
import Title from '../components/Title';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      console.log(`Fetching orders: ${backendUrl}/api/order/user`);
      
      const response = await axios.post(`http://localhost:7008/api/order/user`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='orders'> 
      <div className='orders1'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      <div>
        {orderData.length > 0 ? orderData.map((item, index) => {
          // ✅ Apply the same discount logic as Cart.js (25% OFF)
          const discountedPrice = (item.price * 0.75).toFixed(2);

          return (
            <div key={index} className="orders2">
              <div className="orders3">
                <img className="orderimg" src={item.image?.[0]} alt={item.name} />
                <div>
                  <p className='ordername'>{item.name}</p>
                  <div className='ordername1'>
                    {/* ✅ Show Only Discounted Price */}
                    <p className='discounted-price'>{currency}{discountedPrice}</p>
                    <p>Quantity: {item.quantity || 1}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='orderdate'>Date: <span className='date'>{new Date(item.date).toDateString()}</span></p>
                  <p className='orderdate'>Payment Method: <span className='date'>{item.paymentMethod}</span></p>
                </div>
                <div className='orders4'>
                  <div className='order5'>
                    <p className='order5p2'>{item.status}</p>
                  </div>
                  <button onClick={loadOrderData} className='trackorder'> Track Order </button>
                </div>
              </div>
            </div>
          );
        }) : <p>No orders found.</p>}
      </div>
    </div>
  );
};

export default Orders;
