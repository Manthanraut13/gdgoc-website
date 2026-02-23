import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getEvents } from '../../services/api';

const FeaturedEvents = () => {
  const sectionRef = useRef(null);
  const eventsRef = useRef([]);
  const spotlightRef = useRef(null);
  const magneticCtaRef = useRef(null);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        setLoading(true);
        const res = await getEvents();
        const allEvents = res.data?.data || [];
        const filteredPastEvents = allEvents
          .filter(e => e.status === 'past')
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);

        setPastEvents(filteredPastEvents);
      } catch (err) {
        console.error("Failed to fetch past events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPastEvents();

    gsap.registerPlugin(ScrollTrigger);

    // Section header animation
    gsap.fromTo('.section-header-reveal',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Interactive Spotlight Logic
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      gsap.to(spotlightRef.current, {
        x,
        y,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Magnetic effect for CTA
      if (magneticCtaRef.current) {
        const ctaRect = magneticCtaRef.current.getBoundingClientRect();
        const ctaCenterX = ctaRect.left + ctaRect.width / 2;
        const ctaCenterY = ctaRect.top + ctaRect.height / 2;
        const dist = Math.hypot(clientX - ctaCenterX, clientY - ctaCenterY);

        if (dist < 150) {
          const moveX = (clientX - ctaCenterX) * 0.4;
          const moveY = (clientY - ctaCenterY) * 0.4;
          gsap.to(magneticCtaRef.current, {
            x: moveX,
            y: moveY,
            scale: 1.05,
            duration: 0.4,
            ease: 'power2.out'
          });
        } else {
          gsap.to(magneticCtaRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
          });
        }
      }

      // Parallax for background icons
      const xPos = (clientX / window.innerWidth - 0.5) * 2;
      const yPos = (clientY / window.innerHeight - 0.5) * 2;
      gsap.to('.fe-bg-icon', {
        x: xPos * 50,
        y: yPos * 50,
        duration: 2.5,
        ease: 'power2.out',
        stagger: 0.1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);

  }, []);

  const addToEventsRef = (el) => {
    if (el && !eventsRef.current.includes(el)) {
      eventsRef.current.push(el);
    }
  };

  const handleCardMouseMove = (e, cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (e.clientY - centerY) * 0.05;
    const rotateY = (centerX - e.clientX) * 0.05;

    gsap.to(cardEl, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const handleCardMouseLeave = (cardEl) => {
    if (!cardEl) return;
    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)'
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-slate-950 relative overflow-hidden group/fe"
    >
      {/* Cinematic Background Layering */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gdg-red/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-gdg-blue/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Interactive Spotlight */}
        <div
          ref={spotlightRef}
          className="absolute -top-[500px] -left-[500px] w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(66,133,244,0.1),transparent_70%)] opacity-0 group-hover/fe:opacity-100 transition-opacity duration-1000"
        ></div>

        {/* Global Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:200px_200px] opacity-20"></div>

        {/* Floating Geometric Icons */}
        {[
          { icon: '✕', top: '10%', left: '5%' },
          { icon: '○', top: '20%', right: '10%' },
          { icon: '</>', bottom: '15%', left: '15%' },
          { icon: '◆', bottom: '30%', right: '20%' }
        ].map((item, i) => (
          <div key={i} className="fe-bg-icon absolute text-white/5 text-4xl font-black">{item.icon}</div>
        ))}

        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>
      </div>

      <div className="container-custom relative z-10 w-full px-6">
        {/* Section Header */}
        <div className="section-header-reveal text-center mb-24">
          <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-2xl px-6 py-2.5 rounded-full border border-white/10 mb-8 shadow-2xl group cursor-default">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gdg-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gdg-red"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gdg-red opacity-70 group-hover:opacity-100 transition-opacity">Recent Highlights</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-poppins font-black text-white mb-8 leading-[1.05] tracking-tight">
            Our Legacy <br />
            <span className="bg-gradient-to-r from-gdg-red via-orange-500 to-yellow-500 bg-clip-text text-transparent italic drop-shadow-2xl">Of Impact.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium opacity-70">
            Relive our most transformative experiences and witness the growth of Pune's most active tech community.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 perspective-2000">
          {loading ? (
            <div className="col-span-full text-center py-20 flex flex-col items-center">
              <div className="w-16 h-16 border-2 border-gdg-blue border-t-transparent rounded-full animate-spin mb-6 shadow-glow"></div>
              <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Synchronizing Archive...</p>
            </div>
          ) : pastEvents.length > 0 ? (
            pastEvents.map((event, index) => (
              <div
                key={event._id || event.id}
                ref={addToEventsRef}
                onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
                className="group relative h-full transform-gpu transition-all duration-300"
              >
                <Link to={`/events/${event._id || event.id}`} className="block h-full relative bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all duration-700 overflow-hidden flex flex-col shadow-2xl hover:shadow-[0_80px_100px_rgba(0,0,0,0.4)]">

                  {/* Event Visual Container */}
                  <div className="relative h-64 overflow-hidden">
                    {event.image ? (
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out grayscale-[0.3] group-hover:grayscale-0" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                    {/* Meta Badge */}
                    <div className="absolute top-6 left-6 flex items-center space-x-2">
                      <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] flex items-center shadow-2xl">
                        <span className="w-1 h-1 bg-gdg-green rounded-full mr-2 animate-pulse"></span>
                        Completed
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-10 flex-grow flex flex-col relative z-20">
                    <div className="flex items-center space-x-3 mb-6">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{event.category || event.type}</span>
                      <div className="w-1 h-1 bg-white/10 rounded-full"></div>
                      <span className="text-[10px] font-black text-gdg-blue uppercase tracking-[0.2em]">{new Date(event.date).toLocaleDateString()}</span>
                    </div>

                    <h3 className="text-3xl font-black text-white mb-6 font-poppins leading-tight tracking-tight group-hover:text-gdg-red transition-colors duration-500">
                      {event.title}
                    </h3>

                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                      {event.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 group-hover:bg-white/10 transition-all">
                        View Recap
                      </div>
                      {event.attendees && (
                        <div className="flex -space-x-3 overflow-hidden">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-500">
                              {i}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Interactive Glint Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] skew-x-[-20deg]"></div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white/[0.01] rounded-[3rem] border border-white/5">
              <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">No entries found in archive.</p>
            </div>
          )}
        </div>

        {/* Global Action CTA */}
        <div className="text-center group/cta-container">
          <div ref={magneticCtaRef} className="inline-block">
            <Link
              to="/events"
              className="relative group inline-flex items-center space-x-6 bg-white text-dark-gray px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-[0_30px_60px_rgba(255,255,255,0.1)] hover:shadow-glow transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10">Explore Full Timeline</span>
              <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center text-white relative z-10 group-hover:rotate-45 transition-transform duration-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;