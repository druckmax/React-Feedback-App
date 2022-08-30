import React from 'react'
import Card from '../components/shared/Card'
import { Link } from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>About this project</h1>
        <p>This is a React app to leave feedback for a product or service.</p>
        <p>1.0.0</p>

        <Link to="/" className='home'>Back To Home</Link>
      </div>
    </Card>
  )
}

export default AboutPage