import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogs } from "../services/api";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs()
      .then(res => {
        const all = res.data?.data || [];
        const found = all.find(b => b._id === id || b.id === id);
        setBlog(found);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-container py-32 text-center text-gray-400">Loading story...</div>;
  if (!blog) return (
    <div className="page-container py-32 text-center">
      <h2 className="font-display text-2xl font-bold mb-4">Story Not Found</h2>
      <button onClick={() => navigate("/blog")} className="btn-primary-pill">Archive</button>
    </div>
  );

  return (
    <div className="pb-32">
      {/* Editorial Header — Light Blue Tint */}
      <header style={{ background: '#e8f0fe', paddingTop: '140px', paddingBottom: '80px' }}>
        <div className="page-container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div className="flex justify-center gap-2 mb-6">
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', background: '#fff', border: '1.5px solid var(--ink-900)', color: 'var(--ink-900)', padding: '4px 12px', borderRadius: '6px' }}>
              {blog.category}
            </span>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 800, color: 'var(--ink-900)', lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: '24px' }}>
            {blog.title}
          </h1>
          <div className="flex items-center justify-center gap-4 font-mono" style={{ fontSize: '11px', color: 'var(--ink-400)' }}>
            <span>{new Date(blog.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>·</span>
            <span>{blog.readTime || "5 min read"}</span>
          </div>
        </div>
      </header>

      {/* Main Image */}
      <div className="page-container" style={{ maxWidth: '900px', marginTop: '-40px' }}>
        <div style={{ borderRadius: '24px', overflow: 'hidden', border: '2px solid var(--ink-900)', boxShadow: '8px 8px 0px rgba(0,0,0,0.1)' }}>
          <img src={blog.image} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </div>

      {/* Author & Content */}
      <div className="page-container" style={{ maxWidth: '720px', marginTop: '60px' }}>
        <div className="flex items-center gap-4 mb-12 pb-8 border-b border-gray-100">
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--surface-1)', border: '2.5px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            {blog.authorAvatar ? <img src={blog.authorAvatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '18px' }}>👤</div>}
          </div>
          <div>
            <p className="font-display" style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink-900)' }}>{blog.author}</p>
            <p style={{ fontSize: '11px', color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{blog.authorRole || 'Contributor'}</p>
          </div>
        </div>

        <article
          style={{
            fontSize: '17px',
            lineHeight: 1.8,
            color: '#444',
            whiteSpace: 'pre-wrap'
          }}
        >
          {blog.content}
        </article>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map(tag => (
                <span key={tag} className="font-mono" style={{ fontSize: '10px', color: 'var(--ink-400)', background: 'var(--surface-1)', padding: '4px 12px', borderRadius: '6px' }}>#{tag}</span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <button onClick={() => navigate("/blog")} className="btn-primary-pill" style={{ background: 'var(--ink-900)' }}>
            ← Back to Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
