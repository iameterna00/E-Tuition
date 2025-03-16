import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { webApi } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, fetchUser } from '../../services/Redux/userSlice';
import { getAuth } from 'firebase/auth';
import './classroom.css';
import ClassChatRoom from './classroom';
import messagepic from '../../assets/chat.png';
import emptyclass from '../../assets/empty.png';

function Chats() {
    const { classId } = useParams(); // Get classId from URL
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(classId || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const myuser = useSelector(selectUser);

    useEffect(() => {
        const authInstance = getAuth();
        const unsubscribe = authInstance.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                dispatch(fetchUser(firebaseUser.uid));
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    useEffect(() => {
        if (myuser && myuser.uid) {
            const fetchClasses = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`${webApi}/api/user/classes?student_uid=${myuser.uid}`);
                    if (!response.ok) throw new Error('Failed to fetch classes');
                    const data = await response.json();
                    if (Array.isArray(data.classes)) {
                        setClasses(data.classes);
                    } else {
                        setClasses([]);
                    }
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchClasses();
        }
    }, [myuser]);

    const handlebackclick = () => {
        setSelectedClass(null);
    };

    useEffect(() => {
        // Update selectedClass when classId from URL changes
        if (classId) {
            setSelectedClass(classId);
        }
    }, [classId]);

    const handleClassClick = (classItem) => {
        setSelectedClass(classItem);
    };

    return (
        <div className="chatroombody">
            <div className="chats-sidebar">
                <h3 className="chats-title">Your Classes</h3>
                {error && <p className="error-text">Error: {error}</p>}

                <div className="class-list">
                    {classes.length === 0 ? (
                        <div
                            className="emptyclasssituation"
                            style={{
                                marginTop: '100px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img style={{ width: '80px' }} src={emptyclass} alt="" />
                            <h3>No Class Found</h3>
                        </div>
                    ) : (
                        classes.map((classItem) => (
                            <button
                                key={classItem._id}
                                className={`class-card ${selectedClass === classItem._id ? 'active' : ''}`}
                                onClick={() => handleClassClick(classItem)}
                            >
                                <img
                                    src={classItem.image || '/default-class.jpg'}
                                    alt={classItem.courseTitle}
                                    className="class-image"
                                />
                                <p className="class-title">{classItem.courseTitle}</p>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Show chat room only if a class is selected */}
            <div className="desktopchatscreen">
                {selectedClass ? (
                    <ClassChatRoom
                        adminId={selectedClass.admin_id}  // Pass adminId to ClassChatRoom
                        classtitle={selectedClass.courseTitle}
                        classId={selectedClass._id}
                    />
                ) : (
                    <div className="welcometomessages">
                        <img className="wecomemessagepic" src={messagepic} alt="" />
                        <h3 style={{ marginTop: '10px' }}>Welcome To Message</h3>
                    </div>
                )}
            </div>

            {selectedClass && (
                <div className="mobilechatscreen">
                    <ClassChatRoom
                        adminId={selectedClass.admin_id}  // Pass adminId to ClassChatRoom
                        handlebackclick={handlebackclick}
                        classtitle={selectedClass.courseTitle}
                        classId={selectedClass._id}
                    />
                </div>
            )}
        </div>
    );
}

export default Chats;
