import { FaFileAlt, FaUserGraduate, FaMoneyBillWave  } from "react-icons/fa";
import '../../css/betuitor.css';
import beTuitot from '../../assets/betuitor1.png';
import { Link } from "react-router-dom";

function BetuitotContent() {
  return (
    <div className="BetuitotContent">
      <div className="BetuitotContentcontainer">
        <h3>Join Our Growing Tuitor Community</h3>
        <p>From critical skills to technical topics, KUBE supports your professional development.</p>
      </div>
      
      <div className="howitworks">
 <div className="howitworksinsiders">
 <h3>How It Works</h3>
        
        <div className="informationofwork">
        <div className="step">
           <FaFileAlt className="icon" />
           <h4>Create Your Profile</h4>
           {/* <p>Sign up , upload your information, and set your availability.</p> */}
         </div>
 
         <div className="step">
           <FaUserGraduate className="icon" />
           <h4>Connect with Students</h4>
           {/* <p>Students browse through profiles and select a tutor that fits their needs.</p> */}
         </div>
 
         <div className="step">
           <FaMoneyBillWave  className="icon" />
           <h4>Get Paid</h4>
           {/* <p>Receive secure payments and grow your tutoring career.</p> */}
         </div>
        </div>
 </div>
      </div>
   {/* <div className="learnfromus">
   <div className="learnfromuscontainer">
  <div className="learfromusText">
    <h3>Learn From KUBE</h3>
    <p style={{ textAlign: 'start' }}>
  How KUBE connects students with skilled teachers for a personalized learning experience: 
  Join us to learn at your own pace, anywhere, anytime!
</p>

  </div>
  
  <div className="learfromusVideo">
    <iframe 
      src="https://www.youtube.com/embed/rokmLmpiG9k" 
      title="YouTube video player" 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen>
    </iframe>
  </div>
</div>

   </div> */}
    </div>
  );
}

export default BetuitotContent;
