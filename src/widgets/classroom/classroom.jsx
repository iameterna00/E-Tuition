import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from '../../services/Redux/userSlice';
import { getAuth } from 'firebase/auth';
import { webApi } from '../../api';
import io from 'socket.io-client';
import './classroom.css';
import { FaArrowLeft, FaBackward } from 'react-icons/fa';

const socket = io(webApi, { transports: ['websocket'] });

function ClassChatRoom({ classId, classtitle, handlebackclick }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const myuser = useSelector(selectUser);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    // Update socket room on classId change
    useEffect(() => {
        // Clear previous messages when classId changes
        setMessages([]);

        if (classId) {
            console.log('Joining room:', classId);
            socket.emit('joinRoom', { classId });
        }

        return () => {
            if (classId) {
                console.log('Leaving room:', classId);
                socket.emit('leaveRoom', { classId });
            }
        };
    }, [classId]); // Join/Leave room on classId change

    // Fetch user data on authentication change
    useEffect(() => {
        const authInstance = getAuth();
        const unsubscribe = authInstance.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                dispatch(fetchUser(firebaseUser.uid));
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    // Handle receiving new messages
    useEffect(() => {
        socket.on('newMessage', (message) => {
            console.log('New message received:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('newMessage');
        };
    }, []);

    // Fetch chat messages based on classId
    useEffect(() => {
        const fetchChatMessages = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${webApi}/api/class/chat/${classId}?student_uid=${myuser.uid}`);
                console.log('Fetching messages from:', `${webApi}/api/class/chat/${classId}?student_uid=${myuser.uid}`);
                if (!response.ok) {
                    if (response.status === 403) {
                        setError('You are not enrolled in this class');
                        navigate('/');
                    }
                } else {
                    const data = await response.json();
                    // Only update state if there are new messages
                    setMessages((prevMessages) => {
                        const newMessages = data.messages.filter(
                            (newMsg) => !prevMessages.some((msg) => msg._id === newMsg._id)
                        );
                        return [...prevMessages, ...newMessages];
                    });
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (myuser?.uid && classId) fetchChatMessages();

    }, [classId, myuser?.uid, navigate]);

    // Scroll to the bottom when new messages are added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle sending messages
    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const messageData = {
            class_id: classId,
            student_uid: myuser.uid,
            message: newMessage,
            timestamp: new Date().toISOString(),
        };

        console.log('Sending message:', messageData); // Debugging

        // Emit to server
        socket.emit('send_message', messageData);

        setNewMessage('');
    };

    return (
        <div className="chatcontainerbody">
            <div className="classchat-container">
              <div className="classroomtitle">
              <button className='backchatbutton' onClick={handlebackclick} > <FaArrowLeft/> </button>
              <h2>{classtitle}</h2>
            
                {error && <p>Error: {error}</p>}
              </div>

                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chatmessages `}>
                            <small className={`${msg.student_uid === myuser.uid ? 'sendername' : 'receivername'}`}>{msg.student_name}</small>
                            <div className={`messagedetail ${msg.student_uid === myuser.uid ? 'sentmessage' : 'received'}`}>
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="message-input">
                    <input
                        style={{ borderRadius: '10px' }}
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button style={{ maxHeight: "40px" }} onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default ClassChatRoom;
