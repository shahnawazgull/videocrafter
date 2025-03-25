import React from 'react';
import '/app/temp.css';
import '/styles/style.css';
import '/styles/fonts.css';
import '/styles/music.css';
const PreviewSection = () => {
  return (
    <div className="Preview" id="Preview">
      <div className="Preview-text"><div className="Preview-text-heading">Preview</div></div>
      <div id="preview-box">
        <span id="videoText">Your Selected Video <br /> Scene Will Go Here</span>
        <div id="previewBackground" className="previewBackground2">
          <span id="previewText">This Is How Your Original Subtitle Text Will Be Displayed</span>
        </div>
        <div id="tiktokPreview" className="container2">
          <p className="text-wrapper2">
            <span className="text-wrapper2-span">This Is How Your Original</span>
            <span className="text-wrapper2-span">Subtitle Text Will Show.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default PreviewSection; // Default export