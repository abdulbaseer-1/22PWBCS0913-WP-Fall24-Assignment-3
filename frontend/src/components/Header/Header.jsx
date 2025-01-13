import React from 'react';
import Navbar from '../Navbar/Navbar';
import headerStyle from './Header.module.css';
import Logo from '../../assets/stork_-removebg-preview.png';
import banner from '../../assets/banner.jpeg';
import cart from "../../assets/cart-148964_1920.png"

function Header({className}) {
    return (
    <header className={`${headerStyle.header} ${className}`}>
        <img src={banner} alt="" />
        <div className={`${headerStyle.logo} ${className}`}>
            <img src={Logo} alt="Logo" className={`${headerStyle.logoImage} ${className}`} />
        </div>

        <div className={`${headerStyle.navbarContainer} ${className}`}>
            <Navbar className={className} />
        </div>

        <div className={`${headerStyle.cart} ${className}`}>
            <img src={cart} alt="Cart" className={`${headerStyle.cartIcon} ${className}`} />
        </div>
    </header>
    );
}

export default Header;
