import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/api';

const typeStyle = {
  Workshop: { bg: 'rgba(26,115,232,0.1)', color: 'var(--g-blue)' },
  Hackathon: { bg: 'rgba(234,67,53,0.1)', color: 'var(--g-red)' },
  Talk: { bg: 'rgba(251,188,4,0.12)', color: 'var(--yellow-deep)' },
  'Info Session': { bg: 'rgba(52,168,83,0.1)', color: 'var(--g-green)' },
  default: { bg: 'rgba(26,115,232,0.1)', color: 'var(--g-blue)' },
};

const formatDate = (d) => {
  const dt = new Date(d);
  return { month: dt.toLocaleDateString('en-US', { month: 'short' }), day: dt.getDate() };
};

const Events = () => {
  const [tab, setTab] = useState('upcoming');
  const [events, setEvents] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then((res) => {
        const all = res.data?.data || [];
        setEvents({
          upcoming: all.filter((e) => e.status === 'upcoming'),
          past: all.filter((e) => e.status === 'past'),
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const list = events[tab] || [];

  return (
    <div id="events">
      {/* Hero — Light Red Tint */}
      <section
        style={{
          background: '#fce8e6',
          paddingTop: '60px',
          paddingBottom: '0px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-80px', right: '20%', width: '500px', height: '250px', background: 'radial-gradient(ellipse, rgba(26,115,232,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="page-container relative z-10" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ color: 'var(--g-green)' }}>THE EVENTS</div>
          <h1
            className="font-display"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: 'var(--ink-900)', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '16px' }}
          >
            Learn, Build, <span style={{ color: 'var(--g-green)' }}>Connect</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink-400)', maxWidth: '420px', margin: '0 auto' }}>
            Hands-on workshops, hackathons, and community sessions designed to level up your skills.
          </p>
        </div>
      </section>


      {/* Events List */}
      <section className="section-wrapper" style={{ background: '#fce8e6' }}>
        <div className="page-container">
          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-10">
            {['upcoming', 'past'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="font-body font-bold"
                style={{
                  fontSize: '11px',
                  padding: '8px 24px',
                  borderRadius: '999px',
                  border: '2px solid var(--ink-900)',
                  background: tab === t ? 'var(--ink-900)' : 'transparent',
                  color: tab === t ? '#fff' : 'var(--ink-400)',
                  boxShadow: tab === t ? '4px 4px 0px var(--ink-200)' : 'none',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 200ms ease'
                }}
              >
                {t} ({events[t].length})
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-400)' }}>
              Loading events...
            </div>
          ) : list.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontSize: '40px', marginBottom: '12px' }}>📅</p>
              <p className="font-display" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink-900)', marginBottom: '6px' }}>
                No {tab} events
              </p>
              <p style={{ fontSize: '13px', color: 'var(--ink-400)' }}>Check back soon for updates.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {list.map((event) => {
                const type = event.type || 'Workshop';
                const ts = typeStyle[type] || typeStyle.default;
                const d = formatDate(event.date);
                return (
                  <div key={event._id || event.id} className="neo-card" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', tracking: '1px', background: ts.bg, color: ts.color, padding: '4px 12px', borderRadius: '6px', border: `1.5px solid ${ts.color}` }}>
                        {type}
                      </span>
                      <div style={{ textAlign: 'right' }}>
                        <span className="font-mono" style={{ fontSize: '10px', color: 'var(--ink-400)', fontWeight: 700 }}>{d.month} {d.day}</span>
                      </div>
                    </div>
                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 className="font-display" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink-900)', marginBottom: '8px', lineHeight: 1.2 }}>
                        {event.title}
                      </h3>
                      <p style={{ fontSize: '12px', color: 'var(--ink-400)', marginBottom: '16px' }}>
                        📍 {event.location || 'Campus'} · {event.time || '10:00 AM'}
                      </p>
                      <p style={{ fontSize: '13px', color: '#444', lineHeight: 1.6, flex: 1 }}>
                        {event.description?.slice(0, 100)}...
                      </p>
                      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                        <Link to={`/events/${event._id}`} className="btn-primary-pill" style={{ width: '100%', justifyContent: 'center' }}>
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;