import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/reviewanimation.json'; // Your Lottie JSON file
import '../../css/betuitor.css';
import heroimg from '../../assets/hero.png';
import { Link, useNavigate } from 'react-router-dom';
import { TbDashboardFilled } from "react-icons/tb";
import { RiUserCommunityLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { FaGear, FaUserGear } from "react-icons/fa6";

function BetuitotBanner({ setopentuitorinitialmodal, user, tuitorlogin }) {
  const [isTuitors, setIsTuitors] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage popup visibility

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
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
           <Link to={'/teacherscommunity'} > <RiUserCommunityLine style={{color:"#0099ff"}} size={100} />
           <p style={{margin:"0px", fontSize:"20px"}}>Vacancies for You</p></Link>
            
            </div>
            <div className="visitdashboard">
      <div className='visitdashboardcontents' onClick={openModal}>
        <TbDashboardFilled style={{ color: "#0099ff" }} size={100} />
        <p style={{ margin: "0px", fontSize: "20px" }}>Go to Dashboard</p>
      </div>
         </div>
         <div className="visitdashboard">
         <Link to="/addclasses">
                <div className='visitdashboardcontents'>
                 
                  <SiGoogleclassroom style={{color:"#0099ff"}} size={100} />
                  <p style={{margin:"0px", fontSize:"20px"}}>Add Online <br/> Classes</p>
                
                </div>
                </Link>
         </div>
         <div className="visitdashboard">
         <Link to="/profile">
                <div className='visitdashboardcontents'>
                 
                  <FaUserGear style={{color:"#0099ff"}} size={100} />
                  <p style={{margin:"0px", fontSize:"20px"}}>Profile</p>
                
                </div>
                </Link>
         </div>
               </div>
              </div>
            ): (
              <div className="bannertext">
                <h3>Be A Tutor With KUBE</h3>
                <p style={{ margin: '0px' }}>Offer your knowledge</p>
                <div className="getstartedbetuitorButton">
                  <div className="getstartedbetuitor">
                  {user? (  <button onClick={() => setopentuitorinitialmodal(true)}>
                      Become a Tutor
                    </button>):(  <button onClick={tuitorlogin}>
                      Become a Tutor
                    </button>)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <h2>Dashboard is not available right now</h2>
            <p>We apologize for the inconvenience. The dashboard will be available soon.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}


export default BetuitotBanner;
