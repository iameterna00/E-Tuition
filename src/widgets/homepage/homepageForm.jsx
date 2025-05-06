import React, { useState, useEffect } from 'react';
import '../../css/home.css';
import subjectsData from '../../JSON/subjects.json';
import { ImBooks } from "react-icons/im";
import { PiStudentFill } from "react-icons/pi";
import { IoTime } from "react-icons/io5";
import girl from "../../assets/abroadbaner.png"

const HomePageForm = () => {
  const [formData, setFormData] = useState({
    destination: '',
    studyLevel: '',
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phone: '',
    startTime: '',
  });

  const [invalidFields, setInvalidFields] = useState([]);

  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Remove field from invalid list as soon as user starts typing
    if (invalidFields.includes(name) && value.trim() !== '') {
      setInvalidFields(invalidFields.filter(field => field !== name));
    }
  };

  const validateStep = () => {
    let requiredFields = [];

    if (currentStep === 1) {
      requiredFields = ['destination', 'studyLevel'];
    } else if (currentStep === 2) {
      requiredFields = ['firstName', 'lastName', 'age', 'email', 'phone'];
    }

    const newInvalids = requiredFields.filter(field => !formData[field]?.trim());
    setInvalidFields(newInvalids);

    return newInvalids.length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.startTime.trim()) {
      setInvalidFields(['startTime']);
      return;
    }

    setInvalidFields([]);

    console.log('Form submitted:', formData);
    // Add success message logic here (toast/snackbar/inline text)
    setFormData({
      destination: '',
      studyLevel: '',
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      phone: '',
      startTime: '',
    });
    setCurrentStep(1);
  };

  useEffect(() => {
    if (formData.destination && subjectsData[formData.destination]) {
      setSubjects(subjectsData[formData.destination]);
    } else {
      setSubjects([]);
    }
  }, [formData.destination]);

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

  const progressBarWidth = (currentStep / 3) * 100;

  const getInputStyle = (fieldName) => {
    return invalidFields.includes(fieldName)
      ? { border: '2px solid red' }
      : { border: 'none' };
  };

  return (
    <div className="FormBox">
      <div className="formmainContainer">
        <h2 style={{textAlign:'start', width:"100%"}} > Kube International can help you study abroad</h2>
        <p style={{width:"100%"}}>
          Enter your details and get a free counselling session with our experts so they can connect you to the right course, country, university – and even scholarships!
        </p>
        <form className="homeform-container" onSubmit={handleSubmit}>
          {/* Step 1: Destination and Study Level */}
          {currentStep === 1 && (
         <div className="formstepone">
             <div className="classAndSubject">
              <div className="studentFormHomeTuition">
                <h3>Your preferred study destination</h3>
                <select
                  className="formSelectInput"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  style={getInputStyle('destination')}
                >
                  <option value="">Select</option>
                  <option value="China">China</option>
                  <option value="USA">USA</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>
              <div className="studentFormHomeTuition">
                <h3>Preferred study level</h3>
                <select
                  className="formSelectInput"
                  name="studyLevel"
                  value={formData.studyLevel}
                  onChange={handleChange}
                  style={getInputStyle('studyLevel')}
                >
                  <option value="">Select</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="University Preparation">University Preparation</option>
                </select>
              </div>
            </div>
              <img src={girl} alt="" />
         </div>
          )}

          {/* Step 2: Student Details */}
          {currentStep === 2 && (
            <div className="studentDetailsStep">
              <div className="nameandage">
                <div className="studentFormHomeTuition">
                  <h3>First name</h3>
                  <input
                    className="formInput"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    style={getInputStyle('firstName')}
                  />
                </div>
                <div className="studentFormHomeTuition">
                  <h3>Last name</h3>
                  <input
                    className="formInput"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    style={getInputStyle('lastName')}
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
                    style={getInputStyle('age')}
                  />
                </div>
              </div>
              <div className="phoneandlocation">
                <div className="studentFormHomeTuition">
                  <h3>Email</h3>
                  <input
                    className="formInput"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={getInputStyle('email')}
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
                    style={getInputStyle('phone')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Start Time */}
          {currentStep === 3 && (
            <div className="LocationStep">
              <div className="studentFormHomeTuition">
                <h3>When would you like to start?</h3>
                <select
                  className="formSelectInput"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  style={getInputStyle('startTime')}
                >
                  <option value="">Select</option>
                  <option value="Now">Now</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                  <option value="12 Months">12 Months</option>
                  <option value="More than 12 Months">More than 12 Months</option>
                </select>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="formnavigationButtons">
            {currentStep > 1 && (
              <button  className='nextstep' type="button" onClick={prevStep}>Previous</button>
            )}
            {currentStep !== 3 && (
              <button  className='nextstep' type="button" onClick={nextStep}>Next Step</button>
            )}
            {currentStep === 3 && (
              <button className='nextstep' type="submit">Submit</button>
            )}
          </div>

          {/* Step Progress Bar */}
          <div className="stepProgressBarContainer">
            <div className="stepProgressBar" style={{ width: `${progressBarWidth}%` }}></div>
          </div>

          {/* Step Indicators */}
          <div className="stepProgressBarNames">
            <div className={`stepIndicator ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="stepcount"><ImBooks /></div>
              <div className="stepname">Destination</div>
            </div>
            <div className={`stepIndicator ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="stepcount"><PiStudentFill /></div>
              <div className="stepname">Student Details</div>
            </div>
            <div className={`stepIndicator ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="stepcount"><IoTime /></div>
              <div className="stepname">Start Date</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePageForm;
