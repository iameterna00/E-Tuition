import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import Filters from '../filters/filter';
import KUBE from '../../assets/newcube.png';
import { webApi } from '../../api';

function Vaccancy() {
  const [gigsData, setGigsData] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [loading, setLoading] = useState(true);

  // Fetch classes data from backend on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${webApi}/api/classes`);  // Assuming your Flask app is running on this URL
        const data = await response.json();
        setGigsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching class data:', error);
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

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
  <div className='homevacancybody'>
    <div className="home-vaccancy-page">
        <div className="title">
        <h2>Available Tuitors</h2>
    </div>
  <div className="vaccancymainCntainer">

<Filters setLocationFilter={setLocationFilter} handlePriceChange={handlePriceChange} setGenderFilter={setGenderFilter} setSearchTerm={setSearchTerm} priceRange={priceRange} />

<div className="vaccancy-container">
          {/* Loading Screen */}
          {loading ? (
        <div className="spinner-container">
        <div className="spinner"></div>
        Loading
      </div>
          ) : (
            filteredGigs.map((gig) => (
              <div key={gig.id} className="vaccancy-card">
                <div className="vacancycardinsiders">
                  <Link to={`/coursesdetails/${gig.id}`} className="vaccancydetail-link">
                    <div className="vacancyimagecontainer">
                      {gig.image ? (
                        <img src={gig.image} alt={gig.title} className="vaccancy-image" />
                      ) : (
                        <div className='gigsdefualtposter'>
                          <div className="kubegraphicscontainer">
                            <img src={KUBE} className='kubegraphics' alt="" />
                            <h3>{gig.tuitiontype === 'Home Tuition' ? 'KUBE HOME TUITION' : 'KUBE ONLINE TUITION'}</h3>
                          </div>
                        </div>
                      )}
                      <div className="vaccancyprofilecontainer">
                        <img className='vaccancyProfile' src={gig.profile} alt="" />
                      </div>
                    </div>
                    <div className="vaccancy-details">
                      <div className="vacancydetailsinsiders">
                       <div style={{width:'80%'}} className="vacancytitle">
                       <h3> {gig.title}</h3>
                       </div>
                       <h3 className="vaccancy-location">
  <FaLocationDot /> {gig.location.replace(/baneshwar/gi, "Baneshwor")}
</h3>

                        <h3 className="vaccancy-qualification">Qualification: {gig.qualification}</h3>
                        <h3 className="vaccancy-qualification">Exp: {gig.experience}</h3>
                        <h3 className="vaccancy-qualification">Gender: {gig.sex}</h3>
                        <h3 className="vaccancy-price">Salary: Rs.{Number(gig.pricePerMonth).toLocaleString()}</h3>
                        <button className='vaccancyapplybutton'>Apply</button>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div></div>
  );
}

export default Vaccancy;