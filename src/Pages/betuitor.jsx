import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase_config";
import TuitorLogin from "../widgets/login/betuitorlogin";
import BetuitotBanner from "../widgets/becomeTuitor/banner";
import BetuitotContent from "../widgets/becomeTuitor/betuitorcontent";
import "../css/login.css";
import "../css/tuitorapply.css";
import TeachingExperience from "../widgets/becomeTuitor/tuitorexperience";
import { webApi } from "../api";
import { FaUsersGear } from "react-icons/fa6";
import DemoVacancy from "../widgets/becomeTuitor/demovacancies";
import { generateToken } from '../firebase_config';
import { RiNotification2Fill, RiNotificationOffFill } from "react-icons/ri";


function BecomeTuitor() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [myuser, setMYUsers] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [closetuitorlogin, setClosetuitorLogin] = useState(false);
  const [opentuitorinitialmodal, setopentuitorinitialmodal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState("");
  const [suggestions, setsuggestions] = useState(true); 


  const fetchUserData = async (uid) => {
    if (!uid) return;
    try {
      const response = await fetch(`${webApi}/api/user/${uid}`);
      const result = await response.json(); 
  
      console.log("Fetched User Data:", result);
  
      if (result.success && result.data) {
        setMYUsers(result.data); 
  
        if (result.data.teacherconfirm && result.data.purpose !== 'teacher') {
          const updateResponse = await fetch(`${webApi}/api/update-purpose`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid: result.data.uid, purpose: 'teacher' }), 
          });
  
          const updateResult = await updateResponse.json();
          if (updateResult.success) {
            console.log("User purpose updated to teacher.");
            setMYUsers((prev) => ({ ...prev, purpose: 'teacher' }));  
            
            window.location.reload();
          } else {
            console.warn("Failed to update user purpose:", updateResult);
            window.location.reload();
          }
        }
      } else {
        console.warn("Unexpected API response structure:", result);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsUserLoaded(true);
     
    }
  };
  useEffect(() => {
    const checkNotificationPermission = () => {
      if (Notification.permission === 'granted') {
        setNotificationStatus('enabled');
      } else if (Notification.permission === 'denied') {
        setNotificationStatus('blocked');
      } else if ( myuser && myuser.fcm_token==='') {
        setNotificationStatus('off'); // Or 'loading' if you want to show a loading state
      }
    };
console.log(notificationStatus);
    checkNotificationPermission();
  }, []);


  const handleEnableNotifications = async () => {        
    if (!myuser) return;
    
    try {
      setNotificationStatus("loading");
      
      if (Notification.permission === 'granted') {
        const token = await generateToken();
        if (token) {
          setNotificationStatus("madeenabled");
        } else {
          console.log("Token generation failed or returned empty");
          setNotificationStatus("error");
        }
      } else if (Notification.permission === 'denied') {
        console.log("Notification permission is denied. Please enable notifications manually in browser settings.");
        setNotificationStatus("error");
        alert("Notifications are disabled. Please enable notifications in your browser settings.");
      } else {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          const token = await generateToken();
          if (token) {
            setNotificationStatus("enabled");
          } else {
            console.log("Token generation failed or returned empty");
            setNotificationStatus("error");
          }
        } else {
          console.log("Notification permission denied.");
          setNotificationStatus("error");
          alert("Notifications permission was denied. Please enable notifications in your browser settings.");
        }
      }
    } catch (error) {
      console.error("Failed to enable notifications:", error);
      setNotificationStatus("error");
    }
  };
  

  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsAuthenticated(true);
        fetchUserData(authUser.uid); // Fetch user data immediately
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setMYUsers(null);
        setIsUserLoaded(true); // Ensure loading state updates when logged out
      }
    });

    return () => unsubscribe();
  }, []);

  // Show loading until authentication & user data are fully loaded
  if (isAuthenticated === null || !isUserLoaded) {
    return <div className="loading-modal">
       <div className="switchinganimationcontainer">
       <div className="loading-animation">
        <FaUsersGear style={{marginLeft:"-20px", fontSize:"100px"}} />
        </div>
        <p>Loading, please wait...</p>
       </div>
      </div>;
  }

  return (
    <>
      {closetuitorlogin && (
        <TuitorLogin close={() => setClosetuitorLogin(false)} />
      )}

      <BetuitotBanner 
      setsuggestions={setsuggestions}
        setNotificationModal={setNotificationModal}
        suggestions={suggestions}
        setopentuitorinitialmodal={setopentuitorinitialmodal} 
        user={myuser}
        tuitorlogin={()=>setClosetuitorLogin(true)}
      />
      <BetuitotContent />
     {!isAuthenticated && (
       <DemoVacancy  login={()=>setClosetuitorLogin(true)}/>
     )}

      {opentuitorinitialmodal && (
        <TeachingExperience 
          user={user} 
          setopentuitorinitialmodal={setopentuitorinitialmodal}
        />
      )}
      
    </>
  );
}

export default BecomeTuitor;
