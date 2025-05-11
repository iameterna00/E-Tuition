import { FaSpinner } from 'react-icons/fa';

export default function DeleteVacancy({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  confirmDeleteVacancy,
  isDeleting,
}) {
  return (
    <>
      {isDeleteModalOpen && (
        <div
          className="modal-overlay"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div className="modal-content">
            <h2>Are you sure you want to delete this vacancy?</h2>
            <div
              className="modal-actions"
              style={{ display: "flex", gap: '10px' }}
            >
              <button
                className="cancel-button"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="tuition-delete-button"
                onClick={confirmDeleteVacancy}
              >
                {isDeleting ? <FaSpinner className="newspinner" /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
