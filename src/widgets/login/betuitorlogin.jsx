import React, { useState, useEffect } from "react";
import { IoMail } from "react-icons/io5";
import joinus from "../../assets/onlineclasses.jpg";
import google from "../../assets/google.png";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // For navigation after login

function TuitorLogin({ close }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailLogin, setEmailLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Track whether it's sign-up or login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const auth = getAuth();
  const navigate = useNavigate();

  // Check if the user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const ActivateEmailLogin = () => {
    setEmailLogin(true);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in with Google:", user);
      setIsLoggedIn(true); // Set user as logged in
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleEmailSignUp = async () => {
    setLoading(true); // Start loading
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setIsLoggedIn(true); // Set user as logged in
      console.log("User signed up with email:", user);
    } catch (error) {
      console.error("Error signing up with email:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleEmailLogin = async () => {
    setLoading(true); // Start loading
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true); // Set user as logged in
      console.log("User logged in with email:", email);
    } catch (error) {
      console.error("Error logging in with email:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleUserType = (type) => {
    if (type === "teacher") {
     
    } else {
    
    }
  };


  return (
    <div className="tuitorlogincontainer">
      <div className="tuitorlogincontents">
        <div className="closebutton" onClick={close}>
          X
        </div>
        <div className={`tuitorgraphics ${isLoggedIn ? 'inactive' : ''}`}>
          <img className="tuitorgraphicsimg" src={joinus} alt="" />
          <div className="tuitorgraphicstext">
            <h1>Success starts Here</h1>
            <h2>
              <span className="tick">✔</span> Access to Experienced Teacher
              <br />
              <span className="indent">from All Over Nepal</span>
            </h2>
            <h2>
              <span className="tick">✔</span> Personalized Home Tuition
            </h2>
            <h2>
              <span className="tick">✔</span> Quality Education Delivered
              Online
            </h2>
          </div>
        </div>
        <div className={`tuitorloginform ${isLoggedIn ? 'active' : ''}`}>
          {!emailLogin && !isLoggedIn && (
            <div className="loginmethods">
              <h2>
                Welcome! Create Your
                <br /> E-Tuitor Account
              </h2>
              <div className="continuewithgoogle" onClick={handleGoogleLogin}>
                <img className="continuewithgoogleimg" src={google} alt="" />
                <p>Continue with Google</p>
              </div>
              <div className="seprator">or</div>
              <div className="continuewithemail" onClick={ActivateEmailLogin}>
                <IoMail /> Continue with Email
              </div>
            </div>
          )}

          {emailLogin && !isLoggedIn && (
            <div className="loginmethods">
              <h2>{isSignUp ? "Create Your Account" : "Login With Your Email"}</h2>
              <div className="loginemailform">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderRadius: "10px" }}
                  placeholder="Email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <button className="LoginButton" onClick={isSignUp ? handleEmailSignUp : handleEmailLogin} disabled={loading}>
                  {loading ? (
                    <div className="spinner"></div> // Loading spinner
                  ) : (
                    isSignUp ? "Sign Up" : "Login"
                  )}
                </button>
                <p>
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                  <span onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "Login" : "Sign Up"}
                  </span>
                </p>
              </div>
            </div>
          )}

{isLoggedIn && (
  <div className="selectYourPurpose">
    <h2>helo</h2>
    <div className="card iAmTutor" onClick={() => handleUserType("teacher")}>
      <div className="iconContainer">
        <i className="fas fa-chalkboard-teacher"></i> {/* Replace with your desired icon */}
      </div>
      <h3>I am a Tutor</h3>
    </div>
    <div className="card iAmStudent" onClick={() => handleUserType("student")}>
      <div className="iconContainer">
        <i className="fas fa-user-graduate"></i> 
      </div>
      <h3>I am a Student</h3>
    </div>
  </div>
)}
   </div>
      </div>
    </div>
  );
}

export default TuitorLogin;
