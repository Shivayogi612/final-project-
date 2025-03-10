import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import './Navbar.css';
import { ShopContext } from '../context/shopcontext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, token, setToken, setCartItems } = useContext(ShopContext);
    const navigate = useNavigate();

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    };

    // Prevent scrolling when side menu is open
    useEffect(() => {
        if (visible) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }, [visible]);

    return (
        <div className='Nav'>
            <Link to='/'><img src={assets.logo} className='logo' alt='Logo' /></Link>
            <ul className='Navul'>
                <Link to="/" className='Navlink'><h4>HOME</h4></Link>
                <Link to="/collection" className='Navlink'><h4>COLLECTION</h4></Link>
                <Link to="/about" className='Navlink'><h4>ABOUT</h4></Link>
                <Link to="/contact" className='Navlink'><h4>CONTACT</h4></Link>
            </ul>

            <div className='navright'>
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='searchicon' alt="Search" />
                <div className='group'>
                    <img onClick={() => token ? null : navigate('/login')} className='profileicon' src={assets.profile_icon} alt="Profile" />
                    {token && (
                        <div className='dropdown-menu'>
                            <div className='menu1'>
                                <p className='menup'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='menup'>Orders</p>
                                <p onClick={logout} className='menup'>Logout</p>
                            </div>
                        </div>
                    )}
                </div>
                <Link to='/cart' className='cart'>
                    <img src={assets.cart_icon} className='carticon' alt="Cart" />
                    <p className='cartno'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='menuicon' alt="Menu" />
            </div>

            {/* Side Menu */}
            <div className={`sidemenu ${visible ? "visible" : ""}`}>
                <div className='sidemenu1'>
                    <div onClick={() => setVisible(false)} className='sidemenu2'>
                        <img className='dropdownicon' src={assets.dropdown_icon} alt="Back" />
                        <p>Back</p>
                    </div>
                    <Link className='sidea' to="/" onClick={() => setVisible(false)}>HOME</Link>
                    <Link className='sidea' to="/collection" onClick={() => setVisible(false)}>COLLECTION</Link>
                    <Link className='sidea' to="/about" onClick={() => setVisible(false)}>ABOUT</Link>
                    <Link className='sidea' to="/contact" onClick={() => setVisible(false)}>CONTACT</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
