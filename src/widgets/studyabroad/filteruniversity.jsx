import React from "react";
import "../../css/studyabroad.css"; 

// List of countries with flag URLs
const countries = [
  { name: "", flag: "https://theglobalcollege.com/wp-content/uploads/2020/03/what-is-global-at-college.jpg" },
  { name: "USA", flag: "https://flagcdn.com/w40/us.png" },
  { name: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
  { name: "China", flag: "https://flagcdn.com/w40/cn.png" },
  { name: "Japan", flag: "https://flagcdn.com/w40/jp.png" },
];

const Filter = ({ searchTerm, setSearchTerm, selectedCountry, setSelectedCountry }) => {
  return (
    <div className="filter-container">
      <h3>Filter Programs</h3>

      {/* Search by title */}
      <input
      style={{width:"90%", borderRadius:"10px"}}
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
            onClick={() => setSelectedCountry(country.name)}
          >
            <img src={country.flag} alt={country.name} />
            <p>{country.name ===''? 'All': country.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
