import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import logo from "../../assets/google_developers_logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(logoRef.current,
        { filter: 'blur(10px)', opacity: 0, x: -20 },
        { filter: 'blur(0px)', opacity: 1, x: 0, duration: 1, ease: 'expo.out' }
      )
        .fromTo('.nav-item-animate',
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out' },
          '-=0.6'
        );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/team', label: 'Team' },
    { path: '/events', label: 'Events' },
    { path: '/projects', label: 'Projects' },
    { path: '/resources', label: 'Resources' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out ${isScrolled ? 'py-4' : 'py-8'
        }`}
    >
      <div className="container-custom px-6">
        <div className={`relative flex items-center justify-between px-8 py-4 transition-all duration-700 ease-in-out border bg-slate-950/90 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.2)] border-white/10`}>

          {/* Subtle Scan-line Effect */}
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full animate-[scan_3s_infinite]"></div>
          </div>

          {/* Logo Section */}
          <Link
            to="/"
            ref={logoRef}
            className="flex items-center space-x-4 group relative z-10"
          >
            <div className="relative w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 group-hover:border-blue-500/30 transition-all duration-500 p-2 shadow-inner">
              <img src={logo} alt="GDG Logo" className="w-10 h-7 object-contain group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-poppins font-black text-xl tracking-tight leading-none text-white">
                GDG <span className="text-blue-500">On-Campus</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                ZCOER ARCHIVE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 relative z-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item-animate relative px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-500 group ${location.pathname === item.path
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                  }`}
              >
                <span className="relative z-10">{item.label}</span>
                {location.pathname === item.path && (
                  <div className={`absolute inset-0 rounded-xl transition-all duration-500 bg-white/10 shadow-inner`} />
                )}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full transition-all duration-500 group-hover:w-4 bg-blue-500"></div>
              </Link>
            ))}
          </nav>

          {/* Action Terminal */}
          <div className="hidden lg:flex items-center space-x-6 relative z-10">
            <Link
              to="/join"
              className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl active:scale-95 bg-white text-slate-950 hover:bg-blue-100 hover:shadow-blue-500/20`}
            >
              Initialize Intake
            </Link>
          </div>

          {/* Mobile Terminal Toggle */}
          <button
            className="lg:hidden relative z-[60] w-12 h-12 flex flex-col items-center justify-center space-y-1.5 rounded-2xl transition-all duration-300 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-6 h-[2px] transition-all duration-500 rounded-full bg-white ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-[2px] transition-all duration-500 rounded-full bg-white ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`w-6 h-[2px] transition-all duration-500 rounded-full bg-white ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Elite Portal */}
        <div className={`lg:hidden fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
          }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
          <div className="relative z-10 flex flex-col items-center space-y-8">
            {navItems.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-4xl font-black uppercase tracking-tighter transition-all duration-500 hover:text-blue-400 ${location.pathname === item.path ? 'text-white' : 'text-white/30'
                  }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/join"
              className="mt-12 bg-white text-slate-950 px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] active:scale-95 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Initialize Intake
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;