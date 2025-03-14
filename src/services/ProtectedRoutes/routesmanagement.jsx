import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser, selectLoading, selectError } from '../Redux/userSlice';
import { Navigate } from 'react-router-dom';  // Import Navigate for redirection
import { getAuth } from 'firebase/auth';
import TeacherDashboard from '../../Pages/teachersdashboard';  // Import TeacherDashboard

const TeacherDashboardWrapper = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);  // Get the current user from Redux store
  const loading = useSelector(selectLoading);  // Check loading status from Redux
  const error = useSelector(selectError);  // Check for any error in fetching user data
  const [firebaseUser, setFirebaseUser] = useState(null);  // Local state to hold Firebase user data

  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = authInstance.onAuthStateChanged((firebaseUser) => {
      console.log('Firebase User:', firebaseUser);  // Debug Firebase user

      if (firebaseUser) {
        setFirebaseUser(firebaseUser);  // Set the Firebase user in local state
        dispatch(fetchUser(firebaseUser.uid));  // Fetch user data from Redux using Firebase UID
      } else {
        setFirebaseUser(null);  // Clear user data if not logged in
      }
    });

    return () => unsubscribe();  // Cleanup the subscription on unmount
  }, [dispatch]);

  // Debug Redux state
  console.log('Redux User:', user);
  console.log('Loading:', loading);
  console.log('Error:', error);

  if (loading) {
    return <p>Loading...</p>;  // Show loading message while user data is being fetched
  }

  if (error) {
    return <p>Error: {error}</p>;  // Show error message if there was an issue fetching user data
  }

  // Ensure user is loaded and check teacherConfirm value
  if (!user) {
    console.log('No user data found');
    return <Navigate to="/" />  // Handle loading state if user data isn't available
  }

  console.log('Teacher Confirmation Status:', user.teacherConfirm);

  // Check the teacherConfirm status before rendering the TeacherDashboard
  if (user.teacherconfirm !== 'approved') {
    console.log('Redirecting to profile because teacher is not approved');
    return <Navigate to="/" />;  // Redirect to profile if teacherConfirm is not approved
  }

  return <TeacherDashboard user={user}  />;  // Render TeacherDashboard if approved
};

export default TeacherDashboardWrapper;
