import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/admin.css";
import { IoIosAddCircle } from "react-icons/io";
import DownloadImageButton from "../services/downloadimage";
import { FaSpinner, FaEdit } from "react-icons/fa";  
import { useNavigate } from "react-router-dom";
const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:5001/api/vacancies"  // Local development
  : "https://kube-backend.onrender.com/api/vacancies"; 

const ADMIN = () => {
  const [vacancies, setVacancies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCompleteTeacherModalOpen, setIsCompleteTeacherModalOpen] = useState(false);
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
    tutorType: "", // New field
    tuitionType: "Home Tuition", // New field, default to Home Tuition
    teachers: [],
  });
  const [teacherData, setTeacherData] = useState({ teacherName: "", commission: "" });
  const [vacancyId, setVacancyId] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedTeacherCommission, setSelectedTeacherCommission] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vacancyToDelete, setVacancyToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isAssigningTeacher, setIsAssigningTeacher] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");



  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get(API_URL, {
          // Example: you can specify progress updates if your API supports it
          onDownloadProgress: (progressEvent) => {
            const totalLength = progressEvent.total;
            if (totalLength) {
              const progressPercentage = Math.round((progressEvent.loaded * 100) / totalLength);
              setProgress(progressPercentage); // Update progress state
            }
          },
        });

        setVacancies(response.data);
        setLoading(false);
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
    const res = await axios.post(API_URL, { ...formData, status: "available" });

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
        await axios.put(`${API_URL}/${id}`, updateData);
        setVacancies(vacancies.map((v) => (v._id === id ? { ...v, ...updateData } : v)));
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
    setIsUpdatingStatus(false);
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

      await axios.put(`${API_URL}/${vacancyId}`, {
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
        await axios.delete(`${API_URL}/${vacancyToDelete}`);
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
        await axios.put(`${API_URL}/${vacancyId}`, {
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
      const res = await axios.put(`${API_URL}/data/${editingVacancy._id}`, editingVacancy);
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
  

  const filteredVacancies = vacancies.filter(
    (v) =>
      (v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
      v.status === tab
  );
  
  // Calculate total vacancies, commissions, and revenue
  const availableVacancies = vacancies.filter((v) => v.status === "available").length;
  const pendingCommissions = vacancies
    .filter((v) => v.status === "pending")
    .reduce((total, vacancy) => total + vacancy.teachers.reduce((sum, teacher) => sum + parseFloat(teacher.commission || 0), 0), 0);
  const completeRevenue = vacancies
    .filter((v) => v.status === "complete")
    .reduce((total, vacancy) => total + parseFloat(vacancy.teacherCommission || 0), 0);
  

  return (
    <div className="tuition-container">
         <button onClick={() => navigate('teacher/')}>
      Go to Teacher Page
    </button>
    <h1 className="tuition-heading">Tuition Vacancy Management</h1>
    {/* 🔍 Search Bar for Vacancy Name & Location */}
    <input
      type="text"
      className="tuition-search-bar"
      placeholder="Search by Name or Location "
      value={searchQuery}
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
        {tab === "pending" && <p>Total Commissions: {pendingCommissions}</p>}
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
      <div className="tuition-vacancy-list">
      {filteredVacancies.map((v) => (
        <div key={v._id} className="tuition-vacancy-card">
          <h3 className="tuition-vacancy-title">
            {v.name} ({v.grade}) - {v.subject}
          </h3>
          <p className="tuition-vacancy-info">
            Location: {v.location} | Students: {v.noofstudent}
          </p>
          <p className="tuition-vacancy-info">Salary: {v.salary} | Time: {v.time}</p>
          {v.minRequirement && <p className="tuition-vacancy-info">Requirement: {v.minRequirement}</p>}
          <p className="tuition-vacancy-info">UploadDate: {v.created_at}</p>

          {tab === "available" && (
            <div className="uploadvacancycontainer">
              <DownloadImageButton vacancy={v} />
            </div>
            
          )}
          {tab === "pending" && (
            <div className="assignedteachers">
              <h3 className="tuition-vacancy-info">Teachers Assigned:</h3>
              {v.teachers &&
                v.teachers.map((teacher, index) => (
                  <p key={index}>
                    Teacher: {teacher.teacherName} | Commission: {teacher.commission}
                  </p>
                ))}
              <div className="addteacher" style={{ display: 'flex', gap: '5px' }} onClick={() => setIsTeacherModalOpen(true)}>
                Add More <IoIosAddCircle fontSize={25} />
              </div>
            </div>
          )}
          {tab === "complete" && (
            <div className="assignedteachers">
              <h3>Commission for {v.selectedTeacher || "No teacher assigned"}</h3>
              <p>Commission: {v.teacherCommission || "N/A"}</p>
            </div>
          )}
          <div className="tuition-action-buttons">
            {tab === "available" && (
             <>
              <button onClick={() => updateStatus(v._id, "pending")}>
                {isUpdatingStatus ? <FaSpinner className="newspinner" /> : "Move To Pending"}
              </button>
              <button onClick={() => handleEditClick(v)}>
    <FaEdit /> Edit
  </button>

              </>
            )}
            {tab === "pending" && (
              <>
                <button onClick={() => updateStatus(v._id, "available")}>Move to Available</button>
                <button onClick={() => updateStatus(v._id, "complete")}>Move to Complete</button>
              </>
            )}
            <button className="tuition-delete-button" onClick={() => handleDeleteClick(v._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>

      {/* Add Vacancy Modal */}
      <button className="floating-button" onClick={() => setIsModalOpen(!isModalOpen)}>{isModalOpen ? "X" : "Add"}</button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Vacancy</h2>
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
              {/* New Tuition Type Field */}
              <select
              style={{backgroundColor:'transparent'}}
                className="tuition-input"
                value={formData.tuitionType}
                onChange={(e) => setFormData({ ...formData, tuitionType: e.target.value })}
              >
                <option value="Home Tuition">Home Tuition</option>
                <option value="Online Tuition">Online Tuition</option>
              </select>
              <button className="tuition-button" type="submit">  {isSubmitting ? <FaSpinner className="newspinner" /> : "Add Vacancy"}</button>
            </form>
          </div>
        </div>
      )}


      {/* Assign Teacher Modal */}
      {isTeacherModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth:'500px', marginLeft:"-20px"}}>
            <h2>Assign Teacher</h2>
            <form className="tuition-form" onSubmit={handleTeacherSubmit}>
              <input
                type="text"
                name="teacherName"
                placeholder="Teacher Name"
                value={teacherData.teacherName}
                onChange={(e) => setTeacherData({ ...teacherData, teacherName: e.target.value })}
              />
              <input
                type="number"
                name="commission"
                placeholder="Commission"
                value={teacherData.commission}
                onChange={(e) => setTeacherData({ ...teacherData, commission: e.target.value })}
              />
           <div className="buttons" style={{display:"flex", gap:'10px'}}>   <button type="submit">{isAssigningTeacher ? <FaSpinner className="newspinner" /> : "Assign Teacher"}</button>
              <button className="tuition-delete-button" onClick={()=> setIsTeacherModalOpen(false)} >Cancel</button>
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
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Are you sure you want to delete this vacancy?</h2>
      <div className="modal-actions" style={{display:"flex", gap:'10px'}}>
        <button className="cancel-button" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
        <button className="tuition-delete-button" onClick={confirmDeleteVacancy}> {isDeleting ? <FaSpinner className="newspinner" /> : "Delete"}</button>
      </div>
    </div>
  </div>
)}
  {isEditModalOpen && editingVacancy && (
          <div className="modal-overlay">
          <div className="modal-content" style={{ textAlign: "start" }}>
            <h2>Edit Vacancy</h2>
            <form onSubmit={handleEditSubmit}>
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

      
              <button type="submit">Save</button>
              <button className="tuition-delete-button" style={{ marginLeft: "5px" }} type="button" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}


    </div>
  );
};

export default ADMIN;
