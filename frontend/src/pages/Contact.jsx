import React, { useState } from 'react';
import { submitContactForm } from '../services/api';
import emailIcon from '../assets/email.png';
import locationIcon from '../assets/location.png';
import timeIcon from '../assets/time.png';
import linkedinIcon from '../assets/LinkedIn.png';


const contactInfo = [
  { icon: emailIcon, title: 'Email', val: 'gdg@zcoer.edu', color: 'var(--g-blue)' },
  { icon: locationIcon, title: 'Location', val: 'ZCOER Campus, Pune', color: 'var(--g-red)' },
  { icon: timeIcon, title: 'Meetings', val: 'Friday @ 9 PM', color: 'var(--g-green)' },
  { icon: linkedinIcon, title: 'Social', val: '@gdg_zcoer', color: 'var(--g-yellow)' }
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', category: 'General', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContactForm(form);
      setSent(true);
    } catch {
      alert('Failed to send. Try again!');
    }
  };

  return (
    <div id="contact" style={{ borderTop: '2px solid var(--ink-900)' }}>
      {/* Hero — Blush (#fce8e6) */}
      <section
        style={{
          background: '#fce8e6',
          paddingTop: '120px',
          paddingBottom: '64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-80px', left: '25%', width: '500px', height: '250px', background: 'radial-gradient(ellipse, rgba(52,168,83,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="page-container relative z-10" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ color: 'var(--g-blue)' }}>The Connection</div>
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
            Let's <span style={{ color: 'var(--g-blue)' }}>Talk Tech</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink-400)', maxWidth: '400px', margin: '0 auto' }}>
            Have a question, collaboration idea, or just want to say hi? We're all ears.
          </p>
        </div>
      </section>


      <section className="section-wrapper" style={{ background: '#fce8e6' }}>
        <div className="page-container">
          <div className="grid gap-12" style={{ gridTemplateColumns: '1fr 1.2fr' }}>
            {/* Info */}
            <div>
              <div className="section-label">Contact Details</div>
              <h2 className="font-display" style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px' }}>Reach Out <span style={{ color: 'var(--g-blue)' }}>Directly</span></h2>

              <div className="grid grid-cols-1 gap-4">
                {contactInfo.map((info) => (
                  <div key={info.title} className="neo-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '32px', height: '32px', flexShrink: 0 }}>
                      <img src={info.icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <p className="font-mono" style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ink-400)' }}>{info.title}</p>
                      <p className="font-body" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink-900)' }}>{info.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="neo-card" style={{ padding: '32px' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <p style={{ fontSize: '48px', marginBottom: '16px' }}>✉️</p>
                  <h3 className="font-display" style={{ fontSize: '24px', fontWeight: 800 }}>Message Sent!</h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-400)', marginTop: '8px' }}>We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Field label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    <Field label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <Field label="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} containerStyle={{ marginBottom: '16px' }} />
                  <div style={{ marginBottom: '20px' }}>
                    <label className="font-mono" style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ink-400)', display: 'block', marginBottom: '6px' }}>Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      style={inputStyle}
                      placeholder="Your message..."
                    />
                  </div>
                  <button type="submit" className="btn-primary-pill" style={{ width: '100%', justifyContent: 'center', background: 'var(--ink-900)' }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          <style>{`@media (max-width: 800px) { .grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '2px solid #eee',
  fontSize: '14px',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  background: '#fff',
  transition: 'border-color 150ms ease'
};

const Field = ({ label, containerStyle, ...props }) => (
  <div style={containerStyle}>
    <label className="font-mono" style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ink-400)', display: 'block', marginBottom: '6px' }}>{label}</label>
    <input required style={inputStyle} {...props} />
  </div>
);

export default Contact;
