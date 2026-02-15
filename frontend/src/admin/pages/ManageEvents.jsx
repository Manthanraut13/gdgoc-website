import { useState, useEffect } from "react";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} from "../../services/api";
import EventFormModal from "../components/EventFormModal";
import DeleteModal from "../components/DeleteModal";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const res = await getEvents();
      setEvents(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleAdd = () => {
    setSelected(null);
    setOpenForm(true);
  };

  const handleSave = async (eventObj) => {
    try {
      if (selected) {
        await updateEvent(selected._id, eventObj);
      } else {
        await createEvent(eventObj);
      }
      setOpenForm(false);
      await loadEvents();
    } catch (err) {
      console.error("Save Error:", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(selected._id);
      setOpenDelete(false);
      loadEvents();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const getStatusBadge = (status) => {
    const isUpcoming = status === 'upcoming';
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${isUpcoming
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-gray-50 text-gray-500 border-gray-200"
        }`}>
        {isUpcoming ? "● Upcoming" : "○ Past"}
      </span>
    );
  };

  const getDifficultyBadge = (difficulty) => {
    const styles = {
      'Beginner': 'bg-green-50 text-green-700 border-green-100',
      'Intermediate': 'bg-amber-50 text-amber-700 border-amber-100',
      'Advanced': 'bg-red-50 text-red-700 border-red-100',
      'All Levels': 'bg-blue-50 text-blue-700 border-blue-100'
    };
    return (
      <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border uppercase tracking-wider ${styles[difficulty] || 'bg-gray-50 text-gray-500 border-gray-100'}`}>
        {difficulty}
      </span>
    );
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Header Card */}
      <div className="flex justify-between items-center bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-32 translate-x-32 group-hover:scale-110 transition-transform duration-700 opacity-50"></div>
        <div className="relative z-10 space-y-1">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Event Operations</h1>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em] opacity-60">Assemble experiences & learning</p>
        </div>
        <button
          className="relative z-10 bg-gray-900 hover:bg-blue-600 text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3"
          onClick={handleAdd}
        >
          <span className="text-xl">+</span> Schedule New Event
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-50 rounded-[2rem] animate-pulse border-2 border-dashed border-gray-200" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-[3rem] p-32 text-center border-4 border-dashed border-gray-100">
          <div className="text-6xl mb-6 opacity-20 text-gray-400">📅</div>
          <p className="text-gray-400 font-black text-xl tracking-tight">The calendar is clear.</p>
          <p className="text-gray-300 text-sm mt-2">Ready to host your next community milestone?</p>
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/40 border border-gray-100 overflow-hidden backdrop-blur-3xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 italic">
                <th className="p-10 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Experience Matrix</th>
                <th className="p-10 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Scheduling</th>
                <th className="p-10 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Engagement</th>
                <th className="p-10 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Status</th>
                <th className="p-10 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {events.map((e) => (
                <tr key={e._id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="p-10">
                    <div className="flex items-center gap-8">
                      <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden bg-gray-100 border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-500">
                        {e.image ? (
                          <img src={e.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl">🧩</div>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <div className="font-black text-gray-900 text-xl tracking-tighter leading-tight group-hover:text-blue-600 transition-colors">
                          {e.title}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{e.category}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                          {getDifficultyBadge(e.difficulty || 'All Levels')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-10">
                    <div className="space-y-1">
                      <div className="text-sm font-black text-gray-800 tracking-tight">
                        {new Date(e.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                        <span>🕒 {e.time || 'TBD'}</span>
                        <span>•</span>
                        <span>📍 {e.location || 'Remote'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-10">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                        <span>Capacity</span>
                        <span className="text-gray-900">{e.registered || 0} / {e.seats || '∞'}</span>
                      </div>
                      <div className="h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                          style={{ width: `${Math.min(((e.registered || 0) / (e.seats || 1)) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-10">
                    {getStatusBadge(e.status)}
                  </td>
                  <td className="p-10">
                    <div className="flex gap-4">
                      <button
                        className="w-12 h-12 bg-white text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-blue-100 border border-blue-50 flex items-center justify-center hover:-translate-y-1 active:scale-95"
                        onClick={() => {
                          setSelected(e);
                          setOpenForm(true);
                        }}
                        title="Edit Parameters"
                      >
                        <span className="text-xl">✏️</span>
                      </button>
                      <button
                        className="w-12 h-12 bg-white text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-xl shadow-red-100 border border-red-50 flex items-center justify-center hover:-translate-y-1 active:scale-95"
                        onClick={() => {
                          setSelected(e);
                          setOpenDelete(true);
                        }}
                        title="Expunge Record"
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

      <EventFormModal
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

export default ManageEvents;
