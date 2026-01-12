const ContactDetailsModal = ({ open, onClose, data }) => {
  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-3">Message Details</h2>

        <div className="space-y-2">
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Subject:</strong> {data.subject}</p>
          <p><strong>Message:</strong></p>
          <p className="text-sm text-gray-700 bg-gray-100 p-2 rounded">
            {data.message}
          </p>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsModal;
