import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/coursesdetails.css';
import { fetchUser, selectUser } from '../services/Redux/userSlice';
import { getAuth } from "firebase/auth"; 
import HomeTuitorOffer from '../widgets/coursedetail/hometuitoroffer';
import ReviewsPage from '../widgets/coursedetail/interactions';
import KUBE from '../assets/newcube.png';
import { webApi } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import StudentForm from '../widgets/profile/studentidentityform';
import TuitorLogin from '../widgets/login/betuitorlogin';
import ApplyCourse from '../widgets/coursedetail/applycourse';

function CourseDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate(); // Initialize useNavigate
  const [gigDetails, setGigDetails] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState(3);
  const [message, setMessage] = useState(null); // State for popup messages
  const dispatch = useDispatch();
  const myuser = useSelector(selectUser);
  const [showUserFormModal, setShowUserFormModal] = useState(false);
  const [showSUccessful, setShowSucessful] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleLoginclick = () => setShowLoginModal(!showLoginModal);

  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = authInstance.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        dispatch(fetchUser(firebaseUser.uid));
      } 
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [dispatch, navigate]);

  useEffect(() => {
    const fetchGigDetails = async () => {
      try {
        const response = await fetch(`${webApi}/api/classes/${id}`);
        const data = await response.json();
        setGigDetails(data);
      } catch (error) {
        console.error('Error fetching gig details:', error);
      }
    };

    fetchGigDetails();
  }, [id]);

  if (!gigDetails) {
    return <p>Loading...</p>;
  }

  const calculatePrice = () => {
    let price = gigDetails.pricePerMonth * selectedMonths;
    if (selectedMonths === 3) {
      price *= 0.8; // 20% off for 3 months
    }
    return price.toFixed(2);
  };

  const Courseapplied = () => {
    console.log("Course Applied");
  
    if (!myuser) {
      // If the user is not logged in, show the login modal
      setShowLoginModal(true);
      return;
    }
  
    if (!myuser?.phone) {
      // If the user is logged in but profile is incomplete, show the user profile modal
      setShowUserFormModal(true);
    } else {
    setShowSucessful(true);
      
    }
  };
  
  const handleChatButtonClick = () => {
    navigate(`/chat/${id}`); // Redirect to the ChatRoom component with classid
  };

  

  return (
    <div className="coursebuypage">
      <HomeTuitorOffer />
      <div className="coursestitle">
        <h3>Book Your Tutor</h3>
      </div>
      <div className="course-details-page">
        <div className="course-details-body">
          <div className="coursebodyone">
            <div className="course-profile">
              {gigDetails.image ? (
                <img src={gigDetails.image} alt={gigDetails.title} className="course-image" />
              ) : (
                <div style={{ height: "250px" }} className="coursedefualtposter">
                  <div className="kubegraphicscontainer">
                    <img src={KUBE} className="kubegraphics" alt="" />
                    <h3>KUBE HOME TUITION</h3>
                  </div>
                </div>
              )}
            </div>
            <div className="tutorsdetails">
              <div className="tuitorinfo">
                <h2 style={{ margin: '0px' }}>{gigDetails.title}</h2>
                <h3>Experience: {gigDetails.experience}</h3>
                <h3>Gender: {gigDetails.sex}</h3>
                <h3> Rs {Number(gigDetails.pricePerMonth).toLocaleString()}/month</h3>
              </div>
              <div className="toutorname">
                <div className="tuitornamedetails">
                  <img src={gigDetails.profile} alt={gigDetails.name} className="course-profile-image" />
                  <h3>{gigDetails.name}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="enrollnowcontainer">
            <div className="productdetails">
              <div className="subtotal">
                <h3>Subtotal</h3>
                <div className="price-details">
                  {selectedMonths === 3 && (
                    <h3 style={{ fontSize: '16px', textDecoration: 'line-through', color: '#999' }}>
                      Rs.{Number(gigDetails.pricePerMonth * selectedMonths).toLocaleString()}
                    </h3>
                  )}
                  <h3 style={{ marginLeft: '10px' }}>
                    Rs.{calculatePrice()}
                  </h3>
                </div>
              </div>
              <p>Subtotal does not include applicable taxes</p>
              <div className="duration">
                <h3 style={{ fontWeight: '600', display: 'block', marginBottom: '-8px', fontSize: '16px' }}>
                  Select Duration:
                </h3>
                <select
                  id="duration"
                  value={selectedMonths}
                  onChange={(e) => setSelectedMonths(Number(e.target.value))}
                  style={{ padding: '5px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                  <option value={1}>1 Month</option>
                  <option value={3}>3 Months</option>
                </select>
              </div>
              <button className="enrollbutton" onClick={Courseapplied} style={{ marginTop: '20px' }}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
   

    {/* Login Modal */}
    {showLoginModal && (

   <TuitorLogin close={handleLoginclick} />
    )}

    {/* User Form Modal */}
    {showUserFormModal && (
   <div className="modal-backdrop" onClick={() => closepurposemodal('')}>
   <div className="identitymodal" onClick={(e) => e.stopPropagation()}>
       <div className="close-modal" onClick={() => closepurposemodal('')}>X</div>
       <h2>Share a bit about yourself</h2>
       <div className="modal-contentstudentform">
           <StudentForm close={()=>setShowUserFormModal(false)} studentdetails={myuser} />
       </div>
   </div>
</div>
)}
<ApplyCourse studentid={myuser} classid={gigDetails.id} showSUccessful={showSUccessful} setShowSucessful={setShowSucessful} />
 
<ReviewsPage loginmodal={setShowLoginModal}  gigsData={gigDetails}
user={myuser}/>


    </div>
  );
}

export default CourseDetails;
