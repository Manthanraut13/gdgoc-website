import { useState, useEffect } from "react";
import JoinDetailsModal from "../components/JoinDetailsModal";
import DeleteModal from "../components/DeleteModal";

import {
  getJoinApplications,
  deleteJoin,
} from "../../services/api";

const ManageJoinApplications = () => {
  const [applications, setApplications] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load join applications on mount
  useEffect(() => {
    loadJoinRequests();
  }, []);

  const loadJoinRequests = async () => {
    try {
      const res = await getJoinApplications(); // GET /join
      setApplications(res.data);
    } catch (error) {
      console.error("Failed to fetch join applications", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (app) => {
    setSelected(app);
    setOpenDetails(true);
  };

  const handleDelete = async () => {
    try {
      await deleteJoin(selected._id); // DELETE /join/:id
      setApplications(applications.filter((a) => a._id !== selected._id));
    } catch (error) {
      console.error("Failed to delete application", error);
    }
    setOpenDelete(false);
  };

  if (loading) return <p>Loading applications...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Join Applications</h1>
      </div>

      {applications.length === 0 ? (
        <p className="text-gray-600">No applications yet.</p>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a) => (
              <tr key={a._id} className="border-b">
                <td className="p-2">{a.name}</td>
                <td className="p-2">{a.email}</td>
                <td className="p-2">{a.role}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={() => handleView(a)}
                  >
                    View
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => {
                      setSelected(a);
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
      <JoinDetailsModal
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

export default ManageJoinApplications;
