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
        students: "",
        subject: "",
        duration: "",
        salary: "",
        time: "",
        minRequirement: "",
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

      {/* Vacancy List */}
      <div className="tuition-vacancy-list">
        {vacancies.filter((v) => v.status === tab).map((v) => (
          <div key={v._id} className="tuition-vacancy-card">
            <h3 className="tuition-vacancy-title">{v.name} ({v.grade}) - {v.subject}</h3>
            <p className="tuition-vacancy-info">Location: {v.location} | Students: {v.students}</p>
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
              {["name", "grade", "location", "students", "subject", "duration", "salary", "time", "minRequirement"].map((field) => (
                <input
                  key={field}
                  className="tuition-input"
                  type={field === "students" ? "number" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  required
                />
              ))}
              <button className="tuition-button" type="submit">Add Vacancy</button>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Modal */}
      {isTeacherModalOpen && (
        <div className="teachermodal-overlay">
          <div className="teachermodal-content">
            <h2>Add Teacher Details</h2>
            <form onSubmit={handleTeacherSubmit}>
              <input className="tuition-input" type="text" placeholder="Teacher Name" value={teacherData.teacherName} onChange={(e) => setTeacherData({ ...teacherData, teacherName: e.target.value })} required />
              <input className="tuition-input" type="text" placeholder="Commission" value={teacherData.commission} onChange={(e) => setTeacherData({ ...teacherData, commission: e.target.value })} required />
              <button type="submit" className="tuition-button">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Complete Teacher Modal */}
      {isCompleteTeacherModalOpen && (
        <div className="teachermodal-overlay">
          <div className="teachermodal-content">
            <h2>Select a Teacher</h2>
            <select onChange={handleCompleteTeacherSelect} value={selectedTeacher} required>
              <option value="">Select a teacher</option>
              {vacancies
                .find((vacancy) => vacancy._id === vacancyId)
                ?.teachers.map((teacher) => (
                  <option key={teacher.teacherName} value={teacher.teacherName}>
                    {teacher.teacherName}
                  </option>
                ))}
            </select>
            <p>Commission: {selectedTeacherCommission}</p>
            <button onClick={handleConfirmComplete}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ADMIN;
