import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from '../../services/Redux/userSlice';
import { auth } from '../../firebase_config';
import { webApi } from '../../api';
import TeachingExperience from '../becomeTuitor/tuitorexperience';

function PhoneCheckModal() {
  const dispatch = useDispatch();
  const myuser = useSelector(selectUser);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setIsUserLoggedIn(true);
        dispatch(fetchUser(firebaseUser.uid));
      } else {
        setIsUserLoggedIn(false);
        setShowModal(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (isUserLoggedIn && myuser) {
      if (!myuser.teacherconfirm) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
  }, [isUserLoggedIn, myuser]);

  const closeModal = () => setShowModal(false);

  
  

  return (
    <>
{showModal &&(
    <TeachingExperience
    isVacancy={true}
  setopentuitorinitialmodal={setShowModal}
  user={myuser}
  />
)}
    </>
  );
}

export default PhoneCheckModal;
