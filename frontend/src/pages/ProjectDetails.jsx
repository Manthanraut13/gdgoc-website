import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjects } from "../services/api";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then(res => {
      const all = res.data?.data || [];
      const found = all.find(item => item._id === id || item.id === id);
      if (found) {
        setP({
          title: found.title,
          description: found.description,
          status: found.status || 'planning',
          progress: found.progress || 0,
          category: found.category || 'web',
          tech: found.technologies || found.tech || [],
          team: found.team || [],
          github: found.github,
          demo: found.demo,
          image: found.image
        });
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="py-32 text-center text-gray-400">Loading project...</div>;
  if (!p) return (
    <div className="page-container py-32 text-center">
      <h2 className="font-display text-2xl font-bold mb-4">Project Not Found</h2>
      <button onClick={() => navigate("/projects")} className="btn-primary-pill">All Projects</button>
    </div>
  );

  return (
    <div className="pb-32">
      {/* Hero — Light Yellow Tint */}
      <section style={{ background: '#fef7e0', paddingTop: '140px', paddingBottom: '80px', position: 'relative' }}>
        <div className="page-container text-center relative z-10">
          <div className="flex justify-center gap-2 mb-6">
            <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', background: '#fff', border: '2px solid var(--ink-900)', color: 'var(--ink-900)', padding: '4px 12px', borderRadius: '6px' }}>
              {p.status}
            </span>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 800, color: 'var(--ink-900)', letterSpacing: '-1.5px', marginBottom: '20px' }}>
            {p.title}
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--ink-400)', maxWidth: '600px', margin: '0 auto' }}>
            {p.description}
          </p>
        </div>
      </section>

      <div className="page-container" style={{ marginTop: '-40px' }}>
        <div className="grid gap-12" style={{ gridTemplateColumns: 'minmax(0, 2fr) 1fr' }}>
          {/* Main */}
          <div>
            <div className="neo-card" style={{ padding: '0', overflow: 'hidden', marginBottom: '40px' }}>
              <img src={p.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'} alt="" style={{ width: '100%', height: 'auto' }} />
            </div>

            <div className="section-label">Technology Stack</div>
            <div className="flex flex-wrap gap-2 mb-12">
              {p.tech.map(t => (
                <span key={t} className="font-mono" style={{ fontSize: '11px', fontWeight: 700, padding: '6px 16px', background: 'rgba(26,115,232,0.1)', color: 'var(--g-blue)', borderRadius: '8px', border: '1.5px solid var(--g-blue)' }}>{t}</span>
              ))}
            </div>

            <div className="section-label">The Vision</div>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#444' }}>{p.description}</p>
          </div>

          {/* Sidebar */}
          <div>
            <div className="neo-card" style={{ padding: '24px' }}>
              <h3 className="font-mono" style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '20px' }}>Project Health</h3>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono" style={{ fontSize: '10px', color: 'var(--ink-400)' }}>PROGRESS</span>
                  <span className="font-display" style={{ fontSize: '14px', fontWeight: 800 }}>{p.progress}%</span>
                </div>
                <div style={{ height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${p.progress}%`, background: 'var(--g-blue)', borderRadius: '4px' }} />
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <InfoItem label="Category" val={p.category.toUpperCase()} />
                <InfoItem label="Team Size" val={p.team.length + ' Members'} />
              </div>

              <div className="flex flex-col gap-2">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="btn-primary-pill" style={{ background: 'var(--ink-900)', width: '100%', justifyContent: 'center' }}>GitHub Source</a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" className="btn-primary-pill" style={{ width: '100%', justifyContent: 'center' }}>Live Demo</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

const InfoItem = ({ label, val }) => (
  <div>
    <p className="font-mono" style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ink-400)' }}>{label}</p>
    <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink-900)' }}>{val}</p>
  </div>
);

export default ProjectDetails;
