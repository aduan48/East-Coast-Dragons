import React, { useState } from 'react'
import Logo from '../assets/bwLogo.png';
import {Link } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import '../styles/Navbar.css'

function Navbar() {

    const [openLinks, setOpenLinks] = useState(false)

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    }

    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

  return (
    <div className='navbar'>
      <div className='leftSide' id={openLinks ? "open" : "close"}> 
          <img src={Logo} alt="Logo" />
          <div className='hiddenLinks'>
           <Link to="/home" onClick={() => { scrollToSection('home-logo'); toggleNavbar(); }}> HOME </Link>
           <Link to ="/register" onClick={() => { scrollToSection('register-header'); toggleNavbar(); }}>  REGISTER  </Link>
          <Link to="/schedule" onClick={toggleNavbar}> SCHEDULE </Link>
          <Link to="/about" onClick={() => { scrollToSection('about-section'); toggleNavbar(); }}> ABOUT </Link>
          <Link to="/contact" onClick={toggleNavbar}> CONTACT </Link>
        </div>
      </div>
      <div className='rightSide'> 
        <Link to ="/home" onClick={scrollToSection('home-logo')}>  HOME </Link>
        <Link to ="/register" onClick={scrollToSection('register-header')}>  REGISTER  </Link>
        <Link to ="/schedule">  SCHEDULE </Link>
        <Link to ="/about" onClick={scrollToSection('about-section')}>  ABOUT  </Link>
        <Link to ="/contact">  CONTACT  </Link>
        <button onClick ={toggleNavbar}>
         <ReorderIcon />
        </button>
      </div>
    </div>
  )
}

export default Navbar