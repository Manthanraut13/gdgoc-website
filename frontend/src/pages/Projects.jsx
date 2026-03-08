import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/api';

const statusStyle = {
  ongoing: { label: 'In Progress', color: 'var(--g-blue)', bg: '#e8f0fe' },
  completed: { label: 'Completed', color: 'var(--g-green)', bg: '#e8f4ea' },
  planning: { label: 'Planning', color: 'var(--yellow-deep)', bg: '#fef7e0' },
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data?.data || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const list = filter === 'all' ? projects : projects.filter((p) => p.status === filter);

  return (
    <div id="projects">
      {/* Hero — Lime (#f7fcd4) */}
      <section style={{ background: '#f7fcd4', paddingTop: '60px', paddingBottom: '0px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', left: '40%', width: '500px', height: '250px', background: 'radial-gradient(ellipse, rgba(52,168,83,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="page-container relative z-10" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ color: 'var(--g-blue)' }}>THE PROJECTS</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: 'var(--ink-900)', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '16px' }}>
            Building <span style={{ color: 'var(--g-blue)' }}>Solutions</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink-400)', maxWidth: '400px', margin: '0 auto' }}>
            Real-world projects built by our community to solve problems and create impact.
          </p>
        </div>
      </section>


      <section className="section-wrapper" style={{ background: '#f7fcd4' }}>
        <div className="page-container">
          {/* Filters */}
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {['all', 'ongoing', 'completed', 'planning'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="font-body font-bold"
                style={{
                  fontSize: '11px',
                  padding: '7px 20px',
                  borderRadius: '999px',
                  border: '2px solid var(--ink-900)',
                  background: filter === f ? 'var(--ink-900)' : 'transparent',
                  color: filter === f ? '#fff' : 'var(--ink-400)',
                  boxShadow: filter === f ? '4px 4px 0px var(--ink-100)' : 'none',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {f === 'all' ? 'All' : (statusStyle[f]?.label || f)}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-400)' }}>Loading projects...</div>
          ) : list.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontSize: '40px', marginBottom: '12px' }}>🔭</p>
              <p className="font-display" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink-900)' }}>No projects found</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {list.map((p) => {
                const ss = statusStyle[p.status] || statusStyle.ongoing;
                return (
                  <div
                    key={p._id}
                    className="neo-card"
                    style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }}
                    onClick={() => setSelected(p)}
                  >
                    <div style={{ height: '180px', background: '#eee', overflow: 'hidden' }}>
                      <img src={p.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '20px' }}>
                      <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', color: ss.color, padding: '3px 10px', borderRadius: '6px', background: ss.bg, border: `1.5px solid ${ss.color}`, marginBottom: '12px', display: 'inline-block' }}>
                        {ss.label}
                      </span>
                      <h3 className="font-display" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink-900)', marginBottom: '8px' }}>{p.title}</h3>
                      <p style={{ fontSize: '12px', color: 'var(--ink-400)', lineHeight: 1.5 }}>{p.description?.slice(0, 80)}...</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }} onClick={() => setSelected(null)} />
          <div className="neo-card" style={{ position: 'relative', width: '100%', maxWidth: '560px', padding: '0', overflow: 'hidden', background: '#fff' }}>
            <img src={selected.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'} alt="" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
            <div style={{ padding: '32px' }}>
              <div className="section-label" style={{ marginBottom: '8px' }}>{selected.category}</div>
              <h2 className="font-display" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink-900)', marginBottom: '16px' }}>{selected.title}</h2>
              <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.8, marginBottom: '24px' }}>{selected.description}</p>

              <div className="flex gap-3">
                {selected.github && <a href={selected.github} target="_blank" rel="noreferrer" className="btn-primary-pill" style={{ background: 'var(--ink-900)' }}>GitHub</a>}
                {selected.demo && <a href={selected.demo} target="_blank" rel="noreferrer" className="btn-primary-pill">Live Demo</a>}
                <button onClick={() => setSelected(null)} className="btn-primary-pill" style={{ background: '#eee', color: '#000', border: 'none' }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;