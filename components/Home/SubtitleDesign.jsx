import React from 'react';
import '/app/temp.css';
import '/styles/style.css';
import '/styles/fonts.css';
import '/styles/music.css';
const SubtitleDesign = ({
  fontError,
  fontSize,
  borderRadius,
  handleFontSizeChange,
  handleBorderRadiusChange,
  dimensionStyles,
  resolution,
}) => {
  return (
    <div className="eleven-labs-sub">
      <div className="Line for-border"></div>
      <div className="subtitledesign">Subtitle Design</div>
      <div className="Upload-Font-File-text"><div className="choose-font">Choose Font:</div></div>
      <div className="Upload-Font-File-Upload">
        <select id="font_select" required name="font_select" defaultValue="">
          <option className="text3" value="" disabled>Select A Font</option>
          <option className="text3" style={{ fontFamily: 'Arial' }} value="Arial">Arial</option>
          <option className="text3" style={{ fontFamily: 'OpenSans-Semibold' }} value="OpenSans-Semibold">Open Sans Condensed</option>
          <option className="text3" style={{ fontFamily: 'Helvetica' }} value="Helvetica">Helvetica</option>
          <option className="text3" style={{ fontFamily: 'Roboto-Medium' }} value="Roboto-Medium">Roboto Medium</option>
          <option className="text3" style={{ fontFamily: 'tiktokfont', display: 'none' }} value="tiktokfont">Proxima Nova Semibold (Only For TikTok)</option>
          <option className="text3" style={{ fontFamily: 'Montserrat' }} value="Montserrat-SemiBold">Montserrat SemiBold</option>
          <option className="text3" style={{ fontFamily: 'Montserrat-Bold' }} value="Montserrat-Bold">Montserrat Bold</option>
          <option className="text3" style={{ fontFamily: 'Montserrat-ExtraBold' }} value="Montserrat-ExtraBold">Montserrat ExtraBold</option>
        </select>
      </div>
      <p id="font_error" className="error-message" style={{ color: 'red', marginTop: '-20px', fontSize: '16px' }}>{fontError}</p>
      <div className="Font-Color-text"><div className="font-color">Font Color:</div></div>
      <div className="Font-Color-textarea">
        <div id="color1"><input type="color" name="font_color" id="colorPicker1" defaultValue={dimensionStyles[resolution].fontColor} /></div>
        <input id="colortext1" type="text" className="focusdefault" placeholder="#ffffff" defaultValue={dimensionStyles[resolution].fontColor} />
      </div>
      <div className="Subtitle-text"><div className="Subtitle-text-heading">Subtitles Background Color:</div></div>
      <div className="Subtitle-textarea">
        <div id="color2"><input type="color" name="subtitle_box_color" id="colorPicker2" defaultValue={dimensionStyles[resolution].bgColor} /></div>
        <input id="colortext2" type="text" className="focusdefault" placeholder="#000000" defaultValue={dimensionStyles[resolution].bgColor} />
      </div>
      <div className="Font-Size-text">
        <div className="Font-Size-text-heading">Font Size: <span id="recommended-font-size">(Recommended Font Size: {fontSize})</span></div>
        <span id="SliderValue">{fontSize}</span>
      </div>
      <div className="Font-Size-Slider">
        <input
          type="range"
          name="font_size1"
          min="0"
          max="25"
          value={fontSize}
          onChange={handleFontSizeChange}
          className="slider"
          id="mySlider"
          style={{ width: '100%' }}
        />
        <input
          type="number"
          hidden
          name="font_size"
          id="font_size"
          value={fontSize * 2}
          readOnly
        />
      </div>
      <div className="slider-container">
        <div className="slider-container-sub">
          <label htmlFor="subtitleBorderRadiusSlider" className="box-roundness-text">Subtitle Box Roundness:</label>
          <span id="subtitleBorderRadiusValue">{borderRadius}</span>
        </div>
        <input
          type="range"
          name="box_radius"
          id="subtitleBorderRadiusSlider"
          className="subtitle-border-radius-slider"
          min="0"
          max="50"
          value={borderRadius}
          onChange={handleBorderRadiusChange}
        />
      </div>
    </div>
  );
};
export default SubtitleDesign; // Default export