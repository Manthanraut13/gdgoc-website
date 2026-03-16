import React from 'react';
import teamImg from '../assets/Team.jpeg';
import innovationIcon from '../assets/innovation.png';
import growthIcon from '../assets/growth.png';
import excellenceIcon from '../assets/excellence.png';
import communityIcon from '../assets/community.png';

const values = [
  { icon: innovationIcon, name: 'Innovation', color: 'var(--g-blue)', bg: '#e8f0fe' },
  { icon: communityIcon, name: 'Community', color: 'var(--g-red)', bg: '#fce8e6' },
  { icon: growthIcon, name: 'Growth', color: 'var(--g-green)', bg: '#e8f4ea' },
  { icon: excellenceIcon, name: 'Excellence', color: 'var(--yellow-deep)', bg: '#fef7e0' },
];

const About = () => {
  return (
    <div id="about">
      {/* Hero — Blush (#fce8e6) */}
      <section
        style={{
          background: '#fce8e6',
          paddingTop: '40px',
          paddingBottom: '0px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-100px', left: '10%', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(26,115,232,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="page-container relative z-10" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ color: 'var(--g-blue)' }}>THE STORY</div>
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
            Building the Future of<br />
            <span style={{ color: 'var(--g-blue)' }}>Tech Innovation</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink-400)', maxWidth: '480px', margin: '0 auto' }}>
            We bring together passionate student developers to explore modern technologies, share knowledge, and build impactful projects.
          </p>
        </div>
      </section>


      {/* Mission — Blush (#fce8e6) */}
      <section className="section-wrapper" style={{ background: '#fce8e6' }}>
        <div className="page-container">
          <div className="grid gap-16 items-start" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
            <div>
              <div className="section-label">THE MISSION</div>
              <h2 className="font-display" style={{ fontSize: '28px', fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '-1px', lineHeight: 1.2, marginBottom: '24px' }}>
                Empowering <span style={{ color: 'var(--g-blue)' }}>Student Developers</span>
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--ink-400)', lineHeight: 1.75, marginBottom: '32px' }}>
                Our mission is to foster an inclusive ecosystem where students gain practical experience with Google technologies and develop innovative solutions with real-world impact.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {values.map((v) => (
                  <div key={v.name} className="neo-card" style={{ padding: '20px', background: '#fff', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginBottom: '12px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={v.icon} alt={v.name} style={{ height: '100%', objectFit: 'contain' }} />
                    </div>
                    <p className="font-display" style={{ fontSize: '14px', fontWeight: 700, color: v.color }}>{v.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Image Card — Replacing Vision Card */}
            <div
              className="neo-card"
              style={{
                padding: '0',
                overflow: 'hidden',
                border: '2px solid var(--ink-900)',
                boxShadow: '8px 8px 0px var(--ink-900)',
                aspectRatio: '4/3'
              }}
            >
              <img
                src={teamImg}
                alt="GDG ZCOER Team"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </div>
      </section>


      <style>{`@media (max-width: 768px) { .grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

export default About;