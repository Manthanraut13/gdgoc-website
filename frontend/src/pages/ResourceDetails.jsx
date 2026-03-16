import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResources } from "../services/api";

const ResourceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResources().then(response => {
      const all = response.data?.data || [];
      const found = all.find(r => r._id === id || r.id === id);
      setRes(found);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="py-32 text-center text-gray-400">Fetching asset...</div>;
  if (!res) return (
    <div className="page-container py-32 text-center">
      <h2 className="font-display text-2xl font-bold mb-4">Asset Not Found</h2>
      <button onClick={() => navigate("/resources")} className="btn-primary-pill">Library</button>
    </div>
  );

  return (
    <div className="pb-32">
      {/* Hero — Light Green Tint */}
      <section style={{ background: '#e8f4ea', paddingTop: '140px', paddingBottom: '80px', position: 'relative' }}>
        <div className="page-container text-center relative z-10">
          <div className="flex justify-center mb-6">
            <span style={{ fontSize: '32px' }}>{res.icon || "📘"}</span>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '-1.5px', marginBottom: '20px' }}>
            {res.title}
          </h1>
          <div className="flex justify-center gap-4">
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', background: '#fff', border: '1.5px solid var(--ink-900)', padding: '4px 12px', borderRadius: '6px' }}>
              {res.category}
            </span>
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', background: '#fff', border: '1.5px solid var(--ink-900)', padding: '4px 12px', borderRadius: '6px' }}>
              {res.difficulty || 'Beginner'}
            </span>
          </div>
        </div>
      </section>

      <div className="page-container" style={{ marginTop: '60px' }}>
        <div className="grid gap-12" style={{ gridTemplateColumns: '1fr 2fr' }}>
          {/* Metadata Sidebar */}
          <div>
            <div className="neo-card" style={{ padding: '24px' }}>
              <h3 className="font-mono" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '24px' }}>Asset Index</h3>

              <div className="space-y-6 mb-12">
                <IndexItem label="Provider" val={res.provider || 'GDGOC'} />
                <IndexItem label="Language" val={res.language || 'English'} />
                <IndexItem label="Rating" val={(res.rating || '5.0') + ' / 5.0'} />
              </div>

              <a href={res.url} target="_blank" rel="noreferrer" className="btn-primary-pill" style={{ width: '100%', justifyContent: 'center' }}>
                Access Resource →
              </a>
              <button onClick={() => navigate("/resources")} className="btn-yellow-pill" style={{ width: '100%', marginTop: '12px', justifyContent: 'center', background: '#fff', color: 'var(--ink-900)', border: '2px solid var(--ink-900)' }}>
                Back to Library
              </button>
            </div>
          </div>

          {/* Detailed Content */}
          <div>
            <div className="section-label">Knowledge Overview</div>
            <h2 className="font-display" style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px' }}>Deep <span style={{ color: 'var(--g-green)' }}>Dive</span></h2>

            <div style={{ fontSize: '17px', lineHeight: 1.8, color: '#444', whiteSpace: 'pre-wrap' }}>
              {res.longDescription || res.description}
            </div>

            {res.tags?.length > 0 && (
              <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
                {res.tags.map(tag => (
                  <span key={tag} className="font-mono" style={{ fontSize: '11px', fontWeight: 700, padding: '4px 12px', background: 'var(--surface-1)', color: 'var(--ink-400)', borderRadius: '6px' }}>#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .grid { grid-template-columns: 1fr !important; } .grid > div:first-child { order: 2; } }`}</style>
    </div>
  );
};

const IndexItem = ({ label, val }) => (
  <div>
    <p className="font-mono" style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ink-400)' }}>{label}</p>
    <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink-900)' }}>{val}</p>
  </div>
);

export default ResourceDetails;
