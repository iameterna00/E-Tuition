import { useLocation } from "react-router-dom";
import ChatBotButton from "./chatbotbutton";

function ConditionalChatbot() {
    const location = useLocation();
    
    // Hide ChatBotButton on admin routes
    if (location.pathname.startsWith("/admin")) {
      return null;
    }
  
    return <ChatBotButton />;
  }
  export default ConditionalChatbot;