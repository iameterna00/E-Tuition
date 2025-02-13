import React, { useState } from 'react';
import '../css/addclasses.css';
import { FaUpload } from "react-icons/fa";

const AddClass = () => {
  const [classDetails, setClassDetails] = useState({
    subject: '',
    courseTitle: '',
    description: '',
    fee: '350', // Default hourly rate
    posterImage: null,
    posterFileName: ''
  });

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
          posterFileName: fileName
        });
      };
      
      reader.readAsDataURL(file); // Read the file as data URL for preview
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your API call or state update logic here for saving class data
    console.log('Class Details:', classDetails);
    alert('Class added successfully!');
  };

  return (
    <div className="addclassbody">
      <div className="left-sideaddclass">
        <div className="poster-upload" 
             style={{border: classDetails.posterImage ? 'none' : '1px dashed rgba(82, 82, 82, 0.371)'}} 
             onClick={() => document.getElementById('course-poster').click()}>
          <input
            id="course-poster"
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            required
          />
          {classDetails.posterImage ? (
            <div className="poster-preview">
              <div className="file-name"><FaUpload /> {classDetails.posterFileName}</div> {/* Display file name */}
              <img
                src={classDetails.posterImage}
                alt="Course Poster Preview"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ) : (
            <>
              <div className="upload-icon"><FaUpload /></div> {/* Upload icon */}
              <div className="poster-upload-text">Click to upload course poster</div> {/* Upload text */}
            </>
          )}
        </div>
      </div>

      <div className="right-sideaddclass">
        <h2>Add New Class</h2>
        <form onSubmit={handleSubmit} className="addclass-form">
          <div className="classesform-container">
            <div className="right-side">
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
                  required
                  placeholder="Enter course description"
                />
              </div>

              <button type="submit" className="submit-button">Add Class</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
