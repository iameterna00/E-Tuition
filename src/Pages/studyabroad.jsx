import React, { useState } from "react";
import Filter from "../widgets/studyabroad/filteruniversity.jsx";
import UniversityList from "../widgets/studyabroad/universitylists.jsx";
import "../css/studyabroad.css"; // Assuming you have a CSS file for styling
import studyabroadbanner from "../assets/STUDY.png"; // Assuming you have a banner image

const StudyAbroad = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <div className="study-abroad-container" style={{marginBottom:"20px"}}>
      {/* Banner */}
      <div className="studyabroadbanner">
        <img  src={studyabroadbanner} alt="" />
  

      </div>

      <div className="content-container">
        {/* Left Filter */}
        <Filter 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          selectedCountry={selectedCountry} 
          setSelectedCountry={setSelectedCountry} 
        />

        {/* Right University List */}
        <UniversityList searchTerm={searchTerm} selectedCountry={selectedCountry} />
      </div>
    </div>
  );
};

export default StudyAbroad;
