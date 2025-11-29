import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/team', label: 'Team' },
    { path: '/events', label: 'Events' },
    { path: '/projects', label: 'Projects' },
    { path: '/resources', label: 'Resources' },
    { path: '/blog', label: 'Blog' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Header animation on load
    const tl = gsap.timeline();
    
    tl.fromTo(logoRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.nav-link',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
      '-=0.4'
    );

    // Scroll animation
    gsap.to(headerRef.current, {
      backdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      scrollTrigger: {
        trigger: document.body,
        start: '50px top',
        end: 'bottom top',
        toggleActions: 'play reverse play reverse',
      }
    });
  }, []);

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-soft py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            ref={logoRef}
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-gdg-blue to-blue-600 rounded-2xl flex items-center justify-center shadow-glow group-hover:shadow-lg transition-all duration-300">
                <div className="flex text-white font-bold text-lg">
                  <span>G</span>
                  <span className="text-gdg-red">D</span>
                  <span className="text-gdg-yellow">G</span>
                </div>
              </div>
              <div className="absolute -inset-1 bg-gdg-blue rounded-2xl opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-poppins font-bold text-xl text-dark-gray leading-tight">GDG On-Campus</span>
              <span className="text-xs text-medium-gray font-medium">Google Developer Group</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                  location.pathname === item.path 
                    ? 'text-gdg-blue bg-blue-50 shadow-sm' 
                    : 'text-medium-gray hover:text-gdg-blue hover:bg-gray-50'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {location.pathname === item.path && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gdg-blue/10 to-blue-600/10 rounded-xl"></div>
                )}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gdg-blue rounded-full group-hover:w-3/4 transition-all duration-300"></div>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/join"
              className="bg-gradient-to-r from-gdg-blue to-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-glow hover:scale-105 transform transition-all duration-300 shadow-md"
            >
              Join Community
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden flex flex-col space-y-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`w-6 h-0.5 bg-dark-gray transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-dark-gray transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`w-6 h-0.5 bg-dark-gray transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-large transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="flex flex-col space-y-1 py-4 px-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  location.pathname === item.path 
                    ? 'text-gdg-blue bg-blue-50 shadow-sm' 
                    : 'text-medium-gray hover:text-gdg-blue hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/join"
              className="bg-gradient-to-r from-gdg-blue to-blue-600 text-white px-4 py-3 rounded-xl font-medium text-center mt-2 shadow-md hover:shadow-glow transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;