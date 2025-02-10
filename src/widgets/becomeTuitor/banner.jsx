import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/reviewanimation.json'; // Your Lottie JSON file
import '../../css/betuitor.css';
import heroimg from '../../assets/hero.png';
import { Link, useNavigate } from 'react-router-dom';

function BetuitotBanner({ setopentuitorinitialmodal, user }) {
  const [isTuitors, setIsTuitors] = useState('')
  console.log("User data in BetuitotBanner:", user); // Log the user data
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  useEffect(() => {
    if (user && user.teacherconfirm !== undefined) {
      setIsTuitors(user.teacherconfirm);
      console.log("This is tuitor:", user.teacherconfirm);
    } else {
      console.warn("teacherconfirm is missing in user data:", user);
    }
  }, [user]);
  
  return (
    <div className="betuitorBanner">
      <div className="betuitorfiltercontainer">
        <div className="bannerinsiders">
          <div className="bannerdiv">
            { isTuitors === 'pending' ? (
             <div style={{display:'flex', flexDirection:"column"}}>
              <div className="lottie-animation-container">
                <Lottie options={defaultOptions} height={300} width={300} />
               
              </div>
               <p style={{marginTop:"-50px"}}>We are reviewing your doccuments<br/>this could take few moments...</p></div>
            ) : isTuitors === 'approved' ? (
              // ✅ If status is "approved"
              <div className="bannertext">
                <h3>🎉 You are now a Verified Tutor!</h3>
                <p style={{ margin: '0px' }}>Start teaching and earning today.</p>
                <div className="getstartedbetuitorButton">
                  <Link to="/dashboard">
                    <button>Go to Dashboard</button>
                  </Link>
                </div>
              </div>
            ): (
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
