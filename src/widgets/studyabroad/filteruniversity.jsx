import React, { useState } from "react";
import "../../css/studyabroad.css"; 
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// List of countries with flag URLs
const countries = [
  { name: "", flag: "https://theglobalcollege.com/wp-content/uploads/2020/03/what-is-global-at-college.jpg" },
  { name: "USA", flag: "https://www.welleducationhub.edu.np/wp-content/uploads/2024/01/study-in-usa.jpg" },
  { name: "Canada", flag: "https://www.fastlaneeducation.com/uploads/posts/Canada-1702274627.jpg" },
  { name: "China", flag: "https://www.shiftcities.org/sites/default/files/styles/16_9_extra_large/public/2021-12/china%20%284%29%20small.png?itok=cF7KwsFH" },
  { name: "Japan", flag: "https://keystoneacademic-res.cloudinary.com/image/upload/element/17/176271_Tokyo.jpg" },
  { name: "Austrilia", flag: "https://static.independent.co.uk/2023/12/06/14/iStock-646880230.jpg?quality=75&width=1368&crop=3%3A2%2Csmart&auto=webp"}
];

const Filter = () => {
  const navigate = useNavigate();

  const handleCountrySelect = (country) => {
    const countryParam = country === "" ? "all" : country;
    navigate(`/universities/${countryParam}`);
  };


  return (
    <div className="filter-container">
      <div className="filter-containerinsiders"
      >
        <div className="titleoffilterunive" style={{ display: "flex",flexDirection:'column', justifyContent: "space-between", width: "90%", paddingTop: "30px", textAlign:'start' }}>
          <h2>Find Your Dream Destinations</h2>
          <p>Start your study abroad journey in these welcoming study locations! Our expert counsellors will guide you through choosing the perfect study abroad universities & colleges program.</p>
        </div>

        {/* <input
          style={{ width: "90%", maxWidth:'300px', borderRadius: "10px" }}
          type="text"
          placeholder="Search program by title..."
         
        /> */}

        {/* Country selection with circular flag images */}
        <div className="country-filter">
          {countries.map((country) => (
            <div
              key={country.name}
              className={`country-option`}
                onClick={() => handleCountrySelect(country.name)}
            >
              <img src={country.flag} alt={country.name} />
              <p className="countrynames" >{country.name === '' ? 'All' : country.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
