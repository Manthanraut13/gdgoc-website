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
    console.log("Add button clicked!");
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
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600' }}>Manage Events</h1>
      </div>
      <button 
        style={{
          padding: '10px 16px',
          backgroundColor: '#22c55e',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '24px'
        }}
        onClick={() => {
          setSelected(null);
          setOpenForm(true);
        }}
      >
        + Add Event
      </button>

      {loading ? (
        <p style={{ color: '#999' }}>Loading...</p>
      ) : events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <table style={{ width: '100%', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
          <thead>
            <tr style={{ backgroundColor: '#e5e7eb', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>Title</th>
              <th style={{ padding: '8px' }}>Date</th>
              <th style={{ padding: '8px' }}>Location</th>
              <th style={{ padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '8px' }}>{e.title}</td>
                <td style={{ padding: '8px' }}>{e.date}</td>
                <td style={{ padding: '8px' }}>{e.location}</td>
                <td style={{ padding: '8px', display: 'flex', gap: '8px' }}>
                  <button
                    style={{ padding: '4px 8px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => {
                      setSelected(e);
                      setOpenForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{ padding: '4px 8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => {
                      setSelected(e);
                      setOpenDelete(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
