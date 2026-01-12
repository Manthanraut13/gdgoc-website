// src/admin/components/DeleteModal.jsx
const DeleteModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay">
      <div className="bg-white w-80 p-6 rounded shadow space-y-4">
        <h3 className="text-lg font-semibold">Confirm Delete?</h3>
        <p className="text-sm text-gray-600">This action cannot be undone.</p>

        <div className="flex justify-between pt-2">
          <button onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded">
            Delete
          </button>
          <button onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
