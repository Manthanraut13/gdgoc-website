// src/admin/components/BlogFormModal.jsx
import { useState, useEffect } from "react";

const emptyForm = {
  title: "",
  author: "",
  authorRole: "",
  excerpt: "",
  content: "",
  category: "Technology",
  tags: "",
  readTime: "5 min read",
  image: "",
  featured: false,
  date: new Date().toISOString().split('T')[0],
};

const BlogFormModal = ({ open, onClose, onSave, editData }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        tags: editData.tags?.join(', ') || '',
        date: editData.date ? new Date(editData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
    }
    else setForm(emptyForm);
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const clean = {
      title: form.title.trim(),
      author: form.author.trim(),
      authorRole: form.authorRole.trim(),
      excerpt: form.excerpt.trim() || form.content.slice(0, 150) + "...",
      content: form.content.trim(),
      category: form.category,
      tags: form.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      readTime: form.readTime.trim(),
      image: form.image.trim() || null,
      featured: form.featured,
      date: form.date,
      likes: form.likes || 0,
      comments: form.comments || 0
    };

    if (!clean.title || !clean.author || !clean.content) return;

    onSave(clean);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="bg-white w-full max-w-2xl p-6 rounded shadow space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold">{editData ? "Edit Blog" : "Add Blog"}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input 
              name="title" 
              placeholder="Blog Title" 
              value={form.title}
              onChange={handleChange} 
              className="col-span-2 border p-2 rounded" 
              required 
            />

            <input 
              name="author" 
              placeholder="Author Name" 
              value={form.author}
              onChange={handleChange} 
              className="border p-2 rounded" 
              required 
            />

            <input 
              name="authorRole" 
              placeholder="Author Role" 
              value={form.authorRole}
              onChange={handleChange} 
              className="border p-2 rounded" 
            />

            <input 
              name="date" 
              type="date"
              value={form.date}
              onChange={handleChange} 
              className="col-span-2 border p-2 rounded" 
            />

            <input 
              name="excerpt" 
              placeholder="Short excerpt (auto-generated if empty)"
              value={form.excerpt} 
              onChange={handleChange}
              className="col-span-2 border p-2 rounded" 
            />

            <textarea 
              name="content" 
              placeholder="Full blog content"
              value={form.content} 
              onChange={handleChange}
              className="col-span-2 border p-2 rounded" 
              rows="4" 
              required 
            />

            <select 
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="Technology">Technology</option>
              <option value="Event Highlights">Event Highlights</option>
              <option value="Member Spotlights">Member Spotlights</option>
              <option value="Tutorials">Tutorials</option>
              <option value="News">News</option>
              <option value="Other">Other</option>
            </select>

            <input 
              name="readTime" 
              placeholder="Read time (e.g., 5 min read)" 
              value={form.readTime}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input 
              name="tags" 
              placeholder="Tags (comma separated)" 
              value={form.tags}
              onChange={handleChange}
              className="col-span-2 border p-2 rounded"
            />

            <input 
              name="image" 
              placeholder="Image URL" 
              value={form.image}
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
              <span>Featured Blog</span>
            </label>
          </div>

          <div className="flex justify-between pt-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>
            <button type="button" onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogFormModal;
