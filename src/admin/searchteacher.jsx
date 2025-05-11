import TeacherLocations from "./teacherfinder";


export default function SearchTeacher({
  searchTeacher,
  selectedVacancy,
  setSearchTeacher,
}) {
  return (
    <>
      {searchTeacher && (
        <div
          className="modal-overlaysearchteacher"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div className="modal-contentsearchteacher" style={{ padding: "20px" }}>
            <h2>Find Tutors</h2>
            <TeacherLocations
              vlat={selectedVacancy.lat}
              vlng={selectedVacancy.lng}
            />
            <div
              className="modal-actionscontentsearchteacher"
              style={{ display: "flex", gap: '10px' }}
            >
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
