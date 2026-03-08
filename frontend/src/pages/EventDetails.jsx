import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById } from "../services/api";
import dateIcon from "../assets/date.png";
import timeIcon from "../assets/time.png";
import locationIcon from "../assets/location.png";
import categoryIcon from "../assets/category.png";
import levelsIcon from "../assets/levels.png";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventById(id)
      .then((res) => setEvent(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-32 text-center text-gray-400">Loading details...</div>;
  if (!event) return (
    <div className="py-32 text-center">
      <h2 className="font-display text-2xl font-bold mb-4">Event Not Found</h2>
      <button onClick={() => navigate("/events")} className="btn-primary-pill">Back to Events</button>
    </div>
  );

  return (
    <div className="pb-32">
      {/* Hero — Light Blue Tint */}
      {/* Hero — Light Blue Tint */}
      <section
        style={{
          background: '#e8f0fe',
          paddingTop: '160px',
          paddingBottom: '60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-100px', left: '10%', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(234,67,53,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="page-container relative z-10" style={{ textAlign: 'center' }}>
          <div className="flex justify-center gap-2 mb-6">
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', background: '#fff', border: '1.5px solid var(--ink-900)', color: 'var(--ink-900)', padding: '4px 12px', borderRadius: '6px', boxShadow: '2px 2px 0px var(--ink-900)' }}>
              {event.status === 'upcoming' ? 'Upcoming' : 'Past'} Event
            </span>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 800, color: 'var(--ink-900)', lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: '24px' }}>
            {event.title}
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--ink-400)', maxWidth: '600px', margin: '0 auto' }}>
            {event.description}
          </p>
        </div>
      </section>

      {/* Main Image & Content */}
      <div className="page-container" style={{ marginTop: '24px' }}>
        <div className="grid gap-12" style={{ gridTemplateColumns: 'minmax(0, 2fr) 1fr' }}>
          {/* Main Info */}
          <div>
            <div className="neo-card" style={{ padding: '0', overflow: 'hidden', marginBottom: '40px' }}>
              <img src={event.image || 'https://images.unsplash.com/photo-1540575861501-7ad05823c95b'} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>

            <div className="section-label">Detailed Agenda</div>
            <h2 className="font-display" style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px' }}>What to <span style={{ color: 'var(--g-blue)' }}>Expect</span></h2>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#444' }}>
              {event.description}
            </p>

            {event.tags?.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2">
                {event.tags.map(tag => (
                  <span key={tag} className="font-mono" style={{ fontSize: '10px', color: 'var(--ink-400)', background: 'var(--surface-1)', padding: '4px 12px', borderRadius: '6px' }}>#{tag}</span>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="neo-card" style={{ padding: '24px', position: 'sticky', top: '120px' }}>
              <h3 className="font-mono" style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '20px', color: 'var(--ink-900)' }}>Event Logistics</h3>

              <div className="space-y-6">
                <LogisticItem icon={dateIcon} label="Date" val={new Date(event.date).toLocaleDateString()} />
                <LogisticItem icon={timeIcon} label="Time" val={event.time || 'TBD'} />
                <LogisticItem icon={locationIcon} label="Location" val={event.location} />
                <LogisticItem icon={categoryIcon} label="Category" val={event.category} />
                <LogisticItem icon={levelsIcon} label="Level" val={event.difficulty || 'All Levels'} />
              </div>

              {event.status === 'upcoming' && (
                <button className="btn-primary-pill" style={{ width: '100%', marginTop: '32px', border: '2px solid var(--ink-900)', background: 'var(--g-blue)', color: '#fff', padding: '12px 24px', borderRadius: '999px', fontWeight: 700 }}>
                  Register Now
                </button>
              )}

              <button onClick={() => navigate("/events")} className="btn-yellow-pill" style={{ width: '100%', marginTop: '12px', justifyContent: 'center', background: '#fff', color: 'var(--ink-900)', border: '2px solid var(--ink-900)' }}>
                View All Events
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 1024px) { .grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

const LogisticItem = ({ icon, label, val }) => (
  <div className="flex items-start gap-4">
    <div style={{ width: '24px', height: '24px', flexShrink: 0 }}>
      <img src={icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
    <div>
      <p className="font-mono" style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ink-400)' }}>{label}</p>
      <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink-900)' }}>{val}</p>
    </div>
  </div>
);

export default EventDetails;
