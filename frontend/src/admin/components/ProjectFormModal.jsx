import { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";

const ProjectFormModal = ({ open, onClose, onSave, editData }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [form, setForm] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    longDescription: "",
    status: "planning",
    progress: 0,
    category: "web",
    type: "Open Source",
    difficulty: "intermediate",
    technologies: "",
    techStack: "",
    toolsUsed: "",
    timeline: "",
    impact: "",
    features: "",
    keyFeatures: "",
    github: "",
    demo: "",
    demoVideo: "",
    documentation: "",
    link: "",
    image: "",
    images: "",
    team: [{ name: "", role: "", github: "", image: "" }]
  });

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        detailedDescription: editData.detailedDescription || "",
        longDescription: editData.longDescription || "",
        status: editData.status || "planning",
        progress: editData.progress || 0,
        category: editData.category || "web",
        type: editData.type || "Open Source",
        difficulty: editData.difficulty || "intermediate",
        technologies: Array.isArray(editData.technologies) ? editData.technologies.join("\n") : "",
        techStack: Array.isArray(editData.techStack) ? editData.techStack.join("\n") : "",
        toolsUsed: Array.isArray(editData.toolsUsed) ? editData.toolsUsed.join("\n") : "",
        timeline: editData.timeline || "",
        impact: editData.impact || "",
        features: Array.isArray(editData.features) ? editData.features.join("\n") : "",
        keyFeatures: Array.isArray(editData.keyFeatures) ? editData.keyFeatures.join("\n") : "",
        github: editData.github || "",
        demo: editData.demo || "",
        demoVideo: editData.demoVideo || "",
        documentation: editData.documentation || "",
        link: editData.link || "",
        image: editData.image || "",
        images: Array.isArray(editData.images) ? editData.images.join("\n") : "",
        team: editData.team && editData.team.length > 0 ? editData.team : [{ name: "", role: "", github: "", image: "" }]
      });
    } else {
      setForm({
        title: "",
        description: "",
        detailedDescription: "",
        longDescription: "",
        status: "planning",
        progress: 0,
        category: "web",
        type: "Open Source",
        difficulty: "intermediate",
        technologies: "",
        techStack: "",
        toolsUsed: "",
        timeline: "",
        impact: "",
        features: "",
        keyFeatures: "",
        github: "",
        demo: "",
        demoVideo: "",
        documentation: "",
        link: "",
        image: "",
        images: "",
        team: [{ name: "", role: "", github: "", image: "" }]
      });
    }
    setActiveTab("basic");
  }, [editData, open]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleTeamMemberChange = (index, field, value) => {
    const updatedTeam = [...form.team];
    updatedTeam[index][field] = value;
    setForm({ ...form, team: updatedTeam });
  };

  const addTeamMember = () => {
    setForm({
      ...form,
      team: [...form.team, { name: "", role: "", github: "", image: "" }]
    });
  };

  const removeTeamMember = (index) => {
    if (form.team.length > 1) {
      const updatedTeam = form.team.filter((_, i) => i !== index);
      setForm({ ...form, team: updatedTeam });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Manual validation since button is outside form
    if (!form.title.trim()) {
      setActiveTab("basic");
      alert("Project Title is required");
      return;
    }
    if (!form.description.trim()) {
      setActiveTab("content");
      alert("Short Description is required");
      return;
    }

    // Parse newline-separated lists into arrays
    const parseList = (str) => typeof str === "string" ? str.split("\n").map(s => s.trim()).filter(s => s !== "") : [];

    const formData = {
      ...form,
      progress: parseInt(form.progress) || 0,
      technologies: parseList(form.technologies),
      techStack: parseList(form.techStack),
      toolsUsed: parseList(form.toolsUsed),
      features: parseList(form.features),
      keyFeatures: parseList(form.keyFeatures),
      images: parseList(form.images),
      team: (form.team || []).filter(m => m.name && m.name.trim() !== "")
    };

    onSave(formData);
  };

  if (!open) return null;

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "content", label: "Content" },
    { id: "media", label: "Media & Links" },
    { id: "team", label: "Team & Features" }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[9999] p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {editData ? "Edit Project" : "Add New Project"}
            </h2>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors text-2xl">✕</button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 bg-black/20 p-1 rounded-2xl w-fit">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === tab.id
                  ? "bg-white text-blue-900 shadow-md scale-105"
                  : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
          {activeTab === "basic" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4 col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Project Title</label>
                <input
                  name="title"
                  placeholder="e.g. Campus Connect Mobile App"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all appearance-none bg-white"
                >
                  <option value="planning">📋 Planning</option>
                  <option value="ongoing">🚀 Ongoing</option>
                  <option value="completed">✅ Completed</option>
                  <option value="archived">📁 Archived</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all appearance-none bg-white"
                >
                  <option value="web">🌐 Web Development</option>
                  <option value="mobile">📱 Mobile App</option>
                  <option value="ai-ml">🧠 AI & Machine Learning</option>
                  <option value="iot">🔌 Internet of Things</option>
                  <option value="cloud">☁️ Cloud & DevOps</option>
                  <option value="blockchain">⛓️ Blockchain</option>
                  <option value="cybersecurity">🛡️ Cybersecurity</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Difficulty</label>
                <select
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all appearance-none bg-white"
                >
                  <option value="beginner">🟢 Beginner</option>
                  <option value="intermediate">🟡 Intermediate</option>
                  <option value="advanced">🔴 Advanced</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Progress (%)</label>
                <input
                  name="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={form.progress}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Type</label>
                <input
                  name="type"
                  placeholder="e.g. Open Source, Internal, Client"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Timeline</label>
                <input
                  name="timeline"
                  placeholder="e.g. 4 Months (Ends Dec 2023)"
                  value={form.timeline}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
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
                  placeholder="Brief summary for cards..."
                  value={form.description}
                  onChange={handleChange}
                  rows="2"
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Detailed Description</label>
                <textarea
                  name="detailedDescription"
                  placeholder="Core value and purpose of the project..."
                  value={form.detailedDescription}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Long Description</label>
                <textarea
                  name="longDescription"
                  placeholder="Full technical overview, architecture, and background..."
                  value={form.longDescription}
                  onChange={handleChange}
                  rows="6"
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Impact Statement</label>
                <input
                  name="impact"
                  placeholder="What was the result? (e.g. Helped 500+ students)"
                  value={form.impact}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4 col-span-2">
                <ImageUpload
                  label="Project Cover Image"
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Gallery Images (One per line)</label>
                <textarea
                  name="images"
                  placeholder="URL 1&#10;URL 2&#10;URL 3"
                  value={form.images}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all font-mono text-sm"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Documentation Link</label>
                <input
                  name="documentation"
                  placeholder="https://docs.project.com"
                  value={form.documentation}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">GitHub URL</label>
                <input
                  name="github"
                  placeholder="https://github.com/org/repo"
                  value={form.github}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Live Demo URL</label>
                <input
                  name="link"
                  placeholder="https://demo.project.com"
                  value={form.link}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-4 col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Demo Video URL (YouTube/Vimeo)</label>
                <input
                  name="demoVideo"
                  placeholder="https://youtube.com/watch?v=..."
                  value={form.demoVideo}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Technologies (One per line)</label>
                  <textarea
                    name="technologies"
                    placeholder="React&#10;Tailwind&#10;Firebase"
                    value={form.technologies}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all font-mono text-sm"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Key Features (One per line)</label>
                  <textarea
                    name="features"
                    placeholder="Real-time chat&#10;Dark mode support&#10;Admin dashboard"
                    value={form.features}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Project Team</label>
                  <button
                    type="button"
                    onClick={addTeamMember}
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors flex items-center gap-2"
                  >
                    <span>➕</span> Add Member
                  </button>
                </div>

                <div className="space-y-4">
                  {form.team.map((member, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200 relative group animate-in zoom-in-95 duration-300">
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                      >✕</button>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <input
                            placeholder="Full Name"
                            value={member.name}
                            onChange={(e) => handleTeamMemberChange(index, "name", e.target.value)}
                            className="w-full border-2 border-white p-3 rounded-xl focus:border-blue-400 focus:outline-none transition-all shadow-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <input
                            placeholder="Role (e.g. Lead Developer)"
                            value={member.role}
                            onChange={(e) => handleTeamMemberChange(index, "role", e.target.value)}
                            className="w-full border-2 border-white p-3 rounded-xl focus:border-blue-400 focus:outline-none transition-all shadow-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <input
                            placeholder="GitHub Username"
                            value={member.github}
                            onChange={(e) => handleTeamMemberChange(index, "github", e.target.value)}
                            className="w-full border-2 border-white p-3 rounded-xl focus:border-blue-400 focus:outline-none transition-all shadow-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <input
                            placeholder="Avatar Image URL"
                            value={member.image}
                            onChange={(e) => handleTeamMemberChange(index, "image", e.target.value)}
                            className="w-full border-2 border-white p-3 rounded-xl focus:border-blue-400 focus:outline-none transition-all shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="p-8 bg-gray-50 flex justify-between items-center border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 text-gray-500 font-bold hover:text-gray-700 transition-colors"
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
                className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-100 transition-all"
              >
                Previous
              </button>
            )}
            {activeTab !== "team" ? (
              <button
                type="button"
                onClick={() => {
                  const idx = tabs.findIndex(t => t.id === activeTab);
                  setActiveTab(tabs[idx + 1].id);
                }}
                className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1 transition-all"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-12 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-green-200 hover:-translate-y-1 transition-all"
              >
                🚀 {editData ? "Update Project" : "Launch Project"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFormModal;
