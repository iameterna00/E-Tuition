import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from '../../services/Redux/userSlice';

const TutorApplicationForm = () => {
  const dispatch = useDispatch();
  const myuser = useSelector(selectUser);

  // State to track loading
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    profile: "",
    email: "",
    phone: '',
    subjects: "",
    experience: "",
    qualification: "",
    location: "",
    bio: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [cv, setCv] = useState(null);

  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = authInstance.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        dispatch(fetchUser(firebaseUser.uid)).then(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (myuser) {
      setFormData({
        name: myuser.name,
        profile: myuser.profile,
        email: myuser.email,
        phone: myuser.phone || '',
        subjects: myuser.teachingsubject || "",
        experience: myuser.experience || "",
        qualification: myuser.qualification || "",
        location: myuser.locationRadius || "",
        bio: myuser.bio || "",
      });
    }
  }, [myuser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (name === "profileImage" && file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else if (name === "cv" && file) {
      setCv(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    console.log("Profile image:", profileImage);
    console.log("CV:", cv);
  };

  // If the data is loading, show a loading message or spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  // If myuser is null or undefined, we can show an error or handle this case
  if (!myuser) {
    return <div>Error: User not found</div>;
  }

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h1>Become a Tutor</h1>
        <form className="teachersforms" onSubmit={handleSubmit}>
          
          {/* Profile Image Upload */}
          <div className="profileinput-group">
            <label>Profile Image</label>
            <img
             className="profile-preview"
            src={previewImage || formData.profile} 
            alt="Profile"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              name="profileImage"
              id="profile_upload"
              style={{ display: 'none' }}
              required
            />
            <button style={{maxWidth:"200px"}} type="button" onClick={() => document.getElementById('profile_upload').click()}>
              Choose Profile Image
            </button>
          </div>

          {/* Other Input Fields */}
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Subjects You Teach</label>
            <input
              type="text"
              name="subjects"
              placeholder="E.g., Math, Science, English"
              value={formData.subjects}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Years of Experience</label>
            <input
              type="number"
              name="experience"
              placeholder="E.g., 3"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Highest Qualification</label>
            <input
              type="text"
              name="qualification"
              placeholder="E.g., Bachelor's in Mathematics"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Your City / Area"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

      

          <div className="input-group">
            <label>Upload your CV</label>
            <input type="file" accept=".pdf, .doc, .docx" onChange={handleFileChange} name="cv" required />
          </div>

          <button className="submitformbutton" type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default TutorApplicationForm;