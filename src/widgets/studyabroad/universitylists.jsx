import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import universitiesData from "./universitydata.js";
import "../../css/studyabroad.css";
import FilterUniversity from "./listuniversityfilter.jsx";
import Filter from "./filteruniversity.jsx";

const UniversityList = () => {
  const navigate = useNavigate();
  const { countryParam } = useParams();
  const selectedCountry = countryParam === "all" ? "" : countryParam;

  // State for search term and price range
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);

  // Function to parse cost of living string into min and max values
  const parseCostRange = (costString) => {
    const match = costString.match(/USD\s*(\d+)[–-](\d+)/);
    if (match) {
      return [parseInt(match[1]), parseInt(match[2])];
    }
    return [0, 9999]; // fallback if parsing fails
  };

  // Handle price range change (from the slider)
  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  // Filter universities based on search term and price range
  const filteredUniversities = universitiesData.filter((university) => {
    const matchesCountry = selectedCountry === "" || university.country === selectedCountry;
    const matchesName = university.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Parse cost of living and filter by price range
    const [minCost, maxCost] = parseCostRange(university.costOfLiving);
    const withinPriceRange = minCost <= priceRange[1] && maxCost >= priceRange[0];

    return matchesCountry && matchesName && withinPriceRange;
  });

  return (
    <div className="universitylistmain">
    
      <div className="vaccancymainCntainer" >
          <FilterUniversity
        setSearchTerm={setSearchTerm}
        priceRange={priceRange}
        handlePriceChange={handlePriceChange}
      />
        <h3 style={{marginTop:'20px'}}>Available Universities</h3>
        <div className="vaccancy-container">
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((university) => (
              <div
                key={university.id}
                className="university-card"
                onClick={() => navigate(`/university/${university.id}`)}
                style={{ cursor: "pointer", maxHeight:"400px" }}
              >
                <div className="vacancycardinsiders">
                  <div className="vacancyimagecontainer">
                    <img
                      style={{ objectFit: "cover" }}
                      src={university.image}
                      alt={university.name}
                      className="university-image"
                    />
                    <div className="vaccancyprofilecontainer">
                      <img className="vaccancyProfile" src={university.logo} alt="" />
                    </div>
                  </div>
                  <div className="university-info">
                    <h3>{university.name}</h3>
                    <p>{university.address}, {university.country}</p>
                    <p>Estimated Cost of Living: {university.costOfLiving}</p>
                      <button className='vaccancyapplybutton'>Apply</button>
                  </div>
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
              <p>No universities found.</p>
            </div>
          )}
        </div>
            
      </div>
       <Filter/>
    </div>
  );
};

export default UniversityList;
