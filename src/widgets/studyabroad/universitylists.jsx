import React from "react";
import universitiesData from "./universitydata.js"; // Assuming you have a JSON file with university data
import "../../css/studyabroad.css";

const UniversityList = ({ searchTerm, selectedCountry }) => {
  const filteredUniversities = universitiesData.filter((university) => 
    university.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCountry === "" || university.country === selectedCountry)
  );

  return (
    <div className="university-list">
      <h3>Available Universities</h3>
      
      {filteredUniversities.length > 0 ? (
        filteredUniversities.map((university) => (
          <div key={university.id} className="university-card">
            <img src={university.logo} alt={university.name} className="university-logo" />
            <div className="university-info">
              <h4>{university.name}</h4>
              <p>{university.address}, {university.country}</p>
              <p>💰 Estimated Cost of Living: {university.costOfLiving}/month</p>
            </div>
          </div>
        ))
      ) : (
        <p>No universities found.</p>
      )}
    </div>
  );
};

export default UniversityList;
