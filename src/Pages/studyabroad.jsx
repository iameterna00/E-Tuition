import React, { useState } from "react";
import Filter from "../widgets/studyabroad/filteruniversity.jsx";
import UniversityList from "../widgets/studyabroad/universitylists.jsx";
import "../css/studyabroad.css"; // Assuming you have a CSS file for styling
import studyabroadbanner from "../assets/STUDY.png"; // Assuming you have a banner image
import studyabroadbannerphone from "../assets/STUDY1.png"; // Assuming you have a banner image
import AbroadStudentForm from "../widgets/studyabroad/stydyabroadform.jsx";
import bannergirl from "../assets/abroadbanner2.png"

const StudyAbroad = () => {

  return (
    <div className="study-abroad-container" style={{marginBottom:"20px"}}>
      {/* Banner */}
      <div className="studyabroadbanner">
        <img  src={studyabroadbanner} alt="" />
  

      </div>
         <div className="studyabroadbannerphone">
         <img  src={studyabroadbannerphone} alt="" />
       </div>
       <div className="stuyaboadform">
     <div className="studyabroadforminsiders">
     <AbroadStudentForm
        itsfrontpage={true}
        />
        <img src={bannergirl} alt="" />
     </div>
       </div>

      <div className="content-container">
        {/* Left Filter */}
        <Filter 
        />


      </div>
    </div>
  );
};

export default StudyAbroad;
