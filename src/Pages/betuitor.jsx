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
import { useNavigate } from "react-router-dom";
import { FaUsersGear } from "react-icons/fa6";
import DemoVacancy from "../widgets/becomeTuitor/demovacancies";

function BecomeTuitor() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [myuser, setMYUsers] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [closetuitorlogin, setClosetuitorLogin] = useState(false);
  const [opentuitorinitialmodal, setopentuitorinitialmodal] = useState(false);
  const navigate = useNavigate(); // React Router hook for navigation

  // Function to fetch user data and update purpose if necessary
  const fetchUserData = async (uid) => {
    if (!uid) return;
    try {
      const response = await fetch(`${webApi}/api/user/${uid}`);
      const result = await response.json(); // Parse JSON
  
      console.log("Fetched User Data:", result); // Debugging
  
      if (result.success && result.data) {
        setMYUsers(result.data); // Store only the `data` part
  
        // If the user's purpose is not 'teacher', update it
        if (result.data.teacherconfirm && result.data.purpose !== 'teacher') {
          const updateResponse = await fetch(`${webApi}/api/update-purpose`, {
            method: 'POST', // POST request to update user
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid: result.data.uid, purpose: 'teacher' }),  // Update purpose to 'teacher'
          });
  
          const updateResult = await updateResponse.json();
          if (updateResult.success) {
            console.log("User purpose updated to teacher.");
            setMYUsers((prev) => ({ ...prev, purpose: 'teacher' }));  // Update local state
            
            // Reload the page after setting purpose to 'teacher'
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
