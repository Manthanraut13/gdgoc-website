import { useState, useEffect } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from "../../services/api";
import ProjectFormModal from "../components/ProjectFormModal";
import DeleteModal from "../components/DeleteModal";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjects();
      setProjects(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAdd = () => {
    setSelected(null);
    setOpenForm(true);
  };

  const handleSave = async (projectObj) => {
    try {
      if (selected) {
        await updateProject(selected._id, projectObj);
      } else {
        await createProject(projectObj);
      }
      setOpenForm(false);
      await loadProjects();
    } catch (err) {
      console.error("Save Error:", err);
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject(selected._id);
      setOpenDelete(false);
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600' }}>Manage Projects</h1>
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
        + Add Project
      </button>

      {loading ? (
        <p style={{ color: '#999' }}>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <table style={{ width: '100%', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
          <thead>
            <tr style={{ backgroundColor: '#e5e7eb', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>Title</th>
              <th style={{ padding: '8px' }}>Category</th>
              <th style={{ padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '8px' }}>{p.title}</td>
                <td style={{ padding: '8px' }}>{p.category}</td>
                <td style={{ padding: '8px', display: 'flex', gap: '8px' }}>
                  <button
                    style={{ padding: '4px 8px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => {
                      setSelected(p);
                      setOpenForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{ padding: '4px 8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => {
                      setSelected(p);
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

      <ProjectFormModal
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

export default ManageProjects;
