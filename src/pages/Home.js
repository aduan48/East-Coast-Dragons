import React , {useEffect} from 'react'
import Header from '../components/Header'
import Highlights from './Highlights'
import Schedule from './Schedule'
import Contact from './Contact'
import { useLocation } from 'react-router-dom';
import Carousel from '../components/PhotoCarousel'

function Home() {

  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If the URL is /about OR if there is a hash like #about-section
    setTimeout(() => {
    if (pathname === '/home') {
      const element = document.getElementById('home-logo');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if(pathname === '/contact'){
// Delay by 100-200ms to let the DOM layout settle
        const element = document.getElementById('Contact-Us');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    } else if(pathname === '/schedule'){
      const element = document.getElementById('schedule-topper');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    }, 300);
  }, [pathname, hash]); // Run this whenever the URL changes


  return (
    <div>
        <Header />
      <Highlights/>
      <Schedule />
      <Carousel />
      <Contact />
    </div>
  )
}

export default Home
