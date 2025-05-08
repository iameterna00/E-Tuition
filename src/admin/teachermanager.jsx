 import { useState, useEffect } from "react";
import axios from "axios";
import { webApi } from "../api";
import { FaSearch } from "react-icons/fa";
import "./teachermanager.css";

function TeacherManager() {
  const [tab, setTab] = useState("Pending");
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

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

  // Approve teacher by updating 'teacherconfirm' status to 'approved'
  const approveTeacher = async (uid) => {
    console.log("Approving teacher with UID:", uid);  // Log the UID for debugging
    try {
      const response = await axios.post(`${webApi}/api/teachers/confirm`, {
        uid: uid, 
        teacherconfirm: "approved"
      });

      if (response.data.message) {
        // Update local state to reflect the change in confirmation status
        setTeachers(prevTeachers =>
          prevTeachers.map((teacher) =>
            teacher.uid === uid  // Check by 'uid' instead of 'id'
              ? { ...teacher, teacherconfirm: "approved" }
              : teacher
          )
        );
        console.log("Teacher approved:", uid);
      }
    } catch (error) {
      console.error("Error approving teacher:", error.response?.data || error.message);
    }
  };
  const rejectTeacher = async (uid) => {
    console.log("Rejecting teacher with UID:", uid);  // Fixed message
    try {
      const response = await axios.post(`${webApi}/api/teachers/reject`, {
        uid: uid  
      });
  
      if (response.data.message) {
        // Update local state to reflect rejection (e.g., remove or mark as rejected)
        setTeachers(prevTeachers =>
          prevTeachers.map((teacher) =>
            teacher.uid === uid
              ? { ...teacher, teacherconfirm: "rejected" }  // Set to "rejected" locally
              : teacher
          )
        );
        console.log("Teacher rejected:", uid);
      }
    } catch (error) {
      console.error("Error rejecting teacher:", error.response?.data || error.message);
    }
  };
  


  return (
    <div className="teachermanagerbody">
      <div className="teachermanagercontainer">
        <h2>Teacher Management System</h2>

        {/* Tabs for switching between Pending and Approved teachers */}
    <div className="tuitiontabwrapper">
    <div className="tuition-tabs" >
          {["Pending", "Approved"].map((status) => (
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
        <h3>Available Teachers: {filteredTeachers.length}</h3>
          <div className="teacherssearch-bar-container">
            <input
              type="text"
              placeholder="Search by Name, Location, Degree, or College"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <FaSearch className="teachersearch-icon" size={18} /> {/* Search Icon */}
          </div>
        </div>

        {/* Filter and display teachers based on selected tab and search query */}
        <div className="teacher-list">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => (
              <div key={teacher.uid} className="teacher-card"> {/* Use 'uid' as key */}
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
                    <button onClick={() => approveTeacher(teacher.uid)}>Approve</button> {/* Pass 'uid' */}
                    <button style={{backgroundColor:"red"}} onClick={() => rejectTeacher(teacher.uid)}>Reject</button> {/* Pass 'uid' */}
                  </div>
                )}
                                {teacher.teacherconfirm === "approved" && (
                  <div className="approveteacherbutton">
                    <button onClick={() => approveTeacher(teacher.uid)}>Move to pending</button> {/* Pass 'uid' */}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="no-results">No teachers found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherManager;
