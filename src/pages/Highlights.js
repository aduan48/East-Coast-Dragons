import React from 'react'
import articleImg from '../assets/victory-post.png'
import '../styles/Highlights.css'

/**
 * 
 * @returns This returns the current news we have going on in the program
 */
function Highlights() {
  return (
    <div id = 'highlights'> 
      <header id="About" className='section-header'>RECENT HIGHLIGHTS</header>
      <div className='highlight-content'>
        <div className= 'highlight-item'>
            <img src={articleImg} alt='' />
        </div>
        <div className= 'highlight-item'>
            <h1>2025 Militia Cup Win</h1>
            <p>The U16 boys wrapped up the 2025 tournament season in unforgettable fashion, capturing a massive championship victory and making program history along the way.</p>
            <p>After going undefeated throughout the tournament, the team faced its toughest test in the championship game against the nationally ranked Militia Hockey Club. In a high-energy, back-and-forth battle, the boys rose to the occasion, delivering a stunning 5–3 victory that showcased their resilience, chemistry, and grit.</p>
            <p>Leading the charge was Kyle Greely, who put on a dominant performance and recorded a hat trick when it mattered most. His scoring, combined with relentless team defense and composure under pressure, sealed the win and sent the bench into celebration.</p>
            <p>This championship marks the first tournament victory in program history, a milestone that reflects the hard work, dedication, and growth of this group all season long. An undefeated run, a win over a nationally ranked opponent, and a historic trophy—there was no better way to close out the 2025 tournament season.</p>
            <a href = 'https://www.instagram.com/eastcoastdragons/?hl=en' className = 'highlight-instagram'>
                <button>FOLLOW OUR INSTAGRAM FOR MORE</button>
            </a>
        </div>
      </div>
    </div>
  )
}

export default Highlights
