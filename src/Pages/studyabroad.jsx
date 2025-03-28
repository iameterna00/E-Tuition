import React, { useState } from "react";
import Filter from "../widgets/studyabroad/filteruniversity.jsx";
import UniversityList from "../widgets/studyabroad/universitylists.jsx";
import "../css/studyabroad.css"; // Assuming you have a CSS file for styling
import studyabroadbanner from "../assets/studyabroad.png"; // Assuming you have a banner image

const StudyAbroad = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <div className="study-abroad-container">
      {/* Banner */}
      <div className="studyabroadbanner">
        <img style={{marginTop:'0px', maxWidth:'100%', height:'300px', objectFit:"cover"}} src={studyabroadbanner} alt="" />
  

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
