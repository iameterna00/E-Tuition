import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/reviewanimation.json'; // Your Lottie JSON file
import '../../css/betuitor.css';
import heroimg from '../../assets/hero.png';
import { Link, useNavigate } from 'react-router-dom';
import { TbDashboardFilled } from "react-icons/tb";
import { RiUserCommunityLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { FaUserGear } from "react-icons/fa6";

function BetuitotBanner({ setopentuitorinitialmodal, user, tuitorlogin }) {
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
              <div className="bannerbuttons">
                <h3 style={{fontSize:"25px"}}>🎉 You are now a Verified Tutor!</h3>
                <p style={{ margin: '0px', fontSize:"20px" }}>Start teaching and earning today.</p>
               <div className="bannerbutton" >
            <div className="visitteachercommunity">
           <Link> <RiUserCommunityLine style={{color:"#0099ff"}} size={100} />
           <p style={{margin:"0px", fontSize:"20px"}}>Join our tutors community</p></Link>
            
            </div>
                <div className='visitdashboard'>
                  <Link to="/profile">
                  <TbDashboardFilled style={{color:"#0099ff"}} size={100} />
                  <p style={{margin:"0px", fontSize:"20px"}}>Go to Dashboard</p>
                  </Link>
                </div>
                <div className='visitdashboard'>
                  <Link to="/dashboard">
                  <SiGoogleclassroom  style={{color:"#0099ff"}} size={100} />
                  <p style={{margin:"0px", fontSize:"20px"}}>Start Making Courses</p>
                  </Link>
                </div>
                <div className='visitdashboard'>
                  <Link to="/dashboard">
                  <FaUserGear  style={{color:"#0099ff"}} size={100} />
                  <p style={{margin:"0px", fontSize:"20px"}}>Settings</p>
                  </Link>
                </div>
               </div>
              </div>
            ): (
              <div className="bannertext">
                <h3>Be A Tuitor With KUBE</h3>
                <p style={{ margin: '0px' }}>Offer your knowledge</p>
                <div className="getstartedbetuitorButton">
                  <div className="getstartedbetuitor">
                  {user? (  <button onClick={() => setopentuitorinitialmodal(true)}>
                      Become a Tuitor
                    </button>):(  <button onClick={tuitorlogin}>
                      Become a Tuitor
                    </button>)}
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
