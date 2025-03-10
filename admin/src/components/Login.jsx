import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')





  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
      if(response.data.success){
        setToken(response.data.token)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }



  return (
    <div className='login'>
      
      <div className="form-container">
        <p className="title">Login</p>
        <form className="form" onSubmit={onSubmitHandler}>
          <div className="input-group">
            <label htmlFor="Email">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" value={email}  placeholder="Enter your Email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} name="password" id="password" placeholder="Enter your password" />
            <div className="forgot">
              <a rel="noopener noreferrer" href="#">Forgot Password?</a>
            </div>
          </div>
          <button className="sign">Sign in</button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;
