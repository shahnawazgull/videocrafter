import React from 'react'
import Header from '@/components/Header'
import '/styles/landing.css'
import '/styles/landing_style.css'
import '/styles/landing-bck.css'
import '/styles/landing_style-bck.css'
import Banner from '@/components/Landing/Banner'
import Placeholder from '@/components/Landing/Placeholder'
import Built from '@/components/Landing/Built'
import Story from '@/components/Landing/Story'

const Page = () => {
  return (
    <div className='background'>
      <img
        src="https://vlsmlsaker.s3.amazonaws.com/assets/background/Lines.svg"
        alt="lines"
        className="lines"
      />
      {/* Ellipse Image 1 */}
      <img
        src="https://vlsmlsaker.s3.amazonaws.com/assets/background/Ellipse%202.svg"
        alt=""
        className="ellipse2"
      />
      {/* Ellipse Image 2 */}
      <img
        src="https://vlsmlsaker.s3.amazonaws.com/assets/background/Ellipse%202.svg"
        alt=""
        className="ellipse2"
      />
      <Header />
      <Banner/>
      <Placeholder/>
      <Built/>
      <Story/>
    </div>
  )
}

export default Page
