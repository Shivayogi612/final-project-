import React, { useContext } from 'react';
import { ShopContext } from '../context/shopcontext';
import './Carttotal.css';
import Title from './Title';

const Carttotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
    const cartTotal = getCartAmount(); // ✅ No async needed

    return (
        <div className='carttotal'>
            <div className='carttotal1'>
                <Title text1={'CART'} text2={'TOTAL'} />

                <div className='carttotal2'>
                    <div className='carttotal3'>
                        <p>Subtotal</p>
                        <p>{currency} {cartTotal}.00</p>
                    </div>
                    <hr />
                    <div className='carttotal3'>
                        <p>Shipping Fee</p>
                        <p>{currency} {delivery_fee}.00</p>
                    </div>
                    <hr />
                    <div className='carttotal3'>
                        <p>Total</p>
                        <p>{currency} {cartTotal + delivery_fee}.00</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carttotal;
