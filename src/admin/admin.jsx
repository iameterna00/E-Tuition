import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../css/admin.css";
import { FaSpinner, FaSearch} from "react-icons/fa";  
import { webApi } from "../api";
import { auth } from '../firebase_config'; 
import FloatingActionButton from "./floatingactionbutton";
import EditModal from "./adminmodals/editmodal";
import EditTeachers from "./adminmodals/editteachers";
import SearchTeacher from "./searchteacher";
import DeleteVacancy from "./adminmodals/deletevacancymodal";
import AddVacancyModal from "./adminmodals/addvacancymodal";
import AssignTeacherModal from "./adminmodals/assignteachermodal";
import ConfirmTeacherModal from "./adminmodals/confirmteachermodal";
import AdminVacancyCard from "./adminvacancy";


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

        return () => unsubscribe();
      } catch (err) {
        console.error("Error fetching vacancies:", err);
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);
  

const handleSubmit = async (e) => {
  e.preventDefault(); 

  if (isSubmitting) return; 

  setIsSubmitting(true);
  try {
    const res = await axios.post(`${webApi}/api/vacancies`, { ...formData, status: "available" });
    if (res.data && res.data.id) {
      setVacancies((prevVacancies) => [
        ...prevVacancies,
        { ...formData, status: "available", _id: res.data.id },
      ]);
    }
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

    setIsModalOpen(false);
  } catch (err) {
    console.error("Error adding vacancy:", err);
  } finally {
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
      setIsDeleteModalOpen(false); 
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
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        if (searchref.current) {
          searchref.current.focus();
        }
      }, 500); 
    }

  return (
    <div className="tuition-container">
    <h1 className="tuition-heading">Kube Vacancy Management</h1>
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
      <div className="tab-stats">
        {tab === "available" && <p>Total Vacancies: {availableVacancies}</p>}
        {tab === "pending" && <p>Amount Received: ( {pendingvacancylength}) Rs {pendingCommissions} DUE: Rs {pendingCommissionsdue}</p>}
        {tab === "complete" && <p>Total Revenue: {completeRevenue}</p>}
      </div>
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
          <AdminVacancyCard
            key={v._id}
            v={v}
            tab={tab}
            updateStatus={updateStatus}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            searchteacher={searchteacher}
            setIsTeacherModalOpen={setIsTeacherModalOpen}
            handleTeacherEditClick={handleTeacherEditClick}
            isUpdatingStatus={isUpdatingStatus}
            />
          ))}
        </div>
      </div>


    <FloatingActionButton adminpage={true}/>
    <button className="floating-button" style={{backgroundColor:isModalOpen? '#c12623':'rgb(1, 130, 156)', zIndex:"10000", color:"white"}} onClick={() => setIsModalOpen(!isModalOpen)}>{isModalOpen ? "X" : "Add"}  </button>
    <button className="floating-searchbutton" onClick={searchclick} >
    <FaSearch style={{marginLeft:'-10px'}} fontSize={18}/></button>

    <AddVacancyModal
    isModalOpen={isModalOpen}
    handleSubmit={handleSubmit}
    formData={formData}
    setFormData={setFormData}
    isSubmitting={isSubmitting}
    />



    <AssignTeacherModal
    isTeacherModalOpen={isTeacherModalOpen}
    setIsTeacherModalOpen={setIsTeacherModalOpen}
    handleTeacherSubmit={handleTeacherSubmit}
    teacherData={teacherData}
    setTeacherData={setTeacherData}
    isAssigningTeacher={isAssigningTeacher}
    handleSubmitOnDue={handleSubmitOnDue}
    />

    <ConfirmTeacherModal
    isCompleteTeacherModalOpen={isCompleteTeacherModalOpen}
    setIsCompleteTeacherModalOpen={setIsCompleteTeacherModalOpen}
    handleCompleteTeacherSelect={handleCompleteTeacherSelect}
    handleConfirmComplete={handleConfirmComplete}
    vacancies={vacancies}
    vacancyId={vacancyId}
    />

  <DeleteVacancy
    isDeleteModalOpen={isDeleteModalOpen}
    setIsDeleteModalOpen={setIsDeleteModalOpen}
    confirmDeleteVacancy={confirmDeleteVacancy}
    isDeleting={isDeleting}
    />

  <SearchTeacher
    searchTeacher={searchTeacher}
    selectedVacancy={selectedVacancy}
    setSearchTeacher={setSearchTeacher}
    />

  <EditModal
    isEditModalOpen={isEditModalOpen}
    editingVacancy={editingVacancy}
    handleEditChange={handleEditChange}
    setEditingVacancy={setEditingVacancy}
    setIsEditModalOpen={setIsEditModalOpen}
    formRef={formRef}
    handleEditSubmit={handleEditSubmit}
    />
  <EditTeachers
    isEditteacherModalOpen={isEditteacherModalOpen}
    editingVacancy={editingVacancy}
    handleEditChange={handleEditChange}
    handleEditSubmit={handleEditSubmit}
    setIsteacherEditModalOpen={setIsteacherEditModalOpen}
    />


    </div>
  );
};

export default ADMIN;
