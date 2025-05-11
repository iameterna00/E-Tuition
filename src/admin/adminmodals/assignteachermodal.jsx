import React from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function AssignTeacherModal({
  isTeacherModalOpen,
  setIsTeacherModalOpen,
  handleTeacherSubmit,
  teacherData,
  setTeacherData,
  isAssigningTeacher,
  handleSubmitOnDue
}) {
  return (
    <>
      {isTeacherModalOpen && (
        <div className="modal-overlay" style={{ justifyContent: "center", alignItems: "center" }}>
          <div className="modal-content" style={{ maxWidth: '500px', marginLeft: "-20px" }}>
            <h2>Assign Teacher</h2>
            <form className="tuition-form" onSubmit={handleTeacherSubmit}>
              <input
                style={{ borderRadius: "10px" }}
                type="text"
                name="teacherName"
                placeholder="Teacher Name"
                value={teacherData.teacherName}
                onChange={(e) => setTeacherData({ ...teacherData, teacherName: e.target.value })}
              />
              
              <input
                style={{ borderRadius: "10px" }}
                type="number"
                name="commission"
                placeholder="Commission"
                value={teacherData.commission}
                onChange={(e) => setTeacherData({ ...teacherData, commission: e.target.value })}
              />

              <div className="buttons" style={{ display: "flex", gap: '10px' }}>
                <button type="submit">
                  {isAssigningTeacher ? <FaSpinner className="newspinner" /> : "Assign Teacher"}
                </button>
                <button
                  type="button"
                  onClick={handleSubmitOnDue}
                  className="submit-due-button"
                >
                  Submit on Due
                </button>
                <button
                  className="tuition-delete-button"
                  type="button"
                  onClick={() => setIsTeacherModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
