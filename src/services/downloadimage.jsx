import React from 'react';
import defaultBackground from '../assets/vacancy.png'; // Import the default image
import onlineTuitionBackground from '../assets/online-vacancy.png'; // Import online vacancy image
import html2canvas from 'html2canvas'; // Import html2canvas
import { BsStars } from "react-icons/bs";

const VacancyPreview = ({ vacancy }) => {
  // Determine the background image based on tuition type
  const vacancyBackground = vacancy.tuitionType === "Online Tuition" ? onlineTuitionBackground : defaultBackground;

  // Function to handle the download using html2canvas
  const downloadImage = () => {
    const div = document.getElementById(`vacancy-image-${vacancy._id}`); 

    // Check if the div is available
    if (div) {
      // Use html2canvas to capture the div as an image
      html2canvas(div).then((canvas) => {
        // Convert the canvas to a data URL (PNG image format)
        const dataUrl = canvas.toDataURL('image/png');

        // Create an anchor tag to trigger the download
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `vacancy-preview-${vacancy._id}.png`; // Use unique filename with vacancy ID
        link.click();
      }).catch((error) => {
        console.error('Error capturing the vacancy image:', error);
      });
    } else {
      console.error(`Element with id 'vacancy-image-${vacancy._id}' not found.`);
    }
  };

const vacancyDetails = [
  { label: 'Grade:', value: vacancy.grade },
  vacancy.location ? { label: 'Location:', value: vacancy.location } : null,
  { label: 'Subject:', value: vacancy.subject },
  { label: 'No of students:', value: vacancy.noofstudents },
  { label: 'Duration:', value: vacancy.duration },
  { label: 'Salary:', value: vacancy.salary },
  { label: 'Time:', value: vacancy.time },
].filter(item => item !== null); // This removes null values from the array


  // Conditionally add the "Requirements" section
  if (vacancy.tutorType) {
    vacancyDetails.push({ label: 'Tutor:', value: vacancy.tutorType });
  }
  if (vacancy.minRequirement) {
    vacancyDetails.push({ label: 'Requirements:', value: vacancy.minRequirement });
  }

  return (
    <>
      <div style={{ height: "0px", overflow: 'auto', position:'absolute'}}>
        <div id={`vacancy-image-${vacancy._id}`} className="vacancyimagediv" style={{ position: 'relative' }}>
          <img src={vacancyBackground} alt="Vacancy Background" />

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
              gap: '30px',
            }}
          >
            {vacancyDetails.map((item, index) => (
              <div key={index} className="vacancytext" style={{ display: 'flex', gap: '15px', marginBottom: '-110px', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {/* Bullet point */}
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#000' }} />
                  <h2 style={{ fontSize: "50px" }}>{item.label}</h2>
                </div>
                <h2 style={{ fontWeight: '400', fontSize: "50px" }}>{item.value}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="generateVacancy">
        <button style={{ backgroundColor: "green" }} onClick={downloadImage}>
          <BsStars /> Generate Vacancy
        </button>
      </div>
    </>
  );
};

export default VacancyPreview;
