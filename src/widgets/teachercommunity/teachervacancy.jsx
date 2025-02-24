import React, { useEffect, useState, useRef } from 'react'; 
import axios from 'axios'; 
import mapboxgl from 'mapbox-gl'; 
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'; 
import { webApi } from '../../api'; 
import KUBE from '../../assets/newcube.png';
import { MdGpsFixed } from "react-icons/md";
import { IoIosSend } from 'react-icons/io';
import { FaBook, FaGraduationCap, FaLocationDot, FaUser, FaUserGroup } from "react-icons/fa6";
import { FaChalkboardTeacher, FaClock, FaMoneyBill, FaMoneyBillWave } from 'react-icons/fa';
import { RiFocus2Line } from "react-icons/ri";
import { getAuth } from 'firebase/auth';

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

  // Function to handle the modal toggle
  const openModal = (vacancy) => {
    setSelectedVacancy(vacancy); // Set selected vacancy
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const generateWhatsappMessage = (vacancy) => {
    const message = `Hi, I am interested in the vacancy for  ${vacancy.subject} For Grade ${vacancy.grade} at ${vacancy.location}.`;
    return `https://wa.me/9768771793?text=${encodeURIComponent(message)}`;
  };

  const fetchVacancies = async () => {
    setLoading(true);
    // const auth = getAuth();
    // const user = auth.currentUser;
  
    // if (user) {
      try {
        // const idToken = await user.getIdToken();
        const response = await axios.get(`${webApi}/api/vacancyforteachers`, {
          headers: {
            // Authorization: `Bearer ${idToken}`
          }
        });
        setVacancies(response.data); // Update vacancies
      } catch (error) {
        console.error('Error fetching vacancies:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    // }
  };

  
  useEffect(() => {
    fetchVacancies();
    const intervalId = setInterval(fetchVacancies, 10000); // Polling every 10 seconds
    return () => clearInterval(intervalId); // Cleanup
  }, []);
  // Filter vacancies based on user location
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

  return (
    <div className="teachervacancybody">
      <h2>Teacher's Vacancies</h2>
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

      <div className="vacancy-list">
        {activeTab === 'available' && userLocation && filteredVacancies.length > 0
          ? filteredVacancies.filter((vacancy) => vacancy.status !== 'complete').map((vacancy) => (
            <VacancyCard key={vacancy._id} vacancy={vacancy} locationSource={locationSource} openModal={openModal} />
          ))
          : activeTab === 'available'
          ? vacancies
            .filter((vacancy) => vacancy.status !== 'complete')
            .map((vacancy) => <VacancyCard key={vacancy._id} vacancy={vacancy} locationSource={locationSource} openModal={openModal} />)
          : vacancies
            .filter((vacancy) => vacancy.status === 'complete')
            .map((vacancy) => <VacancyCard key={vacancy._id} vacancy={vacancy} locationSource={locationSource} openModal={openModal} />)}
      </div>

      {/* Modal */}
      {isModalOpen && selectedVacancy && (
        <div className="modal">
          <div className="modal-contents">
            <h2>{selectedVacancy.subject} For Grade {selectedVacancy.grade}</h2>
            <p>Location: {selectedVacancy.location}</p>
            <p>{selectedVacancy.description}</p>
            <div className="contactwhatsappbutton">
              <a href={generateWhatsappMessage(selectedVacancy)} target="_blank" rel="noopener noreferrer">
                <button>Apply on WhatsApp</button>
              </a>
              <button className='tuition-delete-button' onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const VacancyCard = ({ vacancy, locationSource, openModal }) => {
  return (
    <div className="vacancycommunitycard"
    >
      <div className="vacancycommunitygraphics">
        
      <div className="vacancystatuss">
        <h4 style={{margin:"0px"}}>Status:</h4>
        {vacancy.status === 'complete' ? (<div className='Assignedcontainer'>🔵Booked</div>) : vacancy.status === 'pending' ?  (<div className='Assignedcontainer'>🟡Assigned <FaUserGroup/>{vacancy.teachers_count}/3 Applicants</div>) : (<div className='Assignedcontainer'>🟢Available</div>)}
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
        <h4><FaChalkboardTeacher/> Grade: {vacancy.grade}</h4>
        <h4><FaLocationDot/> Location: {vacancy.location}</h4>
        <h4><FaBook/> Subject: {vacancy.subject}</h4>
        <h4><FaClock/> Duration: {vacancy.duration}</h4>
        <h4><FaGraduationCap/> No of students: {vacancy.noofstudents}</h4>
        <h4><FaUser/> Tutor Type: {vacancy.tutorType}</h4>
       <div className="minrequirements">
       <h4 style={{display:"flex", alignItems:'center', gap:"5px", fontSize:"18px"}}><RiFocus2Line size={25}/>Requirement:</h4>
       <p style={{marginLeft:"10px", fontWeight:"600"}}> {vacancy.minRequirement}</p>
       </div>
       
        <p>{vacancy.description}</p>
      
      </div>
      <h3 style={{margin:"10px", display:"flex", gap:"10px", justifyContent:"center", alignItems:'center'}}><FaMoneyBillWave color='rgb(0, 200, 0)' size={30}/>Salary: {vacancy.salary}</h3>
      <div className="applybuttoncontainer" style={{display:"flex", justifyContent:'center', alignItems:"center", width:'100%'}}>
        <button style={{ width: '100%', maxWidth:"300px", display:'flex', alignItems:"center", gap:"5px", justifyContent:"center" }} onClick={() => openModal(vacancy)}><IoIosSend size={30}/><h3>Apply</h3></button>
      </div>
    </div>
  );
};

export default TeacherVacancy;
