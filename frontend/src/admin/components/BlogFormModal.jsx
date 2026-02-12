import { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";

const emptyForm = {
  title: "",
  author: "",
  authorRole: "",
  authorAvatar: "",
  excerpt: "",
  content: "",
  category: "Technology",
  tags: "",
  seoKeywords: "",
  readTime: "5 min read",
  image: "",
  featured: false,
  status: "published",
  date: new Date().toISOString().split('T')[0],
  likes: 0,
  comments: 0
};

const BlogFormModal = ({ open, onClose, onSave, editData }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [form, setForm] = useState(emptyForm);

  const tabs = [
    { id: "basic", label: "Identity", icon: "👤" },
    { id: "content", label: "Content", icon: "✍️" },
    { id: "advanced", label: "Meta & SEO", icon: "🚀" },
  ];

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        tags: Array.isArray(editData.tags) ? editData.tags.join(", ") : (editData.tags || ""),
        seoKeywords: Array.isArray(editData.seoKeywords) ? editData.seoKeywords.join(", ") : (editData.seoKeywords || ""),
        date: editData.date ? new Date(editData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
    } else {
      setForm(emptyForm);
    }
    setActiveTab("basic");
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) : value)
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    // Manual Validation
    if (!form.title.trim()) {
      setActiveTab("basic");
      alert("Blog Title is required");
      return;
    }
    if (!form.author.trim()) {
      setActiveTab("basic");
      alert("Author name is required");
      return;
    }
    if (!form.content.trim()) {
      setActiveTab("content");
      alert("Blog content is required");
      return;
    }

    const parseCommaList = (str) => typeof str === "string" ? str.split(",").map(s => s.trim()).filter(s => s !== "") : [];

    const formData = {
      ...form,
      excerpt: form.excerpt.trim() || form.content.slice(0, 160) + "...",
      tags: parseCommaList(form.tags),
      seoKeywords: parseCommaList(form.seoKeywords),
      likes: parseInt(form.likes) || 0,
      comments: parseInt(form.comments) || 0
    };

    onSave(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-[9999] p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-white/20 animate-in slide-in-from-bottom-8 duration-500">
        {/* Header */}
        <div className="p-10 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white flex flex-col gap-8 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-black tracking-tighter italic">
                {editData ? "Refine Article" : "Draft New Story"}
              </h2>
              <p className="text-blue-200 text-sm mt-1 font-medium tracking-wide opacity-80 uppercase">Content Management Studio</p>
            </div>
            <button onClick={onClose} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-2xl">✕</button>
          </div>

          {/* Luxury Tabs */}
          <div className="flex gap-2 bg-white/5 p-1.5 rounded-[1.5rem] w-fit border border-white/10 backdrop-blur-xl">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-[1.1rem] text-sm font-bold transition-all duration-500 flex items-center gap-3 ${activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-[0_10px_20px_rgba(255,255,255,0.15)] scale-[1.02]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-10 space-y-10 bg-[#fafafa]">
          {activeTab === "basic" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="space-y-4 col-span-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Article Title</label>
                <input
                  name="title"
                  placeholder="The Future of decentralized AI in 2024"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-5 rounded-[1.5rem] focus:border-blue-500 focus:outline-none transition-all shadow-sm text-xl font-bold placeholder:text-gray-300"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Author Name</label>
                <input
                  name="author"
                  placeholder="e.g. Alex Rivera"
                  value={form.author}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-[1.25rem] focus:border-blue-500 focus:outline-none transition-all shadow-sm font-semibold"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Author Role</label>
                <input
                  name="authorRole"
                  placeholder="e.g. Lead Technical Writer"
                  value={form.authorRole}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-[1.25rem] focus:border-blue-500 focus:outline-none transition-all shadow-sm font-semibold"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-[1.25rem] focus:border-blue-500 focus:outline-none transition-all appearance-none bg-white font-bold text-gray-700"
                >
                  <option value="Technology">🛡️ Technology</option>
                  <option value="Event Highlights">✨ Event Highlights</option>
                  <option value="Member Spotlights">👤 Member Spotlights</option>
                  <option value="Tutorials">📖 Tutorials</option>
                  <option value="News">📰 News</option>
                  <option value="Other">🌈 Other</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Publish Date</label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-[1.25rem] focus:border-blue-500 focus:outline-none transition-all shadow-sm font-bold text-gray-600"
                />
              </div>

              <div className="space-y-4 col-span-2">
                <ImageUpload
                  label="Author Avatar Image"
                  value={form.authorAvatar}
                  onChange={(url) => setForm({ ...form, authorAvatar: url })}
                />
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Short Excerpt</label>
                <textarea
                  name="excerpt"
                  placeholder="A compelling one-liner to grab the reader's attention..."
                  value={form.excerpt}
                  onChange={handleChange}
                  rows="2"
                  className="w-full border-2 border-gray-100 p-5 rounded-[1.5rem] focus:border-blue-500 focus:outline-none transition-all shadow-sm font-medium italic"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Main Article Body</label>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">MARKDOWN SUPPORTED</span>
                </div>
                <textarea
                  name="content"
                  placeholder="Unleash your thoughts here..."
                  value={form.content}
                  onChange={handleChange}
                  rows="10"
                  className="w-full border-2 border-gray-100 p-6 rounded-[2rem] focus:border-blue-500 focus:outline-none transition-all shadow-sm font-medium leading-relaxed"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Est. Read Time</label>
                  <input
                    name="readTime"
                    placeholder="e.g. 7 min read"
                    value={form.readTime}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-100 p-4 rounded-[1.25rem] focus:border-blue-500 focus:outline-none transition-all shadow-sm font-bold"
                  />
                </div>

                <div className="bg-amber-50 p-6 rounded-[1.5rem] border-2 border-amber-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-black text-amber-900 text-sm uppercase tracking-wider">Featured Post</span>
                    <span className="text-[10px] text-amber-600 font-bold">Front page spotlight</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={form.featured}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500 shadow-inner"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="space-y-4 col-span-2">
                <ImageUpload
                  label="Hero Top Image"
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Social Tags (CSV)</label>
                <input
                  name="tags"
                  placeholder="Innovations, AI, Guide"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-[1.25rem] focus:border-blue-500 focus:outline-none transition-all shadow-sm font-bold text-blue-600"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">SEO Keywords (CSV)</label>
                <input
                  name="seoKeywords"
                  placeholder="future tech, machine learning, 2024 trends"
                  value={form.seoKeywords}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-[1.25rem] focus:border-blue-500 focus:outline-none transition-all shadow-sm font-bold text-indigo-600"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Publication Status</label>
                <div className="flex gap-4">
                  {['draft', 'published'].map(stat => (
                    <button
                      key={stat}
                      type="button"
                      onClick={() => setForm({ ...form, status: stat })}
                      className={`flex-1 py-4 rounded-[1.25rem] font-black uppercase text-xs tracking-widest transition-all border-2 ${form.status === stat
                        ? "bg-gray-900 border-gray-900 text-white shadow-lg"
                        : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                        }`}
                    >
                      {stat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Initial Likes</label>
                  <input
                    name="likes"
                    type="number"
                    value={form.likes}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-100 p-4 rounded-[1.25rem] focus:border-blue-500 focus:outline-none transition-all shadow-sm font-bold text-center"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Initial Comm.</label>
                  <input
                    name="comments"
                    type="number"
                    value={form.comments}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-100 p-4 rounded-[1.25rem] focus:border-blue-500 focus:outline-none transition-all shadow-sm font-bold text-center"
                  />
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="p-10 bg-white flex justify-between items-center border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 text-gray-300 font-extrabold hover:text-gray-900 transition-all uppercase tracking-[0.2em] text-[10px]"
          >
            Abandon Draft
          </button>
          <div className="flex gap-4">
            {activeTab !== "basic" && (
              <button
                type="button"
                onClick={() => {
                  const idx = tabs.findIndex(t => t.id === activeTab);
                  setActiveTab(tabs[idx - 1].id);
                }}
                className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-50 transition-all active:scale-95 uppercase text-xs tracking-wider"
              >
                Go Back
              </button>
            )}
            {activeTab !== "advanced" ? (
              <button
                type="button"
                onClick={() => {
                  const idx = tabs.findIndex(t => t.id === activeTab);
                  setActiveTab(tabs[idx + 1].id);
                }}
                className="px-10 py-4 bg-gradient-to-r from-gray-900 to-blue-900 text-white font-black rounded-2xl hover:shadow-[0_15px_30px_rgba(30,58,138,0.3)] transition-all active:scale-95 flex items-center gap-3 uppercase text-xs tracking-widest"
              >
                Proceed
                <span className="text-lg">→</span>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-12 py-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-black rounded-2xl hover:shadow-[0_15px_30px_rgba(79,70,229,0.3)] transition-all active:scale-95 uppercase text-xs tracking-[0.2em]"
              >
                ✨ {editData ? "Finalize Changes" : "Publish to Feed"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogFormModal;
