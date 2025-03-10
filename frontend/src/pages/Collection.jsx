import React, { useContext, useEffect } from 'react'
import './Collection.css'
import { ShopContext } from '../context/shopcontext'
import { useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import Productitem from '../components/Productitem'

const Collection = () => {

  const{ products, search , showSearch } = useContext(ShopContext);
  const[showFilter,setShowFilter] = useState(false);
  const[filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relevent')
  
  const toggleCategory = (event) => {
    if(category.includes(event.target.value)){
      setCategory(prev=> prev.filter(item => (item !== event.target.value)))
    }
    else{
      setCategory(prev=>[...prev,event.target.value]);
    
    }
  }

  const toggleSubCategory = () => {
    if(subCategory.includes(event.target.value)){
      setSubCategory(prev=> prev.filter(item => (item !== event.target.value)))
    
    }
    else{
      setSubCategory(prev=>[...prev, event.target.value]);
}
  }

  const applyFilters = () => {
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0 ){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }


    setFilterProducts(productsCopy)
  }

  const sortProduct = () =>{
    let fpCopy = filterProducts.slice();

    switch (sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;

        case 'high-low':
          setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
          break;

          default:
            applyFilters();
            break;
    }


    }

  useEffect(()=>{
    applyFilters();
  },[category,subCategory,search,showSearch])

  useEffect(() =>{
    sortProduct();
  },[sortType])

  return (
    <div className='collectionfilter'>
      {/* Filter options */}
      <div className='filter1'>
        <p onClick={()=>setShowFilter(!showFilter)} className='filterp1'>FILTERS
        <img
  className={`icon ${showFilter ? 'rotate-90' : ''} ${!showFilter ? 'hidden-sm' : ''}`}src={assets.dropdown_icon} alt=""/>

        </p>

        {/* Category filter */ }

        <div className={`filter-box ${showFilter ? 'show' : ''}`}>
          <p className='filterboxp1'>CATEGORIES</p>
          <div className='Category1'>
            <p className='Category1p1'>
              <input className='Category1input1' type="checkbox" value={'Men'} onChange={toggleCategory}/> Men 
            </p>
            <p className='Category1p1'>
              <input className='Category1input1' type="checkbox" value={'Women'} onChange={toggleCategory}/> Women 
            </p>
            <p className='Category1p1'>
              <input className='Category1input1' type="checkbox" value={'Kids'} onChange={toggleCategory}/> Kids 
            </p>
          </div>
        </div>

        {/* Subcategory filter* */}

        <div className={`filter-box ${showFilter ? 'show' : ''}`}>
          <p className='filterboxp1'>TYPE</p>
          <div className='Category1'>
            <p className='Category1p1'>
              <input className='Category1input1' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>  Topwear
            </p>
            <p className='Category1p1'>
              <input className='Category1input1' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear  
            </p>
            <p className='Category1p1'>
              <input className='Category1input1' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear  
            </p>
          </div>
        </div>


      </div>

      {/* Right Side*/ }
      <div className='CollectionRight'>
        <div className='CollectionRight1'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/*  product Sort*/}

          <select onChange={(event)=>setSortType(event.target.value)} className='productsort'>
            <option value="relavent">Sort by: Relevent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low </option>
          </select>
        </div>
        <div className='Mapproducts'>
        {
          filterProducts.map((item,index)=>(
            <Productitem key={index} name={item.name} id={item._id} price={item.price} image={item.image}  />
          ))
        }
      </div>
      </div>

      {/* Map Products*/ }

      

    </div>
  )
}

export default Collection