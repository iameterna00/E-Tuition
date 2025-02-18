import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../css/addclasses.css";
import { FaUpload } from "react-icons/fa";
import { webApi } from "../api";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
  const [classDetails, setClassDetails] = useState({
    subject: "",
    courseTitle: "",
    description: "",
    fee: "350", // Default hourly rate
    monthlyFee: "", // New state for monthly fee
    posterImage: null,
    tuitionType: "Online Tuition",
    posterFileName: "",
  });

  const [user, setUser] = useState(null); // Store Firebase user
  const navigate = useNavigate();

  // Listen for user authentication state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Store user object
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassDetails({
      ...classDetails,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const reader = new FileReader();

      reader.onloadend = () => {
        setClassDetails({
          ...classDetails,
          posterImage: reader.result,
          posterFileName: fileName,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the UID from Firebase Authentication
    if (!user || !user.uid) {
      alert("User not authenticated");
      return;
    }
    const uid = user.uid;

    // Prepare form data
    const formData = new FormData();
    formData.append("posterImage", document.getElementById("course-poster").files[0]); // Add image file
    formData.append("uid", uid);
    formData.append("subject", classDetails.subject);
    formData.append("courseTitle", classDetails.courseTitle);
    formData.append("description", classDetails.description);
    formData.append("fee", classDetails.fee);
    formData.append("monthlyfee", classDetails.monthlyFee); // Include monthly fee in the data
    formData.append("tuitiontype", classDetails.tuitionType);

    // Send class data to backend
    try {
      const response = await fetch(`${webApi}/api/classes`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Class added successfully!");
        navigate('/iamatuitor')
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="addclassbody">
      <div className="left-sideaddclass">
        <div
          className="poster-upload"
          style={{
            border: classDetails.posterImage
              ? "none"
              : "1px dashed rgba(82, 82, 82, 0.371)",
          }}
          onClick={() => document.getElementById("course-poster").click()}
        >
          <input
            id="course-poster"
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            required
          />
          {classDetails.posterImage ? (
            <div className="poster-preview">
              <div className="file-name">
                <FaUpload /> {classDetails.posterFileName}
              </div>{" "}
              <img
                src={classDetails.posterImage}
                alt="Course Poster Preview"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ) : (
            <>
              <div className="upload-icon">
                <FaUpload />
              </div>{" "}
              <div className="poster-upload-text">Click to upload course poster</div>{" "}
            </>
          )}
        </div>
      </div>

      <div className="right-sideaddclass">
        <h2>Teach One-on-One Sessions</h2>
        <form onSubmit={handleSubmit} className="addclass-form">
          <div className="classesform-container">
            <div className="right-side">
            <div className="form-group">
                {/* <label>Tuition Type</label>
                <select name="tuitionType" value={classDetails.tuitionType} onChange={handleChange} required>
                  <option value="Home Tuition">Home Tuition</option>
                  <option value="Online Tuition">Online Tuition</option>
                </select> */}
              </div>
              <div className="form-group">
                <label>Fee (per hour)</label>
                <input
                  type="number"
                  name="fee"
                  value={classDetails.fee}
                  onChange={handleChange}
                  required
                  placeholder="Enter course fee per hour"
                />
              </div>

              <div className="form-group">
                <label>Monthly Fee</label>
                <input
                  type="number"
                  name="monthlyFee"
                  value={classDetails.monthlyFee}
                  onChange={handleChange}
                  required
                  placeholder="Enter course monthly fee"
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={classDetails.subject}
                  onChange={handleChange}
                  required
                  placeholder="Enter subject"
                />
              </div>

              <div className="form-group">
                <label>Course Title</label>
                <input
                  type="text"
                  name="courseTitle"
                  value={classDetails.courseTitle}
                  onChange={handleChange}
                  required
                  placeholder="Enter course title"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={classDetails.description}
                  onChange={handleChange}
                  
                  placeholder="Enter course description"
                />
              </div>

              <button type="submit" className="submit-button">
                Add Class
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
