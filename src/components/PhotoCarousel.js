import React, { useState, useEffect } from 'react'
import carousel1 from '../assets/carousel1.JPG'
import carousel2 from '../assets/carousel2.JPG'
import carousel3 from '../assets/carousel3.JPG'
import carousel4 from '../assets/carousel4.jpg'
import carousel5 from '../assets/carousel5.JPG'
import carousel6 from '../assets/carousel6.JPG'
import '../styles/Carousel.css'


/**
 * 
 * @returns A animating infinte scrolling photo crousel
 */
function PhotoCarousel() {

  const [isMounted, setIsMounted] = useState(false); 

  // This runs the moment the user lands on the page, forcing a clean start
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false); // Cleans up when they leave
  }, []);

  return (
    <div className='carousel'>
        {/*  The animation class is only added AFTER mounting is confirmed */}
        <div className={`group ${isMounted ? 'animate' : ''}`}>
            <img src={carousel1} alt='carousel1' className='card' />
            <img src={carousel2} alt='carousel2' className='card' />
            <img src={carousel3} alt='carousel3' className='card' />
            <img src={carousel4} alt='carousel4' className='card' />
            <img src={carousel5} alt='carousel5' className='card' />
            <img src={carousel6} alt='carousel6' className='card' />
        </div>

        {/* this second acoursle allows for teh inifnnte illusion to work without it looking snappy */}
        <div aria-hidden className={`group ${isMounted ? 'animate' : ''}`}>
            <img src={carousel1} alt='carousel1' className='card' />
            <img src={carousel2} alt='carousel2' className='card' />
            <img src={carousel3} alt='carousel3' className='card' />
            <img src={carousel4} alt='carousel4' className='card' />
            <img src={carousel5} alt='carousel5' className='card' />
            <img src={carousel6} alt='carousel6' className='card' />
        </div>
    </div>
  )
}

export default PhotoCarousel