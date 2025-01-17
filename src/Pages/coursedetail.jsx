import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import gigsData from '../JSON/gigdata.json';
import '../css/coursesdetails.css';
import HomeTuitorOffer from '../widgets/coursedetail/hometuitoroffer';
import ReviewsPage from '../widgets/coursedetail/interactions';

function CourseDetails() {
  const { id } = useParams(); 
  const [gigDetails, setGigDetails] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState(3);

  useEffect(() => {
    console.log("URL Parameter ID:", id); 
    const gigId = Number(id); // Ensure the ID is a number
    const gig = gigsData.find((gig) => gig.id === gigId); // Find the gig by ID
    console.log("Found gig:", gig); // Log the gig to check if it's found
    setGigDetails(gig);
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
      <h3>Your tuitor</h3>
  </div>
<div className="course-details-page">

      <div className="course-details-body">
 <div className="coursebodyone">
 <div className="course-profile">
          <img src={gigDetails.image} className='courseImage' alt="" />
          </div>
<div className="tutorsdetails">
<div className="tuitorinfo">
          <h2 style={{margin:'0px'}}> {gigDetails.subjects}</h2>
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
              Rs {Number(gigDetails.pricePerMonth * selectedMonths).toLocaleString()}
            </h3>)}
            <h3 style={{ marginLeft: '10px' }}>
              Rs {calculatePrice()}
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
