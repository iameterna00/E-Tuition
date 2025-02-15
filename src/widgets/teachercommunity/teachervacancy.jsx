import React, { useEffect, useState, useRef } from 'react'; 
import axios from 'axios'; 
import mapboxgl from 'mapbox-gl'; 
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'; 
import { webApi } from '../../api'; 
import KUBE from '../../assets/newcube.png';
import { MdGpsFixed } from "react-icons/md";

mapboxgl.accessToken = "pk.eyJ1IjoiYW5pc2hoLWpvc2hpIiwiYSI6ImNrdWo5d2lhdDFkb2oybnJ1MDB4OG1oc2EifQ.pLrp8FmZSLVfT3pAVVPBPg";

function TeacherVacancy() {
  const [vacancies, setVacancies] = useState([]);
  const [activeTab, setActiveTab] = useState('available');
  const [userLocation, setUserLocation] = useState(null);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
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
    const message = `Hi, I am interested in the vacancy for  ${vacancy.subject} (${vacancy.grade}) at ${vacancy.location}.`;
    return `https://wa.me/9768771793?text=${encodeURIComponent(message)}`;
  };

  // Fetch vacancies initially
  useEffect(() => {
    const fetchVacancies = () => {
      axios
        .get(`${webApi}/api/vacancies`)
        .then((response) => {
          setVacancies(response.data); // Update vacancies
        })
        .catch((error) => console.error('Error fetching vacancies:', error));
    };

    fetchVacancies(); // Initial fetch
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
          setUserLocation(newLocation);
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
      });

      document.getElementById('geocoder').appendChild(geocoderRef.current.onAdd());
    }
  }, []);

  return (
    <div className="teachervacancybody">
      <h2>Teacher's Vacancies</h2>
      <div id="geocoder" style={{margin:"10px 0", width:"100%"}}></div>

      <div className="teachervacncytopbuttons">
        <div className="Vacancytabs">
          <button className={activeTab === 'available' ? 'active' : ''} onClick={() => setActiveTab('available')}>
            Available & Pending
          </button>
          <button className={activeTab === 'booked' ? 'active' : ''} onClick={() => setActiveTab('booked')}>
            Booked
          </button>
        </div>
        <button style={{display:'flex', gap:"10px", alignItems:'center', justifyContent:'center'}} onClick={handleSearchNearMe}>Search Vacancies Near Me<MdGpsFixed className='gpsicon' fontSize={20} /></button>
      </div>

      <div className="vacancy-list">
        {activeTab === 'available' && userLocation && filteredVacancies.length > 0
          ? filteredVacancies.filter((vacancy) => vacancy.status !== 'complete').map((vacancy) => (
            <VacancyCard key={vacancy._id} vacancy={vacancy} openModal={openModal} />
          ))
          : activeTab === 'available'
          ? vacancies
              .filter((vacancy) => vacancy.status !== 'complete')
              .map((vacancy) => <VacancyCard key={vacancy._id} vacancy={vacancy} openModal={openModal} />)
          : vacancies
              .filter((vacancy) => vacancy.status === 'complete')
              .map((vacancy) => <VacancyCard key={vacancy._id} vacancy={vacancy} openModal={openModal} />)}
      </div>

      {/* Modal */}
      {isModalOpen && selectedVacancy && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedVacancy.subject} ({selectedVacancy.grade})</h2>
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

const VacancyCard = ({ vacancy, openModal }) => {
  return (
    <div className="vacancycommunitycard">
      <div className="vacancycommunitygraphics">
        <div className="vacancycommunitygraphicsinsiders">
          <img src={KUBE} className="kubegraphics" alt="" />
          <h3>{vacancy.tuitionType === 'Home Tuition' ? 'KUBE HOME TUITION' : 'KUBE ONLINE TUITION'}</h3>
        </div>
      </div>
      <div className="vacancycommunitydetails">
        <h4>Grade: {vacancy.grade}</h4>
        <h4>Location: {vacancy.location}</h4>
        <h4>Subject: {vacancy.subject}</h4>
        <h4>Duration: {vacancy.duration}</h4>
        <h4>Salary: {vacancy.salary}</h4>
        <h4>No of students: {vacancy.grade}</h4>
        {vacancy.distance !== undefined && <h4>Distance: {(vacancy.distance / 1000).toFixed(2)} km</h4>}
        <p>{vacancy.description}</p>
        <p>Status: {vacancy.status === 'complete' ? '🔵Booked' : vacancy.status === 'pending' ? `🟡Pending (${vacancy.teachers.length} applicants)` : '🟢Available'}</p>
      </div>
      <div className="applybuttoncontainer">
        <button style={{ width: '200px' }} onClick={() => openModal(vacancy)}>Apply</button>
      </div>
    </div>
  );
};

export default TeacherVacancy;
