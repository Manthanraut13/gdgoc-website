import React, { useState } from 'react';
import { submitJoinApplication } from '../services/api';

const interests = ['Android', 'Flutter', 'Web Dev', 'Cloud', 'ML/AI', 'UI/UX', 'DevOps', 'Open Source'];

const JoinUs = () => {
  const [form, setForm] = useState({ name: '', email: '', year: '', major: '', interests: [], experience: '', message: '' });
  const [sent, setSent] = useState(false);

  const toggle = (val) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(val)
        ? prev.interests.filter((i) => i !== val)
        : [...prev.interests, val],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitJoinApplication(form);
      setSent(true);
    } catch {
      alert('Submission failed. Try again.');
    }
  };

  return (
    <div id="join">
      {/* Hero — Light Blue Tint */}
      <section style={{ background: '#f7fcd4', paddingTop: '60px', paddingBottom: '0px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', left: '50%', width: '500px', height: '250px', background: 'radial-gradient(ellipse, rgba(26,115,232,0.08) 0%, transparent 65%)', pointerEvents: 'none', transform: 'translateX(-50%)' }} />
        <div className="page-container relative z-10" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ color: 'var(--yellow-deep)' }}>THE COMMUNITY</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: 'var(--ink-900)', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '16px' }}>
            Become a <span style={{ color: 'var(--yellow-deep)' }}>Builder</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink-400)', maxWidth: '380px', margin: '0 auto' }}>
            Free to join, open to all branches and years. Start building with Google technologies.
          </p>
        </div>
      </section>

      <section className="section-wrapper" style={{ background: '#f7fcd4' }}>
        <div className="page-container" style={{ maxWidth: '600px' }}>
          {sent ? (
            <div className="neo-card" style={{ textAlign: 'center', padding: '60px', background: '#fff' }}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</p>
              <h2 className="font-display" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink-900)', marginBottom: '8px' }}>Application Sent!</h2>
              <p style={{ fontSize: '14px', color: 'var(--ink-400)' }}>We'll reach out within 2-3 days.</p>
            </div>
          ) : (
            <div className="neo-card" style={{ padding: '40px', background: '#fff' }}>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Input label="Full Name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  <Input label="Email" name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label>Current Year</Label>
                    <select value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required style={inputStyle}>
                      <option value="">Select Year</option>
                      <option>FE</option><option>SE</option><option>TE</option><option>BE</option>
                    </select>
                  </div>
                  <Input label="Branch / Major" name="major" value={form.major} onChange={(e) => setForm({ ...form, major: e.target.value })} required />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((i) => {
                      const active = form.interests.includes(i);
                      return (
                        <button type="button" key={i} onClick={() => toggle(i)} className="font-body" style={{ fontSize: '11px', padding: '6px 14px', borderRadius: '999px', border: `2.5px solid ${active ? 'var(--g-blue)' : '#eee'}`, background: active ? '#e8f0fe' : 'transparent', color: active ? 'var(--g-blue)' : 'var(--ink-400)', cursor: 'pointer', fontWeight: 800 }}>
                          {i}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <Label>How would you describe your experience?</Label>
                  <div className="flex gap-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                      <button type="button" key={lvl} onClick={() => setForm({ ...form, experience: lvl })} className="font-body" style={{ fontSize: '11px', padding: '8px 16px', borderRadius: '999px', border: `2.5px solid ${form.experience === lvl ? 'var(--g-green)' : '#eee'}`, background: form.experience === lvl ? '#e8f4ea' : 'transparent', color: form.experience === lvl ? 'var(--g-green)' : 'var(--ink-400)', cursor: 'pointer', fontWeight: 800 }}>
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn-primary-pill" style={{ width: '100%', justifyContent: 'center', background: 'var(--ink-900)', padding: '16px' }}>Submit Application</button>
              </form>
            </div>
          )}
        </div>
      </section>
      <style>{`@media (max-width: 600px) { .grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '10px',
  border: '2px solid #eee',
  fontSize: '14px',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  background: '#fff',
  transition: 'border-color 150ms ease',
};

const Label = ({ children }) => (
  <label className="font-mono" style={{ display: 'block', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink-900)', marginBottom: '8px', letterSpacing: '1px' }}>
    {children}
  </label>
);

const Input = ({ label, ...props }) => (
  <div>
    <Label>{label}</Label>
    <input style={inputStyle} {...props} />
  </div>
);

export default JoinUs;