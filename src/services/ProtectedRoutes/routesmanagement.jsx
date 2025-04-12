import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser, selectLoading, selectError } from '../Redux/userSlice';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import TeacherDashboard from '../../Pages/teachersdashboard';

const TeacherDashboardWrapper = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [firebaseUser, setFirebaseUser] = useState(null);

  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = authInstance.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setFirebaseUser(firebaseUser);
        dispatch(fetchUser(firebaseUser.uid));
      } else {
        setFirebaseUser(null);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Debug logs
  console.log('Firebase User:', firebaseUser);
  console.log('Redux User:', user);
  console.log('Loading:', loading);
  console.log('Error:', error);

  // Loading state
  if (loading || !firebaseUser) {
    return <p>Loading...</p>;
  }

  // Error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  // No user data after loading
  if (!user) {
    console.log('No user data found');
    return <Navigate to="/" />;
  }

  // Check teacher approval status
  if (user.teacherconfirm !== 'approved') {
    console.log('Redirecting to profile because teacher is not approved');
    return <Navigate to="/" />;
  }

  // All checks passed - render dashboard
  return <TeacherDashboard user={user} />;  
};

export default TeacherDashboardWrapper;