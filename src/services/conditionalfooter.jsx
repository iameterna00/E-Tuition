import { useLocation } from "react-router-dom";
import Footer from "../footer.jsx";

function ConditionalFooter() {
    const location = useLocation();
    
    // Hide ChatBotButton on admin routes
    if (location.pathname.startsWith("/profile")) {
      return null;
    }
  
    if (location.pathname.startsWith("/chat")) {
      return null;
    }
    return <Footer />;
  }
  export default ConditionalFooter;