import React, { useState, useEffect } from 'react';
import '../../css/home.css';
import subjectsData from '../../JSON/subjects.json';
import { ImBooks } from "react-icons/im";
import { PiStudentFill } from "react-icons/pi";
import { IoLocation } from "react-icons/io5";
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
  const [currentStep, setCurrentStep] = useState(1); // Step tracking state

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

  useEffect(() => {
    if (formData.class && subjectsData[formData.class]) {
      setSubjects(subjectsData[formData.class]);
    } else {
      setSubjects([]);
    }
  }, [formData.class]);

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

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const progressBarWidth = (currentStep / 3) * 100; // Calculates width for 3 steps

  return (
    <div className="FormBox">
      <div className="formmainContainer">
        <h2>Couldn't Find a Tutor??</h2>
        <p>Please fill out this form carefully, and we will reach out to you shortly to assist with your tutoring needs.</p>
        <form className="form-container" onSubmit={handleSubmit}>
          
       
       

          {/* Step 1: Subject */}
          {currentStep === 1 && (
              <div className="classAndSubject">
                <div className="studentFormHomeTuition">
                  <h3>Class</h3>
                  <select
                    className="formSelectInput"
                    name="class"
                    style={{ border: 'none' }}
                    value={formData.class}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    {/* Add other classes */}
                  </select>
                </div>
                <div className="studentFormHomeTuition">
                  <h3>Subject</h3>
                  <select
                    className="formSelectInput"
                    name="subjects"
                    style={{ border: 'none' }}
                    value={formData.subjects}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Subject</option>
                    {filteredSubjects.length > 0 ? (
                      filteredSubjects.map((subject, index) => (
                        <option key={index} value={subject}>
                          {subject}
                        </option>
                      ))
                    ) : (
                      <option value="">Please select your class</option>
                    )}
                  </select>
                </div>
              </div>
          )}

          {/* Step 2: Student Details */}
          {currentStep === 2 && (
            <div className="studentDetailsStep">
              <div className="nameandage">
                <div className="studentFormHomeTuition">
                  <h3>Name</h3>
                  <input
                    className="formInput"
                    type="text"
                    name="name"
                    style={{ border: 'none' }}
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
                    style={{ border: 'none' }}
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
                    style={{ border: 'none' }}
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
             <div className="phoneandlocation">
             <div className="studentFormHomeTuition">
                <h3>Phone Number</h3>
                <input
                  className="formInput"
                  type="tel"
                  style={{ border: 'none' }}
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                
              </div>
             </div>
              
            </div>
          )}

          {/* Step 3: Location */}
          {currentStep === 3 && (
            <div className="LocationStep">
              <div className="studentFormHomeTuition">
                <h3>Location</h3>
                <input
                  className="formInput"
                  type="text"
                  name="location"
                  style={{ border: 'none' }}
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="studentFormHomeTuition">
                <h3>Description (optional)</h3>
                <input
                  className="formInput"
                  type="text"
                  name="Description"
                  style={{ border: 'none' }}
                  placeholder="Describe a tuitor you want"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              
            </div>
            
          )}
{/*  */}
          {/* Navigation Buttons */}
          <div className="fornnavigationButtons">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep}>Previous</button>
            )}
            {currentStep !== 3 && (
              <button type="button" onClick={nextStep}>Next</button>
            )}
            {currentStep === 3 && (
              <button type="submit">Submit</button>
            )}
          </div>
             {/* Step Progress Bar */}
             <div className="stepProgressBarContainer">
            <div className="stepProgressBar" style={{ width: `${progressBarWidth}%` }}></div>
          </div>

          {/* Step Indicators */}
          <div className="stepProgressBarNames">
            <div className={`stepIndicator ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="stepcount"><ImBooks />
              </div>
              <div className="stepname">Subject</div>
            </div>
            <div className={`stepIndicator ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="stepcount"><PiStudentFill /></div>
              <div className="stepname">Student Details</div>
            </div>
            <div className={`stepIndicator ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="stepcount"><IoLocation /></div>
              <div className="stepname">Location</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePageForm;
