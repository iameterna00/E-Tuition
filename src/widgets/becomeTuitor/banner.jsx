import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/reviewanimation.json'; // Your Lottie JSON file
import '../../css/betuitor.css';
import heroimg from '../../assets/hero.png';
import { Link, useNavigate } from 'react-router-dom';

function BetuitotBanner({ setopentuitorinitialmodal, user }) {
  console.log("User data in BetuitotBanner:", user.teacherconfirm); // Log the user data
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="betuitorBanner">
      <div className="betuitorfiltercontainer">
        <div className="bannerinsiders">
          <div className="bannerdiv">
            {user && user.teacherconfirm === 'pending' ? (
              <div className="lottie-animation-container">
                <Lottie options={defaultOptions} height={200} width={200} />
                <p>Waiting for confirmation...</p>
              </div>
            ) : (
              <div className="bannertext">
                <h3>Be A Tuitor With KUBE</h3>
                <p style={{ margin: '0px' }}>Offer your knowledge</p>
                <div className="getstartedbetuitorButton">
                  <div className="getstartedbetuitor">
                    <button onClick={() => setopentuitorinitialmodal(true)}>
                      Become a Tuitor
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default BetuitotBanner;
