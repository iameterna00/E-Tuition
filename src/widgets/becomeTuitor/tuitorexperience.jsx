import { useEffect, useRef, useState } from "react";
import KUBE from "../../assets/KUBE.png";
import Teacher from "../../assets/teach.png";
import collegeData from "../../JSON/kathmandu_college.json";

function TeachingExperience({ setopentuitorinitialmodal }) {
    const [step, setStep] = useState(1);
    const [selectedTeachingType, setSelectedTeachingType] = useState("");
    const [teachingExperience, setTeachingExperience] = useState("");
    const [teachingLevel, setTeachingLevel] = useState("");
    const [searchSchool, setSearchSchool] = useState("");
    const [searchDegree, setSearchDegree] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showDegreeSuggestion, setShowDegreeSuggestion] = useState(false);
    const [selectedDegree, setSelectedDegree] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [schoolSuggestions, setSchoolSuggestions] = useState([]);
    const [degreeSuggestions, setDegreeSuggestions] = useState([]);
    const [cvFile, setCvFile] = useState(null);
    const [identityType, setIdentityType] = useState("");
    const [identityFile, setIdentityFile] = useState(null);
    const suggestionsRef = useRef(null);
    const degreeRef = useRef(null);

    // Handles selection based on current step
    const handleSelection = (event) => {
        const value = event.target.value;
        if (step === 1) setTeachingExperience(value);
        if (step === 2) setSelectedTeachingType(value);
        if (step === 3) setTeachingLevel(value);
    };

    const handleNext = () => setStep((prev) => prev + 1);
    const handlePrevious = () => setStep((prev) => prev - 1);

    // Handles school search filtering
    const handleSchoolSearch = (event) => {
        setDegreeSuggestions([])
        setSearchDegree('')
        const query = event.target.value;
        setSearchSchool(query);

        if (query.trim() === "") {
            setSchoolSuggestions([]);
            return;
        }

        const filteredSchools = collegeData.colleges.filter((college) =>
            college.name.toLowerCase().includes(query.toLowerCase())
        );
        setSchoolSuggestions(filteredSchools);
        setShowSuggestions(true);
    };

    // Select school & update degree options
    const handleSelectCollege = (college) => {
        setSearchSchool(college.name);
        setSelectedSchool(college.name);
        setSchoolSuggestions([]);
        setShowSuggestions(false);
        console.log('this is degreee', college.courses)
        setDegreeSuggestions(college.courses || []);
    };

    // Handles degree search filtering
    const handleDegreeSearch = (event) => {
        const query = event.target.value;
        setSearchDegree(query);

        if (!selectedSchool || !degreeSuggestions.length) return;

        const filteredDegrees = degreeSuggestions.filter((degree) =>
            degree.toLowerCase().includes(query.toLowerCase())
        );

        setDegreeSuggestions(filteredDegrees);
        setShowDegreeSuggestion(true);
    };

    // Select a degree
    const handleSelectDegree = (degree) => {
        console.log("Clicked Degree:", degree); // Debugging log
        setSearchDegree(degree);
        setSelectedDegree(degree);
        setShowDegreeSuggestion(false);
    };
    

    // Click outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setShowSuggestions(false);
 
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (degreeRef.current && !degreeRef.current.contains(event.target)) {
                setShowDegreeSuggestion(false);
 
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const handleCvUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setCvFile(file);
        } else {
            alert("Please upload a valid PDF file.");
        }
    };
    
    const handleIdentityUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === "application/pdf" || file.type.startsWith("image/"))) {
            setIdentityFile(file);
        } else {
            alert("Please upload a valid PDF or image file.");
        }
    };

    return (
        <div className="teacherexperiencemodal">
            <div className="teacherexperiencecontainer">
                {/* Navigation Bar */}
                <nav className="tuitorinitialsteps">
                    <div className="tuitorinitialstepsnavcontents">
                        <div className="tuitorinitialnavcontainerleft">
                            <div className="kibelogocontainer">
                                <img src={KUBE} className="Kubelogo" alt="KUBE Logo" />
                            </div>
                            <div className="teacherexperiencestepscounts">
                                <h3>Step {step} of 3</h3>
                            </div>
                        </div>
                        <div className="tuitorinitialnavcontainerright">
                            <button onClick={setopentuitorinitialmodal}>
                                <h3>Exit</h3>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Experience Content Section */}
                <div className="teacherexperiencecontents">
                    <div className="teacherexperienceinsiders">
                        {step === 1 && (
                            <>
                                <h2>How much teaching experience do you have?</h2>
                                <p>Select your total years of teaching experience.</p>
                                <div className="teaching-options">
                                    {["Less than 1 year", "1-3 years", "More than 3 years"].map((option) => (
                                        <label key={option} className="radio-label">
                                            <input
                                                type="radio"
                                                value={option}
                                                checked={teachingExperience === option}
                                                onChange={handleSelection}
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h2>What school and degree did you attend?</h2>
                                <p>Select your school and degree.</p>

                                {/* School Input */}
                                <div className="school-input" ref={suggestionsRef}>
                                    <input
                                        type="text"
                                        value={searchSchool}
                                        onChange={handleSchoolSearch}
                                        placeholder="Enter school name"
                                        onFocus={() => {setShowSuggestions(true), setShowDegreeSuggestion(false)}}
                                    />
                                    {showSuggestions && schoolSuggestions.length > 0 && (
                                        <div className="suggestions-list">
                                            {schoolSuggestions.map((school) => (
                                                <div
                                                    className="suggestionsdropdown"
                                                    key={school.name}
                                                    onClick={() => handleSelectCollege(school)}
                                                >
                                                    {school.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Degree Input */}
                                <div className="degree-input" ref={degreeRef} >

                                    <input
                                        type="text"
                                        value={searchDegree}
                                        onChange={handleDegreeSearch}
                                        placeholder="Enter degree or course"
                                        onFocus={() => setShowDegreeSuggestion(true)}
                                    />
                                    {showDegreeSuggestion && degreeSuggestions.length > 0 && (
                                        <div className="suggestions-list">
                                            {degreeSuggestions.map((degree, index) => (
                                                <div
                                                    className="suggestionsdropdown"
                                                    key={index}
                                                    onClick={() => handleSelectDegree(degree)}
                                                >
                                                    {degree}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

{step === 3 && (
    <>
        <h2>Please upload your CV and Identity</h2>

        {/* CV Upload */}
        <div className="file-upload">
            <label>Upload CV (PDF only):</label>
            <input 
                type="file" 
                accept=".pdf" 
                onChange={handleCvUpload} 
            />
        </div>

        {/* Identity Selection */}
        <div className="identity-selection">
            <label>Select Identity Type:</label>
            <select value={identityType} onChange={(e) => setIdentityType(e.target.value)}>
                <option value="">-- Select Identity --</option>
                <option value="National ID">National ID</option>
                <option value="License">License</option>
                <option value="Passport">Passport</option>
            </select>
        </div>

        {/* Identity Upload */}
        {identityType && (
            <div className="file-upload">
                <label>Upload {identityType} (PDF or Image):</label>
                <input 
                    type="file" 
                    accept=".pdf, .jpg, .jpeg, .png" 
                    onChange={handleIdentityUpload} 
                />
            </div>
        )}
    </>
)}

                    </div>

                    <div className="teacherimagecontainer">
                        <img className="teachimage" src={Teacher} alt="Teacher" />
                    </div>
                </div>


                {/* Bottom Navigation */}
                <nav className="tuitorinitialbottombar">
                    <div className="tuitorinitialstepsnavcontents">
                        <div className="tuitorinitialnavcontainerleft">
                            {step > 1 && (
                                <div className="previousbtnteacherexperience">
                                    <button onClick={handlePrevious}>Previous</button>
                                </div>
                            )}
                        </div>
                        <div className="tuitorinitialnavcontainerright">
                            <div className="teacherexperiencesNext">
                                {step === 1 && teachingExperience && (
                                    <button onClick={handleNext}>Next</button>
                                )}
                                 {step === 2 && searchSchool.trim() !== "" && selectedDegree.trim() !== "" && (
                                    <button onClick={handleNext}>Next</button>
                                )}
                                {step === 3 && teachingLevel && (
                                    <button>Finish</button>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default TeachingExperience;
