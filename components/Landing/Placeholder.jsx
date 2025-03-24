import React from 'react'
import '/styles/video-js.css'
import '/styles/landing.css'
import '/styles/landing_style.css'
import '/styles/landing-bck.css'
import '/styles/landing_style-bck.css'
import '/styles/videos.css'
const Placeholder = () => {
  return (
    <div>
      <div className='placeholder'>
        <video
          src='videos/dummy.mp4'
          style={{ width: '100%' }}
          poster='images/poster.jpg'
          controls
        />
      </div>
    </div>
  )
}

export default Placeholder
