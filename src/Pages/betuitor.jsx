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
  const [myuser, setMYUsers] = useState({});

  const [closetuitorlogin, setClosetuitorLogin] = useState(true);
  const [opentuitorinitialmodal, setopentuitorinitialmodal] = useState(false);

  // Function to fetch user data
  const fetchUserData = async (uid) => {
    try {
      const response = await fetch(`${webApi}/api/user/${uid}`);
      if (!response.ok) {
        throw new Error("Error fetching user data");
      }
      const data = await response.json();
      setMYUsers(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsAuthenticated(true);
        fetchUserData(authUser.uid); // Fetch user data when authenticated
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setMYUsers(null); // Reset user data when logged out
      }
    });

    return () => unsubscribe();
  }, []);

  // Loading state
  if (isAuthenticated === null) {
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
          setopentuitorinitialmodal={() => setopentuitorinitialmodal(false)}
        />
      )}
    </>
  );
}

export default BecomeTuitor;
