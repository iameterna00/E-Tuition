import React from 'react'

export default function EditTeachers({
  isEditteacherModalOpen,
  editingVacancy,
  handleEditChange,
  handleEditSubmit,
  setIsteacherEditModalOpen
}) {
  return (
    <>
      {isEditteacherModalOpen && editingVacancy && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ textAlign: "start" }}>
            <h2>Edit Teachers</h2>
            <form onSubmit={handleEditSubmit}>
              {editingVacancy.teachers?.map((teacher, index) => (
                <div className="teacheredits" key={index} style={{ marginBottom: "10px" }}>
                  <p style={{ margin: "0px" }}>Teacher {index + 1}</p>

                  {/* Editable Teacher Name */}
                  <input
                    style={{ borderRadius: "10px" }}
                    type="text"
                    name={`teacherName-${index}`}
                    value={teacher.teacherName || ""}
                    onChange={(e) => {
                      const updatedTeachers = [...editingVacancy.teachers];
                      updatedTeachers[index] = {
                        ...updatedTeachers[index],
                        teacherName: e.target.value,
                      };
                      handleEditChange({ target: { name: "teachers", value: updatedTeachers } });
                    }}
                  />

                  {/* Editable Commission */}
                  <p style={{ margin: "0px" }}>Commission</p>
                  <input
                    style={{ borderRadius: "10px" }}
                    type="number"
                    name={`commission-${index}`}
                    value={teacher.commission || ""}
                    onChange={(e) => {
                      const updatedTeachers = [...editingVacancy.teachers];
                      updatedTeachers[index] = {
                        ...updatedTeachers[index],
                        commission: e.target.value,
                      };
                      handleEditChange({ target: { name: "teachers", value: updatedTeachers } });
                    }}
                  />

                  {/* Editable Commission Due */}
                  <p style={{ margin: "0px", color: "red" }}>Commission Due</p>
                  <input
                    style={{ borderRadius: "10px" }}
                    type="number"
                    name={`commissionDue-${index}`}
                    value={teacher.commissionDue || ""}
                    onChange={(e) => {
                      const updatedTeachers = [...editingVacancy.teachers];
                      updatedTeachers[index] = {
                        ...updatedTeachers[index],
                        commissionDue: e.target.value,
                      };
                      handleEditChange({ target: { name: "teachers", value: updatedTeachers } });
                    }}
                  />
                </div>
              ))}

              <button type="submit">Save</button>
              <button
                type="button"
                className="tuition-delete-button"
                style={{ marginLeft: '10px' }}
                onClick={() => setIsteacherEditModalOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
