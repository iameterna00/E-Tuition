import React from 'react'
import EditableMapSelector from '../editablemaps'

export default function EditModal({isEditModalOpen, editingVacancy, handleEditChange, setEditingVacancy, setIsEditModalOpen, formRef, handleEditSubmit}) {
  return (
    <>  {isEditModalOpen && editingVacancy && (
              <div className="modal-overlay"  style={{display:"flex", flexDirection:"column",alignItems:'start', justifyContent:'flex-start' }}>
              <div className="modal-content" style={{ textAlign: "start", height:"90vh", }}>
                <h2>Edit Vacancy</h2>
                <form  className="editformvacancy"
                  ref={formRef}
                  onSubmit={handleEditSubmit}>
                  <p style={{ margin: "0px" }}>Name</p>
                  <input
                    type="text"
                    name="name"
                    value={editingVacancy.name || ""}
                    onChange={handleEditChange}
                  />
          
                  <p style={{ margin: "0px" }}>Location</p>
                  <input
                    type="text"
                    name="location"
                    value={editingVacancy.location || ""}
                    onChange={handleEditChange}
                  />
          
                  <p style={{ margin: "0px" }}>Salary</p>
                  <input
                    type="text"
                    name="salary"
                    value={editingVacancy.salary || ""}
                    onChange={handleEditChange}
                  />
                  <p style={{ margin: "0px" }}>Grade</p>
    
                     <input
                    type="text"
                    name="grade"
                    value={editingVacancy.grade || ""}
                    onChange={handleEditChange}
                  />
          
                  {/* New Fields */}
                  <p style={{ margin: "0px" }}>Time</p>
                  <input
                    type="text"
                    name="time"
                    value={editingVacancy.time || ""}
                    onChange={handleEditChange}
                  />
          
                  <p style={{ margin: "0px" }}>Tutor Type</p>
                 
                  <input
                    type="text"
                    name="tutorType"
                    value={editingVacancy.tutorType || ""}
                    onChange={handleEditChange}
                  />
                  <p style={{ margin: "0px" }}>duration</p>
    
                   <input
                    type="text"
                    name="duration"
                    value={editingVacancy.duration || ""}
                    onChange={handleEditChange}
                  />
                   <p>subject</p>
                      <input
                    type="text"
                    name="subject"
                    value={editingVacancy.subject || ""}
                    onChange={handleEditChange}
                  />
                  <p>Min-Requirement</p>
                      <input
                    type="text"
                    name="minRequirement"
                    value={editingVacancy.minRequirement || ""}
                    onChange={handleEditChange}
                  />
              <EditableMapSelector editingVacancy={editingVacancy} setEditingVacancy={setEditingVacancy} />
    
                </form>
              </div>
                   <div className="editvacancybuttions" style={{margin:"10px", width:"100%", justifyContent:'center', display:'flex', gap:"10px"}}>
                 <button style={{ width:"60%",maxWidth:"250px" }}  onClick={() => formRef.current?.requestSubmit()}>Save</button>
                  <button className="tuition-delete-button" style={{ width:"30%", maxWidth:"200px" }} type="button" onClick={() => setIsEditModalOpen(false)}>
                    Cancel
                  </button>
                 </div>
            </div>
          )}</>
  )
}
