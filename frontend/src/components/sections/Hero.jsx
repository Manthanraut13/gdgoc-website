import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TYPEWRITER_TEXT = 'Build. Connect. Grow.';
const TYPEWRITER_SPEED = 45;

const Hero = () => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayText(TYPEWRITER_TEXT.slice(0, i));
      if (i >= TYPEWRITER_TEXT.length) clearInterval(interval);
    }, TYPEWRITER_SPEED);
    return () => clearInterval(interval);
  }, []);

  const renderTypewriterText = () => {
    const buildIndex = displayText.indexOf('Build');
    const connectIndex = displayText.indexOf('Connect');
    const growIndex = displayText.indexOf('Grow');

    let content = [];
    let lastIndex = 0;

    if (displayText.includes('Build.')) {
      content.push(<span key="build" style={{ color: 'var(--g-green)' }}>Build.</span>);
      lastIndex = displayText.indexOf('Build.') + 6;
    }

    if (displayText.includes(' Connect.')) {
      content.push(<span key="space1"> </span>);
      content.push(<span key="connect" style={{ color: 'var(--g-red)' }}>Connect.</span>);
      lastIndex = displayText.indexOf('Connect.') + 8;
    }

    if (displayText.includes(' Grow.')) {
      content.push(<span key="space2"> </span>);
      content.push(<span key="grow" style={{ color: 'var(--g-yellow)' }}>Grow.</span>);
    } else if (displayText.length > lastIndex) {
      content.push(<span key="remaining">{displayText.slice(lastIndex)}</span>);
    }

    return content.length > 0 ? content : <>{displayText}</>;
  };

  const stats = [
    { num: '50+', label: 'Members', color: '#e8f0fe', text: 'var(--g-blue)' },
    { num: '25+', label: 'Events', color: '#e8f4ea', text: 'var(--g-green)' },
    { num: '10+', label: 'Projects', color: '#fce8e6', text: 'var(--g-red)' },
    { num: '2', label: 'Years', color: '#fef7e0', text: 'var(--yellow-deep)' },
  ];

  return (
    <section
      className="grid-bg"
      style={{
        background: '#f7fcd4',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '100px',
        paddingBottom: '60px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      {/* Decorative Elements */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '600px', background: 'radial-gradient(circle, rgba(26,115,232,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />

      <div className="page-container relative z-10 w-full flex flex-col items-center">

        {/* Branding Spotlight Stack */}
        <div style={{ marginBottom: '48px' }}>
          <h2
            className="font-display google-sans-bold"
            style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              marginBottom: '8px',
              opacity: 0.9,
              color: 'var(--ink-900)'
            }}
          >
            Google Developer Group on Campus
          </h2>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(64px, 12vw, 140px)',
              fontFamily: "'Jersey 25', sans-serif",
              fontWeight: 400,
              lineHeight: 0.9,
              letterSpacing: '-2px',
              color: 'var(--g-blue)',
              marginBottom: '24px',
              textTransform: 'uppercase',
              WebkitFontSmoothing: 'none',
              MozOsxFontSmoothing: 'unset',
              fontSmooth: 'never',
              textRendering: 'optimizeSpeed',
              imageRendering: 'pixelated',
              textShadow: '3px 3px 0px rgba(0,0,0,0.15)',
            }}
          >
            Z C O E R
          </h1>

          <div
            className="google-sans-bold"
            style={{
              fontSize: 'clamp(20px, 3vw, 36px)',
              fontWeight: 600,
              color: 'var(--ink-900)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            <div style={{ width: '12px', height: '44px', borderRadius: '4px' }} />
            {renderTypewriterText()}
          </div>
        </div>

        <p
          className="font-body"
          style={{
            fontSize: '18px',
            color: 'var(--ink-400)',
            maxWidth: '600px',
            lineHeight: 1.6,
            marginBottom: '60px',
          }}
        >
          Zeal College of Engineering and Research, Pune. <br />
          Where theory meets practice and students become innovators.
        </p>

        {/* Horizontal Action Row */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <a href="/#join" className="btn-primary-pill" style={{ background: 'var(--ink-900)', padding: '18px 48px', fontSize: '16px', textDecoration: 'none' }}>
            Join the Community
          </a>
          <a href="/#events" className="btn-primary-pill" style={{ background: '#fff', color: 'var(--ink-900)', border: '2px solid var(--ink-900)', padding: '18px 40px', fontSize: '16px', textDecoration: 'none' }}>
            Explore Events
          </a>
        </div>

        {/* Structured Bottom Stats Row */}
        <div
          className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto"
          style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '48px' }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="neo-card"
              style={{
                background: '#fff',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            >
              <span className="font-display" style={{ fontSize: '32px', fontWeight: 800, color: s.text, lineHeight: 1 }}>{s.num}</span>
              <span className="font-mono" style={{ fontSize: '10px', fontWeight: 800, color: 'var(--ink-400)', textTransform: 'uppercase', marginTop: '6px' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;