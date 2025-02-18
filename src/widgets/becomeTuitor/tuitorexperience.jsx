import { useEffect, useRef, useState } from "react";
import KUBE from "../../assets/KUBE.png";
import Teacher from "../../assets/teach.png";
import collegeData from "../../JSON/kathmandu_college.json";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import { webApi } from "../../api";
import { FaSpinner } from "react-icons/fa";  

function TeachingExperience({ setopentuitorinitialmodal, user }) {
    const [step, setStep] = useState(1);
    const [teachingExperience, setTeachingExperience] = useState("");
    const [searchSchool, setSearchSchool] = useState("");
    const [searchDegree, setSearchDegree] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showDegreeSuggestion, setShowDegreeSuggestion] = useState(false);
    const [selectedDegree, setSelectedDegree] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [schoolSuggestions, setSchoolSuggestions] = useState([]);
    const [degreeSuggestions, setDegreeSuggestions] = useState([]);
    const [cvFile, setCvFile] = useState(null);
    const [identityType, setIdentityType] = useState("National ID");
    const [identityFile, setIdentityFile] = useState(null);
    const[gender , setTeachergender] = useState('')
    const suggestionsRef = useRef(null);
    const degreeRef = useRef(null);
    const [loading, setLoading] = useState(false);

    // Handles selection based on current step

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
        if (file && file.type.startsWith("image/")) {
            setCvFile(file);
            console.log('this is cv ', cvFile)
        } else {
            alert("Please upload a valid image file.");
        }
    };
    
    const handleIdentityUpload = (event) => {
        const file = event.target.files[0];
        if (file && ( file.type.startsWith("image/"))) {
            setIdentityFile(file);
        } else {
            alert("Please upload a valid PDF or image file.");
        }
    };
    const handleTeacherxp = () => {
        setLoading(true);
    
        if (!teachingExperience || !selectedSchool || !selectedDegree || !cvFile || !identityFile || !gender) {
            alert("Please complete all fields before submitting.");
            setLoading(false); // Reset loading state if validation fails
            return;
        }
    
        const formData = new FormData();
        formData.append("teachingExperience", teachingExperience);
        formData.append("school", selectedSchool);
        formData.append("degree", selectedDegree);
        formData.append("cvFile", cvFile, cvFile.name);
        formData.append("identityType", identityType);
        formData.append("identityFile", identityFile, identityFile.name);
        formData.append("teachergender", gender);
        formData.append("teacherconfirm", "pending");
        formData.append("uid", user.uid);
    
        fetch(`${webApi}/api/update-teacher-details`, {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Teacher details updated successfully") {
                    alert("Teacher details updated successfully!");
                } else {
                    alert(`Error: ${data.message}`);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred while submitting the form.");
            })
            .finally(() => {
                setLoading(false); // Ensure loading is reset after fetch completes
                window.location.reload()
            });
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
                                <h3>Step {step} of 4</h3>
                            </div>
                        </div>
                        <div className="tuitorinitialnavcontainerright">
                        <button onClick={() => setopentuitorinitialmodal(false)}>
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
                                                onChange={(e) => setTeachingExperience(e.target.value)}
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
        <div className="CVfile-upload">
    <label>Upload CV (Image only):</label>
    <div className="file-upload-container">
    <input
    className="cvfileinput"
    type="file"
    accept=".jpg, .jpeg, .png"
    onChange={handleCvUpload}
/>

        <span className="upload-icon">
            {cvFile ? (
                <img src={URL.createObjectURL(cvFile)} alt="CV Preview" className="cv-preview" />
            ) : (
                <>
                    <FaCloudUploadAlt fontSize={50} /> Upload
                </>
            )}
        </span>
    </div>
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
                <label>Upload {identityType} (Image Only):</label>
                <div className="file-upload-container">
                <input 
                    className="cvfileinput"
                    type="file" 
                    accept=".jpg, .jpeg, .png" 
                    onChange={handleIdentityUpload} 
                 />
                  <span className="upload-icon">
            {identityFile ? (
                <img src={URL.createObjectURL(identityFile)} alt="CV Preview" className="cv-preview" />
            ) : (
                <>
                    <FaCloudUploadAlt fontSize={50} /> Upload
                </>
            )}
        </span>
            </div>
            </div>
        )}
    </>
)}
                            {step === 4 && (        
                            <>
                                <h2>One Last Step Before We Begin?</h2>
                                <h3>Please Select Your Gender.</h3>
                                <div className="Gender-options">
                                    <div className="maleoption" style={{border: gender==='Male'? '1px solid #0099ffca':'transparent' }} onClick={()=>setTeachergender('Male')}>
                                    <IoMdMale  fontSize={60} /> Male
                                    </div>
                                    <div className="maleoption" style={{border: gender==='Female'? '1px solid #0099ffca':'transparent' }} onClick={()=>setTeachergender('Female')}>
                                          <IoMdFemale   fontSize={60} /> Female</div>
                                </div>
                            </>
                        )}

                    </div>

                 {step !=4 &&(   <div className="teacherimagecontainer">
                        <img className="teachimage" src={Teacher} alt="Teacher" />
                    </div>)}
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
                                 {step === 2 && selectedSchool.trim() !== "" && selectedDegree.trim() !== "" && (
                                    <button onClick={handleNext}>Next</button>
                                )}
                                {step === 3 && cvFile && identityFile && (
                                    <button onClick={handleNext} >Next</button>
                                )}
                                  {step === 4 && gender && (
                                    <button onClick={handleTeacherxp} >{loading? <FaSpinner className="newspinner"/>:'Finish'}</button>
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
