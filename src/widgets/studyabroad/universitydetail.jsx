import React from "react";
import { useParams } from "react-router-dom";
import universitiesData from "./universitydata.js";

const UniversityDetail = () => {
  const { id } = useParams();
  const university = universitiesData.find((uni) => uni.id === parseInt(id));

  if (!university) {
    return <h2>University Not Found</h2>;
  }

  return (
    <div className="university-detail">
      <h2>{university.name}</h2>
      <img
        src={university.logo}
        alt={university.name}
        className="university-logo"
        style={{ width: "200px", height: "auto" }}
      />
      <p><strong>Address:</strong> {university.address}, {university.country}</p>
      <p><strong>Estimated Cost of Living:</strong> {university.costOfLiving}/month</p>
    </div>
  );
};

export default UniversityDetail;
