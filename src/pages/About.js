import React, { useEffect } from 'react'
import '../styles/About.css'
import image from '../assets/ourstory1.JPG'
import Carousel from '../components/PhotoCarousel'

function About() {
  
  // 💡 This hook sets up the scroll listener specifically for this page's elements
  useEffect(() => {
    const observerOptions = {
      root: null, // Uses the browser window viewport
      rootMargin: '0px',
      threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Stops watching once animated
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Grabs all elements with the 'reveal' class on this page
    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach((el) => observer.observe(el));

    // Cleanup the event listener when navigating away from the page
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <header className="section-header" id='about-section'>OUR STORY</header>

      <div className='about-us-content'>
        {/* 💡 Animation 1: Left-side text block fades in smoothly */}
        <div className='our-story-item text-side reveal'>
            <p>We didn’t start this to blend in. We started it because summer hockey was missing something: representation, connection, and real community. </p>
            <p>So in 2023, we built our own lane.</p>
            <p>We launched our first tournament team with a bigger purpose than wins and losses. From day one, this was about family. About culture. About showing up for each other every shift, every game, every summer. What started as one team quickly became a movement. Year after year, summer after summer, we kept growing—adding more teams, more players, and more Dragons to the family.</p>
        
            <h1>"ONCE A DRAGON, ALWAYS A DRAGON"</h1>

            <p>As we move forward, we’re committed to expanding our reach and continuing to break barriers in hockey. We’re here to uplift underrepresented communities, build lifelong connections, and prove that when you create space for everyone, the game becomes stronger.</p>
            <p>And we’re just getting started.</p>
        </div>

        {/* 💡 Animation 2: Right-side image waits an extra 0.2 seconds for a cinematic, layered layout feel */}
        <div className='our-story-item image-side reveal' style={{ transitionDelay: '0.2s' }}>
          <img src={image} alt='' />
        </div>
      </div>

      <header className="section-header">OUR MISSION</header>

      {/* 💡 Animation 3: Mission Statement block pops into view on scroll */}
      <div className='mission reveal'>
        <p>The East Coast Dragons are dedicated to forging the next generation of elite AAA hockey players by providing premier development and exposure opportunities. We are fiercely committed to breaking down barriers, elevating underrepresented communities within ice hockey, and creating an inclusive launchpad for youth athletes to excel both on and off the ice.</p>
      </div>

      {/* 💡 Animation 4: The Photo Carousel tracks separately at the bottom */}
      <div className='reveal'>
        <Carousel />
      </div>
    </div>
  )
}

export default About