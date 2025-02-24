import React, { useState, useEffect } from "react";
import { IoMail } from "react-icons/io5";
import joinus from "../../assets/onlineclasses.jpg";
import google from "../../assets/google.png";
import { getAuth, GoogleAuthProvider,fetchSignInMethodsForEmail , signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // For navigation after login
import { webApi } from "../../api";
import { FaEye, FaEyeSlash } from "react-icons/fa";



function TuitorLogin({ close }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailLogin, setEmailLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);  
  const [email, setEmail] = useState("");
  const [Otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [sendOTP, setSendOTP] = useState(false);
  const [emailerror , setemailerror] = useState(false);
  const [user, setUser] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  // Check if the user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const ActivateEmailLogin = () => {
    setEmailLogin(true);
    setSendOTP(false);
  };
  useEffect(() => {
    if(isLoggedIn){
      close();
    }
  })


  const handleGoogleLogin = async () => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(); // Initialize Firebase auth instance
  
      try {
          // Step 1: Sign in with Google
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
  
          console.log("User signed in with Google:", user);
  
          // Step 2: Get the Firebase ID token
          const idToken = await user.getIdToken(); // Get the Firebase ID token
  
          // Step 3: Send the ID token to the backend
          const response = await fetch(`${webApi}/api/create-user`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${idToken}` // Secure authorization header
              },
            
          });
  
          const responseData = await response.json();
  
          if (response.ok) {
              localStorage.setItem("token", idToken);  // Store token for future API calls
              localStorage.setItem("isAdmin", responseData.isAdmin);  // Fix: Correct variable name
              console.log("User successfully logged in:", responseData);
              setIsLoggedIn(true); // Update login state
          } else {
              console.error("Error logging in:", responseData.message);
              setIsLoggedIn(false);
          }
      } catch (error) {
          console.error("Error signing in with Google:", error);
          alert("An error occurred while signing in with Google.");
      }
  };
  



  const handleEmailSignUp = async () => { 
    if(password.length < 6){
      alert("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
  
    
    
  try {
    // Step 1: Check if email already exists in Firebase
    const auth = getAuth();
    const methods = await fetchSignInMethodsForEmail(auth, email);

    // If methods are returned, the email already exists
    if (methods.length > 0) {
      alert("Email already exists. Please try logging in.");
      setLoading(false);
      return;
    }

      // Step 1: Send OTP
      const otpResponse = await fetch(`${webApi}/api/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,  // The email address to send OTP
        }),
      });
      
  
      const otpData = await otpResponse.json();
      if (!otpResponse.ok) {
        console.error("Error sending OTP:", otpData.message);
        alert(otpData.message || "Failed to send OTP.");
        return;
      }
  
      console.log("OTP sent to email:", otpData);
      setSendOTP(true);  // Show OTP input after sending OTP
      setLoading(false);
  
    } catch (error) {
      console.error("Error during OTP send:", error);
      alert("An error occurred while sending OTP.");
      setLoading(false);
    }
  };
  
  const handleOTPVerification = async () => {
    setLoading(true);
    let user = null;
  
    try {
      // Step 2: Verify OTP
      const verifyOtpResponse = await fetch(`${webApi}/api/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: Otp,  // The entered OTP
        }),
      });
  
      const verifyOtpData = await verifyOtpResponse.json();
      if (!verifyOtpResponse.ok) {
        console.error("Error verifying OTP:", verifyOtpData.message);
        alert(verifyOtpData.message || "OTP verification failed.");
        return;
      }
  
      console.log("OTP verified:", verifyOtpData);
  
      // Step 3: Create user in Firebase Authentication after OTP verification
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user = userCredential.user;  // Get the Firebase user
      const token = await user.getIdToken();  // Get Firebase token
      const uid = user.uid;  // Firebase UID
  
      // Step 4: Create user in MongoDB
      const response = await fetch(`${webApi}/api/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          email,
          uid,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setSendOTP(false);
        console.log("User successfully created in MongoDB:", data);
        navigate("/profile");  // Navigate to the dashboard
      } else {
        alert(data.message || "Failed to create user in MongoDB.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred during sign-up. Please try again later.");
      if (user) {
        console.log("Deleting Firebase user...");
        await user.delete();  // Delete Firebase user if user exists
      }
    } finally {
      setLoading(false);
     
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
      
      if (error.code === "auth/user-not-found") {
       setemailerror(true);
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else {
        setemailerror(true);
      }
    } finally {
      setLoading(false); // End loading
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
          {!emailLogin && !isLoggedIn &&  (
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

{emailLogin && !isLoggedIn && !sendOTP &&(
 <>
  <div onClick={()=> setEmailLogin(false)} className="back-button"> Back</div>
            <div className="loginmethods">
            <h2>{isSignUp ? "Register Your Account!" : "Login With Your Email"}</h2>
            {emailerror && <p style={{ color: "red" }}>Email not found! Try signing up</p>}
    
            <div className="loginemailform">
             <div style={{ position: "relative", width: "100%" , display:"flex", justifyContent:"center", alignItems:"center"}}>
             <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: "10px" }}
                placeholder="Email"
              />
             </div>
    
              {/* Password Input with Eye Button */}
              <div style={{ position: "relative", width: "100%" , display:"flex", justifyContent:"center", alignItems:"center"}}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder= {isSignUp? "Create Password":"Password"}
                  style={{ width: "100%", padding: "10px", paddingRight: "40px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "40%",
                    color:"black",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
    
              <button
                className="LoginButton"
                onClick={isSignUp ? handleEmailSignUp : handleEmailLogin}
                disabled={loading}
              >
                {loading ? <div className="spinner"></div> : isSignUp ? "Sign Up" : "Login"}
              </button>
    
              <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <span style={{ cursor: "pointer", color:"#3498db" }} onClick={() => setIsSignUp(!isSignUp)}>
                  {isSignUp ? "Login" : "Sign Up"}
                </span>
              </p>
            </div>
          </div></>
          )}
       {sendOTP && (
<>
<div onClick={ActivateEmailLogin} className="back-button"> Back</div>
<div className="loginmethods">
    <h2>OTP sent to your email. Please check your inbox.</h2>
    <div className="loginemailform">
      <input
        type="number"
        value={Otp}  // Bind the input value to the OTP state
        onChange={(e) => setOtp(e.target.value)}  // Update OTP value
        maxLength={6}
        style={{ borderRadius: "10px" }}
        placeholder="Enter OTP"
      />
      <button className="Confirm" onClick={handleOTPVerification} disabled={loading}>
        {loading ? (
          <div className="spinner"></div> // Loading spinner
        ) : (
          isSignUp ? "Sign Up" : "Login"
        )}
      </button>
    </div>
  </div></>
)}


          

        
        </div>
      </div>
    </div>
  );
}

export default TuitorLogin;
