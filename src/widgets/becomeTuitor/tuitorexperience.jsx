import { useState } from 'react';
import KUBE from '../../assets/KUBE.png';
import Teacher from '../../assets/teach.png';
import collegeData from '../../JSON/kathmandu_college.json';

function TeachingExperience({ setopentuitorinitialmodal }) {
    const [step, setStep] = useState(1);
    const [selectedTeachingType, setSelectedTeachingType] = useState("");
    const [teachingExperience, setTeachingExperience] = useState("");
    const [teachingLevel, setTeachingLevel] = useState("");
    const [searchSchool, setSearchSchool] = useState("");
    const [searchDegree, setSearchDegree] = useState("");
    const [schoolSuggestions, setSchoolSuggestions] = useState([]);
    const [degreeSuggestions, setDegreeSuggestions] = useState([]);

    const handleSelection = (event) => {
        if (step === 1) setTeachingExperience(event.target.value); // Step 1: Teaching Experience
        if (step === 2) setSelectedTeachingType(event.target.value); // Step 2: Teaching Type
        if (step === 3) setTeachingLevel(event.target.value); // Step 3: Teaching Level
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleSchoolSearch = (event) => {
        const query = event.target.value;
        setSearchSchool(query);
        const filteredSchools = collegeData.colleges.filter(college => 
            college.name.toLowerCase().includes(query.toLowerCase())
        );
        setSchoolSuggestions(filteredSchools);
    };

    const handleDegreeSearch = (event) => {
        const query = event.target.value;
        setSearchDegree(query);
        const filteredDegrees = collegeData.colleges.flatMap(college => 
            college.courses.filter(course => course.toLowerCase().includes(query.toLowerCase()))
        );
        setDegreeSuggestions(filteredDegrees);
    };

    return (
        <div className="teacherexperiencemodal">
            <div className="teacherexperiencecontainer">
                {/* Navigation Bar */}
                <nav className="tuitorinitialsteps">
                    <div className="tuitorinitialstepsnavcontents">
                        <div className="tuitorinitialnavcontainerleft">
                            <div className="kibelogocontainer">
                                <img src={KUBE} className="Kubelogo" alt="" />
                            </div>
                            <div className="teacherexperiencestepscounts">
                                <h3>Step {step} of 3</h3>
                            </div>
                        </div>
                        <div className="tuitorinitialnavcontainerright">
                            <div className="teacherexperiencesclose">
                                <button onClick={setopentuitorinitialmodal}>
                                    <h3>Exit</h3>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Experience Content Section */}
                <div className="teacherexperiencecontents">
                    <div className="teacherexperienceinsiders">
                        {step === 1 && (
                            <>
                                <h2 style={{ marginBottom: '0px' }}>How much teaching experience do you have?</h2>
                                <p style={{ marginBottom: '10px' }}>Please select your total years of teaching experience.</p>
                                <div className="teaching-options">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            value="Less than 1 year"
                                            checked={teachingExperience === "Less than 1 year"}
                                            onChange={handleSelection}
                                        />
                                        <span>Less than 1 year</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            value="1-3 years"
                                            checked={teachingExperience === "1-3 years"}
                                            onChange={handleSelection}
                                        />
                                        <span>1-3 years</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            value="More than 3 years"
                                            checked={teachingExperience === "More than 3 years"}
                                            onChange={handleSelection}
                                        />
                                        <span>More than 3 years</span>
                                    </label>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h2>What school and degree did you attend?</h2>
                                <p style={{ marginBottom: '10px' }}>Please select the school and degree.</p>

                                {/* School Input */}
                                <div className="school-input">
                                    <input 
                                        type="text"
                                        value={searchSchool}
                                        onChange={handleSchoolSearch}
                                        placeholder="Enter school name"
                                    />
                                    <div className="suggestions-list">
                                        {schoolSuggestions.map(school => (
                                            <div className='suggestionsdropdown' key={school.name}>{school.name}</div>
                                        ))}
                                    </div>
                                </div>

                                {/* Degree Input */}
                                <div className="degree-input">
                                    <input 
                                        type="text"
                                        value={searchDegree}
                                        onChange={handleDegreeSearch}
                                        placeholder="Enter degree or course"
                                    />
                                    <ul className="suggestions-list">
                                        {degreeSuggestions.map((degree, index) => (
                                            <li key={index}>{degree}</li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <h2 style={{ marginBottom: '0px' }}>What is your teaching level?</h2>
                                <p style={{ marginBottom: '10px' }}>Please select your teaching proficiency level.</p>
                                <div className="teaching-options">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            value="Beginner"
                                            checked={teachingLevel === "Beginner"}
                                            onChange={handleSelection}
                                        />
                                        <span>Beginner</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            value="Intermediate"
                                            checked={teachingLevel === "Intermediate"}
                                            onChange={handleSelection}
                                        />
                                        <span>Intermediate</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            value="Pro"
                                            checked={teachingLevel === "Pro"}
                                            onChange={handleSelection}
                                        />
                                        <span>Pro</span>
                                    </label>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="teacherimagecontainer">
                        <img className='teachimage' src={Teacher} alt="" />
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
                                {step === 2 && (searchSchool || searchDegree) && (
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
