import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '₹';

const App = () => {
  // ✅ Ensure token is never null
  const [token, setToken] = useState(localStorage.getItem('token') || "");

  // ✅ Store token only if it exists
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token'); // ✅ Remove token when user logs out
    }
  }, [token]);



  // ✅ Proper logout function
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div className="app">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={handleLogout} />
          <hr />
          <div className="sidebar">
            <Sidebar />
            <div className="route">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
