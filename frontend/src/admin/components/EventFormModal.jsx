import { useState, useEffect } from "react";

const EventFormModal = ({ open, onClose, onSave, editData }) => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    status: "upcoming",
    category: "web",
    difficulty: "Beginner",
    tags: "",
    time: ""
  });

  useEffect(() => {
    if (editData) {
      const dateValue = editData.date 
        ? new Date(editData.date).toISOString().split('T')[0]
        : '';
      setForm({
        ...editData,
        date: dateValue,
        tags: editData.tags?.join(', ') || ''
      });
    } else {
      setForm({
        title: "",
        date: "",
        location: "",
        description: "",
        status: "upcoming",
        category: "web",
        difficulty: "Beginner",
        tags: "",
        time: ""
      });
    }
  }, [editData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    onSave(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="bg-white w-full max-w-2xl p-6 rounded shadow space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold">
          {editData ? "Edit Event" : "Add Event"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="col-span-2 w-full border p-2 rounded"
              required
            />
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="col-span-2 w-full border p-2 rounded"
              required
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="cloud">Cloud & DevOps</option>
              <option value="ai-ml">AI & ML</option>
            </select>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>
            <input
              name="tags"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={handleChange}
              className="col-span-1 w-full border p-2 rounded"
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="col-span-2 w-full border p-2 rounded"
            rows="4"
          />

          <div className="flex justify-between">
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

export default EventFormModal;
