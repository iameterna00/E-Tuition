
import { FaSpinner, FaSearch } from 'react-icons/fa';
import MapSelector from '../mapselectoradmin';

export default function AddVacancyModal({
  isModalOpen,
  handleSubmit,
  formData,
  setFormData,
  isSubmitting
}) {
  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modalcontentinsiders">
              <h2 className="tuition-heading">Add Vacancy</h2>
              <form className="tuition-form" onSubmit={handleSubmit}>
                {["name", "grade", "location", "noofstudents", "subject", "duration", "salary", "time", "minRequirement"].map((field) => (
                  <input
                    key={field}
                    className="tuition-input"
                    type={field === "noofstudents" ? "number" : "text"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                  />
                ))}
                <input
                  className="tuition-input"
                  type="text"
                  placeholder="Tutor Type"
                  value={formData.tutorType}
                  onChange={(e) =>
                    setFormData({ ...formData, tutorType: e.target.value })
                  }
                />
                <select
                  className="tuition-input"
                  style={{ backgroundColor: 'transparent' }}
                  value={formData.tuitionType}
                  onChange={(e) =>
                    setFormData({ ...formData, tuitionType: e.target.value })
                  }
                >
                  <option value="Home Tuition">Home Tuition</option>
                  <option value="Online Tuition">Online Tuition</option>
                </select>
                <h4 style={{ margin: "0px" }}>Tap the location of student</h4>
                <MapSelector formData={formData} setFormData={setFormData} />
              </form>
            </div>

            <div className="modal-submit-container">
              <button
                className="tuition-button"
                type="submit"
                onClick={handleSubmit}
              >
                {isSubmitting ? <FaSpinner className="newspinner" /> : "Add Vacancy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
