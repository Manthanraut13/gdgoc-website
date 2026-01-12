import { useState, useEffect } from "react";
import {
  getResources,
  createResource,
  updateResource,
  deleteResource
} from "../../services/api";
import ResourceFormModal from "../components/ResourceFormModal";
import DeleteModal from "../components/DeleteModal";

const ManageResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  const loadResources = async () => {
    try {
      setLoading(true);
      const res = await getResources();
      setResources(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleAdd = () => {
    setSelected(null);
    setOpenForm(true);
  };

  const handleSave = async (resourceObj) => {
    try {
      if (selected) {
        await updateResource(selected._id, resourceObj);
      } else {
        await createResource(resourceObj);
      }
      setOpenForm(false);
      await loadResources();
    } catch (err) {
      console.error("Save Error:", err);
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteResource(selected._id);
      setOpenDelete(false);
      loadResources();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600' }}>Manage Resources</h1>
      </div>
      <button
        style={{
          padding: '10px 16px',
          backgroundColor: '#22c55e',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '24px'
        }}
        onClick={handleAdd}
      >
        + Add Resource
      </button>

      {loading ? (
        <p style={{ color: '#999' }}>Loading...</p>
      ) : resources.length === 0 ? (
        <p>No resources yet.</p>
      ) : (
        <table style={{ width: '100%', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
          <thead>
            <tr style={{ backgroundColor: '#e5e7eb', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>Title</th>
              <th style={{ padding: '8px' }}>Type</th>
              <th style={{ padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '8px' }}>{r.title}</td>
                <td style={{ padding: '8px' }}>{r.type}</td>
                <td style={{ padding: '8px', display: 'flex', gap: '8px' }}>
                  <button
                    style={{ padding: '4px 8px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => {
                      setSelected(r);
                      setOpenForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{ padding: '4px 8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => {
                      setSelected(r);
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

      <ResourceFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleSave}
        editData={selected}
      />

      <DeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ManageResources;
