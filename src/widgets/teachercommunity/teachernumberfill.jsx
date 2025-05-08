import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from '../../services/Redux/userSlice';
import { auth } from '../../firebase_config';
import { webApi } from '../../api';

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
      if (!myuser.phone) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
  }, [isUserLoggedIn, myuser]);

  const closeModal = () => setShowModal(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare FormData to send to the backend
    const formData = new FormData();
    
    // Append the data fields (ensure 'phone' and 'uid' are included)
    formData.append('phone', phone);  // Phone number should be from user input
    formData.append('uid', myuser.uid);  // User UID
  
    try {
      // Send the phone number update request to the backend
      const response = await fetch(`${webApi}/api/update-phone-number`, {
        method: 'POST',
        body: formData,  // Send FormData, not JSON
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log("Phone number updated successfully", result);
        setShowModal(false);  // Close modal or handle success UI
      } else {
        console.log("Error:", result.message);  // Handle error response
      }
    } catch (error) {
      console.error("Error updating phone number:", error);  // Handle network errors
    }
  };
  
  
  

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-contents" style={{ textAlign: 'start', position:'relative' }}>
            <h2 style={{width:'100%', marginBottom:"0px"}}>Add Your Phone Number !</h2>
            <p style={{margin:'0px'}}>
              Add your phone number so we can contact you for matching vacancies.
              <br /><strong style={{width:'100%', display:"flex", justifyContent:'center', marginTop:"20px"}}>We Got You, It won’t be shared !</strong>
            </p>
          
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ borderRadius: "10px", width: "100%", marginTop: "5px", padding: "8px" }}
            />
            <div style={{ marginTop: "10px", width:"100%", display:'flex', justifyContent:'center' }}>
              <button onClick={handleSubmit}>Save</button>
              <button style={{position:'absolute', top:"10px", right:"10px", backgroundColor:"transparent", color:"grey"}} onClick={closeModal}>X</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PhoneCheckModal;
