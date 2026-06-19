import React, { useState } from 'react'
import Logo from '../assets/bwLogo.png';
import {Link } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import '../styles/Navbar.css'


/**
 * 
 * @returns The navbar function. It had logic that toggels a hamburger navbar when on mobile
 */
function Navbar() {

  const [openLinks, setOpenLinks] = useState(false); //turns off the hamburger at first 

  //makes sure to close the navbar or open it when buttons ar clicked
  const toggleNavbar = () => {
      setOpenLinks(!openLinks);
  }

  return (
    <div className='navbar'>

      {/*This Left side has links that are hidden when not on mobile*/}
      <div className='leftSide' id={openLinks ? "open" : "close"}> 
          <img src={Logo} alt="Logo" />
          <div className='hiddenLinks'>
           <Link to="/home" onClick={toggleNavbar}> HOME </Link>
           <Link to ="/register" onClick={toggleNavbar}>  REGISTER  </Link>
          <Link to="/schedule" onClick={toggleNavbar}> SCHEDULE </Link>
          <Link to="/about" onClick={toggleNavbar}> ABOUT </Link>
          <Link to="/contact" onClick={toggleNavbar}> CONTACT </Link>
        </div>
      </div>


      <div className='rightSide'> 
        <Link to ="/home" >  HOME </Link>
        <Link to ="/register">  REGISTER  </Link>
        <Link to ="/schedule">  SCHEDULE </Link>
        <Link to ="/about">  ABOUT  </Link>
        <Link to ="/contact">  CONTACT  </Link>

        {/*Reorder button that turns on during mobile and opens the left side links*/}
        <button onClick ={toggleNavbar}>
         <ReorderIcon />
        </button>
      </div>
    </div>
  )
}

export default Navbar