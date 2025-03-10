import React, { useState, useContext } from 'react';
import Title from '../components/Title';
import './placeOrder.css';
import Carttotal from '../components/Carttotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/shopcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, userId } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((data) => ({ ...data, [name]: value }));
    };

    const initPay = (order, userId, email) => {  
        if (!window.Razorpay) {
            toast.error("Razorpay SDK not loaded. Please try again.");
            return;
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            handler: async (response) => {
                console.log("Razorpay Payment Response:", response);
                try {
                    const { data } = await axios.post(
                        "http://localhost:7008/api/order/verifyRazorpay",
                        { ...response, userId, email },
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    );

                    if (data.success) {
                        navigate('/orders');
                        setCartItems({});
                        toast.success("Payment successful! Order placed.");
                    }
                } catch (error) {
                    console.error("Error verifying payment:", error);
                    toast.error("Payment verification failed. Please try again.");
                }
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            let orderItems = [];

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
                userId, // ✅ Ensure correct userId is passed
                email: formData.email
            };

            switch (method) {
                case 'cod':
                    const response = await axios.post(
                        `http://localhost:7008/api/order/place`,
                        orderData,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    if (response.data.success) {
                        setCartItems({});
                        navigate('/orders');
                        toast.success("Order placed successfully!");
                    } else {
                        toast.error(response.data.message);
                    }
                    break;

                case 'razorpay':
                    try {
                        const responseRazorpay = await axios.post(
                            "http://localhost:7008/api/order/razorpay",
                            orderData,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );

                        if (responseRazorpay.data.success) {
                            initPay(responseRazorpay.data.order, userId, formData.email);
                        } else {
                            console.error("Razorpay order creation failed:", responseRazorpay.data.message);
                        }
                    } catch (error) {
                        console.error("Error creating Razorpay order:", error.response?.data || error.message);
                    }
                    break;

                default:
                    break;
            }

        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Something went wrong! Please try again.");
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='placeorder'>
            {/* ---------------- Left Side ----------------- */}
            <div className='placeorder1'>
                <div className='placeorderleft'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                <div className='placeorder2'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='deliverinput' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='deliverinput' type="text" placeholder='Last name' />
                </div>

                <input required onChange={onChangeHandler} name='email' value={formData.email} className='deliverinput1' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='deliverinput1' type="text" placeholder='Street' />

                <div className='placeorder2'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='deliverinput' type="text" placeholder='City' />
                    <input required onChange={onChangeHandler} name='state' value={formData.state} className='deliverinput' type="text" placeholder='State' />
                </div>

                <div className='placeorder2'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='deliverinput' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='deliverinput' type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='deliverinput1' type="number" placeholder='Phone' />
            </div>

            {/* ---------------- Right Side ----------------- */}
            <div className='rightside'>
                <div className='rightside1'>
                    <Carttotal />
                </div>
                <div className='rightside2'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />

                    {/* Payment method selection */}
                    <div className='paymentmethod'>
                        <div onClick={() => setMethod('razorpay')} className='paymentmethod1'>
                            <p className={`min-circle ${method === 'razorpay' ? 'bg-green' : ''}`}></p>
                            <img className='h-5 max-4' src={assets.razorpay_logo} alt="" />
                        </div>

                        <div onClick={() => setMethod('cod')} className='paymentmethod1'>
                            <p className={`min-circle ${method === 'cod' ? 'bg-green' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='placeorderbtn'>
                        <button type='submit' className='Khatarnak'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
