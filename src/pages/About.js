import React from 'react'
import '../styles/About.css'
import image from '../assets/ourstory1.JPG'
import Carousel from '../components/PhotoCarousel'

function About() {
  return (
    <div>
      <header className="section-header" id = 'about-section'>OUR STORY</header>

      <div className = 'about-us-content'>
        <div className='our-story-item text-side'>
            <p>We didn’t start this to blend in. We started it because summer hockey was missing something: representation, connection, and real community. </p>
            <p>So in 2023, we built our own lane.</p>
            <p>We launched our first tournament team with a bigger purpose than wins and losses. From day one, this was about family. About culture. About showing up for each other every shift, every game, every summer. What started as one team quickly became a movement. Year after year, summer after summer, we kept growing—adding more teams, more players, and more Dragons to the family.</p>
        
            <h1>"ONCE A DRAGON, ALWAYS A DRAGON"</h1>

            <p>As we move forward, we’re committed to expanding our reach and continuing to break barriers in hockey. We’re here to uplift underrepresented communities, build lifelong connections, and prove that when you create space for everyone, the game becomes stronger.</p>
            <p>And we’re just getting started.</p>
        </div>

        <div className='our-story-item image-side'>
          <img src={image} alt = ''/>
        </div>
      </div>

      <header className="section-header">OUR MISSION</header>

      <div className='mission'>
        <p>The East Coast Dragons are dedicated to forging the next generation of elite AAA hockey players by providing premier development and exposure opportunities. We are fiercely committed to breaking down barriers, elevating underrepresented communities within ice hockey, and creating an inclusive launchpad for youth athletes to excel both on and off the ice.</p>
      </div>

      <Carousel />
    </div>
  )
}

export default About
