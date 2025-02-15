import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { webApi } from '../../api';
import KUBE from '../../assets/newcube.png';

function TeacherVacancy() {
  const [vacancies, setVacancies] = useState([]);
  const [activeTab, setActiveTab] = useState('available'); // "available" or "booked"

  // Fetch vacancies
  useEffect(() => {
    axios
      .get(`${webApi}/api/vacancies`)
      .then((response) => setVacancies(response.data))
      .catch((error) => console.error('Error fetching vacancies:', error));
  }, []);

  // Filter vacancies
  const availableAndPending = vacancies
    .filter(vacancy => vacancy.status !== 'complete') // Get only available & pending
    .sort((a, b) => (a.status === 'available' ? -1 : 1)); // Show available at top

  const bookedVacancies = vacancies.filter(vacancy => vacancy.status === 'complete');

  return (
    <div className="teachervacancybody">
      <h2>Teacher Vacancies</h2>

      {/* Tabs */}
      <div className="Vacancytabs">
        <button className={activeTab === 'available' ? 'active' : ''} onClick={() => setActiveTab('available')}>
          Available & Pending
        </button>
        <button className={activeTab === 'booked' ? 'active' : ''} onClick={() => setActiveTab('booked')}>
          Booked
        </button>
      </div>

      <div className="vacancy-list">
        {activeTab === 'available' ? (
          availableAndPending.length === 0 ? (
            <p>No available vacancies</p>
          ) : (
            availableAndPending.map((vacancy) => (
              <VacancyCard key={vacancy._id} vacancy={vacancy} />
            ))
          )
        ) : (
          bookedVacancies.length === 0 ? (
            <p>No booked vacancies</p>
          ) : (
            bookedVacancies.map((vacancy) => (
              <VacancyCard key={vacancy._id} vacancy={vacancy} />
            ))
          )
        )}
      </div>
    </div>
  );
}

// Vacancy Card Component
const VacancyCard = ({ vacancy }) => {
  return (
    <div className='vacancycommunitycard'>
      <div className="vacancycommunitygraphics">
        <div className="vacancycommunitygraphicsinsiders">
          <img src={KUBE} className='kubegraphics' alt="" />
          <h3>{vacancy.tuitiontype === 'Home Tuition' ? 'KUBE HOME TUTION' : 'KUBE ONLINE TUITION'}</h3>
        </div>
      </div>
      <div className="vacancycommunitydetails">
        <h4>Grade: {vacancy.grade}</h4>
        <h4>Location: {vacancy.location}</h4>
        <h4>Subject: {vacancy.subject}</h4>
        <h4>Duration: {vacancy.duration}</h4>
        <h4>Salary: {vacancy.salary}</h4>
        <h4>No of students: {vacancy.grade}</h4>
        <p>{vacancy.description}</p>
        <p>Status: {vacancy.status === 'complete' ? '🔵Booked' : 
                    vacancy.status === 'pending' ? `🟡Pending (${vacancy.teachers.length} applicants)` : 
                    '🟢Available'}</p>
      </div>
      <div className="applybuttoncontainer">
        <button style={{width:"200px"}}>Apply</button>
      </div>
    </div>
  );
}

export default TeacherVacancy;
