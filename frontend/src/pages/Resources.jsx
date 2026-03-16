import React, { useEffect, useState } from 'react';
import { getResources } from '../services/api';

const catIcon = { Documentation: '📚', YouTube: '📹', Course: '🎓', Tools: '🛠️', Roadmap: '🗺️', Blogs: '📝', API: '🔌', 'GitHub Repo': '🔗', Other: '🔧' };
const catColor = {
  Documentation: { bg: '#e8f0fe', color: 'var(--g-blue)' },
  YouTube: { bg: '#fce8e6', color: 'var(--g-red)' },
  Course: { bg: '#e8f0fe', color: 'var(--g-blue)' },
  Tools: { bg: '#e8f4ea', color: 'var(--g-green)' },
  Roadmap: { bg: '#fef7e0', color: 'var(--yellow-deep)' },
  default: { bg: '#f1f3f4', color: 'var(--ink-400)' },
};

const Resources = () => {
  const [cat, setCat] = useState('all');
  const [search, setSearch] = useState('');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResources()
      .then((res) => setResources(res.data?.data || []))
      .finally(() => setLoading(false));
  }, []);

  const cats = ['all', ...new Set(resources.map((r) => r.category).filter(Boolean))];
  const list = resources.filter((r) => {
    const matchCat = cat === 'all' || r.category === cat;
    const matchSearch = !search || r.title?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div id="resources">
      {/* Hero — Blush (#fce8e6) */}
      <section style={{ background: '#fce8e6', paddingTop: '60px', paddingBottom: '0px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', left: '50%', width: '500px', height: '250px', background: 'radial-gradient(ellipse, rgba(26,115,232,0.1) 0%, transparent 65%)', pointerEvents: 'none', transform: 'translateX(-50%)' }} />
        <div className="page-container relative z-10" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ color: 'var(--yellow-deep)' }}>THE RESOURCES</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '16px' }}>
            Learn <span style={{ color: 'var(--yellow-deep)' }}>Smarter</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink-400)', maxWidth: '400px', margin: '0 auto' }}>
            Curated materials, recordings, and study resources to accelerate your dev journey.
          </p>
        </div>
      </section>


      <section className="section-wrapper" style={{ background: '#fce8e6' }}>
        <div className="page-container">
          {/* Search */}
          <div style={{ maxWidth: '480px', margin: '0 auto 32px' }}>
            <input
              type="text"
              placeholder="Filter by keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="font-body"
              style={{ width: '100%', padding: '14px 24px', borderRadius: '12px', border: '2px solid var(--ink-900)', background: '#fff', fontSize: '14px', outline: 'none', boxShadow: '4px 4px 0px var(--ink-900)' }}
            />
          </div>

          {/* Category pills */}
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="font-body font-bold"
                style={{
                  fontSize: '11px',
                  padding: '7px 18px',
                  borderRadius: '999px',
                  border: '2px solid var(--ink-900)',
                  background: cat === c ? 'var(--ink-900)' : '#fff',
                  color: cat === c ? '#fff' : 'var(--ink-400)',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  letterSpacing: '1px'
                }}
              >
                {cat === 'all' ? 'All Resources' : c}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-400)' }}>Loading resources...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {list.map((r) => {
                const cc = catColor[r.category] || catColor.default;
                return (
                  <a key={r._id || r.id} href={r.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                    <div className="neo-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ padding: '20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', background: cc.bg, color: cc.color, padding: '4px 12px', borderRadius: '6px', border: `1.5px solid ${cc.color}` }}>
                          {catIcon[r.category] || '📚'} {r.category}
                        </span>
                      </div>
                      <div style={{ padding: '24px', flex: 1 }}>
                        <h3 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink-900)', marginBottom: '8px', lineHeight: 1.2 }}>{r.title}</h3>
                        <p style={{ fontSize: '12px', color: 'var(--ink-400)', lineHeight: 1.6 }}>{r.description?.slice(0, 80)}...</p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Resources;