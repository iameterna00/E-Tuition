import { useState } from "react";
import { FaChevronCircleDown, FaChevronDown } from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";
import Chatbot from "./chatbot";

function ChatBotButton(){
    const [isChatBotOpen, setIsChatBotOpen] = useState(false); // Keeps track if the user is loaded and checked

    return(
       <>
         <button className="floating-button" style={{ bottom:'50px', backgroundColor:' #2d96ff'}} onClick={() => setIsChatBotOpen(!isChatBotOpen)}>{isChatBotOpen ? <FaChevronDown/> : <IoChatbubbles size={30} /> }  </button>
         
         <div className="chatbot">
                 <Chatbot isOpen={isChatBotOpen} />
            </div>
         </>
    )
}
export default ChatBotButton;