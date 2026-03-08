import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/google_developers_logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const headerRef = useRef(null);

  const navItems = [
    { path: '/#hero', label: 'Home', id: 'hero' },
    { path: '/#about', label: 'About', id: 'about' },
    { path: '/#team', label: 'Teams', id: 'team' },
    { path: '/#events', label: 'Events', id: 'events' },
    { path: '/#projects', label: 'Projects', id: 'projects' },
    { path: '/#resources', label: 'Resources', id: 'resources' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for ScrollSpy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Target all sections that have IDs matching our nav items
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]); // Re-run if path changes (e.g. from subpage back to home)

  // Close mobile menu on hash change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.hash]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Active check for hash links (using scrollspy state)
  const isActive = (item) => {
    if (location.pathname !== '/') return false;
    return activeSection === item.id;
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300"
      style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Floating pill container — shrinks and rounds on scroll */}
      <div
        className="transition-all duration-500"
        style={{
          width: isScrolled ? 'min(860px, calc(100% - 48px))' : '100%',
          maxWidth: isScrolled ? '860px' : '100%',
          borderRadius: isScrolled ? '999px' : '0px',
          background: isScrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          border: isScrolled ? '1.5px solid rgba(0,0,0,0.08)' : '1.5px solid transparent',
          boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
          padding: isScrolled ? '0 6px' : '0 32px',
          height: isScrolled ? '48px' : '56px',
        }}
      >
        <div className="flex items-center justify-between h-full px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src={logo} alt="GDG Logo" className="w-7 h-5" />
            </div>
            <span
              className="font-display font-bold leading-tight transition-colors duration-300"
              style={{
                fontSize: isScrolled ? '15px' : '18px',
                color: 'var(--ink-900)',
              }}
            >
              GDGoC <span style={{ color: 'var(--g-blue)' }}>ZCOER</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center" style={{ gap: isScrolled ? '20px' : '28px' }}>
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className="font-body font-semibold transition-all duration-200 relative"
                  style={{
                    fontSize: isScrolled ? '12px' : '13px',
                    color: active
                      ? 'var(--g-blue)'
                      : 'var(--ink-400)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.target.style.color = 'var(--g-blue)';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.target.style.color = 'var(--ink-400)';
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block shrink-0">
            <a
              href="/#join"
              className="font-body font-bold transition-all duration-200"
              style={{
                fontSize: '11px',
                padding: isScrolled ? '7px 16px' : '9px 20px',
                borderRadius: '999px',
                background: 'var(--ink-900)',
                color: '#fff',
                textDecoration: 'none',
                border: '2px solid var(--ink-900)',
                boxShadow: '3px 3px 0px var(--g-blue)',
                display: 'inline-block',
                letterSpacing: '0.5px',
              }}
            >
              Join Community
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-0.5 transition-all duration-300 origin-center"
              style={{
                background: isMenuOpen ? '#fff' : 'var(--ink-900)',
                transform: isMenuOpen ? 'rotate(45deg) translateY(4px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: isMenuOpen ? '#fff' : 'var(--ink-900)',
                opacity: isMenuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300 origin-center"
              style={{
                background: isMenuOpen ? '#fff' : 'var(--ink-900)',
                transform: isMenuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu — Full height dark drawer */}
      <div
        className="lg:hidden fixed inset-0 top-0 transition-all duration-300"
        style={{
          background: 'var(--ink-900)',
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          zIndex: 999,
        }}
      >
        {/* Close button */}
        <div className="flex justify-end p-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-white w-10 h-10 flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 px-6 pt-8">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="font-display text-2xl font-bold transition-colors duration-200"
              style={{
                color: isActive(item) ? 'var(--g-blue)' : '#fff',
                textDecoration: 'none',
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#join"
            className="btn-yellow-pill w-full max-w-xs text-center mt-4"
            onClick={() => setIsMenuOpen(false)}
            style={{ textDecoration: 'none' }}
          >
            Join Community
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
