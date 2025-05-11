import React from 'react';

export default function ConfirmTeacherModal({
  isCompleteTeacherModalOpen,
  setIsCompleteTeacherModalOpen,
  handleCompleteTeacherSelect,
  handleConfirmComplete,
  vacancies,
  vacancyId,
}) {
  return (
    <>
      {isCompleteTeacherModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Complete Vacancy</h2>
            <label>Select Teacher</label>
            <select style={{ padding: "10px" }} onChange={handleCompleteTeacherSelect}>
              <option value="">Select Teacher</option>
              {vacancies
                .find((vacancy) => vacancy._id === vacancyId)
                ?.teachers.map((teacher, index) => (
                  <option key={index} value={teacher.teacherName}>
                    {teacher.teacherName} — {teacher.commission}
                  </option>
                ))}
            </select>
            <button onClick={handleConfirmComplete}>Confirm Complete</button>
            <button
              className="tuition-delete-button"
              onClick={() => setIsCompleteTeacherModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
