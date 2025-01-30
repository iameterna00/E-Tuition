import { useState } from 'react';
import KUBE from '../../assets/KUBE.png';
import Teacher from '../../assets/teach.png'

function TeachingExperience() {
    const [selectedTeachingType, setSelectedTeachingType] = useState("");

    const handleSelection = (event) => {
        setSelectedTeachingType(event.target.value);
    };

    return (
        <div className="teacherexperiencemodal">
            <div className="teacherexperiencecontainer">
                <nav className="tuitorinitialsteps">
                    <div className="tuitorinitialstepsnavcontents">
                        <div className="tuitorinitialnavcontainerleft">
                            <div className="kibelogocontainer">
                                <img src={KUBE} className="Kubelogo" alt="" />
                            </div>
                            <div className="teacherexperiencestepscounts">
                                <h3>Step 1 of 3</h3>
                            </div>
                        </div>
                        <div className="tuitorinitialnavcontainerright">
                            <div className="teacherexperiencesclose">
                                <h3>Exit</h3>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Experience Content Section */}
                <div className="teacherexperiencecontents">
                  <div className="teacherexperienceinsiders">
                  <h2 style={{marginBottom:'0px'}}>What type of teaching do you prefer?</h2>
                  <p style={{marginBottom:'10px'}}>Please select what best describes your preferred mode of teaching.</p>
                    <div className="teaching-options">
                        <label className="radio-label">
                            <input
                                type="radio"
                                value="Home Tuition"
                                checked={selectedTeachingType === "Home Tuition"}
                                onChange={handleSelection}
                            />
                            <span>Home Tuition</span>
                        </label>

                        <label className="radio-label">
                            <input
                                type="radio"
                                value="Online Tuition"
                                checked={selectedTeachingType === "Online Tuition"}
                                onChange={handleSelection}
                            />
                            <span>Online Tuition</span>
                        </label>

                        <label className="radio-label">
                            <input
                                type="radio"
                                value="Both"
                                checked={selectedTeachingType === "Both"}
                                onChange={handleSelection}
                            />
                            <span>I'll do both</span>
                        </label>
                    </div>
                  </div>
                <div className="teacherimagecontainer">
                <img className='teachimage' src={Teacher} alt="" />
                </div>
                </div>
                <nav className="tuitorinitialsteps">
                    <div className="tuitorinitialstepsnavcontents">
                        <div className="tuitorinitialnavcontainerleft">
                            <div className="kibelogocontainer">
                                <img src={KUBE} className="Kubelogo" alt="" />
                            </div>
                            <div className="teacherexperiencestepscounts">
                                <h3>Step 1 of 3</h3>
                            </div>
                        </div>
                        <div className="tuitorinitialnavcontainerright">
                            <div className="teacherexperiencesclose">
                                <h3>Exit</h3>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default TeachingExperience;
