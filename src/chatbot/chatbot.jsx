import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { webApi } from "../api";
import '../css/chatbot.css'
import { IoIosSend } from "react-icons/io";
import Guru from '../assets/kubelogo.png';
import { FaSortDown } from "react-icons/fa6";

function Chatbot({isOpen}) {
    const [messages, setMessages] = useState([
        { role: "bot", content: "Hi, I am Guru! How can I help you?" }
    ]);
    const [input, setInput] = useState("");
    const chatBoxRef = useRef(null); // Ref to track the chat box

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]); // Runs every time messages update

    const sendMessage = async () => {
        if (!input) return;
        const userMessage = { role: "user", content: input };
        setMessages([...messages, userMessage]);
        setInput("");

        try {
            const res = await axios.post(`${webApi}/api/chat`, { message: input });
            setMessages([...messages, userMessage, { role: "bot", content: res.data.reply }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages([...messages, userMessage, { role: "bot", content: "Error: Unable to get a response." }]);
        }

        setInput("");
    };

    // Toggle chatbot visibility


    return (
        <div className={`chat-container ${isOpen ? "open" : "closed"}`}>
            <div className="titleofbot">
                <h2 className="chat-title">Chat With Guru!</h2>
            
            </div>
            <div className="chat-content">
                {isOpen && (
                    <>
                        <div className="chat-box" ref={chatBoxRef}>
                            {messages.map((msg, index) => (
                                <div key={index} className={`message-wrapper ${msg.role === "user" ? "user-wrapper" : "bot-wrapper"}`}>
                                    {msg.role === "bot" && <img src={Guru} alt="Guru Avatar" className="bot-avatar" />}
                                    <div className={`message ${msg.role === "user" ? "user-message" : "bot-message"}`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="input-container">
                            <input
                                className="chat-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                            />
                            <button className="send-button" onClick={sendMessage}>
                                <IoIosSend size={20} />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Chatbot;
