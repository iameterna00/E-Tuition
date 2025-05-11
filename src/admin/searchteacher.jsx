import { useState } from "react";
import TeacherLocations from "./teacherfinder";

export default function SearchTeacher({
  searchTeacher,
  selectedVacancy,
  setSearchTeacher,
}) {
  const [useVacancyTeachers, setUseVacancyTeachers] = useState(false);

  const togglePlacementSource = () => {
    setUseVacancyTeachers((prev) => !prev);
  };

  return (
    <>
      {searchTeacher && (
        <div className="modal-overlaysearchteacher" style={{ justifyContent: "center", alignItems: "center" }}>
          <div className="modal-contentsearchteacher" style={{ padding: "20px" }}>
            <h2>{useVacancyTeachers ? "Past Placements" : "Find Tutors"}</h2>
            <TeacherLocations
              vlat={selectedVacancy.lat}
              vlng={selectedVacancy.lng}
              useVacancyTeachers={useVacancyTeachers}
            />
            <div className="modal-actionscontentsearchteacher" style={{ display: "flex", gap: '10px' }}>
              <button
                className="generateVacancy"
                onClick={togglePlacementSource}
                style={{ marginTop: '20px', padding:"10px 20px", border:"1px solid grey" }}
              >
                {useVacancyTeachers ? "Live Teachers" : "Past Placements"}
              </button>
              <button
                className="cancel-button"
                style={{ marginTop: '20px', backgroundColor: "red", color: 'white' }}
                onClick={() => setSearchTeacher(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
