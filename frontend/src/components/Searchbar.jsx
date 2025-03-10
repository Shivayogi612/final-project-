import React from 'react'
import { ShopContext } from '../context/shopcontext'
import { useContext } from 'react'
import './Searchbar.css'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const Searchbar = () => {

    const{ search, setSearch,showSearch, setShowSearch} = useContext(ShopContext);
    const[visible,setVisible] = useState(false)
    const location = useLocation();

    useEffect(()=>{
        if(location.pathname.includes('collection')){
            setVisible(true);
        }
        else{
            setVisible(false);
        }
    },[location])



  return showSearch && visible ? (
    <div className='searchbar'>
        <div className='searchbar1'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className='searchbar2' type="text" placeholder='Search' />
            <img className='search1' src={assets.search_icon} alt="" />
        </div>
        <img onClick={()=>setShowSearch(false)} className='search2'  src={assets.cross_icon} alt="" />
    </div>
  ) : null
}

export default Searchbar