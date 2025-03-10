import { use, useEffect } from 'react';
import { createContext } from "react";
import { products } from "../assets/assets";
import { useContext } from "react";
import { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee =0;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const [token,setToken] = useState('')
    const navigate = useNavigate();


    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size");
            return;
        }
    
        if (!itemId) {
            toast.error("Invalid product ID");
            console.error("addToCart error: itemId is undefined");
            return;
        }
    
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }
    
        setCartItems(cartData);
    
        if (token) {
            try {
                console.log(`Adding to cart: ${backendUrl}/api/cart/add`, { itemId, size });
                await axios.post(`https://final-backend-two.vercel.app/api/cart/add`, { itemId, size }, {
                    headers: { 
                        Authorization: `Bearer ${token}` // ✅ Correct way to send token
                    }
                });

                toast.success("Item added to cart!");
            } catch (error) {
                console.error("Error adding item to cart:", error);
                toast.error(error.response?.data?.message || "Something went wrong!");
            }
        } else {
            toast.error("Please log in first.");
        }
    };
    
    

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }


    const updateQuantity = async (itemId,size,quantity) =>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);


        if (token) {
            try {
                console.log(`updating cart: ${backendUrl}/api/cart/update`, { itemId, size, quantity });
                await axios.post(`https://final-backend-two.vercel.app/api/cart/update`, { itemId, size, quantity }, {
                    headers: { 
                        Authorization: `Bearer ${token}` // ✅ Correct way to send token
                    }
                });

            } catch (error) {
                console.error("Error adding item to cart:", error);
                toast.error(error.response?.data?.message || "Something went wrong!");
            }
        } else {
            toast.error("Please log in first.");
        }








        
    }

// ✅ Fixed getCartAmount (now returns a number)
const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
        const itemInfo = products.find((product) => product._id === items);
        if (!itemInfo) continue; // Skip if product data is missing

        for (const item in cartItems[items]) {
            if (cartItems[items][item] > 0) {
                const discountedPrice = itemInfo.price * 0.75; // Apply 25% discount
                totalAmount += discountedPrice * cartItems[items][item];
            }
        }
    }
    return totalAmount.toFixed(2); // Ensures two decimal places for accuracy
};

           

     const getUserCart = async (token) =>{
        try {
            console.log(`updating cart: ${backendUrl}/api/cart/get`, {  });
         const response =    await axios.post(`https://final-backend-two.vercel.app/api/cart/get`, {  }, {
                headers: { 
                    Authorization: `Bearer ${token}` // ✅ Correct way to send token
                }
            });

            if(response.data.success){
                     setCartItems(response.data.cartData)
            }

        } catch (error) {
            console.error("Error adding item to cart:", error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    } 


     

    
       useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
       })



    const value = {
        products ,currency , delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,
        getCartCount,updateQuantity,setCartItems,
        getCartAmount,navigate , backendUrl,
        token,setToken 
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
