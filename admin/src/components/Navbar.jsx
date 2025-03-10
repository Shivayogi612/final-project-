import React from 'react'
import {assets} from '../assets/assets'
import './Navbar.css'

const Navbar = ({setToken}) => {
  return (
    <div className='nav'>
        <img className='logoimg' src={assets.logo} alt="" />
        <button onClick={()=>setToken('')} className='logoutbtn'>Logout</button>
    </div>
  )
}

export default Navbar