import { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";

const ResourceFormModal = ({ open, onClose, onSave, editData }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [form, setForm] = useState({
    title: "",
    description: "",
    longDescription: "",
    category: "Documentation",
    url: "",
    difficulty: "Beginner",
    icon: "📘",
    image: "",
    provider: "GDG",
    language: "English",
    rating: 5,
    tags: "",
    featured: false
  });

  const tabs = [
    { id: "basic", label: "Basic Info", icon: "ℹ️" },
    { id: "content", label: "Content", icon: "📝" },
    { id: "advanced", label: "Advanced", icon: "⚙️" },
  ];

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        tags: Array.isArray(editData.tags) ? editData.tags.join("\n") : (editData.tags || ""),
        rating: editData.rating || 5,
        language: editData.language || "English",
        provider: editData.provider || "GDG",
        image: editData.image || "",
        longDescription: editData.longDescription || "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        longDescription: "",
        category: "Documentation",
        url: "",
        difficulty: "Beginner",
        icon: "📘",
        image: "",
        provider: "GDG",
        language: "English",
        rating: 5,
        tags: "",
        featured: false
      });
    }
    setActiveTab("basic");
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value)
    });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    // Manual Validation
    if (!form.title.trim()) {
      setActiveTab("basic");
      alert("Resource Title is required");
      return;
    }
    if (!form.url.trim()) {
      setActiveTab("basic");
      alert("Resource URL is required");
      return;
    }
    if (!form.description.trim()) {
      setActiveTab("content");
      alert("Description is required");
      return;
    }

    const parseList = (str) => typeof str === "string" ? str.split("\n").map(s => s.trim()).filter(s => s !== "") : [];

    const formData = {
      ...form,
      tags: parseList(form.tags),
      rating: parseFloat(form.rating) || 5
    };

    onSave(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[9999] p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col gap-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-black tracking-tight">
              {editData ? "Edit Resource" : "Create Resource"}
            </h2>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors text-2xl">✕</button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-black/20 p-1 rounded-2xl w-fit">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === tab.id
                  ? "bg-white text-blue-900 shadow-md scale-105"
                  : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
          {activeTab === "basic" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4 col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Resource Title</label>
                <input
                  name="title"
                  placeholder="e.g. React.js Technical Roadmap"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all shadow-sm"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all appearance-none bg-white font-medium"
                >
                  <option value="Documentation">📚 Documentation</option>
                  <option value="YouTube">🎥 YouTube</option>
                  <option value="Course">🎓 Course</option>
                  <option value="Tools">🛠️ Tools</option>
                  <option value="Roadmap">🗺️ Roadmap</option>
                  <option value="Blogs">✍️ Blogs</option>
                  <option value="API">🔌 API</option>
                  <option value="GitHub Repo">🐙 GitHub Repo</option>
                  <option value="Other">✨ Other</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Difficulty</label>
                <select
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all appearance-none bg-white font-medium"
                >
                  <option value="Beginner">🟢 Beginner</option>
                  <option value="Intermediate">🟡 Intermediate</option>
                  <option value="Advanced">🔴 Advanced</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Emoji Icon</label>
                <input
                  name="icon"
                  placeholder="📘"
                  value={form.icon}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all shadow-sm text-2xl"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Resource URL</label>
                <input
                  name="url"
                  placeholder="https://example.com/resource"
                  value={form.url}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all shadow-sm font-mono text-sm"
                  required
                />
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Short Description</label>
                <textarea
                  name="description"
                  placeholder="Brief pitch for the resource..."
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all shadow-sm"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Long Description</label>
                <textarea
                  name="longDescription"
                  placeholder="Detailed breakdown of what this resource covers..."
                  value={form.longDescription}
                  onChange={handleChange}
                  rows="6"
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all shadow-sm"
                />
              </div>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Provider / Author</label>
                <input
                  name="provider"
                  placeholder="e.g. Google Developers, Coursera"
                  value={form.provider}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all shadow-sm"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Language</label>
                <input
                  name="language"
                  placeholder="e.g. English, Hindi"
                  value={form.language}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all shadow-sm"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Rating (1-5)</label>
                <input
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all shadow-sm"
                />
              </div>

              <div className="space-y-4">
                <ImageUpload
                  label="Resource Cover Image"
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                />
              </div>

              <div className="space-y-4 col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Tags (One per line)</label>
                <textarea
                  name="tags"
                  placeholder="React&#10;Frontend&#10;System Design"
                  value={form.tags}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all shadow-sm font-mono text-sm"
                />
              </div>

              <div className="col-span-2 bg-blue-50/50 p-6 rounded-[2rem] border-2 border-blue-100 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-bold text-blue-900">Featured Resource</span>
                  <span className="text-xs text-blue-600">Highlighted on the resources portal</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="p-8 bg-gray-50 flex justify-between items-center border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 text-gray-500 font-extrabold hover:text-gray-700 transition-colors uppercase tracking-widest text-xs"
          >
            Cancel
          </button>
          <div className="flex gap-4">
            {activeTab !== "basic" && (
              <button
                type="button"
                onClick={() => {
                  const idx = tabs.findIndex(t => t.id === activeTab);
                  setActiveTab(tabs[idx - 1].id);
                }}
                className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
              >
                Previous
              </button>
            )}
            {activeTab !== "advanced" ? (
              <button
                type="button"
                onClick={() => {
                  const idx = tabs.findIndex(t => t.id === activeTab);
                  setActiveTab(tabs[idx + 1].id);
                }}
                className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-100 transition-all active:scale-95 flex items-center gap-2"
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-12 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-green-100 transition-all active:scale-95"
              >
                🚀 {editData ? "Update Resource" : "Publish Resource"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceFormModal;
