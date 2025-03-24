"use client";
import { useEffect, useState, useRef } from 'react';
import '/app/temp.css';
import '/styles/style.css';
import '/styles/fonts.css';
import '/styles/music.css';
import Link from 'next/link';

const MainContent = () => {
  const [fontSize, setFontSize] = useState(22);
  const [borderRadius, setBorderRadius] = useState(26);
  const [resolution, setResolution] = useState('1:1');
  const [apiKeyError, setApiKeyError] = useState('');
  const [voiceIdError, setVoiceIdError] = useState('');
  const [fontError, setFontError] = useState('');
  const [dimensionStyles, setDimensionStyles] = useState({
    '1:1': { fontColor: '#ffffff', bgColor: '#000000' },
    '4:5': { fontColor: '#ffffff', bgColor: '#000000' },
    '16:9': { fontColor: '#ffffff', bgColor: '#000000' },
    '9:16': { fontColor: '#000000', bgColor: '#ffffff' },
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingDots, setProcessingDots] = useState(0);
  const [fontSizeDerived, setFontSizeDerived] = useState(44);
  const [selectedFont, setSelectedFont] = useState('');
  const isMounted = useRef(false);
  const processingIntervalRef = useRef(null);

  const isValidHex = (color) => /^#[0-9A-F]{6}$/i.test(color);

  // Processing animation
  const startProcessingAnimation = () => {
    setIsProcessing(true);
    if (processingIntervalRef.current) {
      clearInterval(processingIntervalRef.current);
    }
    processingIntervalRef.current = setInterval(() => {
      setProcessingDots((prev) => (prev >= 3 ? 0 : prev + 1));
    }, 500);
  };

  const stopProcessingAnimation = () => {
    setIsProcessing(false);
    if (processingIntervalRef.current) {
      clearInterval(processingIntervalRef.current);
      processingIntervalRef.current = null;
    }
    setProcessingDots(0);
  };

  // Reset form on page show
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        stopProcessingAnimation();
        updateSliderBackground('mySlider', fontSize, 0, 25);
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [fontSize]);

  const validateForm = () => {
    let isValid = true;
    const apiKey = document.getElementById('api_key')?.value.trim() || '';
    const voiceId = document.getElementById('voice_id')?.value.trim() || '';
    const fontSelect = document.getElementById('font_select')?.value || '';

    setApiKeyError('');
    setVoiceIdError('');
    setFontError('');

    if (!apiKey) {
      setApiKeyError('API key is required.');
      document.getElementById('api_key')?.focus();
      isValid = false;
    }

    if (!voiceId) {
      setVoiceIdError('Voice ID is required.');
      document.getElementById('voice_id')?.focus();
      isValid = false;
    }

    // Only validate font for non-TikTok dimensions
    if (resolution !== '9:16' && !fontSelect) {
      setFontError('Please select a font.');
      document.getElementById('font_select')?.focus();
      isValid = false;
    }

    if (!isValid) {
      const errorElement = document.querySelector('.error-message:not(:empty)');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    startProcessingAnimation();

    if (validateForm()) {
      setTimeout(() => {
        window.location.href = '/scene';
        stopProcessingAnimation();
      }, 2000);
    } else {
      setTimeout(() => stopProcessingAnimation(), 500);
    }
  };

  useEffect(() => {
    const apiKeyInput = document.getElementById('api_key');
    const voiceIdInput = document.getElementById('voice_id');
    const fontSelect = document.getElementById('font_select');

    const clearErrors = () => {
      if (apiKeyInput?.value) setApiKeyError('');
      if (voiceIdInput?.value) setVoiceIdError('');
      if (fontSelect?.value || resolution === '9:16') setFontError('');
    };

    apiKeyInput?.addEventListener('input', clearErrors);
    voiceIdInput?.addEventListener('input', clearErrors);
    fontSelect?.addEventListener('change', (e) => {
      const newFont = e.target.value;
      setSelectedFont(newFont);
      if (resolution !== '9:16' && newFont !== 'tiktokfont') {
        const previewText = document.getElementById('previewText');
        if (previewText) {
          previewText.style.fontFamily = newFont;
        }
      }
      clearErrors();
    });

    return () => {
      apiKeyInput?.removeEventListener('input', clearErrors);
      voiceIdInput?.removeEventListener('input', clearErrors);
      fontSelect?.removeEventListener('change', clearErrors);
    };
  }, [resolution]);

  // Initialize settings after DOM is ready
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      updateResolutionSettings(resolution);
      updateSliderBackground('mySlider', fontSize, 0, 25);
      updateSliderBackground('subtitleBorderRadiusSlider', borderRadius, 0, 50);
      const previewText = document.getElementById('previewText');
      const previewBackground = document.getElementById('previewBackground');
      if (previewText) previewText.style.fontSize = `${fontSize * 0.8}px`;
      if (previewBackground) previewBackground.style.borderRadius = `${borderRadius}px`;
      setFontSizeDerived(fontSize * 2);
    }
  }, []);

  const updateSliderBackground = (sliderId, value, min, max) => {
    const slider = document.getElementById(sliderId);
    if (slider) {
      const percent = ((value - min) / (max - min)) * 100;
      slider.style.background = `linear-gradient(to right, #864AF9 ${percent}%, #D9D9D9 ${percent}%)`;
    }
  };

  const updateResolutionSettings = (selectedResolution) => {
    const previewBox = document.getElementById('preview-box');
    const videoText = document.getElementById('videoText');
    const previewText = document.getElementById('previewText');
    const previewBackground = document.getElementById('previewBackground');
    const tiktokPreview = document.getElementById('tiktokPreview');
    const fontSelectLabel = document.querySelector('.Upload-Font-File-text');
    const fontSelectDropdown = document.querySelector('.Upload-Font-File-Upload');
    const fontSizeLabel = document.querySelector('.Font-Size-text');
    const fontSizeSlider = document.querySelector('.Font-Size-Slider');
    const borderRadiusLabel = document.querySelector('.slider-container label');
    const borderRadiusSliderDiv = document.querySelector('.slider-container');
    const fontSelect = document.getElementById('font_select');
    const preview = document.getElementById('Preview');

    if (!previewBox || !videoText || !previewText) return;

    let newFontSize = 22;
    if (selectedResolution === '1:1') {
      previewBox.style.width = '600px';
      previewBox.style.height = '600px';
      videoText.style.fontSize = '48px';
      previewText.style.width = '350px';
      preview.style.marginTop = '0';
      previewBox.style.background = '#EEEEEE';
      videoText.style.display = 'flex';
      previewBackground.style.display = 'flex';
      tiktokPreview.style.display = 'none';
      fontSelectLabel.style.display = 'flex';
      fontSelectDropdown.style.display = 'flex';
      fontSizeLabel.style.display = 'flex';
      fontSizeSlider.style.display = 'block';
      borderRadiusLabel.style.display = 'block';
      borderRadiusSliderDiv.style.display = 'block';
      if (selectedFont && selectedFont !== 'tiktokfont') {
        previewText.style.fontFamily = selectedFont;
      } else {
        fontSelect.value = '';
        previewText.style.fontFamily = '';
      }
      setFontError(''); // Clear font error when switching away from 9:16
    } else if (selectedResolution === '4:5') {
      previewBox.style.width = '480px';
      previewBox.style.height = '600px';
      videoText.style.fontSize = '42px';
      previewText.style.width = '350px';
      preview.style.marginTop = '0';
      previewBox.style.background = '#EEEEEE';
      videoText.style.display = 'flex';
      previewBackground.style.display = 'flex';
      tiktokPreview.style.display = 'none';
      fontSelectLabel.style.display = 'flex';
      fontSelectDropdown.style.display = 'flex';
      fontSizeLabel.style.display = 'flex';
      fontSizeSlider.style.display = 'block';
      borderRadiusLabel.style.display = 'block';
      borderRadiusSliderDiv.style.display = 'block';
      if (selectedFont && selectedFont !== 'tiktokfont') {
        previewText.style.fontFamily = selectedFont;
      } else {
        fontSelect.value = '';
        previewText.style.fontFamily = '';
      }
      setFontError('');
    } else if (selectedResolution === '16:9') {
      previewBox.style.width = '680px';
      previewBox.style.height = '382px';
      videoText.style.fontSize = '38px';
      previewText.style.width = '350px';
      preview.style.marginTop = '0';
      previewBox.style.background = '#EEEEEE';
      videoText.style.display = 'flex';
      previewBackground.style.display = 'flex';
      tiktokPreview.style.display = 'none';
      fontSelectLabel.style.display = 'flex';
      fontSelectDropdown.style.display = 'flex';
      fontSizeLabel.style.display = 'flex';
      fontSizeSlider.style.display = 'block';
      borderRadiusLabel.style.display = 'block';
      borderRadiusSliderDiv.style.display = 'block';
      if (selectedFont && selectedFont !== 'tiktokfont') {
        previewText.style.fontFamily = selectedFont;
      } else {
        fontSelect.value = '';
        previewText.style.fontFamily = '';
      }
      setFontError('');
    } else if (selectedResolution === '9:16') {
      previewBox.style.width = '382px';
      previewBox.style.height = '680px';
      previewText.style.width = '300px';
      newFontSize = 16;
      fontSelect.value = 'tiktokfont';
      previewText.style.fontFamily = 'tiktokfont';
      tiktokPreview.style.fontFamily = 'tiktokfont';
      document.querySelectorAll('.text-wrapper2-span').forEach((span) => {
        span.style.fontFamily = 'tiktokfont';
      });
      previewBackground.style.display = 'none';
      tiktokPreview.style.display = 'flex';
      fontSelectLabel.style.display = 'none';
      fontSelectDropdown.style.display = 'none';
      fontSizeLabel.style.display = 'none';
      fontSizeSlider.style.display = 'none';
      borderRadiusLabel.style.display = 'none';
      borderRadiusSliderDiv.style.display = 'none';
      videoText.style.display = 'none';
      previewBox.style.background = `url("/images/tiktok.png") center/cover no-repeat`;
      preview.style.marginTop = '-2rem';
      setFontError(''); // Clear font error for TikTok
    }

    // Reset selectedFont when leaving 9:16 to prevent tiktokfont persistence
    if (selectedResolution !== '9:16' && selectedFont === 'tiktokfont') {
      setSelectedFont('');
      fontSelect.value = '';
    }

    setFontSize(newFontSize);
    previewText.style.fontSize = `${newFontSize * 0.8}px`;
    const slider = document.getElementById('mySlider');
    if (slider) {
      slider.value = newFontSize;
      updateSliderBackground('mySlider', newFontSize, 0, 25);
    }
    document.getElementById('SliderValue').textContent = newFontSize;
    setFontSizeDerived(newFontSize * 2);
    document.getElementById('recommended-font-size').textContent = `(Recommended Font Size: ${newFontSize})`;
    previewBox.style.margin = '0 auto';

    if (previewBackground) {
      previewBackground.style.borderRadius = `${borderRadius}px`;
    }
    updateSliderBackground('subtitleBorderRadiusSlider', borderRadius, 0, 50);

    // Update color inputs based on dimensionStyles
    const fontColor = dimensionStyles[selectedResolution].fontColor;
    const bgColor = dimensionStyles[selectedResolution].bgColor;
    document.getElementById('colorPicker1').value = fontColor;
    document.getElementById('colortext1').value = fontColor;
    document.getElementById('color1').style.backgroundColor = fontColor;
    previewText.style.color = fontColor;
    document.querySelectorAll('.text-wrapper2-span').forEach((span) => {
      span.style.color = fontColor;
    });

    document.getElementById('colorPicker2').value = bgColor;
    document.getElementById('colortext2').value = bgColor;
    document.getElementById('color2').style.backgroundColor = bgColor;
    previewBackground.style.backgroundColor = bgColor;
    document.querySelectorAll('.text-wrapper2-span').forEach((span) => {
      span.style.backgroundColor = bgColor;
    });

    // Highlight selected dimension
    document.querySelectorAll('.box').forEach((box) => {
      const res = box.getAttribute('data-resolution');
      if (res === selectedResolution) {
        box.style.border = '1px solid #864AF9';
        const circleOuter = box.querySelector('.circle-outer');
        const circleInner = box.querySelector('.circle-inner');
        if (circleOuter) circleOuter.style.border = '3px solid #864AF9';
        if (circleInner) circleInner.style.backgroundColor = '#864AF9';
      } else {
        box.style.border = '1px solid #88888877';
        const circleOuter = box.querySelector('.circle-outer');
        const circleInner = box.querySelector('.circle-inner');
        if (circleOuter) circleOuter.style.border = '3px solid #D9D9D9';
        if (circleInner) circleInner.style.backgroundColor = '#D9D9D9';
      }
    });
  };

  // Color picker logic
  useEffect(() => {
    const colorPicker1 = document.getElementById('colorPicker1');
    const colorPicker2 = document.getElementById('colorPicker2');
    const colortext1 = document.getElementById('colortext1');
    const colortext2 = document.getElementById('colortext2');
    const colorBox1 = document.getElementById('color1');
    const colorBox2 = document.getElementById('color2');
    const previewBackground = document.getElementById('previewBackground');
    const previewText = document.getElementById('previewText');
    const tiktokSpans = document.querySelectorAll('.text-wrapper2-span');

    const setDefaultColors = () => {
      const fontColor = dimensionStyles[resolution].fontColor;
      const bgColor = dimensionStyles[resolution].bgColor;

      colorPicker1.value = fontColor;
      colortext1.value = fontColor;
      colorBox1.style.backgroundColor = fontColor;
      previewText.style.color = fontColor;
      tiktokSpans.forEach((span) => (span.style.color = fontColor));

      colorPicker2.value = bgColor;
      colortext2.value = bgColor;
      colorBox2.style.backgroundColor = bgColor;
      previewBackground.style.backgroundColor = bgColor;
      tiktokSpans.forEach((span) => (span.style.backgroundColor = bgColor));
    };

    setDefaultColors();

    const handleColor1Change = (e) => {
      const color = e.target.value;
      if (isValidHex(color)) {
        setDimensionStyles((prev) => ({
          ...prev,
          [resolution]: { ...prev[resolution], fontColor: color },
        }));
        colortext1.value = color;
        colorBox1.style.backgroundColor = color;
        previewText.style.color = color;
        tiktokSpans.forEach((span) => (span.style.color = color));
      }
    };

    const handleColor2Change = (e) => {
      const color = e.target.value;
      if (isValidHex(color)) {
        setDimensionStyles((prev) => ({
          ...prev,
          [resolution]: { ...prev[resolution], bgColor: color },
        }));
        colortext2.value = color;
        colorBox2.style.backgroundColor = color;
        previewBackground.style.backgroundColor = color;
        tiktokSpans.forEach((span) => (span.style.backgroundColor = color));
      }
    };

    colorPicker1.addEventListener('input', handleColor1Change);
    colorPicker2.addEventListener('input', handleColor2Change);
    colortext1.addEventListener('input', handleColor1Change);
    colortext2.addEventListener('input', handleColor2Change);

    return () => {
      colorPicker1.removeEventListener('input', handleColor1Change);
      colorPicker2.removeEventListener('input', handleColor2Change);
      colortext1.removeEventListener('input', handleColor1Change);
      colortext2.removeEventListener('input', handleColor2Change);
    };
  }, [resolution, dimensionStyles]);

  const handleFontSizeChange = (e) => {
    const value = e.target.value;
    setFontSize(value);
    setFontSizeDerived(value * 2);
    const slider = document.getElementById('mySlider');
    const sliderValue = document.getElementById('SliderValue');
    const previewText = document.getElementById('previewText');
    if (slider && sliderValue && previewText) {
      sliderValue.textContent = value;
      previewText.style.fontSize = `${value * 0.8}px`;
      updateSliderBackground('mySlider', value, 0, 25);
      document.getElementById('recommended-font-size').textContent = `(Recommended Font Size: ${value})`;
    }
  };

  const handleBorderRadiusChange = (e) => {
    const value = e.target.value;
    setBorderRadius(value);
    const borderRadiusSlider = document.getElementById('subtitleBorderRadiusSlider');
    const previewBackground = document.getElementById('previewBackground');
    const subtitleBorderRadiusValue = document.getElementById('subtitleBorderRadiusValue');
    if (borderRadiusSlider && previewBackground && subtitleBorderRadiusValue) {
      subtitleBorderRadiusValue.textContent = value;
      previewBackground.style.borderRadius = `${value}px`;
      updateSliderBackground('subtitleBorderRadiusSlider', value, 0, 50);
    }
  };

  const handleResolutionChange = (newResolution) => {
    setResolution(newResolution);
    updateResolutionSettings(newResolution);
  };

  return (
    <div className="main-dimension-div">
      <form action="/text/" method="post" encType="multipart/form-data" className="form" id="text_form">
        <input type="hidden" name="csrfmiddlewaretoken" />
        <div className="customise-main">
          <span>Create Your Perfect Video Creative: <br /> Upload, Customize, and Convert!</span>
        </div>
        <div className="card-text"><h3>Tutorial Video:</h3></div>
        <div className="video-card">
          <div className="video-card-sub-div">
            <div id="videoPreviewContainer" className="videoPreviewContainer"></div>
          </div>
        </div>
        <div className="pick-dimension">Pick Your Dimensions</div>
        <div className="options video-sizes video-sizes-div">
          <div className="box" data-resolution="1:1" onClick={() => handleResolutionChange('1:1')}>
            <input type="radio" name="resolution" value="1:1" defaultChecked hidden />
            <div className="below-input">
              <div className="square">Square</div>
              <div className="square-border"></div>
              <div className="text one-one">1:1</div>
              <div className="circle-outer"><div className="circle-inner"></div></div>
            </div>
          </div>
          <div className="box tiktok-box" data-resolution="4:5" onClick={() => handleResolutionChange('4:5')}>
            <input type="radio" name="resolution" value="4:5" hidden />
            <div className="tiktok-box-sub">
              <div className="vertical-portrait">Vertical/Portrait</div>
              <div className="sub-vertical"></div>
              <div className="text four-five">4:5</div>
              <div className="circle-outer tiktok-circle"><div className="circle-inner tiktok-inner"></div></div>
            </div>
          </div>
          <div className="box youtube-main" data-resolution="16:9" onClick={() => handleResolutionChange('16:9')}>
            <input type="radio" name="resolution" value="16:9" hidden />
            <div className="youtube-sub">
              <div className="youtube-text">YouTube</div>
              <div className="youtube-border"></div>
              <div className="text sixteen-nine">16:9</div>
              <div className="circle-outer youtube-outer"><div className="circle-inner youtube-inner"></div></div>
            </div>
          </div>
          <div className="box nine-sixteen-main" data-resolution="9:16" onClick={() => handleResolutionChange('9:16')}>
            <input type="radio" name="resolution" value="9:16" hidden />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="tiktok-heading">TikTok/Reels</div>
              <div className="tiktok-border"></div>
              <div className="text nine-sixteen-text">9:16</div>
              <div className="circle-outer tiktok-circle2"><div className="circle-inner tiktok-circle3"></div></div>
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
              <input id="api_key" type="text" className="text3 text3-input" name="elevenlabs_apikey" placeholder="ElevenLabs Api Key" />
              <p id="api_key_error" className="error-message" style={{ color: 'red', fontSize:'16px' }}>{apiKeyError}</p>
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
              <p id="voice_id_error" className="error-message" style={{ color: 'red', fontSize:'16px' }}>{voiceIdError}</p>
            </div>
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
            <p id="font_error" className="error-message" style={{ color: 'red', marginTop: '-20px' ,fontSize:'16px'}}>{fontError}</p>
            <div className="Font-Color-text"><div className="font-color">Font Color:</div></div>
            <div className="Font-Color-textarea">
              <div id="color1"><input type="color" name="font_color" id="colorPicker1" defaultValue="#ffffff" /></div>
              <input id="colortext1" type="text" className="focusdefault" placeholder="#ffffff" defaultValue="#ffffff" />
            </div>
            <div className="Subtitle-text"><div className="Subtitle-text-heading">Subtitles Background Color:</div></div>
            <div className="Subtitle-textarea">
              <div id="color2"><input type="color" name="subtitle_box_color" id="colorPicker2" defaultValue="#000000" /></div>
              <input id="colortext2" type="text" className="focusdefault" placeholder="#000000" defaultValue="#000000" />
            </div>
            <div className="Font-Size-text">
              <div className="Font-Size-text-heading">Font Size: <span id="recommended-font-size">(Recommended Font Size: 22)</span></div>
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
                value={fontSizeDerived}
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
        </div>
        <br /><br />
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
        <Link href='/scene' style={{ textDecoration: 'none' }}>
          <button id="submit_form" type="submit" className="done-button" onClick={handleSubmit}>
            <span id="button-text" style={{ fontSize: '18px', fontWeight: '500', lineHeight: '21.94px', textAlign: 'left' }}>
              {isProcessing ? `Processing${'.'.repeat(processingDots)}` : 'Proceed To Scene Selection'}
            </span>
          </button>
        </Link>
      </form>
    </div>
  );
};

export default MainContent;