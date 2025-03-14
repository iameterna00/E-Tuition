import { useState } from "react";
import { webApi } from "../../api";

function ApplyCourse({showSUccessful, setShowSucessful, classid, studentid}){
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleJoinClass = async () => {
        setLoading(true);
        setMessage("");
    
        try {
            console.log('uid', studentid.uid)
          const response = await fetch(`${webApi}/api/classes/${classid}/join`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: studentid.uid, name: studentid.name }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setMessage("Successfully joined the class!");
          } else {
            setMessage(data.error || "Failed to join the class.");
          }
        } catch (error) {
          setMessage("An error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      };
    
    return (
        <div className="apply_coursesbody">
             {showSUccessful && (
  <div className="modalform" style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',  // Centers the modal vertically and horizontally
  }}>
    <div className="modal-contentsform" style={{
      overflowY: 'auto',  // Allows vertical scrolling
      maxHeight: '100%',   // Keeps the modal within the screen size
      padding: '10px',
      maxWidth:"700px",
      minHeight:"160px",
      flexDirection:"column",
      display:"flex",
      alignItems:"center",
      gap:"20px",
      justifyContent:'center',
      borderRadius: '10px',
      width: '100%',       // Adjust width as necessary
    }}>
    <h3>Apply for course!</h3>
    <div className="applycoursebuttons" style={{display:'flex', gap:"10px"}} >
    <button onClick={handleJoinClass} disabled={loading} style={{width:"100%", display:"flex", justifyContent:"center", maxWidth:"100px", alignItems:"center"}}>
              Apply
              </button>
    <button onClick={()=> setShowSucessful(false)} className="closebuttonapplycourse" style={{ width:"100%", display:"flex", justifyContent:"center", maxWidth:"100px", alignItems:"center"}}>
              Close
              </button>
    </div>
    </div>
  </div>
)}
        </div>
    )
}
export default ApplyCourse;