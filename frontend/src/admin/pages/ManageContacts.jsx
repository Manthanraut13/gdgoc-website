import { useState, useEffect } from "react";
import ContactDetailsModal from "../components/ContactDetailsModal";
import DeleteModal from "../components/DeleteModal";

import { getContacts, deleteContact } from "../../services/api";

const ManageContacts = () => {
  const [messages, setMessages] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load contacts from backend
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const res = await getContacts(); // GET /contact
      setMessages(res.data);
    } catch (error) {
      console.error("Failed to fetch contact messages", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (msg) => {
    setSelected(msg);
    setOpenDetails(true);
  };

  const handleDelete = async () => {
    try {
      await deleteContact(selected._id); // DELETE /contact/:id
      setMessages(messages.filter((m) => m._id !== selected._id));
    } catch (error) {
      console.error("Failed to delete contact", error);
    }
    setOpenDelete(false);
  };

  if (loading) return <p>Loading messages...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Contact Messages</h1>
      </div>

      {messages.length === 0 ? (
        <p className="text-gray-600">No messages received yet.</p>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Subject</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m._id} className="border-b">
                <td className="p-2">{m.name}</td>
                <td className="p-2">{m.email}</td>
                <td className="p-2">{m.subject}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={() => handleView(m)}
                  >
                    View
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => {
                      setSelected(m);
                      setOpenDelete(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modals */}
      <ContactDetailsModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        data={selected}
      />
      <DeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ManageContacts;
