import { useState, useEffect } from "react";
import axios from "axios";
import { webApi } from "../api";
import { FaSearch } from "react-icons/fa";
import "./teachermanager.css";
import FloatingActionButton from "./floatingactionbutton";
import UserCard from "./usercards";

function TeacherManager() {
  const [tab, setTab] = useState("Pending");
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]); // New state for all users

  // Fetch teachers when component mounts
  useEffect(() => {
    axios
      .get(`${webApi}/api/teachers`)
      .then((res) => {
        if (res.data && Array.isArray(res.data.teachers)) {
          setTeachers(res.data.teachers);
        }
      })
      .catch((err) => console.error("Error fetching teachers:", err));
  }, []);

  // Fetch all users when All Users tab is selected
  useEffect(() => {
    if (tab === "All Users") {
      axios
        .get(`${webApi}/api/all-users`)
        .then((res) => {
          if (res.data && Array.isArray(res.data.users)) {
            setAllUsers(res.data.users);
          }
        })
        .catch((err) => console.error("Error fetching all users:", err));
    }
  }, [tab]);

  // Filter teachers based on selected tab and search query
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.teacherconfirm &&
    teacher.teacherconfirm.toLowerCase() === tab.toLowerCase() &&
    (
      (teacher.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (teacher.address?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (teacher.degree?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (teacher.school?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    )
  );

  const filteredUsers = allUsers.filter((user) =>
    (user.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (user.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (user.phone?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  // Approve teacher by updating 'teacherconfirm' status to 'approved'
  const approveTeacher = async (uid, email, name) => {
    try {
      const response = await axios.post(`${webApi}/api/teachers/confirm`, {
        uid: uid, 
        email: email,
        name: name,
        teacherconfirm: "approved"
      });

      if (response.data.message) {
        setTeachers(prevTeachers =>
          prevTeachers.map((teacher) =>
            teacher.uid === uid
              ? { ...teacher, teacherconfirm: "approved" }
              : teacher
          )
        );
      }
    } catch (error) {
      console.error("Error approving teacher:", error.response?.data || error.message);
    }
  };

  const rejectTeacher = async (uid) => {
    try {
      const response = await axios.post(`${webApi}/api/teachers/reject`, {
        uid: uid  
      });
  
      if (response.data.message) {
        setTeachers(prevTeachers =>
          prevTeachers.map((teacher) =>
            teacher.uid === uid
              ? { ...teacher, teacherconfirm: "rejected" }
              : teacher
          )
        );
      }
    } catch (error) {
      console.error("Error rejecting teacher:", error.response?.data || error.message);
    }
  };

  return (
    <div className="teachermanagerbody">
      <FloatingActionButton/>
      <div className="teachermanagercontainer">
        <h2>Teacher Management System</h2>

        {/* Tabs for switching between Pending, Approved, and All Users */}
        <div className="tuitiontabwrapper">
          <div className="tuition-tabs">
            {["Pending", "Approved", "All Users"].map((status) => (
              <button
                key={status}
                className={`tuition-tab ${tab === status ? "tuition-tab-active" : ""}`}
                onClick={() => setTab(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="teachersearchbarcontainer">
          <h3>
            {tab === "All Users"
              ? `All Users: ${filteredUsers.length}`
              : `Available Teachers: ${filteredTeachers.length}`}
          </h3>
          <div className="teacherssearch-bar-container">
            <input
              type="text"
              placeholder={
                tab === "All Users"
                  ? "Search by Name, Email, or Phone"
                  : "Search by Name, Location, Degree, or College"
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <FaSearch className="teachersearch-icon" size={18} />
          </div>
        </div>

        {/* Render Teachers or All Users */}
        {tab === "All Users" ? (
          <div className="teacher-list">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
               <UserCard
               key={user._id}
               user={user}
               />
              ))
            ) : (
              <p className="no-results">No users found matching your search.</p>
            )}
          </div>
        ) : (
          <div className="teacher-list">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <div key={teacher.uid} className="teacher-card">
                  <img
                    src={teacher.profile}
                    alt={teacher.name}
                    className="teacher-profile"
                  />
                  <h3>{teacher.name}</h3>
                  <p><strong>Email:</strong> {teacher.email}</p>
                  <p><strong>Location:</strong> {teacher.address}</p>
                  <p><strong>Degree:</strong> {teacher.degree}</p>
                  <p><strong>College:</strong> {teacher.school}</p>
                  <p><strong>Current Grade:</strong> {teacher.currentGrade}</p>
                  <p><strong>Requested at:</strong> {teacher.requestedforteacheron}</p>
                  <p><strong>Phone:</strong> {teacher.phone}</p>
                  <p><strong>Lat:</strong> {teacher.latitude}</p>
                  <p><strong>Lng:</strong> {teacher.longitude}</p>
                  <div className="teacher-links">
                    <a href={teacher.cvFileUrl} target="_blank" rel="noopener noreferrer">📄 View CV</a>
                    <a href={teacher.identityFileUrl} target="_blank" rel="noopener noreferrer">🆔 View Identity</a>
                  </div>
                  {/* Approve button */}
                  {teacher.teacherconfirm !== "approved" && (
                    <div style={{gap:"10px", display:"flex"}} className="approveteacherbutton">
                      <button onClick={() => approveTeacher(teacher.uid, teacher.email, teacher.name)}>Approve</button>
                      <button style={{backgroundColor:"red"}} onClick={() => rejectTeacher(teacher.uid)}>Reject</button>
                    </div>
                  )}
                  {teacher.teacherconfirm === "approved" && (
                    <div className="approveteacherbutton">
                      <button onClick={() => approveTeacher(teacher.uid)}>Move to pending</button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="no-results">No teachers found matching your search.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherManager;