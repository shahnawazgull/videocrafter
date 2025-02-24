import { useEffect } from 'react';
import '/app/temp.css';
import '/styles/style.css';
import '/styles/music.css';
import Link from 'next/link';
const Header = () => {
  useEffect(() => {
    const pfp = document.getElementById('pfp');
    const dropdown = document.getElementById('pfpdropdown');

    if (pfp && dropdown) {
      pfp.addEventListener('click', function () {
        dropdown.classList.toggle('not-present');
        dropdown.classList.toggle('present');
      });

      document.addEventListener('click', function (event) {
        if (!dropdown.contains(event.target) && !pfp.contains(event.target)) {
          dropdown.classList.remove('present');
          dropdown.classList.add('not-present');
        }
      });
    }
  }, []);

  return (
    <header className="header">
      <div className="main-div">
        <div className="sub-main-div">
          <img src="/images/logo.svg" alt="" />
          <a href="/text" className="anchor-sub-main"></a>
        </div>
        <div className="right">
          <span className="right-span">Credits Remaining: <span id="number">9979</span></span>
          <div className="line"></div>
          <div className="img" id="pfp">
            <div className="img-sub-div">
              <div className="img-sub">
                <img src="/images/profile.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="not-present" id="pfpdropdown">
            <div className="not-present-sub">
              <span className="not-present-sub-span1">Omar</span>
              <span className="not-present-sub-span2">omar@gmail.com</span>
            </div>
            <div className="profile-main-div">
              <div className="profile-sub-div">
                <div className="dropdownText">
                  <span className="dropdownText" style={{ width: 'fit-content' }}>Credit Left</span>
                  <span className="dropdownText" style={{ width: 'fit-content', color: '#19191980' }}>9979</span>
                </div>
              </div>
              <span className="dropdownText"><Link href="/video/assets">Manage Asset Library</Link></span>
              <span className="dropdownText"><Link href="/text/manage_textfile">Manage Video Drafts</Link></span>
              <span className="dropdownText"><Link href="/accounts/manage-subscription">Manage Subscription</Link></span>
            </div>
            <div className="profile-last-div">
              <span className="dropdownText"><a href="/accounts/logout">Log Out</a></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;