import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import gigsData from '../../JSON/gigdata.json';
import Filters from '../filters/filter';

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

<Filters setLocationFilter={setLocationFilter} handlePriceChange={handlePriceChange} setGenderFilter={setGenderFilter} setSearchTerm={setSearchTerm} priceRange={priceRange} />

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
