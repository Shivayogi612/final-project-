import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebarr'>
            <NavLink className='hello ' to="/add">
            <img className='addimg' src={assets.add_icon} alt="" />
            <p className='additemp'>Add Items</p>
            </NavLink>

            <NavLink className='hello ' to="/list">
            <img className='addimg' src={assets.order_icon} alt="" />
            <p className='additemp'>List Items</p>
            </NavLink>

            <NavLink className='hello ' to="/orders">
            <img className='addimg' src={assets.order_icon} alt="" />
            <p className='additemp'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar