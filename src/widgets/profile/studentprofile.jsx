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

function StudentProfile() {
    const dispatch = useDispatch();
    const myuser = useSelector(selectUser);
    const[purposemodal, setpurposemodal] = useState(false)

    useEffect(() => {
        const authInstance = getAuth();
        const unsubscribe = authInstance.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                dispatch(fetchUser(firebaseUser.uid));
            }
        });

        return () => unsubscribe(); // Cleanup the subscription on unmount
    }, [dispatch]);

    const openpurposemodal =()=>{
        setpurposemodal(!purposemodal);
    }

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        const date = new Date(dateString); // Convert string to Date object
        return date.toLocaleDateString("en-GB", options);
    };

    // Render loading or fallback UI if myuser is not yet loaded
    if (!myuser) {
        return (
            <div className="studentprofilepage">
                <p>Loading profile...</p>
            </div>
        );
    }

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
                </div>

                <div className="profileedits">
                    <div className="suggestions">
                        <div className="suggestioninsides">
                            <IoInformationCircle fontSize={25} style={{ margin: '4px' }} />
                            <p>
                                This is how your profile is seen by other people.
                                <br />
                                To preview, click <a style={{ textDecoration: "underline" }} href="">here</a>.
                            </p>
                        </div>
                        <div className="closesuggestions">X</div>
                    </div>
                    <div className="profileeditcontainer">
                        <h2>Hi👋Let's help tuitors get to know you</h2>
                        <p style={{marginTop:'-10px'}}>Get the most out of Kube by sharing a bit more about yourself and your preferences for finding the best tutors.</p>
                        <div className="completeyourprofile">
                            <div className="profilechecklist">
                             <h2>Personalization</h2>
                             <div className="personalizationbar">
                                <div className="personalizationpercentage"></div>
                             </div>
                            </div>
                            <div className="yourpurposeonkube" onClick={openpurposemodal}>
                          <div className="iconcontainer">
                          <LuTarget/>
                          </div>
                            <div className="purposeonkubeinsiders">
                            <h3>Share how you want to use kube</h3>
                            <p>Tell us if you're here to learn or share your knowledge</p>
                            </div>
                            <h3 className='purposebutton'>Add</h3>
                            </div>
                            <div className="yourpurposeonkube">
                          <div className="iconcontainer">
                          <FaIdBadge />
                          </div>
                            <div className="purposeonkubeinsiders">
                            <h3>Share more about yourself</h3>
                            <p>A detailed profile helps you achieve your purpose on Kube!</p>
                            </div>
                            <h3 className='purposebutton'>Add</h3>
                            </div>
                            
                        </div>
                        <div className="reviewsfromteachers">
                          <div className="reviewfromteacherinsiders">
                          <h3>Reviews from teacher</h3>
                          </div>
                          <img className='reviewimage' src={review} alt="" />
                          <div className="reviewinsiders">
                          <p>{myuser.name} doesnot have any review yet.</p>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            {purposemodal && (
                <div className="purposemodal">
                    <div className="iamstudent"></div>
                    <PiStudentFill />
                    <h3>Student</h3>
                    <p>I'm looking for a tuitor to learn with</p>
                   <div className="iamteacher">
                   <FaChalkboardTeacher />
                    <h3>Teacher</h3>
                    <p>I'd like to share my knowledge</p>
                   </div>
                </div>
            )}
        </div>
    );
}

export default StudentProfile;
