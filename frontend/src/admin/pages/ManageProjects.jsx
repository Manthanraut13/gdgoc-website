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
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }
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
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      planning: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: "📋" },
      ongoing: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: "🚀" },
      completed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: "✅" },
      archived: { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", icon: "📁" }
    };
    const style = badges[status] || badges.planning;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${style.bg} ${style.text} ${style.border}`}>
        {style.icon} {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Projects</h1>
        <button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:-translate-y-1 transition-all active:scale-95"
          onClick={handleAdd}
        >
          + Create New Project
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100">
          <p className="text-gray-400 font-medium">Loading projects database...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100">
          <p className="text-gray-500 text-lg">No projects found. Start by creating one!</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-bottom border-gray-100">
                <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Project Details</th>
                <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Type / Category</th>
                <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projects.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      {p.image ? (
                        <img src={p.image} className="w-12 h-12 rounded-xl object-cover shadow-sm bg-gray-100" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl">🚀</div>
                      )}
                      <div>
                        <div className="font-bold text-gray-900">{p.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5 max-w-[200px] truncate">{p.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="text-sm font-semibold text-gray-700">{p.type || "Open Source"}</div>
                    <div className="text-xs text-gray-400 capitalize">{p.category}</div>
                  </td>
                  <td className="p-6">
                    {getStatusBadge(p.status)}
                  </td>
                  <td className="p-6">
                    <div className="w-32">
                      <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 mb-1 px-1">
                        <span>COMPLETE</span>
                        <span>{p.progress || 0}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                          style={{ width: `${p.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-2">
                      <button
                        className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        title="Edit"
                        onClick={() => {
                          setSelected(p);
                          setOpenForm(true);
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        title="Delete"
                        onClick={() => {
                          setSelected(p);
                          setOpenDelete(true);
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
