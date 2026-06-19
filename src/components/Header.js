import React from 'react'
import logo from '../assets/rwLogo.png'
import { Link } from 'react-router-dom';
import '../styles/Header.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * This is my landing page banner
 * @returns a video with our logo and a register button overlaying it
 */
function Header() {
  return (
    <div className="header-container">
      {/* 💡 Background Video Tag */}
      <video 
        autoPlay 
        loop       
        muted      
        playsInline 
        className="background-video"
      >
        {/* No web links, no require statements—just point to the file directly */}
        <source src="/webDragons.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* 💡 Content Overlay Box */}
      <div className="header-overlay">

        <div className="center-text-group">
          <h2 className="welcome-text" id = 'home-logo'>-WELCOME-</h2>
          <img src={logo} alt="Dragons Logo" className="header-logo"/>
        </div>
        
        <Link to="/register" className="register-link">
          <button>Register</button>
        </Link>

        <KeyboardArrowDownIcon className='down-arrow' sx={{ fontSize: '4rem !important' }}/>
        
      </div>
    </div>
  )
}

export default Header