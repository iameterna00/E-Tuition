import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/coursesdetails.css';
import HomeTuitorOffer from '../widgets/coursedetail/hometuitoroffer';
import ReviewsPage from '../widgets/coursedetail/interactions';
import KUBE from '../assets/newcube.png';
import { webApi } from '../api';

function CourseDetails() {
  const { id } = useParams(); 
  const [gigDetails, setGigDetails] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState(3);

  useEffect(() => {
    const fetchGigDetails = async () => {
      try {
        const response = await fetch(`${webApi}/api/classes/${id}`); // Fetch the specific gig data by ID
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

  return (
    <div className="coursebuypage">
      <HomeTuitorOffer/>
      <div className="coursestitle">
          <h3>Book Your Tutor</h3>
      </div>
    <div className="course-details-page">
    
          <div className="course-details-body">
     <div className="coursebodyone">
     <div className="course-profile">
                {gigDetails.image ? ( <img src={gigDetails.image} alt={gigDetails.title} className="course-image" />):(<div style={{height:"250px"}}  className='gigsdefualtposter'>
                       <div  className="kubegraphicscontainer"> < img src={KUBE}  className='kubegraphics' alt="" /><h3>KUBE HOME TUTION</h3></div>
                      </div>)}
              </div>
    <div className="tutorsdetails">
    <div className="tuitorinfo">
              <h2 style={{margin:'0px'}}> {gigDetails.title}</h2>
              <h3>Experience: {gigDetails.experience}</h3>
              <h3>Gender: {gigDetails.sex}</h3>
              <h3> Rs {Number(gigDetails.pricePerMonth).toLocaleString()}/month</h3>
           
          </div>
          <div className="toutorname">  
              <div className="tuitornamedetails"> 
                <img src={gigDetails.profile} alt={gigDetails.name} className="course-profile-image" />
              <h3>{gigDetails.name}</h3></div></div>
    </div>
     </div>
     <div className="enrollnowcontainer">
          <div className="productdetails">
            <div className="subtotal">
              <h3>Subtotal</h3>
              <div className="price-details">
               {selectedMonths === 3 && ( <h3 style={{ fontSize: '16px', textDecoration: 'line-through', color: '#999' }}>
                  Rs.{Number(gigDetails.pricePerMonth * selectedMonths).toLocaleString()}
                </h3>)}
                <h3 style={{ marginLeft: '10px' }}>
                  Rs.{calculatePrice()}
                </h3>
              </div>
            </div>
            <p>Subtotal does not include applicable taxes</p>
        <div className="duration">
        <h3 style={{ fontWeight: '600', display: 'block', marginBottom: '-8px', fontSize:'16px' }}>
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
            <button className="enrollbutton" style={{ marginTop: '20px' }}>Continue</button>
          </div>
        </div>
          </div>
      
        </div>
        <ReviewsPage gigsData={gigDetails}/>
    </div>
      );
    }
    
    export default CourseDetails;
    