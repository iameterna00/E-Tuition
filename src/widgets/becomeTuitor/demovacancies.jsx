import React, { useState, useEffect } from 'react';
import { webApi } from '../../api';
import { FaChalkboardTeacher, FaMoneyBill, FaMoneyBillWave } from 'react-icons/fa';
import { RiFocus2Line } from "react-icons/ri";
import { IoIosSend } from 'react-icons/io';
import { FaBook, FaClock, FaGraduationCap, FaLocationDot, FaUser, FaUserGroup } from "react-icons/fa6";

const DemoVacancy = ({login}) => {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    // Fetch the vacancies from your API
    fetch(`${webApi}/api/demo_vacancies`) // Replace with your correct API endpoint
      .then((response) => response.json())
      .then((data) => {
        setVacancies(data.slice(0, 6)); // Limit to the top 5 vacancies
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching vacancies:', error);
      });
  }, []);

  return (
    <div className="vacancy-grid-container" style={{display:"flex", width:"100%", justifyContent:"center", alignItems:'center', flexDirection:"column"}}>
      <h2>Vacancies For Private Teachers</h2>
      <p style={{marginTop:"-20px", marginBottom:"10px"}} >Kube helps private tuitors to find their best placements</p>
      <div className="vacancy-grid" style={{display:'flex', justifyContent:"center", alignItems:"center", width:"100%", flexWrap:"wrap", gap:"10px"}}>
        {vacancies.map((vacancy) => (
           <div style={{width:"100%", maxWidth:"400px"}} key={vacancy.id} className="vaccancydemocard">
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
                    <h4><FaChalkboardTeacher color="teal" /> Grade: {vacancy.grade}</h4>
                           <h4><FaLocationDot color="teal"  /> Location: {vacancy.location ? vacancy.location : 'Online'}</h4>
                           <h4><FaBook color="teal" /> Subject: {vacancy.subject}</h4>
                           <h4><FaClock color="teal" /> Time: {vacancy.time}</h4>
                           <h4><FaGraduationCap color="teal" /> No of students: {vacancy.noofstudents}</h4>
                           <h4><FaUser color="teal" /> Tutor Type: {vacancy.tutorType ? vacancy.tutorType : 'Any'}</h4>
                  <div className="minrequirements">
                  <h4 style={{display:"flex", alignItems:'center', gap:"5px", fontSize:"18px"}}><RiFocus2Line size={25}/>Requirement:</h4>
                  <p style={{marginLeft:"10px", fontWeight:"600"}}> {vacancy.minRequirement}</p>
                  </div>
                  
                   <p>{vacancy.description}</p>
                 
                 </div>
                 <h3 style={{margin:"10px", display:"flex", gap:"10px", justifyContent:"center", alignItems:'center'}}><FaMoneyBillWave color='rgb(0, 200, 0)' size={30}/>Salary: {vacancy.salary}</h3>
                 <div className="applybuttoncontainer" style={{display:"flex", justifyContent:'center', alignItems:"center", width:'100%'}}>
                   <button style={{ width: '100%', maxWidth:"300px", display:'flex', alignItems:"center", gap:"5px", justifyContent:"center" }} onClick={login}><IoIosSend size={30}/><h3>Apply</h3></button>
                 </div>
               </div>
         </div>
        ))}
      </div>
    </div>
  );
};

export default DemoVacancy;
