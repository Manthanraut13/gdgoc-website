import React from 'react';
import { Link } from 'react-router-dom';

const stats = [
  { number: '500', label: 'Members', suffix: '+', icon: '👥', tint: 'rgba(26,115,232,0.1)', color: 'var(--g-blue)' },
  { number: '50', label: 'Events', suffix: '+', icon: '🎯', tint: 'rgba(52,168,83,0.1)', color: 'var(--g-green)' },
  { number: '25', label: 'Projects', suffix: '+', icon: '🚀', tint: 'rgba(234,67,53,0.1)', color: 'var(--g-red)' },
  { number: '15', label: 'Workshops', suffix: '+', icon: '📊', tint: 'rgba(251,188,4,0.12)', color: 'var(--yellow-deep)' }
];

const Stats = () => {
  return (
    <section style={{ background: '#f7fcd4', padding: '100px 0', borderTop: '1px solid #eee' }}>
      <div className="page-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="section-label" style={{ color: 'var(--ink-400)' }}>Our Impact</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '-2px', marginBottom: '16px' }}>
            Driving <span style={{ color: 'var(--g-blue)' }}>Innovation</span> Forward
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--ink-400)', maxWidth: '500px', margin: '0 auto' }}>
            Empowering students to create, innovate, and lead in the world of technology.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {stats.map((s, i) => (
            <div
              key={i}
              className="neo-card"
              style={{
                background: '#fff',
                padding: '40px 32px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '16px', filter: 'grayscale(1)', opacity: 0.1, position: 'absolute', top: '10px', right: '10px', pointerEvents: 'none' }}>{s.icon}</div>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: s.tint, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '20px', border: `1.5px solid ${s.color}` }}>
                {s.icon}
              </div>
              <div className="font-display" style={{ fontSize: '44px', fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1, marginBottom: '4px' }}>
                {s.number}{s.suffix}
              </div>
              <div className="font-mono" style={{ fontSize: '10px', fontWeight: 700, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Ready to Join? — Unified lime (#f7fcd4) */}
        <div className="neo-card" style={{ marginTop: '80px', padding: '48px', background: '#f7fcd4', border: '2px solid var(--ink-900)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <h3 className="font-display" style={{ fontSize: '28px', fontWeight: 700, color: 'var(--ink-900)', marginBottom: '8px' }}>Ready to <span style={{ color: 'var(--g-blue)' }}>Make Your Mark?</span></h3>
            <p style={{ fontSize: '14px', color: 'var(--ink-400)', maxWidth: '440px' }}>Join our community and be part of the next generation of tech innovators and leaders.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/join" className="btn-primary-pill" style={{ background: 'var(--ink-900)' }}>Join Now</Link>
            <Link to="/about" className="btn-primary-pill" style={{ background: '#fff', color: 'var(--ink-900)', border: '2px solid var(--ink-900)' }}>Learn More</Link>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .grid { grid-template-columns: 1fr 1fr !important; } .neo-card { padding: 32px 16px !important; } }`}</style>
    </section>
  );
};

export default Stats;