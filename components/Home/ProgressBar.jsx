// components/Home/ProgressBar.jsx
'use client';
import { usePathname } from 'next/navigation';
import '/app/temp.css';
import '/styles/style.css';
import '/styles/music.css';
import '/styles/progress.css';

const ProgressBar = () => {
  const pathname = usePathname();

  const steps = [
    { name: 'Voice & Subtitle Design', route: '/home' },
    { name: 'Scene Selection', route: '/scene' },
    { name: 'Background Music Selection', route: '/background-music' },
    { name: 'Download', route: '/download-scene' },
  ];

  const currentStepIndex = steps.findIndex((step) =>
    pathname === step.route || pathname.startsWith(step.route)
  );

  const getStepClass = (index) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'active';
    return '';
  };

  // Calculate progress width (0-100%)
  const progressWidth = currentStepIndex > 0 ? `${(currentStepIndex) * (100 / (steps.length - 1))}%` : '0%';


  return (
    <div className="progressbar">
      <div className="sub-div">
        {/* Progress fill line */}
        <div
          className="progress-fill"
          style={{ width: progressWidth }}
        ></div>

        {/* Progress circles */}
        <div className={`sub-div2 ${getStepClass(0)}`}></div>
        <div className={`sub-div3 ${getStepClass(1)}`}></div>
        <div className={`sub-div4 ${getStepClass(2)}`}></div>
        <div className={`sub-div5 ${getStepClass(3)}`}></div>

        {/* Labels */}
        <div className={`voice-subtitle ${currentStepIndex === 0 ? 'active-text' : ''}`}>
          Voice & Subtitle Design
        </div>
        <div className={`sceneselection ${currentStepIndex === 1 ? 'active-text' : ''}`}>
          Scene Selection
        </div>
        <div className={`bgmselection ${currentStepIndex === 2 ? 'active-text' : ''}`}>
          Background Music Selection
        </div>
        <div className={`download ${currentStepIndex === 3 ? 'active-text' : ''}`}>
          Download
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;