import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Bestseller from '../components/Bestseller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import DiscountVideo from '../components/Discountvideo'

const Home = () => {
  return (
    <div>
        <Hero/>
        <LatestCollection/>
        <DiscountVideo/>
        <Bestseller/>
        <OurPolicy/>
    </div>
  )
}

export default Home