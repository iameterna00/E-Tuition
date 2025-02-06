import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/admin.css";
import { IoIosAddCircle } from "react-icons/io";
import DownloadImageButton from "../services/downloadimage";

const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:5001/api/vacancies"  // Local development
  : "https://kube-backend.onrender.com/api/vacancies"; 

const ADMIN = () => {
  const [vacancies, setVacancies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isCompleteTeacherModalOpen, setIsCompleteTeacherModalOpen] = useState(false);
  const [tab, setTab] = useState("available");
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

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setVacancies(res.data))
      .catch((err) => console.error("Error fetching vacancies:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, { ...formData, status: "available" });
      setVacancies([...vacancies, { ...formData, status: "available", _id: res.data.id }]);
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
        tutorType: "", // New field
        tuitionType: "Home Tuition", // New field, default to Home Tuition
        teachers: [],
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding vacancy:", err);
    }
  };

  const updateStatus = async (id, status) => {
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
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    const updatedVacancies = vacancies.map((vacancy) => {
      if (vacancy._id === vacancyId) {
        vacancy.teachers.push(teacherData);
        vacancy.status = "pending";
      }
      return vacancy;
    });
    try {
      await axios.put(`${API_URL}/${vacancyId}`, { status: "pending", teachers: updatedVacancies.find((v) => v._id === vacancyId).teachers });
      setVacancies(updatedVacancies);
      setTeacherData({ teacherName: "", commission: "" });
      setIsTeacherModalOpen(false);
    } catch (err) {
      console.error("Error updating teacher data:", err);
    }
  };

  const deleteVacancy = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setVacancies(vacancies.filter((v) => v._id !== id));
    } catch (err) {
      console.error("Error deleting vacancy:", err);
    }
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
  };

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
      <h1 className="tuition-heading">Tuition Vacancy Management</h1>
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

      {/* Vacancy List */}
      <div className="tuition-vacancy-list">
        {vacancies.filter((v) => v.status === tab).map((v) => (
          <div key={v._id} className="tuition-vacancy-card">
            <h3 className="tuition-vacancy-title">{v.name} ({v.grade}) - {v.subject}</h3>
            <p className="tuition-vacancy-info">Location: {v.location} | Students: {v.noofstudent}</p>
            <p className="tuition-vacancy-info">Salary: {v.salary} | Time: {v.time}</p>
            <p className="tuition-vacancy-info">Requirement: {v.minRequirement}</p>
            {tab === "available" && (
                <div className="uploadvacancycontainer" >
                     <DownloadImageButton vacancy={v} />
                </div>
            )}
            {tab === "pending" && (
              <div className="assignedteachers">
                <h3 className="tuition-vacancy-info">Teachers Assigned:</h3>
                {v.teachers && v.teachers.map((teacher, index) => (
                  <p key={index}>Teacher: {teacher.teacherName} | Commission: {teacher.commission}</p>
                ))}
                <div className="addteacher" onClick={() => setIsTeacherModalOpen(true)}>
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
              {tab === "available" && <button onClick={() => updateStatus(v._id, "pending")}>Move to Pending</button>}
              {tab === "pending" && (
                <>
                  <button onClick={() => updateStatus(v._id, "available")}>Move to Available</button>
                  <button onClick={() => updateStatus(v._id, "complete")}>Move to Complete</button>
                </>
              )}
              <button className="tuition-delete-button" onClick={() => deleteVacancy(v._id)}>Delete</button>
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
                  type="text"
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                />
              ))}
              <div>
                <button type="submit">Add Vacancy</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Teacher Modal */}
      {isTeacherModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
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
              <button type="submit">Assign Teacher</button>
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
            <select onChange={handleCompleteTeacherSelect}>
              <option value="">Select Teacher</option>
              {vacancies
                .find((vacancy) => vacancy._id === vacancyId)
                ?.teachers.map((teacher, index) => (
                  <option key={index} value={teacher.teacherName}>
                    {teacher.teacherName}
                  </option>
                ))}
            </select>
            <button onClick={handleConfirmComplete}>Confirm Complete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ADMIN;
