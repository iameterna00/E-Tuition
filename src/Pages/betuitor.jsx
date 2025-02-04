import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase_config";
import TuitorLogin from "../widgets/login/betuitorlogin";
import BetuitotBanner from "../widgets/becomeTuitor/banner";
import BetuitotContent from "../widgets/becomeTuitor/betuitorcontent";
import "../css/login.css";
import "../css/tuitorapply.css"
import TeachingExperience from "../widgets/becomeTuitor/tuitorexperience";

function BecomeTuitor() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUsers] = useState(null);
  const [closetuitorlogin, setClosetuitorLogin] = useState(true); 
  const [opentuitorinitialmodal, setopentuitorinitialmodal] = useState(false); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsers(user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Loading state
  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      {/* Show TuitorLogin if not authenticated and closetuitorlogin is true */}
      {!isAuthenticated && closetuitorlogin && (
        <TuitorLogin close={() => setClosetuitorLogin(false)} />
      )}

      {/* Always show BetuitotBanner and BetuitotContent */}
      <BetuitotBanner setopentuitorinitialmodal={setopentuitorinitialmodal} />
      <BetuitotContent />
      {opentuitorinitialmodal && (
        <TeachingExperience user={user}
         setopentuitorinitialmodal={()=>setopentuitorinitialmodal(false)}/>
      )}
    </>
  );
}

export default BecomeTuitor;
