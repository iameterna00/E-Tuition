import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from '../services/Redux/userSlice';
import { getAuth } from "firebase/auth"; 
import { useNavigate } from "react-router-dom"; // Import useNavigate

import HomeBanner from "../widgets/homepage/bannerhomepage";
import HomePageForm from "../widgets/homepage/homepageForm";
import '../css/home.css';
import Vaccancy from "../widgets/homepage/vaccancy";
import BetuitotContent from "../widgets/becomeTuitor/betuitorcontent";

function HomePage() {
    const dispatch = useDispatch();
    const myuser = useSelector(selectUser);
    const [purpose, setPurpose] = useState('');
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const authInstance = getAuth();
        const unsubscribe = authInstance.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                dispatch(fetchUser(firebaseUser.uid));
                setPurpose(myuser.purpose);
            }
            setLoading(false); // Set loading to false after fetching user
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, [dispatch]);

    useEffect(() => {
        if (myuser) {
          
            if (purpose === 'teacher') {
                navigate('/teacher/dashboard'); // Redirect to teacher dashboard
            }
        }
    }, [myuser, navigate]);

    // Show loading before determining the purpose
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <>
            <HomeBanner />
            <Vaccancy />
            <HomePageForm />
        </>
    );
}

export default HomePage;
