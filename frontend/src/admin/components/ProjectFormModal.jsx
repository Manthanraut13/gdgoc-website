import { useState, useEffect } from "react";

const ProjectFormModal = ({ open, onClose, onSave, editData }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "planning",
    progress: 0,
    category: "web",
    technologies: "",
    timeline: "",
    impact: "",
    github: "",
    demo: "",
    team: "",
    link: "",
    image: ""
  });

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        status: editData.status || "planning",
        progress: editData.progress || 0,
        category: editData.category || "web",
        technologies: editData.technologies?.join(', ') || editData.tech?.join(', ') || '',
        timeline: editData.timeline || "",
        impact: editData.impact || "",
        github: editData.github || "",
        demo: editData.demo || "",
        team: editData.team?.join(', ') || "",
        link: editData.link || editData.github || "",
        image: editData.image || ""
      });
    } else {
      setForm({
        title: "",
        description: "",
        status: "planning",
        progress: 0,
        category: "web",
        technologies: "",
        timeline: "",
        impact: "",
        github: "",
        demo: "",
        team: "",
        link: "",
        image: ""
      });
    }
  }, [editData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: form.title,
      description: form.description,
      status: form.status,
      progress: parseInt(form.progress) || 0,
      category: form.category,
      technologies: form.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
      timeline: form.timeline,
      impact: form.impact,
      github: form.github || null,
      demo: form.demo || null,
      team: form.team.split(',').map(member => member.trim()).filter(member => member),
      link: form.link || form.github,
      image: form.image
    };
    onSave(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="bg-white w-full max-w-2xl p-6 rounded shadow space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold">
          {editData ? "Edit Project" : "Add Project"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              name="title"
              placeholder="Project Title"
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
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="planning">Planning</option>
              <option value="ongoing">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <input
              name="progress"
              type="number"
              min="0"
              max="100"
              placeholder="Progress (0-100)"
              value={form.progress}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="ai-ml">AI & ML</option>
              <option value="iot">IoT</option>
              <option value="cloud">Cloud & DevOps</option>
            </select>
            <input
              name="timeline"
              placeholder="Timeline (e.g., 6 months)"
              value={form.timeline}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="technologies"
              placeholder="Technologies (comma separated)"
              value={form.technologies}
              onChange={handleChange}
              className="col-span-2 border p-2 rounded"
            />
            <input
              name="team"
              placeholder="Team members (comma separated)"
              value={form.team}
              onChange={handleChange}
              className="col-span-2 border p-2 rounded"
            />
            <input
              name="impact"
              placeholder="Impact statement"
              value={form.impact}
              onChange={handleChange}
              className="col-span-2 border p-2 rounded"
            />
            <input
              name="github"
              placeholder="GitHub URL"
              value={form.github}
              onChange={handleChange}
              className="col-span-1 border p-2 rounded"
            />
            <input
              name="demo"
              placeholder="Demo URL (optional)"
              value={form.demo}
              onChange={handleChange}
              className="col-span-1 border p-2 rounded"
            />
            <input
              name="link"
              placeholder="Project Link / GitHub URL"
              value={form.link}
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

export default ProjectFormModal;
