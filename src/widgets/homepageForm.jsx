import React, { useState, useEffect } from 'react';
import '../css/homeForm.css';
import subjectsData from '../JSON/subjects.json'; // Assuming the subjects.json is in the same directory

const HomePageForm = () => {
  const [formData, setFormData] = useState({
    grade: '',
    name: '',
    class: '',
    age: '',
    email: '',
    phone: '',
    subjects: '',
    location: '',
  });

  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Your request has been submitted successfully!');
    setFormData({
      name: '',
      class: '',
      age: '',
      email: '',
      phone: '',
      subjects: '',
      location: '',
    });
  };

  // Update subjects based on selected class
  useEffect(() => {
    if (formData.class && subjectsData[formData.class]) {
      setSubjects(subjectsData[formData.class]);
    } else {
      setSubjects([]);
    }
  }, [formData.class]);

  // Filter subjects based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredSubjects(subjects);
    } else {
      setFilteredSubjects(
        subjects.filter((subject) =>
          subject.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, subjects]);

  return (
    <div className="home-page">
      <h2>Find Home Tutor In Nepal</h2>
      <form className="form-container" onSubmit={handleSubmit}>

      <div className="classAndSubject">
      <div className="studentFormHomeTuition">
          <h3>Class</h3>
          <select
            className="formSelectInput"
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
          >
            <option value="">Select Class</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 11">Class 11</option>
            <option value="Class 12">Class 12</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
      <div className="studentFormHomeTuition">
          <h3>Subject</h3>
          <select
            className="formSelectInput"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            required
            disabled={!formData.class} // Disable subject dropdown if no class is selected
          >
            <option value="">Select Subject</option>
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))
            ) : (
              <option value="">No subjects available</option>
            )}
          </select>
        </div>
      </div>
        <div className="studentFormHomeTuition">
          <h3>Name</h3>
          <input
            className="formInput"
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

    

        <div className="studentFormHomeTuition">
          <h3>Age</h3>
          <input
            className="formInput"
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="studentFormHomeTuition">
          <h3>Email</h3>
          <input
            className="formInput"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="studentFormHomeTuition">
          <h3>Phone Number</h3>
          <input
            className="formInput"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

  

        <div className="studentFormHomeTuition">
          <h3>Location</h3>
          <input
            className="formInput"
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HomePageForm;
