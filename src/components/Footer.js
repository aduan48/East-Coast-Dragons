import React from 'react'
import '../styles/Footer.css'
import InstagramIcon from '@mui/icons-material/Instagram'


/**
 * 
 * @returns My footer which includes the copyright and a social medio icon leading to our instagram
 */
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