import React, { useState } from 'react';
import '../../css/studentform.css';
import { webApi } from '../../api';

function StudentForm({ studentdetails, close }) {
    const [formData, setFormData] = useState({
        fullName: studentdetails.name || '',
        username: studentdetails.username || '',
        email: studentdetails.email || '',
        phone: studentdetails.phone || '', 
        profilePicture: studentdetails.profile,
        currentGrade: studentdetails.currentGrade || '',
        subjects: studentdetails.subjects || '',
        tuitionPreference: '',
        address: studentdetails.address||'',
        locationRadius: studentdetails.locationRadius || '',
        parentContact: '',
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false); 

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
            setPreviewImage(URL.createObjectURL(files[0]));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    // Inside StudentForm component
const handleClose = () => {
    setLoading(false);  // Reset the loading state when closing
    close();            // Close the modal
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading when submission starts
    
        // Create a FormData object
        const formDataToSend = new FormData();
    
        // Append all fields to the FormData object
        formDataToSend.append('uid', studentdetails.uid);
        formDataToSend.append('email', formData.email); // Always include email
        if (formData.fullName) formDataToSend.append('fullName', formData.fullName);
        if (formData.username) formDataToSend.append('username', formData.username);
        if (formData.phone) formDataToSend.append('phone', formData.phone);
        if (formData.profilePicture) formDataToSend.append('profilePicture', formData.profilePicture);
        if (formData.currentGrade) formDataToSend.append('currentGrade', formData.currentGrade);
        if (formData.subjects) formDataToSend.append('subjects', formData.subjects);
        if (formData.tuitionPreference) formDataToSend.append('tuitionPreference', formData.tuitionPreference);
        if (formData.address) formDataToSend.append('address', formData.address);
        if (formData.locationRadius) formDataToSend.append('locationRadius', formData.locationRadius);
        if (formData.parentContact) formDataToSend.append('parentContact', formData.parentContact);
    
        console.log('Form Data to Send:', formDataToSend);
    
        try {
            const response = await fetch(`${webApi}/api/save-student-details`, {
                method: 'POST',
                body: formDataToSend, // Send FormData instead of JSON
            });
    
            const result = await response.json();
    
            if (response.ok) {
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error saving student details:', error);
            alert('An error occurred while saving the student details.');
        } finally {
            setLoading(false); // Hide loading after submission
            window.location.reload();
        }
    };
    return (
        <div className="student-form-container">
            <form className="student-form" onSubmit={handleSubmit}>
                <div className="studentprofilepicture">
                    <div className="studentdetailprofilecontainer">
                        <img
                            className="studentprofile"
                            src={previewImage || formData.profilePicture || studentdetails.profile} 
                            alt="Profile"
                        />
                        <label htmlFor="profilePicture" className="changeprofilebutton">
                         <button type="button" onClick={() => document.getElementById('profilePicture').click()} >   Change your Profile Picture</button>
                        </label>
                        <input
                            type="file"
                            name="profilePicture"
                            id="profilePicture"
                            accept="image/*"
                            onChange={handleChange}
                            style={{ display: 'none' }}  // Hide the default file input
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                    />
                </div>

                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label>
                        Phone Number:
                        <p style={{ margin: '0px', fontWeight: '100' }}>
                            This is personal and we won't share it.
                        </p>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                    />
                </div>

                <div className="form-group">
                    <label>Current Grade/Level:</label>
                    <input
                        type="text"
                        name="currentGrade"
                        value={formData.currentGrade}
                        onChange={handleChange}
                        placeholder="Enter current grade"
                    />
                </div>

                <div className="form-group">
                    <label>Subjects or Topics of Interest:</label>
                    <input
                        type="text"
                        name="subjects"
                        value={formData.subjects}
                        onChange={handleChange}
                        placeholder="Enter subjects"
                    />
                </div>

                <div className="form-group">
                    <label>Tuition Preference:</label>
                    <select
                        name="tuitionPreference"
                        value={formData.tuitionPreference}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="online">Online</option>
                        <option value="home">Home Tuition</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Address (for Home Tuition):</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                    />
                </div>

                <div className="form-group">
                    <label>Preferred Tutor's Location Radius:</label>
                    <input
                        type="text"
                        name="locationRadius"
                        value={formData.locationRadius}
                        onChange={handleChange}
                        placeholder="Enter location radius"
                    />
                </div>


          <div className="buttoncontainer" style={{width:'100%', display:'flex', justifyContent:'center'}}>
          <div className="loadingbutton" style={{width:'100%', display:'flex', justifyContent:'center'}}>
              <button type="submit" disabled={loading} className="submit-btn">
    {loading ? <span className="spinner"></span> : "Submit"}
</button>

              </div>
              
              <div onClick={close} style={{width:"100%", display:"flex", justifyContent:"center"}} className="tuition-delete-button">
              Close
              </div>
             
          </div>
            </form>
        </div>
    );
}

export default StudentForm;
