import React from 'react'
import '../styles/Footer.css'
import InstagramIcon from '@mui/icons-material/Instagram'

function Footer() {
  return (
    <div className='footer'>

    <div className='copyright'>    
        <p>&copy; {new Date().getFullYear()} East Coast Dragons</p>
      </div>
      <div className='socialMedia'> 
        <a href = "https://www.instagram.com/eastcoastdragons/?hl=en">
            <InstagramIcon />
        </a>

      </div>

    </div>
  )
}

export default Footer