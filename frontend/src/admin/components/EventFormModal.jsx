import { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";

const EventFormModal = ({ open, onClose, onSave, editData }) => {
  const [activeSection, setActiveSection] = useState("basic");
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    type: "Workshop",
    category: "web",
    location: "",
    description: "",
    detailedDescription: "",
    longDescription: "",
    images: "",
    image: "",
    status: "upcoming",
    difficulty: "Beginner",
    tags: "",
    seats: 0,
    registered: 0,
    attendees: 0,
    rating: 0,
    registrationLink: "",
    prerequisites: "",
    takeaways: "",
    organizer: "",
    speaker: "",
    agenda: "",
    feedback: "",
    highlights: "",
    conclusion: "",
    recordNumber: "",
    keySpeakers: [],
    teams: []
  });

  useEffect(() => {
    if (editData) {
      const dateValue = editData.date
        ? new Date(editData.date).toISOString().split('T')[0]
        : '';
      setForm({
        ...editData,
        date: dateValue,
        tags: Array.isArray(editData.tags) ? editData.tags.join(', ') : (editData.tags || ''),
        images: Array.isArray(editData.images) ? editData.images.join('\n') : (editData.images || ''),
        prerequisites: Array.isArray(editData.prerequisites) ? editData.prerequisites.join('\n') : (editData.prerequisites || ''),
        takeaways: Array.isArray(editData.takeaways) ? editData.takeaways.join('\n') : (editData.takeaways || ''),
        agenda: Array.isArray(editData.agenda) ? editData.agenda.join('\n') : (editData.agenda || ''),
        feedback: Array.isArray(editData.feedback) ? editData.feedback.join('\n') : (editData.feedback || ''),
        highlights: Array.isArray(editData.highlights) ? editData.highlights.join('\n') : (editData.highlights || ''),
        keySpeakers: editData.keySpeakers || [],
        teams: editData.teams || []
      });
    } else {
      setForm({
        title: "",
        date: "",
        time: "",
        type: "Workshop",
        category: "web",
        location: "",
        description: "",
        detailedDescription: "",
        longDescription: "",
        images: "",
        image: "",
        status: "upcoming",
        difficulty: "Beginner",
        tags: "",
        seats: 0,
        registered: 0,
        attendees: 0,
        rating: 0,
        registrationLink: "",
        prerequisites: "",
        takeaways: "",
        organizer: "",
        speaker: "",
        agenda: "",
        feedback: "",
        highlights: "",
        conclusion: "",
        recordNumber: "",
        keySpeakers: [],
        teams: []
      });
    }
  }, [editData, open]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === 'number' ? parseFloat(value) : value });
  };

  const handleNestedChange = (type, index, field, value) => {
    const list = [...form[type]];
    list[index][field] = value;
    setForm({ ...form, [type]: list });
  };

  const addNestedItem = (type) => {
    const newItem = type === 'keySpeakers'
      ? { name: "", role: "", description: "" }
      : { name: "", lead: "", idea: "", theme: "", description: "" };
    setForm({ ...form, [type]: [...form[type], newItem] });
  };

  const removeNestedItem = (type, index) => {
    const list = [...form[type]];
    list.splice(index, 1);
    setForm({ ...form, [type]: list });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const splitLines = (str) => typeof str === 'string'
      ? str.split('\n').map(l => l.trim()).filter(l => l)
      : [];

    const formData = {
      ...form,
      tags: typeof form.tags === 'string' ? form.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : form.tags,
      images: splitLines(form.images),
      prerequisites: splitLines(form.prerequisites),
      takeaways: splitLines(form.takeaways),
      agenda: splitLines(form.agenda),
      feedback: splitLines(form.feedback),
      highlights: splitLines(form.highlights),
    };
    onSave(formData);
  };

  if (!open) return null;

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: '🌍' },
    { id: 'content', label: 'Narrative', icon: '✍️' },
    { id: 'media', label: 'Assets', icon: '🖼️' },
    { id: 'speakers', label: 'Voices', icon: '🎙️' },
    { id: 'teams', label: 'Factions', icon: '🛡️' }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[9999] p-4 text-left">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">

        {/* Header - Standard Project Style */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {editData ? "Edit Event" : "Schedule New Event"}
            </h2>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors text-2xl">✕</button>
          </div>

          {/* Compact System Tabs */}
          <div className="flex gap-1 mt-6 bg-black/20 p-1 rounded-2xl w-fit">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${activeSection === s.id
                  ? "bg-white text-blue-900 shadow-md scale-105"
                  : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area - Industrial Padding */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6 bg-white">

          {activeSection === 'basic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="col-span-2 space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Event Title</label>
                <input
                  name="title"
                  placeholder="e.g. Workshop on Advanced Web Patterns"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Event Format</label>
                <select name="type" value={form.type} onChange={handleChange} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all appearance-none bg-white font-semibold">
                  <option value="Workshop">Workshop</option>
                  <option value="Conference">Conference</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Competition">Competition</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all appearance-none bg-white font-semibold">
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="cloud">Cloud & Infrastructure</option>
                  <option value="ai-ml">AI & Machine Learning</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Date</label>
                <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none" required />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Time Window</label>
                <input name="time" placeholder="e.g. 2:00 PM - 5:00 PM" value={form.time} onChange={handleChange} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none font-semibold" />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Nexus (Location)</label>
                <input name="location" placeholder="e.g. Auditorium A1 / Virtual" value={form.location} onChange={handleChange} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none font-semibold" required />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all appearance-none bg-white font-semibold">
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </div>

              <div className="col-span-2 space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Experience Level</label>
                <div className="flex gap-2">
                  {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setForm({ ...form, difficulty: lvl })}
                      className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border-2 ${form.difficulty === lvl
                        ? "bg-blue-600 border-blue-600 text-white shadow-md"
                        : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                        }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'content' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Teaser Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows="2" className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none" placeholder="Brief summary for list view..." />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Detailed Objective</label>
                <textarea name="detailedDescription" value={form.detailedDescription} onChange={handleChange} rows="3" className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none" placeholder="Core purpose and agenda highlights..." />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Full Narrative</label>
                <textarea name="longDescription" value={form.longDescription} onChange={handleChange} rows="5" className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none" placeholder="Deep dive into event details, schedule, and expectations..." />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Legacy Conclusion</label>
                <textarea name="conclusion" value={form.conclusion} onChange={handleChange} rows="3" className="w-full border-2 border-gray-100 p-4 rounded-2xl border-dashed border-gray-200 focus:border-blue-500 focus:outline-none bg-blue-50/20" placeholder="Final outcomes and achievements (For past events)" />
              </div>
            </div>
          )}

          {activeSection === 'media' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="col-span-2 space-y-4">
                <ImageUpload
                  label="Primary Event Cover Image"
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Gallery Links (One per line)</label>
                <textarea name="images" value={form.images} onChange={handleChange} rows="3" className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none font-mono text-sm" />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Classification Tags</label>
                <input name="tags" placeholder="Web, Innovation, React" value={form.tags} onChange={handleChange} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 font-bold text-blue-600" />
              </div>

              <div className="space-y-3 col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Registration Beacon (Link)</label>
                <input name="registrationLink" placeholder="https://..." value={form.registrationLink} onChange={handleChange} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 font-bold" />
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-3xl">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500">SEATS</label>
                  <input name="seats" type="number" value={form.seats} onChange={handleChange} className="w-full text-xl font-bold bg-transparent focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500">REGISTERED</label>
                  <input name="registered" type="number" value={form.registered} onChange={handleChange} className="w-full text-xl font-bold text-blue-600 bg-transparent focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-3xl">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500">ATTENDEES</label>
                  <input name="attendees" type="number" value={form.attendees} onChange={handleChange} className="w-full text-xl font-bold bg-transparent focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500">IMPACT RATING</label>
                  <input name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange} className="w-full text-xl font-bold text-amber-500 bg-transparent focus:outline-none" />
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Chronology (Agenda)</label>
                  <textarea name="agenda" value={form.agenda} onChange={handleChange} rows="3" className="w-full border-2 border-gray-100 p-4 rounded-2xl text-xs" placeholder="09:00 - Intro" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Prerequisites</label>
                  <textarea name="prerequisites" value={form.prerequisites} onChange={handleChange} rows="3" className="w-full border-2 border-gray-100 p-4 rounded-2xl text-xs" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Core Takeaways</label>
                  <textarea name="takeaways" value={form.takeaways} onChange={handleChange} rows="3" className="w-full border-2 border-gray-100 p-4 rounded-2xl text-xs" />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'speakers' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Main Speaker</label>
                  <input name="speaker" placeholder="Full Name" value={form.speaker} onChange={handleChange} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 font-bold" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Lead Entity (Organizer)</label>
                  <input name="organizer" placeholder="GDGOC Core Team" value={form.organizer} onChange={handleChange} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 font-bold" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Speaker Roster</label>
                  <button type="button" onClick={() => addNestedItem('keySpeakers')} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors">+ Add Speaker</button>
                </div>

                <div className="space-y-4">
                  {form.keySpeakers.map((s, i) => (
                    <div key={i} className="bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200 relative group">
                      <button type="button" onClick={() => removeNestedItem('keySpeakers', i)} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110">✕</button>
                      <div className="grid grid-cols-2 gap-4">
                        <input placeholder="Name" value={s.name} onChange={(e) => handleNestedChange('keySpeakers', i, 'name', e.target.value)} className="w-full border-2 border-white p-3 rounded-xl focus:border-blue-400 focus:outline-none" />
                        <input placeholder="Role / Bio" value={s.role} onChange={(e) => handleNestedChange('keySpeakers', i, 'role', e.target.value)} className="w-full border-2 border-white p-3 rounded-xl focus:border-blue-400 focus:outline-none" />
                        <textarea placeholder="Contribution highlights..." value={s.description} onChange={(e) => handleNestedChange('keySpeakers', i, 'description', e.target.value)} className="col-span-2 w-full border-2 border-white p-3 rounded-xl focus:border-blue-400" rows="2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'teams' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Faction registry (Optional)</label>
                <button type="button" onClick={() => addNestedItem('teams')} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors">+ Add Faction</button>
              </div>

              <div className="space-y-4">
                {form.teams.map((t, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200 relative group animate-in zoom-in-95 duration-300">
                    <button type="button" onClick={() => removeNestedItem('teams', i)} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110">✕</button>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <input placeholder="Faction Name" value={t.name} onChange={(e) => handleNestedChange('teams', i, 'name', e.target.value)} className="w-full border-2 border-white p-3 rounded-xl focus:border-blue-400" />
                      <input placeholder="Sector Lead" value={t.lead} onChange={(e) => handleNestedChange('teams', i, 'lead', e.target.value)} className="w-full border-2 border-white p-3 rounded-xl focus:border-blue-400" />
                      <input placeholder="Primary Idea" value={t.idea} onChange={(e) => handleNestedChange('teams', i, 'idea', e.target.value)} className="w-full border-2 border-white p-3 rounded-xl focus:border-blue-400 text-blue-600 font-semibold" />
                      <input placeholder="Theme" value={t.theme} onChange={(e) => handleNestedChange('teams', i, 'theme', e.target.value)} className="w-full border-2 border-white p-3 rounded-xl focus:border-blue-400 text-xs uppercase" />
                      <textarea placeholder="Faction mission brief..." value={t.description} onChange={(e) => handleNestedChange('teams', i, 'description', e.target.value)} className="md:col-span-4 w-full border-2 border-white p-4 rounded-2xl italic text-sm text-gray-500" rows="2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </form>

        {/* Industrial Footer */}
        <div className="p-8 bg-gray-50 flex justify-between items-center border-t border-gray-100 sticky bottom-0 z-10">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 text-gray-500 font-bold hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>

          <div className="flex gap-4">
            {activeSection !== 'basic' && (
              <button
                type="button"
                onClick={() => {
                  const idx = sections.findIndex(t => t.id === activeSection);
                  setActiveSection(sections[idx - 1].id);
                }}
                className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
              >
                Previous
              </button>
            )}

            {activeSection !== 'teams' ? (
              <button
                type="button"
                onClick={() => {
                  const idx = sections.findIndex(t => t.id === activeSection);
                  setActiveSection(sections[idx + 1].id);
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
                🚀 {editData ? "Update Event" : "Schedule Event"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFormModal;
