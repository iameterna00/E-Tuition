import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import universitiesData from "./universitydata.js";
import "../../css/studyabroad.css";

const UniversityList = () => {
  const navigate = useNavigate();
  const { countryParam } = useParams();
  const selectedCountry = countryParam === "all" ? "" : countryParam;

  const filteredUniversities = universitiesData.filter((university) =>
    (selectedCountry === "" || university.country === selectedCountry)
  );

  return (
    <div className="university-list-container">
      <h3>Available Universities</h3>
      <div className="university-list">
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
          <div
            className="nouniversityfound"
            style={{
              height: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
              No universities found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityList;
