import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase_config";
import TuitorLogin from "../widgets/becomeTuitor/betuitorlogin";
import BetuitotBanner from "../widgets/becomeTuitor/banner";
import BetuitotContent from "../widgets/becomeTuitor/betuitorcontent";

function BecomeTuitor() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [closetuitorlogin, setClosetuitorLogin] = useState(true); // Initially true to show the login modal

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
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
    return <div>Loading...</div>; // Replace with a spinner or skeleton if needed
  }

  return (
    <>
      {/* Show TuitorLogin if not authenticated and closetuitorlogin is true */}
      {!isAuthenticated && closetuitorlogin && (
        <TuitorLogin close={() => setClosetuitorLogin(false)} />
      )}

      {/* Always show BetuitotBanner and BetuitotContent */}
      <BetuitotBanner />
      <BetuitotContent />
    </>
  );
}

export default BecomeTuitor;
