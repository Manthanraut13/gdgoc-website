import React, { useState } from 'react';

/* ── All gallery images from /images/gallery/ ── */
const galleryItems = [
  { id: 1, src: '/images/gallery/ai1.jpeg', title: 'AI Workshop — Session 1', category: 'AI/ML', color: 'var(--g-blue)' },
  { id: 2, src: '/images/gallery/ai2.jpeg', title: 'AI Workshop — Hands-On', category: 'AI/ML', color: 'var(--g-blue)' },
  { id: 3, src: '/images/gallery/ai3.jpeg', title: 'AI Workshop — Team Activity', category: 'AI/ML', color: 'var(--g-blue)' },
  { id: 4, src: '/images/gallery/ai4.jpeg', title: 'AI Workshop — Presentation', category: 'AI/ML', color: 'var(--g-blue)' },
  { id: 5, src: '/images/gallery/ai5.jpeg', title: 'AI Workshop — Group Photo', category: 'AI/ML', color: 'var(--g-blue)' },
  { id: 6, src: '/images/gallery/winter1.jpeg', title: 'Winter Arc — Day 1', category: 'Winter Arc', color: 'var(--g-green)' },
  { id: 7, src: '/images/gallery/winter2.jpeg', title: 'Winter Arc — Coding Session', category: 'Winter Arc', color: 'var(--g-green)' },
  { id: 8, src: '/images/gallery/winter3.jpeg', title: 'Winter Arc — Workshop', category: 'Winter Arc', color: 'var(--g-green)' },
  { id: 9, src: '/images/gallery/winter4.jpeg', title: 'Winter Arc — Collaboration', category: 'Winter Arc', color: 'var(--g-green)' },
  { id: 10, src: '/images/gallery/winter5.jpeg', title: 'Winter Arc — Celebration', category: 'Winter Arc', color: 'var(--g-green)' },
  { id: 11, src: '/images/gallery/event1.jpeg', title: 'Community Event — Highlights', category: 'Events', color: 'var(--g-red)' },
  { id: 12, src: '/images/gallery/event2.jpeg', title: 'Community Event — Networking', category: 'Events', color: 'var(--g-red)' },
  { id: 13, src: '/images/gallery/event3.jpeg', title: 'Community Event — Activity', category: 'Events', color: 'var(--g-red)' },
  { id: 14, src: '/images/gallery/event4.jpeg', title: 'Community Event — Session', category: 'Events', color: 'var(--g-yellow)' },
  { id: 15, src: '/images/gallery/event5.jpeg', title: 'Community Event — Group Shot', category: 'Events', color: 'var(--g-yellow)' },
  { id: 16, src: '/images/gallery/event6.jpeg', title: 'Community Event — Closing', category: 'Events', color: 'var(--g-yellow)' },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'AI/ML', label: 'AI / ML' },
  { id: 'Winter Arc', label: 'Winter Arc' },
  { id: 'Events', label: 'Events' },
];

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const list = filter === 'all' ? galleryItems : galleryItems.filter(i => i.category === filter);

  return (
    <div id="gallery">
      {/* Hero */}
      <section
        style={{
          background: '#f7fcd4',
          paddingTop: '60px',
          paddingBottom: '0px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-100px', right: '15%', width: '500px', height: '250px', background: 'radial-gradient(ellipse, rgba(26,115,232,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="page-container relative z-10" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ color: 'var(--g-green)' }}>The Memories</div>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800,
              color: 'var(--ink-900)',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            Captured <span style={{ color: 'var(--g-green)' }}>Moments</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink-400)', maxWidth: '420px', margin: '0 auto' }}>
            A visual timeline of our community events, workshops, and milestones.
          </p>
        </div>
      </section>

      {/* Filters + Masonry Grid */}
      <section className="section-wrapper" style={{ background: '#f7fcd4' }}>
        <div className="page-container">
          {/* Category pills */}
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className="font-body font-bold"
                style={{
                  fontSize: '11px',
                  padding: '7px 18px',
                  borderRadius: '999px',
                  border: '2px solid var(--ink-900)',
                  background: filter === c.id ? 'var(--ink-900)' : 'transparent',
                  color: filter === c.id ? '#fff' : 'var(--ink-400)',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  transition: 'all 200ms ease',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Dynamic masonry grid */}
          <div className="gallery-masonry">
            {list.map((item) => (
              <div
                key={item.id}
                className="gallery-card neo-card"
                onClick={() => setSelected(item)}
              >
                <div className="gallery-card-img">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop'; }}
                  />
                  {/* Overlay on hover */}
                  <div className="gallery-card-overlay">
                    <span className="gallery-card-badge" style={{ borderColor: item.color, color: item.color }}>
                      {item.category}
                    </span>
                    <p className="font-display" style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="gallery-lightbox"
          onClick={() => setSelected(null)}
        >
          <div className="gallery-lightbox-bg" />
          <div
            className="gallery-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gallery-lightbox-close"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <img
              src={selected.src}
              alt={selected.title}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop'; }}
            />
            <div className="gallery-lightbox-info">
              <span className="gallery-card-badge" style={{ borderColor: selected.color, color: selected.color, marginBottom: '8px' }}>
                {selected.category}
              </span>
              <h2 className="font-display" style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink-900)' }}>{selected.title}</h2>
            </div>
          </div>
        </div>
      )}

      {/* Scoped styles */}
      <style>{`
        .gallery-masonry {
          columns: 3 280px;
          column-gap: 20px;
        }

        .gallery-card {
          break-inside: avoid;
          margin-bottom: 20px;
          padding: 0 !important;
          overflow: hidden;
          cursor: pointer;
          transition: transform 200ms ease, box-shadow 200ms ease;
        }
        .gallery-card:hover {
          transform: translateY(-4px);
          box-shadow: 10px 10px 0px var(--ink-900);
        }

        .gallery-card-img {
          position: relative;
          overflow: hidden;
        }
        .gallery-card-img img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 400ms ease;
        }
        .gallery-card:hover .gallery-card-img img {
          transform: scale(1.05);
        }

        .gallery-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 50%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 16px;
          opacity: 0;
          transition: opacity 300ms ease;
        }
        .gallery-card:hover .gallery-card-overlay {
          opacity: 1;
        }

        .gallery-card-badge {
          display: inline-block;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 3px 10px;
          border-radius: 6px;
          border: 1.5px solid;
          background: rgba(255,255,255,0.9);
          width: fit-content;
          margin-bottom: 6px;
        }

        /* Lightbox */
        .gallery-lightbox {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .gallery-lightbox-bg {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
        }
        .gallery-lightbox-content {
          position: relative;
          max-width: 900px;
          width: 100%;
          background: #fff;
          border: 2px solid var(--ink-900);
          border-radius: 20px;
          box-shadow: 12px 12px 0px var(--ink-900);
          overflow: hidden;
        }
        .gallery-lightbox-content img {
          width: 100%;
          height: auto;
          display: block;
          max-height: 70vh;
          object-fit: contain;
          background: #f5f5f5;
        }
        .gallery-lightbox-info {
          padding: 20px 24px;
        }
        .gallery-lightbox-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid var(--ink-900);
          cursor: pointer;
          font-weight: 800;
          font-size: 14px;
          box-shadow: 3px 3px 0px var(--ink-900);
          transition: transform 150ms ease;
        }
        .gallery-lightbox-close:hover {
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .gallery-masonry {
            columns: 2 200px;
          }
        }
        @media (max-width: 480px) {
          .gallery-masonry {
            columns: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;