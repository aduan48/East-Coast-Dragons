import React from 'react'
import Header from '../components/Header'
import Highlights from './Highlights'
import Schedule from './Schedule'
import Contact from './Contact'

function Home() {
  return (
    <div>
        <Header />
      <Highlights/>
      <Schedule />
      <Contact />
    </div>
  )
}

export default Home
