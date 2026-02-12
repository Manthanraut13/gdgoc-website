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
        tags: editData.tags?.join(', ') || '',
        images: editData.images?.join('\n') || '',
        prerequisites: editData.prerequisites?.join('\n') || '',
        takeaways: editData.takeaways?.join('\n') || '',
        agenda: editData.agenda?.join('\n') || '',
        feedback: editData.feedback?.join('\n') || '',
        highlights: editData.highlights?.join('\n') || '',
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleArrayChange = (name, value) => {
    setForm({ ...form, [name]: value });
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
    e.preventDefault();
    const splitLines = (str) => typeof str === 'string'
      ? str.split('\n').map(l => l.trim()).filter(l => l)
      : [];

    const formData = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
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
    { id: 'basic', label: 'Basic Info' },
    { id: 'content', label: 'Content' },
    { id: 'media', label: 'Media & Lists' },
    { id: 'speakers', label: 'Speakers' },
    { id: 'teams', label: 'Teams' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">
            {editData ? "Edit Event" : "Add New Event"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b overflow-x-auto">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`px-6 py-3 font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === s.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-6">
          {activeSection === 'basic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Event Title</label>
                <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                <select name="type" value={form.type} onChange={handleChange} className="w-full border p-2.5 rounded-lg">
                  <option value="Workshop">Workshop</option>
                  <option value="Conference">Conference</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Competition">Competition</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="w-full border p-2.5 rounded-lg">
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="cloud">Cloud & DevOps</option>
                  <option value="ai-ml">AI & ML</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full border p-2.5 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
                <input name="time" placeholder="e.g. 2:00 PM - 5:00 PM" value={form.time} onChange={handleChange} className="w-full border p-2.5 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                <input name="location" value={form.location} onChange={handleChange} className="w-full border p-2.5 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2.5 rounded-lg">
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Difficulty</label>
                <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full border p-2.5 rounded-lg">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Record Number (Internal)</label>
                <input name="recordNumber" value={form.recordNumber} onChange={handleChange} className="w-full border p-2.5 rounded-lg" />
              </div>
            </div>
          )}

          {activeSection === 'content' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description (Card view)</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows="2" className="w-full border p-2.5 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Detailed Description (Modal top)</label>
                <textarea name="detailedDescription" value={form.detailedDescription} onChange={handleChange} rows="4" className="w-full border p-2.5 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Long Description (Full details)</label>
                <textarea name="longDescription" value={form.longDescription} onChange={handleChange} rows="6" className="w-full border p-2.5 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Conclusion (For past events)</label>
                <textarea name="conclusion" value={form.conclusion} onChange={handleChange} rows="4" className="w-full border p-2.5 rounded-lg" />
              </div>
            </div>
          )}

          {activeSection === 'media' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <ImageUpload
                  label="Primary Event Image (Thumbnail)"
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Gallery Images (One URL per line)</label>
                <textarea name="images" value={form.images} onChange={handleChange} rows="4" className="w-full border p-2.5 rounded-lg font-mono text-sm" placeholder="/images/event1.jpg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tags (Comma separated)</label>
                <input name="tags" value={form.tags} onChange={handleChange} className="w-full border p-2.5 rounded-lg" placeholder="Web, JS, React" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Registration Link</label>
                <input name="registrationLink" value={form.registrationLink} onChange={handleChange} className="w-full border p-2.5 rounded-lg" placeholder="https://" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Seats</label>
                  <input name="seats" type="number" value={form.seats} onChange={handleChange} className="w-full border p-2.5 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Registered</label>
                  <input name="registered" type="number" value={form.registered} onChange={handleChange} className="w-full border p-2.5 rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Attendees</label>
                  <input name="attendees" type="number" value={form.attendees} onChange={handleChange} className="w-full border p-2.5 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Rating (0-5)</label>
                  <input name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange} className="w-full border p-2.5 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Agenda (One item per line)</label>
                <textarea name="agenda" value={form.agenda} onChange={handleChange} rows="4" className="w-full border p-2.5 rounded-lg" placeholder="9:00 AM - Intro" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Prerequisites (One per line)</label>
                <textarea name="prerequisites" value={form.prerequisites} onChange={handleChange} rows="4" className="w-full border p-2.5 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Takeaways (One per line)</label>
                <textarea name="takeaways" value={form.takeaways} onChange={handleChange} rows="4" className="w-full border p-2.5 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Highlights (One per line)</label>
                <textarea name="highlights" value={form.highlights} onChange={handleChange} rows="4" className="w-full border p-2.5 rounded-lg" />
              </div>
            </div>
          )}

          {activeSection === 'speakers' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Main Speaker (Short text)</label>
                <input name="speaker" value={form.speaker} onChange={handleChange} className="w-full border p-2.5 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Organizer</label>
                <input name="organizer" value={form.organizer} onChange={handleChange} className="w-full border p-2.5 rounded-lg" />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Key Speakers (Detailed)</h3>
                  <button type="button" onClick={() => addNestedItem('keySpeakers')} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">+ Add Speaker</button>
                </div>
                <div className="space-y-4">
                  {form.keySpeakers.map((s, i) => (
                    <div key={i} className="p-4 border rounded-xl bg-gray-50 relative group">
                      <button type="button" onClick={() => removeNestedItem('keySpeakers', i)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                      <div className="grid grid-cols-2 gap-3">
                        <input placeholder="Name" value={s.name} onChange={(e) => handleNestedChange('keySpeakers', i, 'name', e.target.value)} className="w-full border p-2 rounded-lg" />
                        <input placeholder="Role" value={s.role} onChange={(e) => handleNestedChange('keySpeakers', i, 'role', e.target.value)} className="w-full border p-2 rounded-lg" />
                        <textarea placeholder="Description" value={s.description} onChange={(e) => handleNestedChange('keySpeakers', i, 'description', e.target.value)} className="col-span-2 w-full border p-2 rounded-lg" rows="2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'teams' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Competition Teams</h3>
                <button type="button" onClick={() => addNestedItem('teams')} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">+ Add Team</button>
              </div>
              {form.teams.map((t, i) => (
                <div key={i} className="p-4 border rounded-xl bg-gray-50 relative group">
                  <button type="button" onClick={() => removeNestedItem('teams', i)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Team Name" value={t.name} onChange={(e) => handleNestedChange('teams', i, 'name', e.target.value)} className="w-full border p-2 rounded-lg" />
                    <input placeholder="Lead" value={t.lead} onChange={(e) => handleNestedChange('teams', i, 'lead', e.target.value)} className="w-full border p-2 rounded-lg" />
                    <input placeholder="Idea" value={t.idea} onChange={(e) => handleNestedChange('teams', i, 'idea', e.target.value)} className="w-full border p-2 rounded-lg" />
                    <input placeholder="Theme" value={t.theme} onChange={(e) => handleNestedChange('teams', i, 'theme', e.target.value)} className="w-full border p-2 rounded-lg" />
                    <textarea placeholder="Description" value={t.description} onChange={(e) => handleNestedChange('teams', i, 'description', e.target.value)} className="col-span-2 w-full border p-2 rounded-lg" rows="2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer / Stats bar for visibility */}
          <div className="mt-8 flex justify-end space-x-3 pt-6 border-t">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-8 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg transition-all hover:scale-105">
              {editData ? "Update Event" : "Save Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventFormModal;
