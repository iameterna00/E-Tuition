import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import ReactSlider from 'react-slider';
import gigsData from '../../JSON/gigdata.json';

function Vaccancy() {
  const [locationFilter, setLocationFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 25000]);
  
  const handlePriceChange = (values) => {
    setPriceRange(values);
  };


  const filteredGigs = gigsData.filter((gig) => {
    const matchesLocation = locationFilter ? gig.location.includes(locationFilter) : true;
    const matchesGender = genderFilter ? gig.sex === genderFilter : true;
    const matchesSearch = searchTerm
      ? gig.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.subjects.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesPrice = gig.pricePerMonth >= priceRange[0] && gig.pricePerMonth <= priceRange[1];
    return matchesLocation && matchesGender && matchesSearch && matchesPrice;
  });


  return (
    <div className="home-vaccancy-page">
        <div className="title">
        <h2>Available Tuitors</h2>
    </div>
  <div className="vaccancymainCntainer">

  <div className="vaccancyfilters">
  <div className="filterboxs">
    <div className="filterbox">
      <h3>Location</h3>
      <select 
       onChange={(e) => setLocationFilter(e.target.value)}
      name="location" id="location">
        <option value="">Select Location</option>
        <option value="Kathmandu">Kathmandu</option>
        <option value="Lalitpur">Lalitpur</option>
        <option value="Bhaktapur">Bhaktapur</option>
      </select>
    </div>
    <div className="filterbox">
      <h3>Gender</h3>
      <select
         onChange={(e) => setGenderFilter(e.target.value)}
       name="Gender" id="Gender">
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
   <div className="filterox">
   <div className="price-slider-container">
          <div className="pricerangeofslider">
          <h3 style={{margin:'0px'}} >
             Price Range
            </h3>
            <p style={{margin:'0px', fontSize:'14px'}}>
             Rs {priceRange[0]} - Rs {priceRange[1]}
            </p></div>
            <ReactSlider
              className="price-slider"
              thumbClassName="price-slider-thumb"
              trackClassName="price-slider-track"
              min={0}
              max={25000}
              step={500}
              defaultValue={[0, 10000]}
              value={priceRange}
              onChange={handlePriceChange}
              renderThumb={(props, state) => <div {...props}></div>}
            />
           
          </div>
   </div>
 
    
  </div>
    <div className="search-container-vaccancy">
          <input
           onChange={(e) => setSearchTerm(e.target.value)}
           type="text" placeholder="Search Anything..." className="search-vaccancy" />
          <div className="search-vaccancyiconcontainer"><div className="search_vaccancyicon"></div></div>
        </div>
</div>

  <div className="vaccancy-container">
        {filteredGigs.map((gig) => (
          <div key={gig.id} className="vaccancy-card">
            <Link to={`/coursesdetails/${gig.id}`} className="vaccancydetail-link">
              <img src={gig.image} alt={gig.title} className="vaccancy-image" />
              <div className="vaccancy-details">
             <div className="vaccancyprofilecontainer">
             <img className='vaccancyProfile' src={gig.profile} alt="" />
             <h3>{gig.name}</h3>
             </div>
                <h3 className="vaccancy-location"><FaLocationDot /> {gig.location}</h3>
                <h3 className="vaccancy-qualification">Qualification: {gig.qualification}</h3>
                <h3 className="vaccancy-qualification">Exp: {gig.experience}</h3>
                <h3 className="vaccancy-qualification">gender: {gig.sex}</h3>
                <h3 className="vaccancy-price">Salary: Rs.{Number(gig.pricePerMonth).toLocaleString()}</h3>


                <button className='vaccancyapplybutton'>Apply</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
  </div>
    </div>
  );
}

export default Vaccancy;
