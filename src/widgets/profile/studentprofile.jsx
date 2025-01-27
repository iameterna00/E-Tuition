import '../../css/profile.css';
import { getAuth } from "firebase/auth"; 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from '../../services/Redux/userSlice';
import { FaUser } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";

function StudentProfile() {
    const dispatch = useDispatch();
    const myuser = useSelector(selectUser);

    useEffect(() => {
        const authInstance = getAuth();
        const unsubscribe = authInstance.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                dispatch(fetchUser(firebaseUser.uid));
            }
        });

        return () => unsubscribe(); // Cleanup the subscription on unmount
    }, [dispatch]);

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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentProfile;
