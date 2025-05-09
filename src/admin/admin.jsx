import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../css/admin.css";
import { IoIosAddCircle } from "react-icons/io";
import DownloadImageButton from "../services/downloadimage";
import { FaSpinner, FaEdit, FaSearch, FaRegCopy } from "react-icons/fa";  
import { useNavigate } from "react-router-dom";
import MapSelector from "./mapselectoradmin";
import EditableMapSelector from "./editablemaps";
import { webApi } from "../api";
import { auth } from '../firebase_config'; 
import { GoClock } from "react-icons/go";
import { LuDollarSign, LuTarget } from "react-icons/lu";
import { MdDoneOutline, MdOutlineLocationOn, MdOutlineSchool } from "react-icons/md";
import { BsSuitcaseLg } from "react-icons/bs";
import { IoBookOutline } from "react-icons/io5";
import { SlCalender, SlSymbolMale } from "react-icons/sl";
import { RiDeleteBinLine } from "react-icons/ri";
import FloatingActionButton from "./floatingactionbutton";
import TeacherLocations from "./teacherfinder";
import { TiArrowBackOutline } from "react-icons/ti";


const ADMIN = () => {
  const [vacancies, setVacancies] = useState([]);
  const formRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditteacherModalOpen, setIsteacherEditModalOpen] = useState(false);
  const [isCompleteTeacherModalOpen, setIsCompleteTeacherModalOpen] = useState(false);
  const [searchTeacher, setSearchTeacher] = useState(false);
  const [tab, setTab] = useState("available");
  const [editingVacancy, setEditingVacancy] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    location: "",
    students: "",
    subject: "",
    duration: "",
    salary: "",
    time: "",
    minRequirement: "",
    tutorType: "", 
    tuitionType: "Home Tuition", 
    teachers: [],
    lat: null,
    lng: null
  });
  const [teacherData, setTeacherData] = useState({ teacherName: "", commission: "", commissionDue:"" });
  const [vacancyId, setVacancyId] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedTeacherCommission, setSelectedTeacherCommission] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vacancyToDelete, setVacancyToDelete] = useState(null);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isAssigningTeacher, setIsAssigningTeacher] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const searchref = useRef(null);



  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        // Wait until auth state is available
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            const token = await user.getIdToken();

            const response = await axios.get(`${webApi}/api/vacancies`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              onDownloadProgress: (progressEvent) => {
                const totalLength = progressEvent.total;
                if (totalLength) {
                  const progressPercentage = Math.round(
                    (progressEvent.loaded * 100) / totalLength
                  );
                  setProgress(progressPercentage);
                }
              },
            });

            setVacancies(response.data);
          } else {
            console.warn("⚠️ No user logged in.");
          }
          setLoading(false);
        });

        return () => unsubscribe(); // Cleanup
      } catch (err) {
        console.error("Error fetching vacancies:", err);
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);
  

const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  if (isSubmitting) return; // Prevent multiple submissions when the button is spammed

  setIsSubmitting(true); // Set the submitting state to true to disable the button
  try {
    // Send the POST request to the API
    const res = await axios.post(`${webApi}/api/vacancies`, { ...formData, status: "available" });

    // Ensure that a valid response is received before updating state
    if (res.data && res.data.id) {
      setVacancies((prevVacancies) => [
        ...prevVacancies,
        { ...formData, status: "available", _id: res.data.id },
      ]);
    }

    // Reset the form fields after successful submission
    setFormData({
      name: "",
      grade: "",
      location: "",
      noofstudents: "",
      subject: "",
      duration: "",
      salary: "",
      time: "",
      minRequirement: "",
      tutorType: "", 
      tuitionType: "Home Tuition",
      teachers: [],
      lat: null, 
      lng: null
    });

    // Close the modal after successfully adding a vacancy
    setIsModalOpen(false);
  } catch (err) {
    console.error("Error adding vacancy:", err);
  } finally {
    // Ensure isSubmitting is reset, even if there's an error
    setIsSubmitting(false);
  }
};


  const updateStatus = async (id, status) => {
    setIsUpdatingStatus(true);
    try {
      const updateData = { status };
      if (status === "pending") {
        setVacancyId(id);
        setIsTeacherModalOpen(true);
      } else if (status === "complete") {
        setVacancyId(id);
        setIsCompleteTeacherModalOpen(true);
      } else {
        await axios.put(`${webApi}/api/vacancies/${id}`, updateData);
        setVacancies(vacancies.map((v) => (v._id === id ? { ...v, ...updateData } : v)));
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
    setIsUpdatingStatus(false);
  };


  const handleSubmitOnDue = async () => {
    setIsAssigningTeacher(true);
  
    if (!vacancyId) {
      console.error("No vacancy selected for teacher assignment (due)!");
      return;
    }
  
    // Set commissionDue instead of commission
    const dueTeacher = {
      teacherName: teacherData.teacherName,
      commission: "", 
      commissionDue: teacherData.commission,
    };
  
    console.log("Submitting teacher on due:", dueTeacher, "to vacancy ID:", vacancyId);
  
    try {
      const updatedVacancies = vacancies.map((vacancy) => {
        if (vacancy._id === vacancyId) {
          return {
            ...vacancy,
            teachers: [...vacancy.teachers, dueTeacher],
            status: "pending",
          };
        }
        return vacancy;
      });
  
      await axios.put(`${webApi}/api/vacancies/${vacancyId}`, {
        status: "pending",
        teachers: updatedVacancies.find((v) => v._id === vacancyId).teachers,
      });
  
      console.log("Teacher submitted on due successfully");
      setVacancies(updatedVacancies);
      setTeacherData({ teacherName: "", commission: "", commissionDue: "" });
      setIsTeacherModalOpen(false);
    } catch (err) {
      console.error("Error updating due teacher data:", err.response ? err.response.data : err);
    }
  
    setIsAssigningTeacher(false);
  };
  


  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    setIsAssigningTeacher(true);
    if (!vacancyId) {
      console.error("No vacancy selected for teacher assignment!");
      return;
    }
    console.log("Adding teacher:", teacherData, "to vacancy ID:", vacancyId);

    try {
      const updatedVacancies = vacancies.map((vacancy) => {
        if (vacancy._id === vacancyId) {
          return {
            ...vacancy,
            teachers: [...vacancy.teachers, teacherData],
            status: "pending",
          };
        }
        return vacancy;
      });

      await axios.put(`${webApi}/api/vacancies/${vacancyId}`, {
        status: "pending",
        teachers: updatedVacancies.find((v) => v._id === vacancyId).teachers,
      });

      console.log("Teacher assigned successfully");
      setVacancies(updatedVacancies);
      setTeacherData({ teacherName: "", commission: "" });
      setIsTeacherModalOpen(false);
    } catch (err) {
      console.error("Error updating teacher data:", err.response ? err.response.data : err);
    }
    setIsAssigningTeacher(false);
  };



  const confirmDeleteVacancy = async () => {
    setIsDeleting(true);
    try {
      if (vacancyToDelete) {
        await axios.delete(`${webApi}/api/vacancies/${vacancyToDelete}`);
        setVacancies(vacancies.filter((v) => v._id !== vacancyToDelete));
      }
      setIsDeleteModalOpen(false); // Close the modal after deletion
    } catch (err) {
      console.error("Error deleting vacancy:", err);
    }
    setIsDeleting(false);
  };
  

  const handleCompleteTeacherSelect = (e) => {
    const selectedTeacherName = e.target.value;
    setSelectedTeacher(selectedTeacherName);

    const selectedTeacherData = vacancies
      .find((vacancy) => vacancy._id === vacancyId)
      ?.teachers.find((teacher) => teacher.teacherName === selectedTeacherName);

    if (selectedTeacherData) {
      setSelectedTeacherCommission(selectedTeacherData.commission);
    } else {
      setSelectedTeacherCommission("");
    }
  };

  const handleConfirmComplete = async () => {
    setIsCompleting(true);
    if (selectedTeacher) {
      try {
        await axios.put(`${webApi}/api/vacancies/${vacancyId}`, {
          status: "complete",
          selectedTeacher,
          teacherCommission: selectedTeacherCommission
        });
        setVacancies(vacancies.map((v) =>
          v._id === vacancyId ? { ...v, status: "complete", selectedTeacher, teacherCommission: selectedTeacherCommission } : v
        ));
        setIsCompleteTeacherModalOpen(false);
      } catch (err) {
        console.error("Error confirming completion:", err);
      }
    } else {
      alert("Please select a teacher.");
    }
    setIsCompleting(true);
  };


    const handleDeleteClick = (id) => {
    setVacancyToDelete(id);
    setIsDeleteModalOpen(true);
  };

  
  const handleEditClick = (vacancy) => {
    setEditingVacancy(vacancy);
    setIsEditModalOpen(true);
  };
  const handleTeacherEditClick = (vacancy) => {
    setEditingVacancy(vacancy);
    setIsteacherEditModalOpen(true);
  };
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingVacancy((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingVacancy) return;
  
    console.log("Submitting Edit:", editingVacancy);
  
    try {
      const res = await axios.put(`${webApi}/api/vacancies/data/${editingVacancy._id}`, editingVacancy);
      console.log('this is res ', res)
  
      if (res.status === 200) {
        setVacancies((prevVacancies) =>
          prevVacancies.map((v) =>
            v._id === editingVacancy._id ? { ...v, ...editingVacancy } : v
          )
        );
        setIsEditModalOpen(false);
        setEditingVacancy(null);
      }
    } catch (err) {
      console.error("Error updating vacancy:", err.response?.data || err);
      alert("Error updating vacancy: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  const searchteacher = (v) =>{
    setSelectedVacancy(v)
    setSearchTeacher(true)
  }
  
  

  const filteredVacancies = vacancies.filter(
    (v) =>
      (v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
      v.status === tab
  )
  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
  // Calculate total vacancies, commissions, and revenue
  const availableVacancies = vacancies.filter((v) => v.status === "available").length;
  const pendingvacancylength = vacancies.filter((v) => v.status === "pending").length;
  const pendingCommissions = vacancies
    .filter((v) => v.status === "pending")
    .reduce((total, vacancy) => total + vacancy.teachers.reduce((sum, teacher) => sum + parseFloat(teacher.commission || 0), 0), 0);
  const pendingCommissionsdue = vacancies
    .filter((v) => v.status === "pending")
    .reduce((total, vacancy) => total + vacancy.teachers.reduce((sum, teacher) => sum + parseFloat(teacher.commissionDue || 0), 0), 0);
  const completeRevenue = vacancies
    .filter((v) => v.status === "complete")
    .reduce((total, vacancy) => total + parseFloat(vacancy.teacherCommission || 0), 0);
  
    const searchclick = () => {
      // Scroll to the top
      window.scrollTo({ top: 0, behavior: "smooth" });
  
      // Focus on the search input
      setTimeout(() => {
        if (searchref.current) {
          searchref.current.focus();
        }
      }, 500); // Adding slight delay to ensure smooth focus
    }

  return (
    <div className="tuition-container">
    <h1 className="tuition-heading">Kube Vacancy Management</h1>
    {/* 🔍 Search Bar for Vacancy Name & Location */}
    <input
      type="text"
      className="tuition-search-bar"
      placeholder="Search by Name or Location "
      value={searchQuery}
      ref={searchref}
      onChange={(e) => setSearchQuery(e.target.value)}
    />

    <div className="tuition-tabs">
      {["available", "pending", "complete"].map((status) => (
        <button
          key={status}
          className={`tuition-tab ${tab === status ? "tuition-tab-active" : ""}`}
          onClick={() => setTab(status)}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
      {/* Display calculated values below tabs */}
      <div className="tab-stats">
        {tab === "available" && <p>Total Vacancies: {availableVacancies}</p>}
        {tab === "pending" && <p>Amount Received: ( {pendingvacancylength}) Rs {pendingCommissions} DUE: Rs {pendingCommissionsdue}</p>}
        {tab === "complete" && <p>Total Revenue: {completeRevenue}</p>}
      </div>
        {/* Loading screen */}
    {loading && (
        <div className="loading-screen">
          <FaSpinner className="newspinner" />
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="loading-text">{progress}%</div>
        </div>
      )}


      {/* Vacancy List */}
  <div className="vacancy-wrapper">
  <div className="tuition-vacancy-list">
      {filteredVacancies.map((v) => (
        <div key={v._id} className="tuition-vacancy-card" style={{ borderLeft: `${
          v.teachers?.some((teacher) => teacher.commissionDue)
            ? '5px solid red'
            : '5px solidrgb(255, 255, 255)'
        }`,
        }} >
<h3 className="tuition-vacancy-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  {v.name}
  <button
  className="copyname"
    onClick={() => navigator.clipboard.writeText(v.name)}
    title="Copy name"
    style={{
      cursor: 'pointer',
      backgroundColor:'transparent',
      borderColor:'none',
      padding: 0,
    }}
  >
    <FaRegCopy />
  </button>
</h3>

          <p className="tuition-vacancy-info">
            <MdOutlineLocationOn color="teal" fontSize={20}/> {v.location}
          </p>
          <p className="tuition-vacancy-info">
            <MdOutlineSchool color="teal" fontSize={20} />Grade: {v.grade}
          </p>
          <p className="tuition-vacancy-info">
            <IoBookOutline color="teal" fontSize={20}/>Subject: {v.subject}
          </p>
          <p className="tuition-vacancy-info">
            <SlSymbolMale color="teal" fontSize={20}/>Gender: {v.tutorType}
          </p>
          <p className="tuition-vacancy-info"><LuDollarSign color="teal" fontSize={16} />Salary: {v.salary}</p>
          <p><BsSuitcaseLg color="teal" fontSize={16} /> Time: {v.time}</p>
          {v.minRequirement && <p className="tuition-vacancy-info"><LuTarget color="teal" fontSize={18}/>Requirement: {v.minRequirement}</p>}
          <p className="tuition-vacancy-info" style={{display:"flex", justifyContent:"center", alignItems:'center', gap:"5px"}} >
          <SlCalender color="teal"/> UploadDate: {new Date(v.created_at).toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true, // Set to true for 12-hour format with AM/PM
            })}
</p>


          {tab === "available" && (
            <div className="uploadvacancycontainer">
              <DownloadImageButton color="teal" vacancy={v} />
              <div className="addtowebsite"><button onClick={()=> searchteacher(v)} className="generateVacancy">Find Teacher</button></div>
            </div>
         
            
          )}
          {tab === "pending" && (
            <div className="assignedteachers">
              <h3 className="tuition-vacancy-info">Teachers Assigned:</h3>
              {v.teachers &&
                v.teachers.map((teacher, index) => (
                  <div key={index}>
                   <p> Teacher: {teacher.teacherName} {teacher.commission && `| Commission: ${teacher.commission}`}
                   {teacher.commissionDue && `| Due: ${teacher.commissionDue}`} </p>
                 
                  </div>
                ))}
           <div className="teachersandcommission" style={{display:'flex', gap:'10px', cursor:'pointer' }} >
           <div className="addteacher" style={{ display: 'flex', gap: '5px',}} onClick={() => setIsTeacherModalOpen(true)}>
                Add More <IoIosAddCircle fontSize={25} />
              </div>
              <div className="addteacher" style={{ display: 'flex', gap: '5px' }} onClick={() => handleTeacherEditClick(v)}>
                Edit Teacher <FaEdit  fontSize={25} />
              </div>
           </div>
            </div>
          )}
          {tab === "complete" && (
            <div className="assignedteachers">
              <h3>Commission for {v.selectedTeacher || "No teacher assigned"}</h3>
              <p>Commission: {v.teacherCommission || "0"}</p>
            </div>
          )}
          <div className="tuition-action-buttons">
            {tab === "available" && (
             <>
              <button className="generateVacancy" onClick={() => updateStatus(v._id, "pending")}>
              {isUpdatingStatus ? (
                <FaSpinner className="newspinner" />
              ) : (
                <>
                  <GoClock style={{ marginRight: "4px" }} />
                  Pending
                </>
              )}

              </button>
              <button className="generateVacancy" onClick={() => handleEditClick(v)}>
    <FaEdit /> Edit
  </button>

              </>
            )}
            {tab === "pending" && (
              <>
                <button className="generateVacancy"  onClick={() => updateStatus(v._id, "available")}><TiArrowBackOutline />Available</button>
                <button className="generateVacancy" onClick={() => updateStatus(v._id, "complete")}><MdDoneOutline scalfe={12} />Complete</button>
              </>
            )}
            <button className="tuition-delete-button" onClick={() => handleDeleteClick(v._id)}> <RiDeleteBinLine/></button>
          </div>
        </div>
      ))}
    </div>
  </div>

      {/* Add Vacancy Modal */}
      <FloatingActionButton adminpage={true}/>
      <button className="floating-button" style={{backgroundColor:isModalOpen? '#c12623':'rgb(1, 130, 156)', zIndex:"10000", color:"white"}} onClick={() => setIsModalOpen(!isModalOpen)}>{isModalOpen ? "X" : "Add"}  </button>
      <button className="floating-searchbutton" onClick={searchclick} ><FaSearch style={{marginLeft:'-10px'}} fontSize={18}/></button>
      {isModalOpen && (
  <div className="modal-overlay">
  <div className="modal-content">
    <div className="modalcontentinsiders">
      <h2 className="tuition-heading">Add Vacancy</h2>
      <form className="tuition-form" onSubmit={handleSubmit}>
        {["name", "grade", "location", "noofstudents", "subject", "duration", "salary", "time", "minRequirement"].map((field) => (
          <input
            key={field}
            className="tuition-input"
            type={field === "noofstudents" ? "number" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          />
        ))}
        <input
          className="tuition-input"
          type="text"
          placeholder="Tutor Type"
          value={formData.tutorType}
          onChange={(e) => setFormData({ ...formData, tutorType: e.target.value })}
        />
        <select
          className="tuition-input"
          style={{ backgroundColor: 'transparent' }}
          value={formData.tuitionType}
          onChange={(e) => setFormData({ ...formData, tuitionType: e.target.value })}
        >
          <option value="Home Tuition">Home Tuition</option>
          <option value="Online Tuition">Online Tuition</option>
        </select>
        <h4 style={{ margin: "0px" }}>Tap the location of student</h4>
        <MapSelector formData={formData} setFormData={setFormData} />
      </form>
    </div>

    {/* Fixed button outside the form */}
    <div className="modal-submit-container">
      <button className="tuition-button" type="submit" onClick={handleSubmit}>
        {isSubmitting ? <FaSpinner className="newspinner" /> : "Add Vacancy"}
      </button>
    </div>
  </div>
</div>

)}


      {/* Assign Teacher Modal */}
      {isTeacherModalOpen && (
        <div className="modal-overlay" style={{justifyContent:"center", alignItems:"center"}}>
          <div className="modal-content" style={{maxWidth:'500px', marginLeft:"-20px"}}>
            <h2>Assign Teacher</h2>
            <form className="tuition-form" onSubmit={handleTeacherSubmit}>
              <input
              style={{borderRadius:"10px"}}
                type="text"
                name="teacherName"
                placeholder="Teacher Name"
                value={teacherData.teacherName}
                onChange={(e) => setTeacherData({ ...teacherData, teacherName: e.target.value })}
              />
              
              <input
               style={{borderRadius:"10px"}}
                type="number"
                name="commission"
                placeholder="Commission"
                value={teacherData.commission}
                onChange={(e) => setTeacherData({ ...teacherData, commission: e.target.value })}
              />
         <div className="buttons" style={{ display: "flex", gap: '10px' }}>
  <button type="submit">
    {isAssigningTeacher ? <FaSpinner className="newspinner" /> : "Assign Teacher"}
  </button>
  <button
    type="button"
    onClick={handleSubmitOnDue}
    className="submit-due-button"
  >
    Submit on Due
  </button>
  <button
    className="tuition-delete-button"
    type="button"
    onClick={() => setIsTeacherModalOpen(false)}
  >
    Cancel
  </button>
</div>

            </form>
          </div>
        </div>
      )}

      {/* Confirm Complete Teacher Modal */}
      {isCompleteTeacherModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Complete Vacancy</h2>
            <label>Select Teacher</label>
            <select style={{padding:"10px"}} onChange={handleCompleteTeacherSelect}>
              <option value="">Select Teacher</option>
              {vacancies
                .find((vacancy) => vacancy._id === vacancyId)
                ?.teachers.map((teacher, index) => (
                  <option key={index} value={teacher.teacherName}>
                    {teacher.teacherName} {teacher.commission}
                  </option>
                ))}
            </select>
            <button onClick={handleConfirmComplete}>Confirm Complete</button>
            <button className="tuition-delete-button" onClick={()=> setIsCompleteTeacherModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
  <div className="modal-overlay" style={{justifyContent:"center", alignItems:"center"}}>
    <div className="modal-content">
      <h2>Are you sure you want to delete this vacancy?</h2>
      <div className="modal-actions" style={{display:"flex", gap:'10px'}}>
        <button className="cancel-button" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
        <button className="tuition-delete-button" onClick={confirmDeleteVacancy}> {isDeleting ? <FaSpinner className="newspinner" /> : "Delete"}</button>
      </div>
    </div>
  </div>
)}

{searchTeacher && (
  <div className="modal-overlaysearchteacher" style={{justifyContent:"center", alignItems:"center"}}>
    <div className="modal-contentsearchteacher" style={{padding:"20px"}}>
      <h2>Find Tutors</h2>
    <TeacherLocations 
    vlat={selectedVacancy.lat}
    vlng={selectedVacancy.lng}
    />
      <div className="modal-actionscontentsearchteacher" style={{display:"flex", gap:'10px'}}>
        <button className="cancel-button" style={{marginTop:'20px', backgroundColor:"red", color:'white'}}  onClick={() => setSearchTeacher(false)}>Close</button>
      
      </div>
    </div>
  </div>
)}
  {isEditModalOpen && editingVacancy && (
          <div className="modal-overlay"  style={{display:"flex", flexDirection:"column",alignItems:'start', justifyContent:'flex-start' }}>
          <div className="modal-content" style={{ textAlign: "start", height:"90vh", }}>
            <h2>Edit Vacancy</h2>
            <form  className="editformvacancy"
              ref={formRef}
              onSubmit={handleEditSubmit}>
              <p style={{ margin: "0px" }}>Name</p>
              <input
                type="text"
                name="name"
                value={editingVacancy.name || ""}
                onChange={handleEditChange}
              />
      
              <p style={{ margin: "0px" }}>Location</p>
              <input
                type="text"
                name="location"
                value={editingVacancy.location || ""}
                onChange={handleEditChange}
              />
      
              <p style={{ margin: "0px" }}>Salary</p>
              <input
                type="text"
                name="salary"
                value={editingVacancy.salary || ""}
                onChange={handleEditChange}
              />
              <p style={{ margin: "0px" }}>Grade</p>

                 <input
                type="text"
                name="grade"
                value={editingVacancy.grade || ""}
                onChange={handleEditChange}
              />
      
              {/* New Fields */}
              <p style={{ margin: "0px" }}>Time</p>
              <input
                type="text"
                name="time"
                value={editingVacancy.time || ""}
                onChange={handleEditChange}
              />
      
              <p style={{ margin: "0px" }}>Tutor Type</p>
             
              <input
                type="text"
                name="tutorType"
                value={editingVacancy.tutorType || ""}
                onChange={handleEditChange}
              />
              <p style={{ margin: "0px" }}>duration</p>

               <input
                type="text"
                name="duration"
                value={editingVacancy.duration || ""}
                onChange={handleEditChange}
              />
               <p>subject</p>
                  <input
                type="text"
                name="subject"
                value={editingVacancy.subject || ""}
                onChange={handleEditChange}
              />
              <p>Min-Requirement</p>
                  <input
                type="text"
                name="minRequirement"
                value={editingVacancy.minRequirement || ""}
                onChange={handleEditChange}
              />
          <EditableMapSelector editingVacancy={editingVacancy} setEditingVacancy={setEditingVacancy} />

            </form>
          </div>
               <div className="editvacancybuttions" style={{margin:"10px", width:"100%", justifyContent:'center', display:'flex', gap:"10px"}}>
             <button style={{ width:"60%",maxWidth:"250px" }}  onClick={() => formRef.current?.requestSubmit()}>Save</button>
              <button className="tuition-delete-button" style={{ width:"30%", maxWidth:"200px" }} type="button" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </button>
             </div>
        </div>
      )}
       {isEditteacherModalOpen && editingVacancy && (
  <div className="modal-overlay">
    <div className="modal-content" style={{ textAlign: "start" }}>
      <h2>Edit Teachers </h2>
      <form  onSubmit={handleEditSubmit}>

        {editingVacancy.teachers?.map((teacher, index) => (
          <div className="teacheredits" key={index} style={{ marginBottom: "10px" }}>
            <p style={{ margin: "0px" }}>Teacher {index + 1}</p>

            {/* Editable Teacher Name */}
            <input
            style={{borderRadius:"10px"}}
              type="text"
              name={`teacherName-${index}`}
              value={teacher.teacherName || ""}
              onChange={(e) => {
                const updatedTeachers = [...editingVacancy.teachers];
                updatedTeachers[index] = {
                  ...updatedTeachers[index],
                  teacherName: e.target.value,
                };
                handleEditChange({ target: { name: "teachers", value: updatedTeachers } });
              }}
            />

            {/* Editable Commission */}
    <>
          <p style={{ margin: "0px" }}>Commission</p>
          <input
          style={{borderRadius:"10px"}}
            type="number"
            name={`commission-${index}`}
            value={teacher.commission || ""}
            onChange={(e) => {
              const updatedTeachers = [...editingVacancy.teachers];
              updatedTeachers[index] = {
                ...updatedTeachers[index],
                commission: e.target.value,
              };
              handleEditChange({ target: { name: "teachers", value: updatedTeachers } });
            }}
          /></>
    
          
        <>
          <p style={{ margin: "0px", color:"red" }}>CommissionDue</p>
          <input
          style={{borderRadius:"10px"}}
            type="number"
            name={`commissionDue-${index}`}
            value={teacher.commissionDue || ""}
            onChange={(e) => {
              const updatedTeachers = [...editingVacancy.teachers];
              updatedTeachers[index] = {
                ...updatedTeachers[index],
                commissionDue: e.target.value,
              };
              handleEditChange({ target: { name: "teachers", value: updatedTeachers } });
            }}
          /></>
     
          </div>
        ))}


        <button type="submit">Save</button>
        <button className="tuition-delete-button" style={{marginLeft:'10px'}} onClick={()=> setIsteacherEditModalOpen(false)} >Cancel</button>
      </form>
    </div>
  </div>
)}


    </div>
  );
};

export default ADMIN;
