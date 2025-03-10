import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { ShopContext } from '../context/shopcontext';
import './RelatedProducts.css'
import Title from './Title';
import Productitem from './Productitem';

const RelatedProducts = ({category,subCategory}) => {

    const{products} = useContext(ShopContext);
    const [related,setRelated] = useState([]);

    useEffect(()=>{
        if(products.length > 0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=>(item.category === category && item.subCategory === subCategory));

            setRelated(productsCopy.slice(0,5));
        }
    },[products])

  return (
    <div className='RelatedProducts'>
        <div className='RelatedProducts1'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>

        <div className='RP1'>
            {related.map((item,index)=>(
                < Productitem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
                ))}
        </div>

    </div>
  )
}

export default RelatedProducts