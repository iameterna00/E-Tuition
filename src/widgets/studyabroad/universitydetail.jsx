import React from "react";
import { useParams } from "react-router-dom";
import universitiesData from "./universitydata.js";
import "../../css/universitydetails.css"; 

const UniversityDetail = () => {
  const { id } = useParams();
  const university = universitiesData.find((uni) => uni.id === parseInt(id));

  if (!university) {
    return (
      <div className="university-not-found">
        <h2>University Not Found</h2>
      </div>
    );
  }

  const formatDescription = (desc) => {
    return desc.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return null;
      
      if (trimmedLine.startsWith('### ')) {
        return <h3 key={index} className="description-heading">{trimmedLine.substring(4)}</h3>;
      }
      
      if (trimmedLine.startsWith('#### ')) {
        return <h4 key={index} className="description-subheading">{trimmedLine.substring(5)}</h4>;
      }
      
      if (trimmedLine.startsWith('- ')) {
        return (
          <div key={index} className="description-point">
            <span className="description-bullet">•</span>
            <span>{trimmedLine.substring(2)}</span>
          </div>
        ); 
      }
      
      return <p key={index} className="description-paragraph">{trimmedLine}</p>;
    });
  };

  return (
    <div className="university-detail">
      <div className="university-header">
        <img
          src={university.logo}
          alt={university.name}
          className="university-logo"
        />
        <div className="university-info">
          <h2>{university.name}</h2>
          <p>
            <strong>Address:</strong> {university.address}, {university.country}
          </p>
          {university.website && (
            <p className="website">
              <a href={university.website} target="_blank" rel="noopener noreferrer">
                Visit Official Website
              </a>
            </p>
          )}
        </div>
      </div>
      {university.video && (
  <video
    src={university.video}
    autoPlay
    muted
    loop
    playsInline
    controls={false}
    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
  />
) }
{university.image &&(
  <img
    src={university.image}
    alt={university.name}
    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
  />
)}



      
      {university.description && (
        <div className="university-description">
          <div className="description-content">
          <h3>About</h3>
            {formatDescription(university.description)}
          </div>
          <div className="university-details" style={{textAlign:'start'}}>
    <div className="universitydetailsinsiders">
    {university.ranking && (
          <div>
            <strong>Global Ranking:</strong> {university.ranking}
          </div>
        )}
        {university.tuition && (
          <div>
            <strong>Tuition Fee:</strong> {formatDescription(university.tuition)}
          </div>
        )}
        {university.costOfLiving && (
          <div>
            <strong>Estimated Cost of Living:</strong> {formatDescription(university.costOfLiving)} 
          </div>
        )}
         {university.monthlyStipend && (
          <div>
            <strong>Monthly Stipend:</strong>  {formatDescription(university.monthlyStipend)}
          </div>)}
        {university.programs && (
          <div>
            <strong>Popular Programs:</strong> {university.programs.join(", ")}
          </div>
        )}
    </div>
      </div> 
        </div>
      )}
    </div>
  );
};

export default UniversityDetail;