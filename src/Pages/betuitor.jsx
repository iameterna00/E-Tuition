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

function BecomeTuitor() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [myuser, setMYUsers] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [closetuitorlogin, setClosetuitorLogin] = useState(true);
  const [opentuitorinitialmodal, setopentuitorinitialmodal] = useState(false);

  // Function to fetch user data
  const fetchUserData = async (uid) => {
    if (!uid) return;
    try {
      const response = await fetch(`${webApi}/api/user/${uid}`);
      const result = await response.json(); // Parse JSON
      
      console.log("Fetched User Data:", result); // Debugging
  
      if (result.success && result.data) {
        setMYUsers(result.data); // Store only the `data` part
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
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setMYUsers(null);
        setIsUserLoaded(true); // Ensure loading state updates when logged out
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      setIsUserLoaded(false);
      fetchUserData(user.uid);
    }
  }, [user]);

  // **Show loading until authentication & user data are fully loaded**
  if (isAuthenticated === null || !isUserLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!isAuthenticated && closetuitorlogin && (
        <TuitorLogin close={() => setClosetuitorLogin(false)} />
      )}

      <BetuitotBanner 
        setopentuitorinitialmodal={setopentuitorinitialmodal} 
        user={myuser}
      />
      <BetuitotContent />

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
