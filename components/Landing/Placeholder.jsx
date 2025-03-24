import React from 'react'
import '/styles/video-js.css'
import '/styles/landing.css'
import '/styles/landing_style.css'
import '/styles/landing-bck.css'
import '/styles/landing_style-bck.css'
const Placeholder = () => {
  return (
    <div>
      <div className="PlaceholderContainer">
        <div className="intro-container">
        <video
            id="tutorial-video"
            className="video-js vjs-default-skin vjs-big-play-centered"
            controls
            preload="auto"
            data-setup='{ "fluid" : true }'
            width="100%"
            poster="images/poster.jpg"
          >
            <source src="videos/dummy.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  )
}

export default Placeholder
