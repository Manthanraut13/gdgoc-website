import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/api';

const categories = [
  { id: 'all', label: 'All Stories', icon: '📝' },
  { id: 'Technology', label: 'Tech', icon: '🛡️' },
  { id: 'Event Highlights', label: 'Events', icon: '✨' },
  { id: 'Member Spotlights', label: 'People', icon: '👤' },
  { id: 'Tutorials', label: 'Guides', icon: '📖' }
];

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [cat, setCat] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await getBlogs();
        const published = (res.data?.data || []).filter(b => b.status === 'published' || !b.status);
        setBlogs(published);
      } catch {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const list = cat === 'all' ? blogs : blogs.filter(b => b.category === cat);

  return (
    <div id="blog">
      {/* Hero — Lime (#f7fcd4) */}
      <section
        style={{
          background: '#f7fcd4',
          paddingTop: '120px',
          paddingBottom: '64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-100px', left: '10%', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(26,115,232,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="page-container relative z-10" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ color: 'var(--g-red)' }}>The Stories</div>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              color: 'var(--ink-900)',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            Insights & <span style={{ color: 'var(--g-red)' }}>Innovations</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink-400)', maxWidth: '420px', margin: '0 auto' }}>
            Documenting our journey, technical deep-dives, and community memories.
          </p>
        </div>
      </section>


      <section className="section-wrapper" style={{ background: '#f7fcd4' }}>
        <div className="page-container">
          {/* Category Filters */}
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className="font-body font-bold"
                style={{
                  fontSize: '11px',
                  padding: '7px 18px',
                  borderRadius: '999px',
                  border: '2px solid var(--ink-900)',
                  background: cat === c.id ? 'var(--ink-900)' : 'transparent',
                  color: cat === c.id ? '#fff' : 'var(--ink-400)',
                  boxShadow: cat === c.id ? '3px 3px 0px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-400)' }}>Loading archive...</div>
          ) : list.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontSize: '40px', marginBottom: '12px' }}>📖</p>
              <h3 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink-400)' }}>No stories found here.</h3>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {list.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog._id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="neo-card"
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '0',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ height: '200px', borderBottom: '2px solid var(--ink-900)', overflow: 'hidden' }}>
                      <img
                        src={blog.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"}
                        alt={blog.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(26,115,232,0.1)', color: 'var(--g-blue)', padding: '2px 8px', borderRadius: '4px' }}>
                          {blog.category}
                        </span>
                        <span className="font-mono" style={{ fontSize: '9px', color: 'var(--ink-400)' }}>
                          {blog.readTime || '5 min read'}
                        </span>
                      </div>
                      <h3 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1.25, marginBottom: '8px' }}>
                        {blog.title}
                      </h3>
                      <p style={{ fontSize: '13px', color: 'var(--ink-400)', lineHeight: 1.6, flex: 1, marginBottom: '20px' }}>
                        {blog.excerpt?.slice(0, 100)}{blog.excerpt?.length > 100 ? '...' : ''}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="font-mono" style={{ fontSize: '10px', color: 'var(--ink-900)', fontWeight: 700 }}>
                          By {blog.author}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--g-blue)' }}>Read Story →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe — Unified lime (#f7fcd4) */}
      <section style={{ background: '#f7fcd4', padding: '80px 0', borderTop: '2px solid var(--ink-900)' }}>
        <div className="page-container" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ color: 'var(--yellow-deep)' }}>The Newsletter</div>
          <h2 className="font-display" style={{ fontSize: '30px', fontWeight: 700, color: 'var(--ink-900)', marginBottom: '12px' }}>
            Stay in the <span style={{ color: 'var(--yellow-deep)' }}>Loop</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--ink-400)', maxWidth: '400px', margin: '0 auto 32px' }}>
            Get curated tech news and community updates delivered straight to your inbox.
          </p>
          <div style={{ maxWidth: '440px', margin: '0 auto', display: 'flex', gap: '8px' }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{
                flex: 1,
                padding: '12px 20px',
                borderRadius: '12px',
                border: '2px solid var(--ink-900)',
                outline: 'none',
                fontSize: '14px'
              }}
            />
            <button className="btn-primary-pill" style={{ background: 'var(--ink-900)', padding: '0 24px' }}>Join</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
