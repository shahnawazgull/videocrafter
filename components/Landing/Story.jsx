import React from 'react';

const Story = () => {
  return (
    <div>
      <div className="portfolio" id="Portfolio">
        <div className="portfoliotext">
          <h2>
            See What
            <br />
            <span className="highlight">VideoCrafter.io</span> Has Done
          </h2>
        </div>

        <div className="grid">
          <h2 className="subtitle">TikTok Ad Examples</h2>
          <div className="grid-container">
            <div className="grid-item">
              <video src="https://vlsmlsaker.s3.amazonaws.com/videos/tiktok/tiktok3.mp4" className="tiktok-video" controls></video>
            </div>
            <div className="grid-item">
              <video src="https://vlsmlsaker.s3.amazonaws.com/videos/tiktok/tiktok3.mp4" className="tiktok-video" controls></video>
            </div>
            <div className="grid-item">
              <video src="https://vlsmlsaker.s3.amazonaws.com/videos/tiktok/tiktok3.mp4" className="tiktok-video" controls></video>
            </div>
          </div>

          <h2 className="subtitle">Facebook/Instagram Ad Examples</h2>
          <div className="grid-container">
            <div className="grid-item">
              <video src="https://vlsmlsaker.s3.amazonaws.com/videos/facebook/facebook1.mp4" className="facebook-video" controls></video>
            </div>
            <div className="grid-item">
              <video src="https://vlsmlsaker.s3.amazonaws.com/videos/facebook/facebook1.mp4" className="facebook-video" controls></video>
            </div>
            <div className="grid-item">
              <video src="https://vlsmlsaker.s3.amazonaws.com/videos/facebook/facebook1.mp4" className="facebook-video" controls></video>
            </div>
          </div>

          <h2 className="subtitle">YouTube Ad Examples</h2>
          <div className="grid-container">
            <div className="grid-item">
              <video src="https://vlsmlsaker.s3.amazonaws.com/videos/youtube/youtube1.mp4" className="youtube-video" controls></video>
            </div>
            <div className="grid-item">
              <video src="https://vlsmlsaker.s3.amazonaws.com/videos/youtube/youtube1.mp4" className="youtube-video" controls></video>
            </div>
            <div className="grid-item">
              <video src="https://vlsmlsaker.s3.amazonaws.com/videos/youtube/youtube1.mp4" className="youtube-video" controls></video>
            </div>
          </div>
        </div>

        <div className="mobi-slider tiktok-slider">
          <h2 className="subtitle mobile-sub-head">TikTok Ad Examples</h2>
          <div className="slider">
            <button className="prev">&lt;</button>
            <div className="slides">
              <div className="slide">
                <div className="Placeholder-mob">
                  <video
                    id="tiktok-video-1"
                    className="video-js vjs-default-skin vjs-big-play-centered tiktok-video"
                    controls
                    preload="auto"
                    data-setup='{ "fluid" : true }'
                    width="100%"
                    poster="/videos/tiktokhttps://vlsmlsaker.s3.amazonaws.com/videos/tiktok/tiktok3.mp4ng"
                  >
                    <source src="https://vlsmlsaker.s3.amazonaws.com/videos/tiktok/tiktok3.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="slide">
                <div className="Placeholder-mob">
                  <video
                    id="tiktok-video-2"
                    className="video-js vjs-default-skin vjs-big-play-centered tiktok-video"
                    controls
                    preload="auto"
                    data-setup='{ "fluid" : true }'
                    width="100%"
                    poster="/videos/tiktokhttps://vlsmlsaker.s3.amazonaws.com/videos/tiktok/tiktok3.mp4ng"
                  >
                    <source src="https://vlsmlsaker.s3.amazonaws.com/videos/tiktok/tiktok3.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="slide">
                <div className="Placeholder-mob">
                  <video
                    id="tiktok-video-3"
                    className="video-js vjs-default-skin vjs-big-play-centered tiktok-video"
                    controls
                    preload="auto"
                    data-setup='{ "fluid" : true }'
                    width="100%"
                    poster="/videos/tiktokhttps://vlsmlsaker.s3.amazonaws.com/videos/tiktok/tiktok3.mp4ng"
                  >
                    <source src="https://vlsmlsaker.s3.amazonaws.com/videos/tiktok/tiktok3.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
            <button className="next">&gt;</button>
            <div className="slider-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>

        <div className="mobi-slider facebook-slider">
          <h2 className="subtitle mobile-sub-head">Facebook Ad Examples</h2>
          <div className="slider">
            <button className="prev">&lt;</button>
            <div className="slides">
              <div className="slide">
                <div className="Placeholder-mob">
                  <video
                    id="facebook-video-1"
                    className="video-js vjs-default-skin vjs-big-play-centered facebook-video"
                    controls
                    preload="auto"
                    data-setup='{ "fluid" : true }'
                    width="100%"
                    poster="/videos/facebookhttps://vlsmlsaker.s3.amazonaws.com/videos/facebook/facebook1.mp4"
                  >
                    <source src="https://vlsmlsaker.s3.amazonaws.com/videos/facebook/facebook1.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="slide">
                <div className="Placeholder-mob">
                  <video
                    id="facebook-video-2"
                    className="video-js vjs-default-skin vjs-big-play-centered facebook-video"
                    controls
                    preload="auto"
                    data-setup='{ "fluid" : true }'
                    width="100%"
                    poster="/videos/facebookhttps://vlsmlsaker.s3.amazonaws.com/videos/facebook/facebook1.mp4"
                  >
                    <source src="https://vlsmlsaker.s3.amazonaws.com/videos/facebook/facebook1.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="slide">
                <div className="Placeholder-mob">
                  <video
                    id="facebook-video-3"
                    className="video-js vjs-default-skin vjs-big-play-centered facebook-video"
                    controls
                    preload="auto"
                    data-setup='{ "fluid" : true }'
                    width="100%"
                    poster="/videos/facebookhttps://vlsmlsaker.s3.amazonaws.com/videos/facebook/facebook1.mp4"
                  >
                    <source src="https://vlsmlsaker.s3.amazonaws.com/videos/facebook/facebook1.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
            <button className="next">&gt;</button>
            <div className="slider-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>

        <div className="mobi-slider youtube-slider">
          <h2 className="subtitle mobile-sub-head">YouTube Ad Examples</h2>
          <div className="slider">
            <button className="prev">&lt;</button>
            <div className="slides">
              <div className="slide">
                <div className="Placeholder-mob">
                  <video
                    id="youtube-video-1"
                    className="video-js vjs-default-skin vjs-big-play-centered youtube-video"
                    controls
                    preload="auto"
                    data-setup='{ "fluid" : true }'
                    width="100%"
                    poster="https://vlsmlsaker.s3.amazonaws.com/videos/youtube/youtube1.mp4-1.png"
                  >
                    <source src="https://vlsmlsaker.s3.amazonaws.com/videos/youtube/youtube1.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="slide">
                <div className="Placeholder-mob">
                  <video
                    id="youtube-video-2"
                    className="video-js vjs-default-skin vjs-big-play-centered youtube-video"
                    controls
                    preload="auto"
                    data-setup='{ "fluid" : true }'
                    width="100%"
                    poster="https://vlsmlsaker.s3.amazonaws.com/videos/youtube/youtube1.mp4-1.png"
                  >
                    <source src="https://vlsmlsaker.s3.amazonaws.com/videos/youtube/youtube1.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="slide">
                <div className="Placeholder-mob">
                  <video
                    id="youtube-video-3"
                    className="video-js vjs-default-skin vjs-big-play-centered youtube-video"
                    controls
                    preload="auto"
                    data-setup='{ "fluid" : true }'
                    width="100%"
                    poster="https://vlsmlsaker.s3.amazonaws.com/videos/youtube/youtube1.mp4-1.png"
                  >
                    <source src="https://vlsmlsaker.s3.amazonaws.com/videos/youtube/youtube1.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
            <button className="next">&gt;</button>
            <div className="slider-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;