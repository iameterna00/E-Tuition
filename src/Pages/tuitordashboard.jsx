import { getAuth } from "firebase/auth"; 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from '../services/Redux/userSlice';
import { useNavigate } from "react-router-dom"; 

function TeacherDashboard(){
    const dispatch = useDispatch();
    const myuser = useSelector(selectUser); 
    const navigate = useNavigate(); // Initialize navigate
    const [purpose, setPurpose] = useState('');



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
          
            if (purpose === 'student') {
                navigate('/'); // Redirect to teacher dashboard
            }
        }
    }, [myuser, navigate]);


}export default TeacherDashboard;
