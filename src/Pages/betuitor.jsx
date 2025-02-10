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

function BecomeTuitor() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [myuser, setMYUsers] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [closetuitorlogin, setClosetuitorLogin] = useState(true);
  const [opentuitorinitialmodal, setopentuitorinitialmodal] = useState(false);
  const navigate = useNavigate(); // React Router hook for navigation

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

  // useEffect hook to update user purpose if needed
  useEffect(() => {
    if (user?.uid && myuser?.purpose !== 'teacher') {
      const updateUserPurpose = async () => {
        try {
          const response = await fetch(`${webApi}/api/update-purpose`, {
            method: 'POST',  // PUT request to update user
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid: myuser.uid, purpose: 'teacher' }),  // Update purpose to 'teacher'
          });

          const result = await response.json();
          if (result.success) {
            console.log("User purpose updated to teacher.");
            setMYUsers((prev) => ({ ...prev, purpose: 'teacher' }));  // Update local state
          } else {
            console.warn("Failed to update user purpose:", result);
          }
        } catch (error) {
          console.error("Error updating user purpose:", error);
        }
      };

      updateUserPurpose();  // Call the function inside the useEffect
    }
  }, [user, myuser?.purpose]);

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
