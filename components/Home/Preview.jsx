"use client";
import { useEffect, useState } from 'react';
import '/app/temp.css';
import '/styles/style.css';
import '/styles/music.css';

const MainContent = () => {
  const [fontSize, setFontSize] = useState(22);
  const [fontColor, setFontColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#000000');
  const [borderRadius, setBorderRadius] = useState(26);
  const [resolution, setResolution] = useState('1:1');
  const [apiKeyError, setApiKeyError] = useState('');
  const [voiceIdError, setVoiceIdError] = useState('');
  const [fontError, setFontError] = useState('');

  // Function to validate hexadecimal color
  const isValidHex = (color) => /^#[0-9A-F]{6}$/i.test(color);

  // Function to start processing animation
  const startProcessingAnimation = (selector) => {
    const buttonText = document.querySelector(selector);
    let dots = 0;

    const intervalId = setInterval(() => {
      dots = (dots + 1) % 4;
      buttonText.textContent = 'Processing' + '.'.repeat(dots);
    }, 500);

    return intervalId;
  };

  // Function to stop processing animation
  const stopProcessingAnimation = (selector) => {
    const buttonText = document.querySelector(selector);
    if (buttonText) {
      buttonText.textContent = 'Proceed To Scene Selection';
    }
  };

  // Function to validate form fields
  const validateForm = () => {
    let isValid = true;

    const apiKey = document.getElementById('api_key').value.trim();
    const voiceId = document.getElementById('voice_id').value.trim();
    const fontSelect = document.getElementById('font_select').value;

    if (!apiKey) {
      setApiKeyError('API key is required.');
      isValid = false;
    } else {
      setApiKeyError('');
    }

    if (!voiceId) {
      setVoiceIdError('Voice ID is required.');
      isValid = false;
    } else {
      setVoiceIdError('');
    }

    if (!fontSelect) {
      setFontError('Please select a font.');
      isValid = false;
    } else {
      setFontError('');
    }

    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Show loading animation
      const intervalId = startProcessingAnimation('#button-text');

      // Simulate form submission
      setTimeout(() => {
        // Navigate to the next page
        window.location.href = '/next-page';
        stopProcessingAnimation('#button-text');
        clearInterval(intervalId);
      }, 2000); // Simulate a 2-second delay
    }
  };

  useEffect(() => {
    // Update preview box dimensions based on resolution
    const previewBox = document.getElementById('preview-box');
    const videoText = document.getElementById('videoText');
    const previewText = document.getElementById('previewText');

    if (previewBox && videoText && previewText) {
      switch (resolution) {
        case '1:1':
          previewBox.style.width = '600px';
          previewBox.style.height = '600px';
          videoText.style.fontSize = '48px';
          previewText.style.width = '350px';
          break;
        case '4:5':
          previewBox.style.width = '480px';
          previewBox.style.height = '600px';
          videoText.style.fontSize = '42px';
          previewText.style.width = '350px';
          break;
        case '16:9':
          previewBox.style.width = '680px';
          previewBox.style.height = '382px';
          videoText.style.fontSize = '38px';
          previewText.style.width = '350px';
          break;
        case '9:16':
          previewBox.style.width = '382px';
          previewBox.style.height = '680px';
          videoText.style.fontSize = '34px';
          previewText.style.width = '300px';
          break;
        default:
          break;
      }
    }
  }, [resolution]);

  useEffect(() => {
    // Slider functionality
    const slider = document.getElementById('mySlider');
    const sliderValue = document.getElementById('SliderValue');
    const previewText = document.getElementById('previewText');

    if (slider && sliderValue && previewText) {
      slider.addEventListener('input', () => {
        const value = slider.value;
        setFontSize(value);
        sliderValue.textContent = value;
        previewText.style.fontSize = `${value * 0.8}px`;

        // Update slider background
        const percent = ((value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, #864AF9 ${percent}%, #D9D9D9 ${percent}%)`;
      });
    }

    // Font selection functionality
    const fontSelect = document.getElementById('font_select');
    if (fontSelect && previewText) {
      fontSelect.addEventListener('change', (event) => {
        previewText.style.fontFamily = event.target.value;
      });
    }

    // Color picker functionality
    const colorPicker1 = document.getElementById('colorPicker1');
    const colortext1 = document.getElementById('colortext1');
    const colorPicker2 = document.getElementById('colorPicker2');
    const colortext2 = document.getElementById('colortext2');
    const previewBackground = document.getElementById('previewBackground');
    const color1Box = document.getElementById('color1');
    const color2Box = document.getElementById('color2');

    // Update font color
    if (colorPicker1 && colortext1 && previewText && color1Box) {
      colorPicker1.addEventListener('input', () => {
        const color = colorPicker1.value;
        setFontColor(color);
        colortext1.value = color;
        previewText.style.color = color;
        color1Box.style.backgroundColor = color;
      });

      colortext1.addEventListener('input', () => {
        const color = colortext1.value;
        if (isValidHex(color)) {
          setFontColor(color);
          colorPicker1.value = color;
          previewText.style.color = color;
          color1Box.style.backgroundColor = color;
        }
      });
    }

    // Update background color
    if (colorPicker2 && colortext2 && previewBackground && color2Box) {
      colorPicker2.addEventListener('input', () => {
        const color = colorPicker2.value;
        setBgColor(color);
        colortext2.value = color;
        previewBackground.style.backgroundColor = color;
        color2Box.style.backgroundColor = color;
      });

      colortext2.addEventListener('input', () => {
        const color = colortext2.value;
        if (isValidHex(color)) {
          setBgColor(color);
          colorPicker2.value = color;
          previewBackground.style.backgroundColor = color;
          color2Box.style.backgroundColor = color;
        }
      });
    }

    // Border radius functionality
    const borderRadiusSlider = document.getElementById('subtitleBorderRadiusSlider');
    if (borderRadiusSlider && previewBackground) {
      borderRadiusSlider.addEventListener('input', () => {
        setBorderRadius(borderRadiusSlider.value);
        previewBackground.style.borderRadius = `${borderRadiusSlider.value}px`;

        // Update slider background
        const percent = ((borderRadiusSlider.value - borderRadiusSlider.min) / (borderRadiusSlider.max - borderRadiusSlider.min)) * 100;
        borderRadiusSlider.style.background = `linear-gradient(to right, #864AF9 ${percent}%, #D9D9D9 ${percent}%)`;
      });
    }

    // Resolution change functionality
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
      box.addEventListener('click', () => {
        const selectedResolution = box.getAttribute('data-resolution');
        setResolution(selectedResolution);

        // Reset all boxes and circles
        boxes.forEach((b) => {
          b.style.border = '1px solid #88888877';
          const circleOuter = b.querySelector('.circle-outer');
          const circleInner = b.querySelector('.circle-inner');
          if (circleOuter) circleOuter.style.border = '3px solid #D9D9D9';
          if (circleInner) circleInner.style.backgroundColor = '#D9D9D9';
        });

        // Highlight the selected box and circle
        box.style.border = '1px solid #864AF9';
        const selectedCircleOuter = box.querySelector('.circle-outer');
        const selectedCircleInner = box.querySelector('.circle-inner');
        if (selectedCircleOuter) selectedCircleOuter.style.border = '3px solid #864AF9';
        if (selectedCircleInner) selectedCircleInner.style.backgroundColor = '#864AF9';
      });
    });

    // TikTok-specific behavior
    const previewBackgroundDiv = document.getElementById('previewBackground');
    const tiktokPreview = document.getElementById('tiktokPreview');
    const fontSelectLabel = document.querySelector('.Upload-Font-File-text');
    const fontSelectDropdown = document.querySelector('.Upload-Font-File-Upload');
    const fontSizeLabel = document.querySelector('.Font-Size-text');
    const fontSizeSlider = document.querySelector('.Font-Size-Slider');
    const borderRadiusLabel = document.querySelector('.slider-container label');
    const borderRadiusSliderDiv = document.querySelector('.slider-container');

    if (resolution === '9:16') {
      // Hide elements for TikTok
      if (previewBackgroundDiv) previewBackgroundDiv.style.display = 'none';
      if (tiktokPreview) tiktokPreview.style.display = 'flex';
      if (fontSelectLabel) fontSelectLabel.style.display = 'none';
      if (fontSelectDropdown) fontSelectDropdown.style.display = 'none';
      if (fontSizeLabel) fontSizeLabel.style.display = 'none';
      if (fontSizeSlider) fontSizeSlider.style.display = 'none';
      if (borderRadiusLabel) borderRadiusLabel.style.display = 'none';
      if (borderRadiusSliderDiv) borderRadiusSliderDiv.style.display = 'none';
    } else {
      // Show elements for other dimensions
      if (previewBackgroundDiv) previewBackgroundDiv.style.display = 'flex';
      if (tiktokPreview) tiktokPreview.style.display = 'none';
      if (fontSelectLabel) fontSelectLabel.style.display = 'flex';
      if (fontSelectDropdown) fontSelectDropdown.style.display = 'flex';
      if (fontSizeLabel) fontSizeLabel.style.display = 'flex';
      if (fontSizeSlider) fontSizeSlider.style.display = 'block';
      if (borderRadiusLabel) borderRadiusLabel.style.display = 'block';
      if (borderRadiusSliderDiv) borderRadiusSliderDiv.style.display = 'block';
    }
  }, [resolution]);

  useEffect(() => {
    const submitButton = document.getElementById('submit_form');
    if (submitButton) {
      submitButton.addEventListener('click', handleSubmit);
    }

    return () => {
      if (submitButton) {
        submitButton.removeEventListener('click', handleSubmit);
      }
    };
  }, []);

  return (
    <div className="main-dimension-div">
      <form action="/text/" method="post" encType="multipart/form-data" className="form" id="text_form">
        <input type="hidden" name="csrfmiddlewaretoken" value="lWsA9LUBLyMgZ61FmGKS3CBC6pdvj1WcQUKPc4lXxYXprO3n8nU4Wi3UfxwPgR8m" />
        <div className="customise-main">
          <span> Create Your Perfect Video Creative: <br /> Upload, Customize, and Convert!</span>
        </div>
        <div className="card-text">
          <h3>Tutorial Video:</h3>
        </div>
        <div className="video-card">
          <div className="video-card-sub-div">
            <div id="videoPreviewContainer" className="videoPreviewContainer"></div>
          </div>
        </div>
        <div className="pick-dimension">Pick Your Dimensions</div>
        <div className="options video-sizes video-sizes-div">
          <div className="box" data-resolution="1:1">
            <input type="radio" name="resolution" value="1:1" defaultChecked hidden />
            <div className="below-input">
              <div className="square">Square</div>
              <div className="square-border"></div>
              <div className="text one-one">1:1</div>
              <div className="circle-outer">
                <div className="circle-inner"></div>
              </div>
            </div>
          </div>
          <div className="box tiktok-box" data-resolution="4:5">
            <input type="radio" name="resolution" value="4:5" hidden />
            <div className="tiktok-box-sub">
              <div className="vertical-portrait">Vertical/Portrait</div>
              <div className="sub-vertical"></div>
              <div className="text four-five">4:5</div>
              <div className="circle-outer tiktok-circle">
                <div className="circle-inner tiktok-inner"></div>
              </div>
            </div>
          </div>
          <div className="box youtube-main" data-resolution="16:9">
            <input type="radio" name="resolution" value="16:9" hidden />
            <div className="youtube-sub">
              <div className="youtube-text">YouTube</div>
              <div className="youtube-border"></div>
              <div className="text sixteen-nine">16:9</div>
              <div className="circle-outer youtube-outer">
                <div className="circle-inner youtube-inner"></div>
              </div>
            </div>
          </div>
          <div className="box nine-sixteen-main" data-resolution="9:16">
            <input type="radio" name="resolution" value="9:16" hidden />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="tiktok-heading">TikTok/Reels</div>
              <div className="tiktok-border"></div>
              <div className="text nine-sixteen-text">9:16</div>
              <div className="circle-outer tiktok-circle2">
                <div className="circle-inner tiktok-circle3"></div>
              </div>
            </div>
          </div>
        </div>
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
              <input id="api_key" type="text" className="text3 text3-input" name="elevenlabs_apikey" placeholder="ElevenLabs Api Key" defaultValue="" />
              <div style={{ width: '700px', overflowWrap: 'break-word' }}>
                <p id="api_key_error" style={{ color: 'red' }}></p>
              </div>
            </div>
            <div className="Voice-ID-text">
              <div className="Voice-ID-text-sub">Voice ID:</div>
              <div className="vh-parent">
                <div className="vh-child">
                  <span className="text3">
                    The specific identifier for the voice you want to use. Each voice in your Eleven Labs account has its
                    own unique ID.
                  </span>
                </div>
                ?
              </div>
            </div>
            <div className="Voice-ID-textarea" style={{ marginBottom: '24px' }}>
              <input type="text" id="voice_id" className="text3 text3-input" placeholder="Enter Voice ID" name="voiceid" defaultValue="" />
              <p id="voice_id_error" style={{ color: 'red' }}></p>
            </div>
            <div className="Line for-border"></div>
            <div className="subtitledesign">Subtitle Design</div>
            <div className="Upload-Font-File-text">
              <div className="choose-font">Choose Font:</div>
            </div>
            <div className="Upload-Font-File-Upload">
              <div className="Upload-Font-File-Upload-sub">
                <select id="font_select" required name="font_select" defaultValue="">
                  <option className="text3" id="font_s" style={{ color: '#cccccc' }} value="" disabled>Select A Font</option>
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
            </div>
            <p id="font_error" style={{ color: 'red', marginTop: '-20px' }}></p>
            <div className="Font-Color-text">
              <div className="font-color">Font Color:</div>
            </div>
            <div className="Font-Color-textarea">
              <div id="color1">
                <input type="color" name="font_color" id="colorPicker1" defaultValue="#ffffff" />
              </div>
              <input id="colortext1" type="text" className="focusdefault" placeholder="#ffffff" defaultValue="#ffffff" />
            </div>
            <div className="Subtitle-text">
              <div className="Subtitle-text-heading">Subtitles Background Color:</div>
            </div>
            <div className="Subtitle-textarea">
              <div id="color2">
                <input type="color" name="subtitle_box_color" id="colorPicker2" defaultValue="#000000" />
              </div>
              <input id="colortext2" type="text" className="focusdefault" placeholder="#000000" defaultValue="#000000" />
            </div>
            <div className="Font-Size-text">
              <div className="Font-Size-text-heading">Font Size: <span id="recommended-font-size">(Recommended Font Size: 22)</span></div>
              <span id="SliderValue">0</span>
            </div>
            <div className="Font-Size-Slider">
              <input type="range" name="font_size1" min="0" max="25" value={fontSize} className="slider" id="mySlider" style={{ width: '100%' }} onChange={(e) => setFontSize(e.target.value)} />
              <input type="number" hidden name="font_size" value={fontSize * 2} className="slider" id="font_size" style={{ width: '100%' }} />
            </div>
            <div className="slider-container">
              <div className="slider-container-sub">
                <label htmlFor="subtitleBorderRadiusSlider" className="box-roundness-text">Subtitle Box Roundness:</label>
                <span id="subtitleBorderRadiusValue" className="subtitle-border-radius-value">{borderRadius}</span>
              </div>
              <input type="range" name="box_radius" id="subtitleBorderRadiusSlider" className="subtitle-border-radius-slider" min="0" max="50" value={borderRadius} onChange={(e) => setBorderRadius(e.target.value)} />
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="Preview" id="Preview">
          <div className="Preview-text">
            <div className="Preview-text-heading">Preview</div>
          </div>
          <div id="preview-box">
            <span id="videoText">
              Your Selected Video <br /> Scene Will Go Here
            </span>
            <div id="previewBackground" className="previewBackground2">
              <span id="previewText">
                This Is How Your Original Subtitle Text Will Be Displayed
              </span>
            </div>
            <div id="tiktokPreview" className="container2">
              <p className="text-wrapper2">
                <span className="text-wrapper2-span">This Is How Your Original</span>
                <span className="text-wrapper2-span">Subtitle Text Will Show.</span>
              </p>
            </div>
          </div>
        </div>
        <button id="submit_form" type="submit" className="done-button">
          <span id="button-text" style={{ fontSize: '18px', fontWeight: '500', lineHeight: '21.94px', textAlign: 'left' }}>Proceed To Scene Selection</span>
        </button>
      </form>
    </div>
  );
};

export default MainContent;