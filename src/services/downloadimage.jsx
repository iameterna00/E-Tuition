import React, { useState } from 'react';
import backgroundImage from '../assets/vacancy.png'; // Import the image directly
import html2canvas from 'html2canvas'; // Import html2canvas
import { BsStars } from "react-icons/bs";

const VacancyPreview = ({ vacancy }) => {

  // Function to handle the download using html2canvas
  const downloadImage = () => {
    const div = document.getElementById('vacancy-image'); // Get the div reference

    // Use html2canvas to capture the div as an image
    html2canvas(div).then((canvas) => {
      // Convert the canvas to a data URL (PNG image format)
      const dataUrl = canvas.toDataURL('image/png');

      // Create an anchor tag to trigger the download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'vacancy-preview.png'; // Name of the file to download
      link.click();
    });
  };

  const vacancyDetails = [
    { label: 'Grade:', value: vacancy.grade },
    { label: 'Location:', value: vacancy.location },
    { label: 'Subject:', value: vacancy.subject },
    { label: 'No of student:', value: vacancy.students },
    { label: 'Duration:', value: vacancy.duration },
    { label: 'Salary:', value: vacancy.salary },
    { label: 'Time:', value: vacancy.time },
  ];

  // Conditionally add the "Requirements" section
  if (vacancy.minRequirement) {
    vacancyDetails.push({
      label: 'Requirements:',
      value: vacancy.minRequirement,
    });
  }

  return (
  <>
    <div style={{height:"0px", overflow:'auto', position:"absolute"}}>
      <div
        id="vacancy-image"
        className="vacancyimagediv"
        style={{ position: 'relative' , }}
      >
        <img src={backgroundImage} alt="" />
        <div
          className="detailsoftext"
          style={{
            position: 'absolute',
            top: '38%',
            left: '13%',
            fontSize: '40px',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'start',
            alignItems: 'start',
            gap: '0px',
          }}
        >
          {vacancyDetails.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '-110px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className="vacancytext"
            >
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  marginBottom: '0px',
                  alignItems: 'center',
                }}
              >
                {/* Bullet point */}
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#000',
                  }}
                />
                <h2>{item.label}</h2>
              </div>
              <h2 style={{ fontWeight: '400' }}>{item.value}</h2>
            </div>
          ))}
        </div>
      </div>

  
    </div>
 <div className="genetatebacancy">
 <button  style={{backgroundColor:"green"}} onClick={downloadImage}>
 <BsStars /> Generate Vacancy
      </button>
 </div>
    </>
  );
};

export default VacancyPreview;
