import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from "../../assets/google_developers_logo.png";

const Footer = () => {
  const footerRef = useRef(null);

  const socialLinks = [
    {
      name: 'GitHub',
      img: '/images/GitHub-Symbol.png',
      url: 'https://github.com/gdgoc-zcoer',
      color: 'hover:bg-slate-100 hover:border-slate-300'
    },
    {
      name: 'LinkedIn',
      img: '/images/linkedin-logo.jpg',
      url: 'https://linkedin.com/company/gdgoc-zcoer',
      color: 'hover:bg-blue-50 hover:border-blue-200'
    },
    {
      name: 'Twitter',
      img: '/images/twitter.webp',
      url: 'https://twitter.com/gdgoc.zcoer',
      color: 'hover:bg-slate-50 hover:border-slate-200'
    },
    {
      name: 'Discord',
      img: '/images/discord.jpg',
      url: 'https://discord.gg/gdg',
      color: 'hover:bg-indigo-50 hover:border-indigo-200'
    },
  ];

  const quickLinks = [
    { name: 'Events Archive', path: '/events' },
    { name: 'Projects Index', path: '/projects' },
    { name: 'Knowledge Hub', path: '/resources' },
    { name: 'Editorial Studio', path: '/blog' },
    { name: 'Core Team', path: '/team' },
    { name: 'Mission Intake', path: '/join' },
    { name: 'Admin Terminal', path: '/admin' }
  ];

  const supportLinks = [
    { name: 'Contact Protocol', path: '/contact' },
    { name: 'Code of Conduct', path: '/about#conduct' },
    { name: 'Privacy Matrix', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Footer Reveal Stagger
      gsap.fromTo('.footer-animate',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%'
          }
        }
      );

      // Social Link Pop
      gsap.fromTo('.social-animate',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.social-container',
            start: 'top 95%'
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-white text-slate-900 relative overflow-hidden pt-32 pb-12 border-t border-slate-100"
    >
      {/* Cinematic Background Architecture (Light Theme) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-400/5 rounded-full blur-[140px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-white"></div>
      </div>

      <div className="container-custom relative z-10 px-6 lg:px-12">
        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-32">

          {/* Brand Dossier Section */}
          <div className="footer-animate lg:col-span-1">
            <div className="flex items-center space-x-4 mb-10">
              <div className="w-14 h-14 bg-white rounded-2xl border border-slate-100 flex items-center justify-center p-3 shadow-sm group transition-all duration-500 hover:border-blue-500/30">
                <img src={logo} alt="GDG Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-black text-2xl tracking-tighter leading-none text-slate-900">
                  GDG <span className="text-blue-600">On-Campus</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                  RECRUITMENT ARCHIVE
                </span>
              </div>
            </div>
            <p className="text-slate-500 text-lg leading-relaxed mb-12 font-medium border-l-2 border-blue-500/10 pl-8">
              Empowering student architects through workshops, study jams, and communal technical sprints. Connect with the cluster.
            </p>

            {/* Social Link Terminal Cards */}
            <div className="flex flex-wrap gap-4 social-container">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-animate group relative w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-slate-100 transition-all duration-500 ${item.color} shadow-sm active:scale-95 overflow-hidden`}
                  title={item.name}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-7 h-7 object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute -inset-1 bg-slate-950/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Matrix */}
          <div className="footer-animate">
            <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-blue-600 mb-10 italic">Core / Archive</h4>
            <div className="grid grid-cols-1 gap-5">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="group flex items-center space-x-4 text-slate-500 hover:text-slate-900 transition-all duration-500 font-medium"
                >
                  <div className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:scale-[3] group-hover:opacity-100 transition-all duration-500"></div>
                  <span className="font-black text-[12px] uppercase tracking-widest leading-none">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Operational Support */}
          <div className="footer-animate">
            <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-blue-600 mb-10 italic">Support / Protocols</h4>
            <div className="grid grid-cols-1 gap-5">
              {supportLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="group flex items-center space-x-4 text-slate-500 hover:text-slate-900 transition-all duration-500 font-medium"
                >
                  <div className="w-1 h-1 bg-slate-200 rounded-full group-hover:bg-teal-500 transition-colors duration-500"></div>
                  <span className="font-black text-[11px] uppercase tracking-widest leading-none">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Terminal Profile */}
          <div className="footer-animate">
            <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-blue-600 mb-10 italic">Location / Intel</h4>
            <div className="space-y-10">
              <div className="group space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Comm:</div>
                <div className="text-slate-900 font-black text-sm group-hover:text-blue-600 transition-colors">GDGOC.ZCOER@ZEALEDUCATION.COM</div>
              </div>
              <div className="group space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Geospatial Coordinates:</div>
                <div className="text-slate-600 font-medium text-sm leading-relaxed">
                  Zeal College of Engineering & Research<br />
                  Narhe, Pune / <span className="text-blue-600 font-bold">HQ-01</span>
                </div>
              </div>
              <div className="group space-y-3 pt-6 border-t border-slate-100">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-600">System Live</span>
                </div>
                <div className="text-slate-400 text-[10px] font-bold italic">Node Connection: Every Sunday @ 20:00 - 21:00 IST</div>
              </div>
            </div>
          </div>
        </div>

        {/* Industrial Sub-footer Metadata */}
        <div className="border-t border-slate-100 pt-16 mt-32">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em] flex items-center space-x-8">
              <span>GDG-ARCHIVE-PUNE-2024</span>
              <span className="hidden md:inline w-1 h-1 bg-slate-200 rounded-full"></span>
              <span className="hidden md:inline italic">ALL OPERATIONAL RIGHTS RESERVED</span>
            </div>

            <div className="flex items-center space-x-8 text-slate-300 text-[10px] font-black uppercase tracking-widest">
              <span>VER: 4.1.0-STABLE</span>
              <div className="flex items-center space-x-3 text-blue-400">
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                <span>SECURE CONNECTION</span>
              </div>
            </div>

            <div className="max-w-[320px] text-center md:text-right text-slate-200 text-[8px] font-bold uppercase tracking-widest leading-relaxed">
              Google Developer Groups are independent entities. activities and opinions are not necessarily endorsed by the main infrastructure.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;