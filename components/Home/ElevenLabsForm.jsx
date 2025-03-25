import React from 'react';
import '/app/temp.css';
import '/styles/style.css';
import '/styles/fonts.css';
import '/styles/music.css';
const ElevenLabsForm = ({ apiKeyError, voiceIdError }) => {
  return (
    <div className="eleven-labs-main">
      <div className="eleven-labs-sub">
        <div className="11Labs-Api-key-text eleven-labs-main-text">
          <div className="eleven-labs-heading">ElevenLabs Api Key:</div>
          <div className="vh-parent">
            <div className="vh-child">
              <span className="text3">
                An unique code from your Eleven Labs account that lets VideoCrafter.io use your selected AI voices.
                Find it in your Eleven Labs account under API settings.
              </span>
            </div>
            ?
          </div>
        </div>
        <div className="11Labs-Api-key-textarea" style={{ marginBottom: '24px' }}>
          <input id="api_key" type="text" className="text3 text3-input" name="elevenlabs_apikey" placeholder="ElevenLabs Api Key" />
          <p id="api_key_error" className="error-message" style={{ color: 'red', fontSize: '16px' }}>{apiKeyError}</p>
        </div>
        <div className="Voice-ID-text">
          <div className="Voice-ID-text-sub">Voice ID:</div>
          <div className="vh-parent">
            <div className="vh-child">
              <span className="text3">
                The specific identifier for the voice you want to use. Each voice in your Eleven Labs account has its own unique ID.
              </span>
            </div>
            ?
          </div>
        </div>
        <div className="Voice-ID-textarea" style={{ marginBottom: '24px' }}>
          <input type="text" id="voice_id" className="text3 text3-input" placeholder="Enter Voice ID" name="voiceid" />
          <p id="voice_id_error" className="error-message" style={{ color: 'red', fontSize: '16px' }}>{voiceIdError}</p>
        </div>
      </div>
    </div>
  );
};
export default ElevenLabsForm; // Default export