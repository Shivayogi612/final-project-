import React from 'react'
import './NewsletterBox.css'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }



  return (
    <div className='Newsletter'>
        <p className='Newsp1'>Subscribe now & get 20% off</p>
        <p className='Newsp2'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi blanditiis,
        </p>
        <form onSubmit={onSubmitHandler} className='Newsform'>
            <input className='newsinput' type="email" placeholder="Enter your email" required/>
            <button type='submit' className='submitbtn'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox