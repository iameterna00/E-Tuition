import '../../css/profile.css';
import { getAuth } from "firebase/auth"; 
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from '../../services/Redux/userSlice';
import { FaUser } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { LuTarget } from "react-icons/lu";
import { FaIdBadge } from "react-icons/fa";
import review from '../../assets/review.png'
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import StudentForm from './studentidentityform';
import { webApi } from '../../api';
import { TiTick } from "react-icons/ti";
import { IoMdSchool } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { RiNotification2Fill, RiNotificationOffFill } from 'react-icons/ri';
import { delete_fmcToken, generateToken } from '../../firebase_config';

function StudentProfile() {
    const dispatch = useDispatch();
    const myuser = useSelector(selectUser);
    const [purposemodal, setpurposemodal] = useState('')
    const [purpose, setpurpose ] = useState('')
    const [loading, setLoading] = useState(false); 
    const [suggestions, setsuggestions] = useState(false); 
    const navigate = useNavigate();
    const [notificationStatus, setNotificationStatus] = useState("");


    useEffect(() => {
        const authInstance = getAuth();
        const unsubscribe = authInstance.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                dispatch(fetchUser(firebaseUser.uid));
                setpurpose(myuser.purpose)
            }
        });

        return () => unsubscribe(); // Cleanup the subscription on unmount
    }, [dispatch]);

    const openpurposemodal = (type) => {
        setpurposemodal(type);
        document.body.classList.add('modal-open');
    };

    const closepurposemodal = (type) => {
        setpurposemodal(type);
        document.body.classList.remove('modal-open');
    };

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        const date = new Date(dateString); // Convert string to Date object
        return date.toLocaleDateString("en-GB", options);
    };
    useEffect(() => {
        // Check notification permission status on load
        const checkNotificationPermission = () => {
          if (Notification.permission === 'granted') {
            setNotificationStatus('enabled');
          } else if (Notification.permission === 'denied') {
            setNotificationStatus('blocked');
          } else if (myuser.fcm_token==='') {
            setNotificationStatus('off'); // Or 'loading' if you want to show a loading state
          }
        };
    console.log(notificationStatus);
        checkNotificationPermission();
      }, []);


     const handleUserType = async (purpose) => {
           setpurpose(purpose); 
      };

      const updateUserType = async (purpose) => {
        setLoading(true);
        try {
          const response = await fetch(`${webApi}/api/update-purpose`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uid: myuser.uid, 
              purpose,
            }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            alert(`Your purpose has been updated to "${purpose}"!`);
          } else {
            alert(data.message || "Failed to update purpose.");
          }
        } catch (error) {
          console.error("Error updating purpose:", error);
          alert("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
            closepurposemodal('teacher')
            if(purpose === 'teacher'){
                navigate('/tutorhome')
            }else{
                navigate('/')
            }
       
        }
      };

      const deletefmctoken = async () => {
        if (!myuser) return;
      
        try {
          setNotificationStatus('disabling');
          await delete_fmcToken(); 
          setNotificationStatus('off');
        } catch (err) {
          console.error("Failed to delete FCM token:", err);
          setNotificationStatus('error'); 
        }
      };
      
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
      

    const calculatePersonalizationPercentage = () => {
        let filledFields = 0;
    
        // Check if the purpose is filled (this contributes 50%)
        if (myuser.purpose) filledFields += 1;
    
        if (myuser.subjects) filledFields += 1;
        if (myuser.address) filledFields += 1;
        if (myuser.phone) filledFields += 1;
        if (myuser.currentGrade) filledFields += 1;
    
        // Calculate percentage: 50% for purpose, 50% for the other fields
        const purposePercentage = myuser.purpose ? 50 : 0;
        const remainingFieldsPercentage = (filledFields - (myuser.purpose ? 1 : 0)) * 12.5; 
    
        const totalPercentage = purposePercentage + remainingFieldsPercentage;
        return totalPercentage;
    };
    useEffect(() => {
        if (myuser) {
            const totalPercentage = calculatePersonalizationPercentage();
    
            if (totalPercentage !== 100) {
                setsuggestions(true);
            }
        }
    }, [myuser]);  // Only run when `myuser` changes
    
    
    // Render loading or fallback UI if myuser is not yet loaded
    if (!myuser) {
        return (
            <div className="studentprofilepage">
                <p>Loading profile...</p>
            </div>
        );
    }

    const personalizationPercentage = calculatePersonalizationPercentage();

    return (
        <div className="studentprofilepage">
            <div className="studentprofilecontainer">
                <div className="profiledetailscontainer">
                    <div className="profiledetails">
                        <img src={myuser.profile} className="profilepicture" alt="Profile" />
                        <h2 style={{ margin: '0px' }}>{myuser.name}</h2>
                        <p>@{myuser.username}</p>
                    </div>
                    <div className="seperator" style={{ border: "1px solid rgb(74, 74, 74)", margin: "30px" }}></div>
                    <div className="joineddate">
                        <FaUser /> <p>Joined in {formatDate(myuser.joined_date)}</p>
                    </div>
                   {myuser.currentGrade &&(
                     <div className="joineddate">
                     <IoMdSchool /> <p>{myuser.currentGrade}</p>
                     </div>
                   )}
                   
                </div>

                <div className="profileedits">
                  {suggestions &&(
                      <div className="suggestions">
                      <div className="suggestioninsides">
                          <IoInformationCircle fontSize={25} style={{ margin: '4px' }} />
                          <p>
  To get the best out of KUBE, please complete your profile,<br />
  <span 
    onClick={() => openpurposemodal('identity')} 
    style={{ cursor: 'pointer', textDecoration: 'underline' }}
  >
    click here to complete your profile!
  </span>
</p>

                      </div>
                      <div className="closesuggestions" onClick={()=>setsuggestions(false)} >X</div>
                  </div>
                  )}
                    <div className="profileeditcontainer">
                       {myuser.purpose === 'teacher'?( <h2>Hi👋 Let's help Students get to know you</h2>):( <h2>Hi👋 Let's help tutors get to know you</h2>)}
                        <p style={{marginTop:'-10px'}}>Get the most out of Kube by sharing a bit more about yourself and your preferences for finding the best tutors.</p>
                        <div className="completeyourprofile">
                            <div className="profilechecklist">
                             <h2 style={{marginBottom:'0px'}}>Personalization</h2> <p>{personalizationPercentage}% Complete</p>
                             <div className="personalizationbar">
                                <div 
                                  className="personalizationpercentage"
                                  style={{ width: `${personalizationPercentage}%` }}
                                ></div>
                             </div>
                            </div>
                            <div className="yourpurposeonkube" onClick={() => openpurposemodal('purpose')}>
                                <div className="iconcontainer">
                                    <LuTarget />
                                </div>
                                <div className="purposeonkubeinsiders">
                                    <h3>Share how you want to use kube</h3>
                                    <p>Tell us if you're here to learn or share your knowledge</p>
                                </div>
                               {myuser.purpose ? (<TiTick className='purposebutton' fontSize={30}/>):(
                                 <h3 className='purposebutton'>Add</h3>
                               )}
                            </div>
                            <div className="yourpurposeonkube" onClick={() => openpurposemodal('identity')}>
                                <div className="iconcontainer">
                                    <FaIdBadge />
                                </div>
                                <div className="purposeonkubeinsiders">
                                    <h3>Share more about yourself</h3>
                                    <p>A detailed profile helps you achieve your purpose on Kube!</p>
                                </div>
                                {myuser.address && myuser.subjects && myuser.phone && myuser.currentGrade  ? (<TiTick className='purposebutton' fontSize={30}/>):(
                                 <h3 className='purposebutton'>Add</h3>
                               )}
                            </div>
                            <div className="yourpurposeonkube" onClick={() => openpurposemodal('notification')}>
  <div className="iconcontainer">
    <RiNotification2Fill />
  </div>

  <div className="purposeonkubeinsiders">
    <h3>Allow Notification</h3>
    <p>Turn on notification to get instant alerts</p>
  </div>

  {notificationStatus === "loading" && (
    <h3 className="purposebutton">Enabling...</h3>
  )}
    {notificationStatus === "disabling" && (
    <h3 className="purposebutton">disabling...</h3>
  )}

{(notificationStatus !== "off" && (notificationStatus === "madeenabled" || !!myuser?.fcm_token)) && (
  <TiTick className="purposebutton" fontSize={30} />
)}




{notificationStatus === "blocked" && (
  <p style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}>
   blocked.
  </p>
)}


  {notificationStatus === "error" && (
    <h3 className="purposebutton" style={{ color: "orange" }}>
      Error
    </h3>
  )}

{(!myuser.fcm_token || notificationStatus === 'loading' || notificationStatus === 'off') && (
  <h3 className="purposebutton">Off</h3>
)}

</div>

                        </div>
                        <div className="reviewsfromteachers">
                            <div className="reviewfromteacherinsiders">
                                <h3>Reviews</h3>
                            </div>
                            <img className='reviewimage' src={review} alt="" />
                            <div className="reviewinsiders">
                                <p>{myuser.name} does not have any review yet.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {purposemodal === 'purpose' && (
                <div className="modal-backdrop" onClick={() => closepurposemodal('')}>
                    <div className="purposemodal" onClick={(e) => e.stopPropagation()}>
                        <div className="close-modal" onClick={() => closepurposemodal('')}>X</div>
                        <h2>What's your purpose on Kube?</h2>
                        <div className="purpose-options">
                            <div style={{border: purpose === 'student'? '1px solid #0099ffca':'transparent'}} className="option" onClick={() => handleUserType("student")}>
                                <PiStudentFill fontSize={40} />
                                <h3>Student</h3>
                                <p>I'm looking for a tutor to learn with.</p>
                            </div>
                            <div style={{border: purpose === 'teacher'? '1px solid #0099ffca':'transparent'}}  className="option" onClick={() => handleUserType("teacher")}>
                                <FaChalkboardTeacher fontSize={40} />
                                <h3>Teacher</h3>
                                <p>I'd like to share my knowledge.</p>
                            </div>
                        </div>
                        <button className='confirmpurposebutton' onClick={() => updateUserType(purpose)}>  {loading ? (
                    <div className="spinner"></div> // Loading spinner
                  ) : (
                   "Confirm"
                  )}</button>
                    </div>
                </div>
            )}
           {purposemodal === 'notification' && (
  <div className="modal-backdrop" onClick={() => closepurposemodal('')}>
    <div className="purposemodal" onClick={(e) => e.stopPropagation()}>
      <div className="close-modal" onClick={() => closepurposemodal('')}>X</div>
      <h2 style={{marginBottom:'0px'}}>Enable Notification?</h2>
      {myuser.purpose === 'student' ? (
        <p style={{marginTop:'0px'}}>Sends notification for class updates</p>
      ) : (
        <p style={{marginTop:'0px'}}>Sends notification for Vacancy updates, Classes etc.</p>
      )}
      <div className="purpose-options">
        <div
          style={{
            border: (notificationStatus !== 'off' && (myuser.fcm_token || notificationStatus === 'madeenabled')) ? '1px solid #0099ffca' : 'transparent',
            cursor: 'pointer'
          }}
          className="option"
          onClick={() => {handleEnableNotifications(); closepurposemodal('')}}
        >
          <RiNotification2Fill fontSize={40} />
          <h3>Enable</h3>
          <p>I'd like to get notification..</p>
        </div>
        <div
          style={{
            border: (!myuser.fcm_token || notificationStatus === 'off') 
            ? '1px solid #0099ffca' 
            : 'transparent',
          
            cursor: 'pointer'
          }}
          className="option"
          onClick={() =>{ deletefmctoken(); closepurposemodal('')}}
        >
          <RiNotificationOffFill fontSize={40} />
          <h3>Disable</h3>
          <p>I'd like to disable notification.</p>
        </div>
      </div>
    </div>
  </div>
)}

            {purposemodal === 'identity' && (
                <div className="modal-backdrop" onClick={() => closepurposemodal('')}>
                    <div className="identitymodal" onClick={(e) => e.stopPropagation()}>
                        <div className="close-modal" onClick={() => closepurposemodal('')}>X</div>
                        <h2>Share a bit about yourself</h2>
                        <div className="modal-contentstudentform">
                            <StudentForm close={()=>closepurposemodal('')} studentdetails={myuser} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StudentProfile;
