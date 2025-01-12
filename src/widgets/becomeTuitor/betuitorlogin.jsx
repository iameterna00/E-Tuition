import React from "react";
import { IoMail } from "react-icons/io5";
import joinus from "../../assets/Joinus.png";
import google from "../../assets/google.png";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function TuitorLogin({ close }) {
  const auth = getAuth();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in with Google:", user);
      // Optionally, you can close the login modal after successful login
      close();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="tuitorlogincontainer">
      <div className="tuitorlogincontents">
        <div className="closebutton" onClick={close}>
          X
        </div>
        <div className="tuitorgraphics">
          <img className="tuitorgraphicsimg" src={joinus} alt="" />
        </div>
        <div className="tuitorloginform">
          <h2>
            Welcome! Create Your
            <br /> E-Tuitor Account
          </h2>
          <div className="loginmethods">
            <div className="continuewithgoogle" onClick={handleGoogleLogin}>
              <img className="continuewithgoogleimg" src={google} alt="" />
              <p>Continue with Google</p>
            </div>
            <div className="seprator">or</div>
            <div className="continuewithemail">
              <IoMail /> Continue with Email
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TuitorLogin;
