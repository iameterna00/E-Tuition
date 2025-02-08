import { useState, useEffect } from "react";
import axios from "axios";
import { webApi } from "../api";
import { FaSearch } from "react-icons/fa";
import "./teachermanager.css";

function TeacherManager() {
    const [tab, setTab] = useState("Pending");
    const [teachers, setTeachers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Search query state

    useEffect(() => {
        axios.get(`${webApi}/api/teachers`)
            .then((res) => {
                if (res.data && Array.isArray(res.data.teachers)) {  
                    setTeachers(res.data.teachers);
                }
            })
            .catch((err) => console.error("Error fetching teachers:", err));
    }, []);


const filteredTeachers = teachers.filter((teacher) => 
    teacher.teacherconfirm &&
    teacher.teacherconfirm.toLowerCase() === tab.toLowerCase() &&
    (
        (teacher.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (teacher.address?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (teacher.degree?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (teacher.school?.toLowerCase() || "").includes(searchQuery.toLowerCase()) // Assuming school represents college
    )

    );

    return (
        <div className="teachermanagerbody">
            <div className="teachermanagercontainer">
                <h2>Teacher Management System</h2>
                
                {/* Tabs for switching between Approved and Pending teachers */}
                <div className="tuition-tabs">
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

         <div className="teachersearchbarcontainer">
                   {/* Search Bar */}
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
                            <div key={teacher.id} className="teacher-card">
                                <img src={teacher.profile} alt={teacher.name} className="teacher-profile" />
                                <h3>{teacher.name}</h3>
                                <p><strong>Email:</strong> {teacher.email}</p>
                                <p><strong>Location:</strong> {teacher.address}</p>
                                <p><strong>Degree:</strong> {teacher.degree}</p>
                                <p><strong>College:</strong> {teacher.school}</p> {/* Assuming school is college */}
                                <p><strong>Current Grade:</strong> {teacher.currentGrade}</p>
                                <p><strong>Requested at:</strong> {teacher.requestedforteacheron}</p>
                                <div className="teacher-links">
                                    <a href={teacher.cvFileUrl} target="_blank" rel="noopener noreferrer">📄 View CV</a>
                                    <a href={teacher.identityFileUrl} target="_blank" rel="noopener noreferrer">🆔 View Identity</a>
                                </div>
                                <div className="approveteacherbutton">
                                    <button>Approve</button>
                                </div>
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
