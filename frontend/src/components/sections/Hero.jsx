import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { getEvents } from '../../services/api';
import android from "../../assets/tech/android-logo.png";
import cloud from "../../assets/tech/cloud-logo.png";
import firebase from "../../assets/tech/firebase-logo.png";
import flutter from "../../assets/tech/flutter.png";

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  const magneticButtonRef = useRef(null);
  const [nextEvent, setNextEvent] = useState(null);

  // Split text for animation
  const splitText = (text) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block relative overflow-hidden mr-[0.2em] last:mr-0">
        <span className="inline-block translate-y-full opacity-0 word-anim">
          {word}
        </span>
      </span>
    ));
  };

  useEffect(() => {
    const fetchNextEvent = async () => {
      try {
        const res = await getEvents();
        const allEvents = res.data?.data || [];
        const upcomingEvents = allEvents
          .filter(e => e.status === 'upcoming')
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (upcomingEvents.length > 0) {
          setNextEvent(upcomingEvents[0]);
        }
      } catch (err) {
        console.error("Failed to fetch next event:", err);
      }
    };

    fetchNextEvent();

    const tl = gsap.timeline();

    // Background elements initial animation
    tl.fromTo('.hero-bg-element',
      { scale: 0, opacity: 0, rotation: -180 },
      { scale: 1, opacity: 0.08, rotation: 0, duration: 1.5, stagger: 0.2, ease: 'back.out(1.7)' }
    );

    // Word reveal animation
    tl.to('.word-anim', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'expo.out'
    }, '-=0.5')
      .fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 0.7, duration: 1.2, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo('.hero-buttons-container',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.8'
      );

    // Continuous floating animation
    gsap.to('.hero-bg-element', {
      y: '+=20',
      rotation: '+=3',
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 2
    });

    // Mouse Move Logic (Parallax + Magnetic + Tilt)
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 2;
      const yPos = (clientY / window.innerHeight - 0.5) * 2;

      // Parallax Layers
      gsap.to('.hero-bg-element', {
        x: xPos * 40,
        y: yPos * 40,
        duration: 2.5,
        ease: 'power2.out',
        stagger: 0.05
      });

      gsap.to('.hero-icon-layer', {
        x: xPos * 80,
        y: yPos * 80,
        duration: 3,
        ease: 'power3.out',
        stagger: 0.1
      });

      // Magnetic Effect for Button
      if (magneticButtonRef.current) {
        const btnRect = magneticButtonRef.current.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;
        const dist = Math.hypot(clientX - btnCenterX, clientY - btnCenterY);

        if (dist < 120) {
          const moveX = (clientX - btnCenterX) * 0.35;
          const moveY = (clientY - btnCenterY) * 0.35;
          gsap.to(magneticButtonRef.current, {
            x: moveX,
            y: moveY,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out'
          });
        } else {
          gsap.to(magneticButtonRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)'
          });
        }
      }

      // Smooth 3D Tilt Effect for Card
      if (visualRef.current) {
        const rect = visualRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateX = (clientY - centerY) * 0.015;
        const rotateY = (centerX - clientX) * 0.015;

        gsap.to('.hero-main-card', {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.8,
          ease: 'power3.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-[90vh] lg:min-h-screen relative overflow-hidden bg-white flex items-center justify-center pt-28 pb-20"
    >
      {/* Subtle Grain Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-[1]" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>

      {/* Background Depth Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-bg-element absolute top-1/4 -left-20 w-[60rem] h-[60rem] bg-gdg-blue/5 rounded-full blur-[160px]"></div>
        <div className="hero-bg-element absolute -bottom-40 -right-20 w-[50rem] h-[50rem] bg-gdg-red/5 rounded-full blur-[140px]"></div>

        {/* Subtle Geometric Icons */}
        {[
          { icon: '✕', top: '15%', left: '8%', size: 'text-2xl' },
          { icon: '○', top: '25%', right: '12%', size: 'text-4xl' },
          { icon: '</>', bottom: '20%', left: '18%', size: 'text-xl' },
          { icon: '{ }', top: '65%', right: '10%', size: 'text-3xl' }
        ].map((item, i) => (
          <div key={i} className={`hero-icon-layer absolute text-dark-gray/3 font-black ${item.size}`} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}>
            {item.icon}
          </div>
        ))}

        {/* Minimal Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#f1f5f9_2px,transparent_2px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] opacity-40"></div>
      </div>

      <div className="container-custom relative z-10 w-full px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left Content Column */}
          <div ref={contentRef} className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center space-x-3 bg-slate-50 border border-slate-100 rounded-full px-5 py-2 mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gdg-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gdg-green"></span>
              </span>
              <span className="text-[9px] font-bold text-dark-gray tracking-[0.3em] uppercase opacity-50">Developing The Future</span>
            </div>

            <h1 className="hero-title text-5xl md:text-7xl lg:text-[5.5rem] font-poppins font-extrabold text-dark-gray mb-10 leading-[1.05] tracking-tight">
              <div className="block">
                {splitText("Google Developer Group")}
              </div>
              <div className="block mt-1">
                <span className="text-gdg-blue italic">
                  {splitText("ZCOER")}
                </span>
              </div>
            </h1>

            <p className="hero-subtitle text-lg md:text-xl text-medium-gray mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium opacity-70">
              Where innovation meets community. Join the most active developer tribe in the region and ship what matters.
            </p>

            <div className="hero-buttons-container flex flex-wrap gap-6 justify-center lg:justify-start items-center">
              <div ref={magneticButtonRef}>
                <Link
                  to="/join"
                  className="group relative bg-dark-gray text-white px-10 py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-xl hover:shadow-glow transition-all duration-300 block overflow-hidden"
                >
                  <span className="relative z-10 inline-block group-hover:scale-105 transition-transform">Get Started Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gdg-blue to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </div>
              <Link
                to="/events"
                className="group flex items-center space-x-4 text-dark-gray font-bold text-[11px] uppercase tracking-[0.2em] hover:text-gdg-blue transition-colors py-4 px-2"
              >
                <span>Browse Events</span>
                <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-50 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </Link>
            </div>

            {/* Subtle Trust Bar */}
            <div className="flex flex-wrap gap-10 mt-20 justify-center lg:justify-start border-t border-slate-50 pt-10">
              {[
                { number: '500+', label: 'Innovators' },
                { number: '50+', label: 'Sessions' },
                { number: '25+', label: 'Products' }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-extrabold text-dark-gray mb-0.5 font-poppins">{stat.number}</div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Column */}
          <div ref={visualRef} className="perspective-2000 order-1 lg:order-2">
            <div className="hero-main-card relative w-full max-w-[32rem] mx-auto transition-transform duration-300 transform-gpu">

              {/* Premium Cinematic Dark Container */}
              <div className="bg-slate-950/95 backdrop-blur-3xl rounded-[3rem] p-10 md:p-14 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden group/container">

                {/* Background Glows */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-gdg-blue/20 rounded-full blur-[100px] pointer-events-none group-hover/container:bg-gdg-blue/30 transition-all duration-1000"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gdg-red/10 rounded-full blur-[100px] pointer-events-none group-hover/container:bg-gdg-red/20 transition-all duration-1000"></div>

                {/* Refined Tech Grid */}
                <div className="grid grid-cols-2 gap-6 mb-12 relative z-10">
                  {[
                    { name: 'Android', img: android },
                    { name: 'Flutter', img: flutter },
                    { name: 'Cloud', img: cloud },
                    { name: 'Firebase', img: firebase }
                  ].map((tech, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-md rounded-[2rem] p-6 text-center border border-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-glow transition-all duration-500 group/item">
                      <img
                        src={tech.img}
                        alt={tech.name}
                        className={`mx-auto mb-4 grayscale group-hover/item:grayscale-0 group-hover/item:scale-110 transition-all duration-700 h-10 w-auto object-contain brightness-110 ${tech.name === 'Cloud' ? 'h-11' : ''}`}
                      />
                      <div className="font-bold text-white text-[8px] uppercase tracking-[0.4em] opacity-40 group-hover/item:opacity-80 transition-opacity">
                        {tech.name}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Redesigned Upcoming Event Card (Frosted Dark) */}
                {nextEvent ? (
                  <Link
                    to={`/events/${nextEvent._id || nextEvent.id}`}
                    className="block relative group/event overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20"
                  >
                    <div className="p-10 relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]"></span>
                          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-blue-300">Live Intel</span>
                        </div>
                        <div className="bg-white/10 border border-white/10 px-3 py-1 rounded-full text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">
                          New
                        </div>
                      </div>

                      <h3 className="text-3xl font-black text-white mb-6 line-clamp-1 group-hover/event:text-blue-400 transition-colors font-poppins tracking-tighter">
                        {nextEvent.title}
                      </h3>

                      <div className="flex items-center space-x-6">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-1">Timeline</span>
                          <span className="text-[12px] font-bold text-slate-300 tracking-tight">
                            {new Date(nextEvent.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
                          </span>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10"></div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-1">Protocol</span>
                          <span className="text-[12px] font-bold text-green-400 uppercase tracking-[0.1em]">Engaged</span>
                        </div>
                      </div>
                    </div>

                    {/* Premium Card Shine */}
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover/event:translate-x-full transition-transform duration-[1500ms] skew-x-[-25deg]"></div>
                  </Link>
                ) : (
                  <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] text-center border border-white/5">
                    <div className="text-lg font-black text-white mb-2 opacity-60 font-poppins tracking-tight">Scanning Uplink</div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Ready State Initialized</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;