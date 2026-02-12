import { useState, useEffect } from "react";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../services/api";
import BlogFormModal from "../components/BlogFormModal";
import DeleteModal from "../components/DeleteModal";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await getBlogs();
      setBlogs(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching blogs", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleAdd = () => {
    setSelected(null);
    setOpenForm(true);
  };

  const handleSave = async (blogObj) => {
    try {
      if (selected) {
        await updateBlog(selected._id, blogObj);
      } else {
        await createBlog(blogObj);
      }
      setOpenForm(false);
      loadBlogs();
    } catch (err) {
      console.error("Save error:", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (blog) => {
    setSelected(blog);
    setOpenForm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(selected._id);
      setOpenDelete(false);
      loadBlogs();
    } catch (err) {
      console.error("Delete Error:", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const getStatusBadge = (status) => {
    const isPublished = status === 'published';
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${isPublished
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-amber-50 text-amber-700 border-amber-200"
        }`}>
        {isPublished ? "● Published" : "○ Draft"}
      </span>
    );
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <div className="flex justify-between items-center bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Editorial Studio</h1>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em] opacity-60">Manage your stories & insights</p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-200 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3"
          onClick={handleAdd}
        >
          <span className="text-xl">+</span> Write New Article
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-50 rounded-[2rem] animate-pulse border-2 border-dashed border-gray-200" />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-white rounded-[3rem] p-32 text-center border-4 border-dashed border-gray-100">
          <div className="text-6xl mb-6 opacity-20 text-gray-400">📖</div>
          <p className="text-gray-400 font-black text-xl tracking-tight">The archives are empty.</p>
          <p className="text-gray-300 text-sm mt-2">Start your editorial journey today.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/40 border border-gray-100 overflow-hidden backdrop-blur-3xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 italic">
                <th className="p-10 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Story Overview</th>
                <th className="p-10 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Identity</th>
                <th className="p-10 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Editorial</th>
                <th className="p-10 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {blogs.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="p-10">
                    <div className="flex items-center gap-8">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden bg-gray-100 border-4 border-white shadow-lg group-hover:rotate-3 transition-transform duration-500">
                          {b.image ? (
                            <img src={b.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl">✒️</div>
                          )}
                        </div>
                        {b.featured && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white text-xs shadow-lg ring-4 ring-white">⭐</div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="font-black text-gray-900 text-xl tracking-tighter leading-tight group-hover:text-blue-600 transition-colors">
                          {b.title}
                        </div>
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                          {b.category} <span className="w-1 h-1 bg-gray-200 rounded-full" /> {b.readTime || "5 min read"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-white shadow-sm flex items-center justify-center text-lg overflow-hidden font-black text-blue-500 text-sm uppercase">
                        {b.authorAvatar ? (
                          <img src={b.authorAvatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          b.author?.charAt(0) || "A"
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-sm font-black text-gray-800 tracking-tight">{b.author || "Anonymous"}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{b.authorRole || "Contributor"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-10">
                    <div className="space-y-3">
                      {getStatusBadge(b.status || 'published')}
                      <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                        {b.date ? new Date(b.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "Recently"}
                      </div>
                    </div>
                  </td>
                  <td className="p-10">
                    <div className="flex gap-4">
                      <button
                        className="w-12 h-12 bg-white text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-blue-100 border border-blue-50 flex items-center justify-center hover:-translate-y-1 active:scale-95"
                        onClick={() => handleEdit(b)}
                        title="Refine Article"
                      >
                        <span className="text-xl">✏️</span>
                      </button>
                      <button
                        className="w-12 h-12 bg-white text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-xl shadow-red-100 border border-red-50 flex items-center justify-center hover:-translate-y-1 active:scale-95"
                        onClick={() => {
                          setSelected(b);
                          setOpenDelete(true);
                        }}
                        title="Delete Permanently"
                      >
                        <span className="text-xl">🗑️</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <BlogFormModal
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

export default ManageBlogs;
