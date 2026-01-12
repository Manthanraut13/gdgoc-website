import { useState, useEffect } from "react";

const ResourceFormModal = ({ open, onClose, onSave, editData }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Documentation",
    url: "",
    difficulty: "Beginner",
    icon: "📘",
    featured: false
  });

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        category: editData.category || "Documentation",
        url: editData.url || "",
        difficulty: editData.difficulty || "Beginner",
        icon: editData.icon || "📘",
        featured: editData.featured || false
      });
    } else {
      setForm({
        title: "",
        description: "",
        category: "Documentation",
        url: "",
        difficulty: "Beginner",
        icon: "📘",
        featured: false
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) : value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      url: form.url.trim() || form.link.trim(),
      difficulty: form.difficulty,
      icon: form.icon,
      featured: form.featured
    };
    onSave(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="bg-white w-full max-w-2xl p-6 rounded shadow space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold">
          {editData ? "Edit Resource" : "Add Resource"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              name="title"
              placeholder="Resource Title"
              value={form.title}
              onChange={handleChange}
              className="col-span-2 border p-2 rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="col-span-2 border p-2 rounded"
              rows="3"
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="Documentation">Documentation</option>
              <option value="YouTube">YouTube</option>
              <option value="Course">Course</option>
              <option value="Tools">Tools</option>
              <option value="Roadmap">Roadmap</option>
              <option value="Blogs">Blogs</option>
              <option value="API">API</option>
              <option value="GitHub Repo">GitHub Repo</option>
              <option value="Other">Other</option>
            </select>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <input
              name="url"
              placeholder="Resource URL"
              value={form.url}
              onChange={handleChange}
              className="col-span-2 border p-2 rounded"
              required
            />
            <input
              name="icon"
              placeholder="Icon emoji (e.g., 📘)"
              value={form.icon}
              onChange={handleChange}
              className="col-span-2 border p-2 rounded"
            />
            <label className="col-span-2 flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>Featured Resource</span>
            </label>
          </div>

          <div className="flex justify-between pt-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceFormModal;
