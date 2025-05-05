import React, { useState } from "react";
import "../../css/studyabroad.css"; 
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

// List of countries with flag URLs
const countries = [
  { name: "", flag: "https://theglobalcollege.com/wp-content/uploads/2020/03/what-is-global-at-college.jpg" },
  { name: "USA", flag: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/960px-Flag_of_the_United_States.svg.png?20250221172329" },
  { name: "Canada", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1200px-Flag_of_Canada_%28Pantone%29.svg.png" },
  { name: "China", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1920px-Flag_of_the_People%27s_Republic_of_China.svg.png" },
  { name: "Japan", flag: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1920px-Flag_of_Japan.svg.png" },
];

const Filter = ({ searchTerm, setSearchTerm, selectedCountry, setSelectedCountry }) => {
  const [filterVisible, setFilterVisible] = useState(false); // Track filter visibility
  
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
          width: "300px",          zIndex: "a10"
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
