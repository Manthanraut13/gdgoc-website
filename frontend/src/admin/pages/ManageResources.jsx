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
      await deleteResource(selected._id);
      setOpenDelete(false);
      loadResources();
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

  const getCategoryBadge = (cat) => {
    const badges = {
      Documentation: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: "📚" },
      YouTube: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: "🎥" },
      Course: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: "🎓" },
      Tools: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: "🛠️" },
      Roadmap: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", icon: "🗺️" },
      Blogs: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", icon: "✍️" },
      API: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200", icon: "🔌" },
      "GitHub Repo": { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", icon: "🐙" }
    };
    const style = badges[cat] || { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200", icon: "✨" };
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${style.bg} ${style.text} ${style.border}`}>
        {style.icon} {cat}
      </span>
    );
  };

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'beginner': return 'text-emerald-500';
      case 'intermediate': return 'text-amber-500';
      case 'advanced': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic">Resource Hub</h1>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-[0.2em]">Asset & Documentation Management</p>
        </div>
        <button
          className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-gray-200 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3"
          onClick={handleAdd}
        >
          <span className="text-xl">+</span> Add Knowledge Asset
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-[2.5rem] p-24 text-center shadow-sm border border-gray-100 flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Indexing resources...</p>
        </div>
      ) : resources.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-24 text-center shadow-sm border border-gray-100">
          <p className="text-gray-400 font-bold text-lg">Your library is empty.</p>
          <button onClick={handleAdd} className="text-blue-600 font-black mt-2 hover:underline uppercase text-xs tracking-widest">Add your first resource →</button>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden mt-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Resource</th>
                <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Context</th>
                <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Details</th>
                <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {resources.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50/30 transition-all group">
                  <td className="p-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-3xl bg-white border border-gray-100 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                        {r.icon || "📘"}
                      </div>
                      <div className="space-y-1">
                        <div className="font-black text-gray-900 text-lg tracking-tight leading-tight">{r.title}</div>
                        <div className="text-xs text-gray-400 font-medium max-w-[280px] line-clamp-1">{r.description}</div>
                        <a href={r.url} target="_blank" rel="noreferrer" className="text-[10px] text-blue-500 font-bold hover:underline break-all opacity-0 group-hover:opacity-100 transition-opacity">
                          {r.url?.substring(0, 40)}...
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex flex-col gap-2">
                      {getCategoryBadge(r.category)}
                      <div className={`text-[10px] font-black uppercase tracking-widest ${getDifficultyColor(r.difficulty)}`}>
                        {r.difficulty || "Beginner"}
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-gray-700">{r.provider || "GDGOC"}</div>
                      <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider italic">{r.language || "English"}</div>
                      {r.featured && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-black rounded-lg uppercase">Featured</span>
                      )}
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex gap-3">
                      <button
                        className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center justify-center font-bold"
                        title="Edit Resource"
                        onClick={() => {
                          setSelected(r);
                          setOpenForm(true);
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        className="w-10 h-10 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center justify-center font-bold"
                        title="Delete Resource"
                        onClick={() => {
                          setSelected(r);
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
