import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import logo from '../../assets/google_developers_logo.png';

const Footer = () => {
  const navLinks = [
    { label: 'Home', path: '/#hero' },
    { label: 'About', path: '/#about' },
    { label: 'Teams', path: '/#team' },
    { label: 'Events', path: '/#events' },
    { label: 'Projects', path: '/#projects' },
    { label: 'Resources', path: '/#resources' },
  ];

  const communityLinks = [
    { label: 'Join Community', path: '/#join' },
    { label: 'Apply for Core Team', path: '/#join' },
    { label: 'Propose a Talk', path: '/#join' },
    { label: 'Submit Project', path: '/#projects' },
    { label: 'Add Resource', path: '/#resources' },
  ];

  const programLinks = [
    { label: 'About GDGoC', url: 'https://gdg.community.dev/' },
    { label: 'Code of Conduct', url: 'https://developers.google.com/community-guidelines' },
    { label: 'Community Guidelines', url: 'https://developers.google.com/community-guidelines' },
  ];

  return (
    <footer style={{ background: 'var(--ink-900)', color: '#fff' }}>
      <div className="page-container" style={{ paddingTop: '48px', paddingBottom: '24px' }}>
        {/* Main Grid */}
        <div
          className="grid gap-10"
          style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr', marginBottom: '40px' }}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="GDGOC Logo"
                style={{ width: '40px', height: '40px', objectFit: 'contain' }}
              />
              <div>
                <p className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>
                  GDGoC <span style={{ color: 'var(--g-blue)' }}>ZCOER</span>
                </p>
                <p
                  className="font-mono"
                  style={{ fontSize: '10px', color: '#888', letterSpacing: '2px', fontWeight: 600 }}
                >
                  BUILD • CONNECT • GROW
                </p>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.6, maxWidth: '280px', marginBottom: '24px' }}>
              Building the next generation of developers and creators at Zeal College of Engineering and Research.
            </p>
            {/* Social icons */}
            <div className="flex gap-4">
              {[
                { Icon: FaLinkedin, href: 'https://linkedin.com/company/gdgoc-zcoer', color: '#0077b5' },
                { Icon: FaXTwitter, href: 'https://twitter.com/gdgoc_zcoer', color: '#fff' },
                { Icon: FaGithub, href: 'https://github.com/gdgoc-zcoer', color: '#fff' },
                { Icon: FaInstagram, href: 'https://instagram.com/gdgoc_zcoer', color: '#e4405f' }
              ].map(({ Icon, href, color }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '38px',
                    height: '38px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    color: '#888',
                    transition: 'all 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#888';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="font-mono"
              style={{
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#555',
                marginBottom: '16px',
              }}
            >
              Navigation
            </p>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path + link.label}
                  to={link.path}
                  style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#888'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <p
              className="font-mono"
              style={{
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#555',
                marginBottom: '16px',
              }}
            >
              Community
            </p>
            <div className="flex flex-col gap-2.5">
              {communityLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#888'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Program */}
          <div>
            <p
              className="font-mono"
              style={{
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#555',
                marginBottom: '16px',
              }}
            >
              Program
            </p>
            <div className="flex flex-col gap-2.5">
              {programLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#888'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '12px', color: '#555' }}>
            © {new Date().getFullYear()} GDGoC ZCOER. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" style={{ fontSize: '12px', color: '#555', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: '12px', color: '#555', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 768px) {
          footer .grid[style*="2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer >
  );
};

export default Footer;