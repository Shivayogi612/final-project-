import React, { useState, useContext, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Navigation Hook
import { ShopContext } from "../context/shopcontext"; // ✅ Import Context

const Login = () => {
  const [currentState, setCurrentState] = useState("login"); 
  const { token, setToken } = useContext(ShopContext);
  const navigate = useNavigate(); // ✅ Navigation

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // ✅ Redirect logged-in users away from Login page
  useEffect(() => {
    if (token) {
      navigate("/"); // ✅ Redirect to homepage if already logged in
    }
  }, [token, navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") { 
        console.log("Attempting Signup...");
        const response = await axios.post(`http://localhost:7008/api/user/register`, { 
          name, 
          email, 
          password 
        });

        console.log("Signup Response:", response.data);
        alert("Signup successful! Please log in.");
        setCurrentState("login");  

      } else {
        console.log("Attempting Login...");

        const response = await axios.post(`http://localhost:7008/api/user/login`, { 
          email, 
          password 
        });

        console.log("Login Response:", response.data);

        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
          setToken(token); // ✅ Save token to context
          navigate("/"); // ✅ Redirect after login
        } else {
          alert("Login failed. Please check your credentials.");
        }
      }
    } catch (error) {
      console.error("Auth Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Authentication failed. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="login">
      <div className="login1">
        <p className="loginp1">{currentState}</p>
        <hr className="loginhr" />
      </div>

      {currentState === "login" ? null : (
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="logininput1" placeholder="Name" required />
      )}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="logininput1" placeholder="E-mail" required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="logininput1" placeholder="Password" required />

      <div className="login2">
        {currentState === "login" ? (
          <p onClick={() => setCurrentState("Sign Up")} className="loginp3">Create account</p>
        ) : (
          <p onClick={() => setCurrentState("login")} className="loginp3">Login Here</p>
        )}
      </div>

      <button className="loginbtn">{currentState === "login" ? "Sign In" : "Sign Up"}</button>
    </form>
  );
};

export default Login;
