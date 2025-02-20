import React from 'react'
import Head from 'next/head'  // Import next/head for adding external scripts
import '/styles/video-js.css'

const Placeholder = () => {
  return (
    <div>
      <Head>
        {/* Adding the external Video.js script */}
        {/* <script src="https://vjs.zencdn.net/7.20.3/video.min.js"></script> */}
      </Head>

      <div className="PlaceholderContainer">
        <div className="intro-container">
          <video
            id="intro-video"
            className="video-js vjs-default-skin vjs-big-play-centered"
            controls
            preload="auto"
            data-setup='{ "fluid" : true }'
            width="100%"
            poster="https://vlsmlsaker.s3.amazonaws.com/videos/home-video/intro-poster.png"
          >
            <source src="https://vlsmlsaker.s3.amazonaws.com/videos/home-video/intro.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  )
}

export default Placeholder
