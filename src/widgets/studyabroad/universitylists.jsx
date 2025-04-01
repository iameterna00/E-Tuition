import React from "react";
import { useNavigate } from "react-router-dom";
import universitiesData from "./universitydata.js";
import "../../css/studyabroad.css";

const UniversityList = ({ searchTerm, selectedCountry }) => {
  const navigate = useNavigate();

  const filteredUniversities = universitiesData.filter((university) =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCountry === "" || university.country === selectedCountry)
  );

  return (
    <div className="university-list">
      <h3>Available Universities</h3>
      
      {filteredUniversities.length > 0 ? (
        filteredUniversities.map((university) => (
          <div
            key={university.id}
            className="university-card"
            onClick={() => navigate(`/university/${university.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              style={{ objectFit: "cover" }}
              src={university.logo}
              alt={university.name}
              className="university-logo"
            />
            <div className="university-info">
              <h3>{university.name}</h3>
              <p>{university.address}, {university.country}</p>
              <p>Estimated Cost of Living: {university.costOfLiving}/month</p>
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
