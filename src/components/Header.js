import React from 'react'
import logo from '../assets/rwLogo.png'
import { Link } from 'react-router-dom';
import '../styles/Header.css'

function Header() {
  return (
    <div className="header-container">
      {/* 💡 Background Video Tag */}
    ` <video 
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
          <h2 className="welcome-text">-WELCOME-</h2>
          <img src={logo} alt="Dragons Logo" className="header-logo" />
        </div>
        
        <Link to="/register" className="register-link">
          <button>Register</button>
        </Link>
      </div>
    </div>
  )
}

export default Header