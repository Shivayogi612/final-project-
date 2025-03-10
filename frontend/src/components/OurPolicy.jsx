import React from 'react'
import './OurPolicy.css'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='OurPolicy'>
        <div>
            <img src={assets.exchange_icon} className='exchangeicon' alt="" />
            <p className='policyp1'>Easy Exchange Policy</p>
            <p className='policyp2' >We offer hassle free exchange policy</p>
        </div>
        <div>
            <img src={assets.quality_icon} className='exchangeicon' alt="" />
            <p className='policyp1'>7 Days Return Policy</p>
            <p className='policyp2' >We provide 7 days free return policy</p>
        </div>
        <div>
            <img src={assets.support_img} className='exchangeicon' alt="" />
            <p className='policyp1'>Best customer support</p>
            <p className='policyp2' >We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default OurPolicy