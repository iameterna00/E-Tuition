import React, { useState } from "react";
import "../../css/studyabroad.css"; 
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

// List of countries with flag URLs
const countries = [
  { name: "", flag: "https://theglobalcollege.com/wp-content/uploads/2020/03/what-is-global-at-college.jpg" },
  { name: "USA", flag: "https://flagcdn.com/w40/us.png" },
  { name: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
  { name: "China", flag: "https://flagcdn.com/w40/cn.png" },
  { name: "Japan", flag: "https://flagcdn.com/w40/jp.png" },
];

const Filter = ({ searchTerm, setSearchTerm, selectedCountry, setSelectedCountry }) => {
  const [filterVisible, setFilterVisible] = useState(true); // Track filter visibility
  
  // Toggle filter visibility
  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <div>
      <div className={`${filterVisible ? "filteruniversityoverlay" : ""}`}onClick={toggleFilter} ></div>
      <div
        className={`filter-container ${filterVisible ? "slide-in" : "slide-out"}`}
        style={{
          top: "70px",
          left: filterVisible ? "0" : "-400px", 
          transition: "left 0.3s ease-in-out",
          width: "300px",
          height: "100%",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          zIndex: "10"
        }}
      >
        <div className="titleoffilterunive" style={{ display: "flex", justifyContent: "space-between", width: "90%", paddingTop: "30px" }}>
          <h3>Filter Programs</h3>
          <div className="closefilteruniversityicon">
            <FaAnglesLeft fontSize={20} onClick={toggleFilter} />
          </div>
        </div>

        <input
          style={{ width: "90%", borderRadius: "10px" }}
          type="text"
          placeholder="Search program by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Country selection with circular flag images */}
        <div className="country-filter">
          {countries.map((country) => (
            <div
              key={country.name}
              className={`country-option ${selectedCountry === country.name ? "selected" : ""}`}
              onClick={() => {setSelectedCountry(country.name), setFilterVisible(false)}}
            >
              <img src={country.flag} alt={country.name} />
              <p>{country.name === '' ? 'All' : country.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating filter button */}
      {!filterVisible && (
    <button
    className="floating-filter-button"
    onClick={toggleFilter}
  >
              <p>Filter</p>
          <FaAnglesRight fontSize={15} />
      
        
        </button>
      )}
    </div>
  );
};

export default Filter;
