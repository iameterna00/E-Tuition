import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { webApi } from '../../api';

const socket = io(webApi, { transports: ['websocket'] });

function MeetModal({ classId, myuser }) {
    const [selectedTime, setSelectedTime] = useState('');
    const [isModalOpen, setMeetModalOpen] = useState(true);

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    }

    const handleSetupMeet = () => {
        if (selectedTime) {
            const meetMessage = {
                class_id: classId,
                student_uid: myuser.uid,
                message: `A meeting has been scheduled at ${selectedTime}`,
                adminId: myuser.uid,
                student_name: myuser.fullName,
                timestamp: new Date().toISOString(),
            };
            console.log('Sending meeting message:', meetMessage);

            // Emit the meeting message to the server
            socket.emit('send_message', meetMessage);
            
            // Close the modal after setup
            setMeetModalOpen(false);
        } else {
            alert('Please select a time.');
        }
    }

    return (
        isModalOpen && (
            <div className="meetmodalBody">
                <h3>Set Up a Meeting</h3>
                
                <label htmlFor="timeSelect">Select a time for the meeting:</label>
                <input
                    type="time"
                    id="timeSelect"
                    value={selectedTime}
                    onChange={handleTimeChange}
                />

                <button onClick={handleSetupMeet}>Set Up Meeting</button>
            </div>
        )
    );
}

export default MeetModal;
