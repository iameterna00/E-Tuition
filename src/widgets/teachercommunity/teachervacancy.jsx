import React, { useEffect, useState, useRef } from 'react'; 
import axios from 'axios'; 
import mapboxgl from 'mapbox-gl'; 
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'; 
import { webApi } from '../../api'; 
import { MdDateRange, MdGpsFixed } from "react-icons/md";
import { IoIosSend } from 'react-icons/io';
import { FaBook, FaGraduationCap, FaLocationDot, FaUser, FaUserGroup } from "react-icons/fa6";
import { FaChalkboardTeacher, FaChevronDown, FaClock, FaLink, FaMoneyBill, FaMoneyBillWave } from 'react-icons/fa';
import { RiFocus2Line } from "react-icons/ri";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { IoSparkles } from 'react-icons/io5';
import { TailSpin } from 'react-loader-spinner';
import teacherscommunity from '../../assets/teacherscommunity.png';
import { Link, useNavigate } from 'react-router-dom';
import AdComponent from '../googleads/adscomponent';
import PhoneCheckModal from './teachernumberfill';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../services/Redux/userSlice';
import TuitorLogin from '../login/betuitorlogin';


mapboxgl.accessToken = "pk.eyJ1IjoiYW5pc2hoLWpvc2hpIiwiYSI6ImNrdWo5d2lhdDFkb2oybnJ1MDB4OG1oc2EifQ.pLrp8FmZSLVfT3pAVVPBPg";

function TeacherVacancy() {
  const[loading, setLoading] = useState(true);
  const [vacancies, setVacancies] = useState([]);
  const [activeTab, setActiveTab] = useState('available');
  const [userLocation, setUserLocation] = useState(null);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [locationSource, setLocationSource] = useState(null); // Track location source (current or search)
  const geocoderRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [isVacancy, setisVacancy] = useState(true);
  const [referalmodal, setreferalmodal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userlogin, setUserLogin] =useState(true);
  const myuser = useSelector(selectUser);
  

useEffect(() => {
  const authInstance = getAuth();
  const unsubscribe = authInstance.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      dispatch(fetchUser(firebaseUser.uid));
      setUserLogin(true)
    }
    else{
      setUserLogin(false);
    }
  });

  return () => unsubscribe();
}, [dispatch]);

// Now react to updates in myuser separately
useEffect(() => {
  if (myuser) {
    console.log('Updated myuser:', myuser);
    // setpurpose(myuser.purpose); // Make sure setpurpose is defined in your component
  }
}, [myuser]);


  const openModal = (vacancy) => {
    setSelectedVacancy(vacancy); // Set selected vacancy
    setIsModalOpen(true);
  };

  const openreferalmodal = (vacancy) => {
    setSelectedVacancy(vacancy); 
    setreferalmodal(true);
};


  const closeModal = () => {setIsModalOpen(false); setreferalmodal(false);

  };
  const generateWhatsappMessage = (vacancy) => {
    const message = `Hi, I am interested in the vacancy for ${vacancy.subject} For Grade ${vacancy.grade} at ${vacancy.location}.`;
    return `https://wa.me/9768771793?text=${encodeURIComponent(message)}`;
  };

useEffect(() => {
  const fetchVacancies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${webApi}/api/vacancyforteachers`);
      setVacancies(response.data);
      console.log('Fetched vacancies:', response.data);
    } catch (error) {
      console.error("Error fetching vacancies:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchVacancies();
  return () => {
  };
}, []);


  useEffect(() => {
    if (userLocation) {
      const updatedVacancies = vacancies.map((vacancy) => {
        if (vacancy.lat && vacancy.lng) {
          vacancy.distance = getDistance(userLocation, { lat: vacancy.lat, lng: vacancy.lng });
        }
        return vacancy;
      });

      const sortedVacancies = updatedVacancies.sort((a, b) => {
        if (a.distance === undefined) return 1;
        if (b.distance === undefined) return -1;
        return a.distance - b.distance;
      });

      setFilteredVacancies(sortedVacancies); // Set the filtered and sorted vacancies
    } else {
      setFilteredVacancies(vacancies);
      console.log('vacanctteachers', vacancies.teacher)
    }
  }, [userLocation, vacancies]);

  // Calculate distance between two coordinates using Haversine formula
  const getDistance = (loc1, loc2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
    const dLon = (loc2.lng - loc1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(loc1.lat * (Math.PI / 180)) *
        Math.cos(loc2.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Return distance in meters
    return distance;
  };

  // Handle "Search Near Me" button click
  const handleSearchNearMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
          console.log("User Location:", newLocation); // Debugging step
          setUserLocation(newLocation);
          setLocationSource('current');
        },
        (error) => console.error('Geolocation error:', error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  

  // Initialize Mapbox Geocoder
  useEffect(() => {
    if (!geocoderRef.current) {
      geocoderRef.current = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        bbox: [85.198611, 27.575000, 85.525556, 27.812222],
        placeholder: 'Search for a vacancy location...',
      });

      geocoderRef.current.on('result', (e) => {
        const newLocation = { lat: e.result.center[1], lng: e.result.center[0] };
        setUserLocation(newLocation);
        setLocationSource('search'); // Track search location
      });

      document.getElementById('geocoder').appendChild(geocoderRef.current.onAdd());
    }
  }, []);
  const navigatetovacancy = (vacancyid) => {
    navigate(`/vacancy/${vacancyid}`);
  
  }

  return (
    <div className="teachervacancybody">
     <div className="teacherscommunitybanner">
     <div className="teacherscommunitytext">
     <h2 style={{margin:'0px'}} >Welcome to <br/>Teacher's Community</h2>
     <p style={{padding:'0px', margin:'0px'}} >Earn 5% reward by referring candidates for open vacancies!</p>
    {/* <div className="getstarted" style={{maxWidth:"200px", marginTop:'10px'}}>
    <button style={{ fontSize:"14px"}} >Refer a teacher</button>
    </div> */}
     </div>
     <img src={teacherscommunity} className='teacherscommunityimage' alt="" />
   
     </div>
     <div className="placeforadsteacherscommunity" style={{display:"none"}}>
    <AdComponent/>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1397824505506969"
        crossorigin="anonymous"></script>

     </div>
    
      <div id="geocoder" style={{ margin: "10px 0", width: "100%" }}></div>
  

      <div className="teachervacncytopbuttons">
        <div className="Vacancytabs">
          <button className={activeTab === 'available' ? 'active' : ''} onClick={() => setActiveTab('available')}>
            Available Vacancies
          </button>
          <button className={activeTab === 'booked' ? 'active' : ''} onClick={() => setActiveTab('booked')}>
            Booked
          </button>
        </div>
        <button style={{ display: 'flex', gap: "10px", alignItems: 'center', justifyContent: 'center' }} onClick={handleSearchNearMe}>
          Search Vacancies Near Me <MdGpsFixed className='gpsicon' fontSize={20} />
        </button>
      </div>
      { loading && ( <div className="vacancy-loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px',  width: '100%', flexDirection: 'column'}}>
        <TailSpin
  height="40"
  width="40"
  color="#00bcd4"
  ariaLabel="loading"
/>
      <p>loading vacancies..</p>
    </div>)}
    {!userlogin && (
        <TuitorLogin 
       close={() => setUserLogin(true)}
        isvacancy={true}
        />
      )}
      <div className="vacancy-list">
     
        
  {activeTab === 'available' && userLocation && filteredVacancies.length > 0
    ? filteredVacancies
        .filter((vacancy) => vacancy.status !== 'complete')
      
        .map((vacancy) => (
          <VacancyCard key={vacancy._id} vacancy={vacancy} locationSource={locationSource} openModal={openModal} openreferalmodal={openreferalmodal} navigatetovacancy={navigatetovacancy} />
        ))
    : activeTab === 'available'
    ? vacancies
        .filter((vacancy) => vacancy.status !== 'complete')
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort here
        .map((vacancy) => (
          <VacancyCard key={vacancy._id} vacancy={vacancy} locationSource={locationSource} openModal={openModal} openreferalmodal={openreferalmodal}  navigatetovacancy={navigatetovacancy} />
        ))
    : vacancies
        .filter((vacancy) => vacancy.status === 'complete')
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort here
        .map((vacancy) => (
          <VacancyCard key={vacancy._id} vacancy={vacancy} locationSource={locationSource} openModal={openModal} openreferalmodal={openreferalmodal} navigatetovacancy={navigatetovacancy} />
        ))}
</div>
        <PhoneCheckModal/>
      

      {/* Modal */}
      {isModalOpen && selectedVacancy && (
        <div className="modal">
          <div className="modal-contents">
            <h2>{selectedVacancy.subject} For Grade {selectedVacancy.grade}</h2>
            <p>Location: {selectedVacancy.location}</p>
            <p>{selectedVacancy.description}</p>
            <div className="contactwhatsappbutton">
              <a href={generateWhatsappMessage(selectedVacancy)} target="_blank" rel="noopener noreferrer">
                <button>Apply</button>
              </a>
              <button className='tuition-delete-button' onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
{referalmodal && selectedVacancy && (
  <div className="modal">
    <div className="modal-contents">
      <h3 style={{display:"flex", gap:"10px", justifyContent:"center", alignItems:'center'}}>
       <FaMoneyBillWave color='rgb(0, 200, 0)' size={25} /> Earn Rs. {
          (() => {
            const salaryString = selectedVacancy.salary.toLowerCase().replace(/\s/g, '');
            let numericSalary = 0;
            if (salaryString.includes('k')) {
              numericSalary = parseFloat(salaryString.replace('k', '')) * 1000;
            } else {
              numericSalary = parseFloat(salaryString);
            }
            const commission = Math.round(numericSalary * 0.05);
            return commission;
          })()
        }
      </h3>

      <h3>
        Refer a teacher for {selectedVacancy.subject} For Grade {selectedVacancy.grade}
      </h3>

      <div className="contactwhatsappbutton">
      
         <Link to={`/vacancy/${selectedVacancy._id}`}>
     <button>Refer a tutor</button>
         </Link>
     
        <button className="tuition-delete-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  </div>
)}




    </div>
  );
}
const VacancyCard = ({ vacancy, locationSource, openModal, openreferalmodal, navigatetovacancy }) => {
  return (
    <div className="vacancycommunitycard">
      {/* Only clickable section */}
      <div onClick={() => navigatetovacancy(vacancy._id)} style={{ cursor: 'pointer' }}>
        <div className="vacancycommunitygraphics">
          <div className="vacancystatuss">
            <h4 style={{ margin: "0px" }}>Status:</h4>
            {vacancy.status === 'complete' ? (
              <div className='Assignedcontainer'>🔵Booked</div>
            ) : vacancy.status === 'pending' ? (
              <div className='Assignedcontainer'>🟡Assigned <FaUserGroup />{vacancy.teachers_count}/3 Applicants</div>
            ) : (
              <div className='Assignedcontainer'>🟢Available</div>
            )}
          </div>
        </div>
        {vacancy.distance !== undefined && (
          <h3>
            {locationSource === 'current'
              ? `Distance:${(vacancy.distance / 1000).toFixed(2)} km`
              : `Distance from searched location: ${(vacancy.distance / 1000).toFixed(2)} km`}
          </h3>
        )}
        <div className="vacancycommunitydetails">
          <h4><FaChalkboardTeacher color="teal" /> Grade: {vacancy.grade}</h4>
          <h4><FaLocationDot color="teal"  /> Location: {vacancy.location ? vacancy.location : 'Online'}</h4>
          <h4><FaBook color="teal" /> Subject: {vacancy.subject}</h4>
          <h4><FaClock color="teal" /> Time: {vacancy.time}</h4>
          <h4><FaGraduationCap color="teal" /> No of students: {vacancy.noofstudents}</h4>
          <h4><FaUser color="teal" /> Tutor Type: {vacancy.tutorType ? vacancy.tutorType : 'Any'}</h4>
          <h4><MdDateRange color="teal" /> Added on:  {new Date(vacancy.created_at).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
          </h4>
          <div className="minrequirements">
            <h4 style={{ display: "flex", alignItems: 'center', gap: "5px", fontSize: "18px" }}>
              <RiFocus2Line size={25} />Requirement:
            </h4>
            <p style={{ marginLeft: "10px", fontWeight: "600" }}>{vacancy.minRequirement}</p>
          </div>
        </div>
        <h3 style={{ margin: "10px", display: "flex", gap: "10px", justifyContent: "center", alignItems: 'center' }}>
          <FaMoneyBillWave color='rgb(0, 200, 0)' size={30} />Salary: {vacancy.salary}
        </h3>
      </div>

      {/* Buttons outside the click area */}
      <div className="applybuttoncontainer" style={{ display: "flex", justifyContent: 'center', alignItems: "center", width: '100%', gap: "10px" }}>
        <button
          style={{ width: '100%', maxWidth: "2500px", display: 'flex', alignItems: "center", gap: "5px", justifyContent: "center" }}
          onClick={(e) => {
            e.stopPropagation();
            openModal(vacancy);
          }}
        >
          <IoIosSend size={25} /><h3>Apply</h3>
        </button>
        
        <button
        onClick={(e) => {
          e.stopPropagation();
          openreferalmodal(vacancy);
        }}
  className="refers" 
  style={{ 
    width: '60%', 
    backgroundColor: "transparent", 
    border: "1px solid grey", 
    borderRadius: "10px", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center",  // Ensures vertical alignment
    padding: "5px"
  }}
>
  <IoSparkles size={25} />
  <div
    style={{
      backgroundColor:"transparent",
      padding: "6px 12px",  // Adjust button padding if needed
      display: "flex", 
      alignItems: "center", // Ensures that the text and icon are vertically aligned
    }}
  > 
    Refer 
  </div>
</button>

      </div>
    </div>
  );
};

export default TeacherVacancy;
