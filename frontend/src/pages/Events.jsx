import React, { useEffect, useRef, useState } from 'react';
import { getEvents } from '../services/api';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState({ upcoming: [], past: [] });

  const pageRef = useRef(null);
  const spotlightRef = useRef(null);
  const modalRef = useRef(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const res = await getEvents();
      const allEvents = res.data?.data || [];
      const upcoming = allEvents.filter(e => e.status === 'upcoming');
      const past = allEvents.filter(e => e.status === 'past');
      setEvents({ upcoming, past });
    } catch (err) {
      console.error("Fetch Events Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const categories = [
    { key: 'all', label: 'All Protocols', icon: '🎯' },
    { key: 'mobile', label: 'Mobile Engineering', icon: '📱' },
    { key: 'web', label: 'Web Architecture', icon: '🌐' },
    { key: 'cloud', label: 'Cloud Systems', icon: '☁️' },
    { key: 'ai-ml', label: 'Intelligence Layer', icon: '🧠' }
  ];

  const eventTypes = [
    { key: 'upcoming', label: 'Current Timeline', count: events.upcoming.length },
    { key: 'past', label: 'Archived Logs', count: events.past.length }
  ];

  const filteredEvents = (events[activeTab] || []).filter(event =>
    selectedCategory === 'all' || event.category === selectedCategory
  );

  const splitText = (text) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block relative overflow-hidden mr-[0.25em] last:mr-0">
        <span className="inline-block translate-y-full opacity-0 event-word-anim">
          {word}
        </span>
      </span>
    ));
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.event-word-anim', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'expo.out'
    });

    gsap.fromTo('.event-hero-sub',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 0.8, duration: 1.5, ease: 'power3.out', delay: 0.2 }
    );

    const handleMouseMove = (e) => {
      if (!spotlightRef.current) return;
      gsap.to(spotlightRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 1,
        ease: 'power2.out'
      });

      const xPos = (e.clientX / window.innerWidth - 0.5);
      const yPos = (e.clientY / window.innerHeight - 0.5);
      gsap.to('.event-parallax', {
        x: xPos * 50,
        y: yPos * 50,
        duration: 2.5,
        ease: 'power2.out',
        stagger: 0.1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo('.event-card-reveal',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.event-grid-container',
            start: 'top 90%'
          }
        }
      );
    }
  }, [activeTab, selectedCategory, loading]);

  const handleCardTilt = (e, cardEl) => {
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rX = (y - rect.height / 2) * 0.05;
    const rY = (rect.width / 2 - x) * 0.05;
    gsap.to(cardEl, { rotateX: rX, rotateY: rY, duration: 0.6, ease: 'power2.out' });
  };

  const resetCardTilt = (cardEl) => {
    gsap.to(cardEl, { rotateX: 0, rotateY: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)' });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      ease: 'power4.in',
      onComplete: () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
        document.body.style.overflow = 'auto';
      }
    });
  };

  return (
    <div ref={pageRef} className="page-wrapper bg-white selection:bg-gdg-blue/20 overflow-hidden">

      {/* Global Interactive Elements */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div
          ref={spotlightRef}
          className="absolute -top-[500px] -left-[500px] w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(66,133,244,0.08),transparent_70%)] opacity-0 lg:opacity-100"
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      {/* Hero Section (Dark Theme) */}
      <section className="min-h-[75vh] bg-slate-950 flex items-center relative pt-20 pb-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gdg-blue/20 rounded-full blur-[160px] event-parallax translate-x-[-15%]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gdg-green/20 rounded-full blur-[160px] event-parallax translate-x-[15%]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay"></div>
          <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-slate-950 to-transparent"></div>
        </div>

        <div className="container-custom relative z-10 w-full px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-3xl px-8 py-3.5 rounded-full border border-white/20 mb-14 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.8)]"></span>
              <span className="text-[12px] font-black uppercase tracking-[0.6em] text-blue-200">System Logs / Events</span>
            </div>

            <h1 className="text-6xl md:text-[9.5rem] font-poppins font-black text-white leading-[0.85] tracking-tight mb-14">
              {splitText("Experience The Pulse.")}
            </h1>
          </div>
        </div>
      </section>

      {/* Events Grid (Light Theme) */}
      <section className="section-padding bg-slate-50 relative z-20 -mt-32 rounded-t-[5rem] md:rounded-t-[8rem] shadow-[0_-60px_120px_rgba(0,0,0,0.2)] reveal-filters border-t border-white/20">
        <div className="container-custom w-full px-6 lg:px-12">

          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-32 max-w-7xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl p-2.5 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-slate-200/50 flex items-center">
              {eventTypes.map((type) => (
                <button
                  key={type.key}
                  onClick={() => setActiveTab(type.key)}
                  className={`px-12 py-5 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.3em] transition-all duration-700 flex items-center space-x-4 ${activeTab === type.key
                    ? 'bg-slate-950 text-white shadow-[0_20px_40px_rgba(0,0,0,0.3)] scale-[1.05]'
                    : 'text-slate-500 hover:text-slate-950 hover:bg-slate-100'
                    }`}
                >
                  <span>{type.label}</span>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black ${activeTab === type.key ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-900'}`}>
                    {type.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-5">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-8 py-4.5 rounded-[2rem] font-bold text-sm flex items-center space-x-3 transition-all duration-700 group border h-16 ${selectedCategory === cat.key
                    ? 'bg-slate-950 text-white border-slate-950 shadow-2xl scale-110'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400 shadow-sm'
                    }`}
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform">{cat.icon}</span>
                  <span className="tracking-widest uppercase text-[11px] font-black">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-56">
              <div className="relative w-28 h-28">
                <div className="absolute inset-0 border-8 border-slate-100 rounded-full"></div>
                <div className="absolute inset-0 border-8 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-14 text-slate-950 font-black tracking-[0.5em] uppercase text-xs animate-pulse">Establishing Connection...</p>
            </div>
          ) : (
            <div className="event-grid-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
              {filteredEvents.map((event, idx) => (
                <div
                  key={event._id || event.id}
                  className="event-card-reveal group perspective-3000"
                  onMouseMove={(e) => handleCardTilt(e, e.currentTarget)}
                  onMouseLeave={(e) => resetCardTilt(e.currentTarget)}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="bg-white rounded-[5rem] border border-slate-200 shadow-[0_50px_100px_rgba(0,0,0,0.05)] hover:shadow-[0_100px_150px_rgba(0,0,0,0.12)] transition-all duration-1000 overflow-hidden transform-gpu h-full flex flex-col cursor-pointer relative group-hover:border-slate-300 group-hover:-translate-y-4">

                    <div className="relative h-80 lg:h-[30rem] overflow-hidden bg-slate-100 border-b border-slate-50">
                      {event.image ? (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover grayscale-[0.05] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 font-black text-3xl italic uppercase tracking-tighter">
                          Legacy Asset
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>

                      <div className="absolute top-10 right-10 flex gap-4">
                        <span className="bg-white/95 backdrop-blur-3xl px-6 py-3 rounded-full text-[12px] font-black text-slate-950 uppercase tracking-widest shadow-2xl transition-transform group-hover:scale-110">
                          {event.type}
                        </span>
                      </div>

                      <div className="absolute bottom-10 left-10 flex items-center space-x-5">
                        <div className="bg-white/95 px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 transform -rotate-3 group-hover:rotate-0 transition-all">
                          <span className="text-xl">📅</span>
                          <span className="text-[12px] font-black text-slate-950">{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-14 lg:p-16 flex-grow flex flex-col bg-white">
                      <div className="flex items-center space-x-4 mb-8">
                        <span className="w-8 h-[2px] bg-slate-200"></span>
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">{event.category || 'Engineering'}</span>
                      </div>

                      <h3 className="text-4xl lg:text-5xl font-poppins font-black text-slate-950 leading-[1.1] mb-10 tracking-tighter group-hover:text-blue-600 transition-colors duration-500">
                        {event.title}
                      </h3>

                      <p className="text-slate-700 text-lg leading-relaxed mb-12 font-medium opacity-80 line-clamp-3">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-16">
                        {event.tags?.map((tag, i) => (
                          <span key={i} className="text-[11px] font-black text-slate-950 uppercase tracking-[0.2em] px-6 py-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100 transition-colors">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-12 border-t border-slate-100">
                        {event.status === 'upcoming' ? (
                          <div className="flex-1 mr-16">
                            <div className="flex justify-between text-[12px] font-black text-slate-950 uppercase tracking-[0.3em] mb-5 font-poppins">
                              <span>Protocol Load</span>
                              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">{event.registered}/{event.seats}</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                              <div
                                className="h-full bg-slate-950 shadow-[0_0_25px_rgba(0,0,0,0.5)] transition-all duration-1000"
                                style={{ width: `${(event.registered / event.seats) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-12 text-[12px] font-black text-slate-900 uppercase tracking-[0.3em]">
                            <div className="flex items-center space-x-4">
                              <span className="text-3xl">👥</span>
                              <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400">Total Reach</span>
                                <span>{event.attendees} Engineers</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="text-3xl">⭐</span>
                              <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400">Feedback</span>
                                <span>{event.rating}/10</span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="w-20 h-20 rounded-[2.5rem] bg-slate-950 group-hover:bg-blue-600 flex items-center justify-center text-white transition-all duration-700 group-hover:rotate-45 shadow-[0_20px_40px_rgba(0,0,0,0.2)] group-hover:shadow-[0_30px_60px_rgba(37,99,235,0.4)]">
                          <span className="text-4xl">↗</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal: The Intelligence Dossier */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10 overflow-hidden">
          <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-3xl" onClick={closeModal}></div>
          <div
            ref={modalRef}
            className="bg-white w-full max-w-5xl h-full max-h-[85vh] overflow-y-auto rounded-[4rem] shadow-[0_80px_150px_rgba(0,0,0,0.7)] relative z-10 custom-scrollbar transform-gpu border border-white/10"
          >
            <div className="flex flex-col min-h-full">

              {/* Cinematic Header Asset */}
              <div className="relative h-[45vh] md:h-[55vh] bg-slate-100 overflow-hidden">
                <img
                  src={(selectedEvent.images && selectedEvent.images[currentImageIndex]) || selectedEvent.image}
                  alt="Session Visualization"
                  className="w-full h-full object-cover"
                />

                {selectedEvent.images?.length > 1 && (
                  <div className="absolute inset-x-8 bottom-8 flex justify-between items-center bg-slate-900/40 backdrop-blur-2xl rounded-3xl px-8 py-5 border border-white/10 shadow-2xl">
                    <div className="flex space-x-3">
                      {selectedEvent.images.map((_, i) => (
                        <div
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                          className={`h-2 rounded-full transition-all duration-700 cursor-pointer ${currentImageIndex === i ? 'w-12 bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)]' : 'w-3 bg-white/30 hover:bg-white/50'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Unit {currentImageIndex + 1} / {selectedEvent.images.length}</span>
                  </div>
                )}

                <button onClick={closeModal} className="absolute top-8 right-8 w-14 h-14 rounded-full bg-slate-950 text-white flex items-center justify-center text-2xl hover:rotate-90 hover:bg-blue-600 transition-all duration-700 shadow-3xl group z-50">
                  <span className="group-hover:scale-125 transition-transform">✕</span>
                </button>

                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              </div>

              {/* Intelligence Reading Section */}
              <div className="p-10 md:p-16 lg:p-20 flex flex-col bg-white -mt-20 relative z-10 rounded-t-[4rem]">
                <div className="flex flex-wrap gap-4 mb-12">
                  <div className="flex items-center space-x-3 bg-slate-950 px-6 py-3 rounded-xl shadow-xl">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">{selectedEvent.type}</span>
                  </div>
                  <div className={`px-6 py-3 rounded-xl border-2 font-black text-[10px] uppercase tracking-[0.5em] shadow-lg ${selectedEvent.status === 'upcoming' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    {selectedEvent.status === 'upcoming' ? 'Status: Active' : 'Status: Vaulted'}
                  </div>
                </div>

                <h2 className="text-4xl md:text-6xl font-poppins font-black text-slate-950 mb-12 leading-[1.05] tracking-tighter drop-shadow-sm">
                  {selectedEvent.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-12 border-y border-slate-100 mb-12">
                  <div className="space-y-3">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Staging Date</div>
                    <div className="text-slate-950 text-xl font-black tracking-tight">{new Date(selectedEvent.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Session Window</div>
                    <div className="text-slate-950 text-xl font-black tracking-tight">{selectedEvent.time}</div>
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-3">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Operational Hub</div>
                    <div className="flex items-center text-slate-950 text-xl font-black tracking-tight bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <span className="mr-4 text-3xl">📍</span>
                      {selectedEvent.location}
                    </div>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none mb-12 flex-grow">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="h-[2px] w-10 bg-slate-950"></div>
                    <h4 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.5em] m-0">Event Summary</h4>
                  </div>
                  <p className="text-slate-800 text-lg md:text-xl leading-relaxed font-bold opacity-80 mb-12">
                    {selectedEvent.detailedDescription || selectedEvent.description}
                  </p>

                  {selectedEvent.requirements?.length > 0 && (
                    <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-inner">
                      <h4 className="text-[12px] font-black text-slate-950 uppercase tracking-[0.5em] mb-8 flex items-center">
                        <span className="w-3 h-3 bg-blue-600 rounded-full mr-4 shadow-glow"></span>
                        Operational Matrix
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedEvent.requirements.map((req, i) => (
                          <div key={i} className="flex items-start space-x-4 text-slate-950 font-black text-[13px] uppercase tracking-tight">
                            <span className="text-blue-600 text-xl font-serif">→</span>
                            <span className="mt-1">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-12 border-t border-slate-100">
                  {selectedEvent.status === 'upcoming' ? (
                    <a href={selectedEvent.registrationLink} target="_blank" rel="noopener noreferrer" className="block transform transition-all hover:scale-[1.02] active:scale-[0.98]">
                      <button className="w-full bg-slate-950 text-white py-8 rounded-[2rem] font-black text-xs uppercase tracking-[0.6em] hover:bg-blue-600 transition-all shadow-2xl hover:shadow-blue-600/30">
                        Initiate Uplink
                      </button>
                    </a>
                  ) : (
                    <button disabled className="w-full bg-slate-100 text-slate-400 py-8 rounded-[2rem] font-black text-xs uppercase tracking-[0.6em] cursor-not-allowed border-2 border-slate-200">
                      Log Entry Suspended
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer CTA (Dark Theme) */}
      <section className="section-padding bg-slate-950 relative overflow-hidden reveal-cta">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-black rounded-[6rem] p-20 md:p-36 border border-white/5 relative overflow-hidden group shadow-[0_100px_200px_rgba(0,0,0,0.6)]">
            <div className="absolute -top-[50%] -right-[30%] w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[200px] group-hover:bg-blue-600/20 transition-all duration-2000"></div>

            <div className="relative z-10 text-center max-w-5xl mx-auto">
              <div className="inline-block px-8 py-3 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[11px] font-black uppercase tracking-[0.5em] mb-12">System Uplink Active</div>
              <h2 className="text-6xl md:text-8xl lg:text-[9rem] font-poppins font-black text-white mb-14 leading-[0.95] tracking-tighter">
                Stay Logged <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent italic drop-shadow-[0_0_80px_rgba(66,133,244,0.4)]">Into Innovation.</span>
              </h2>
              <p className="text-slate-400 text-xl md:text-2xl mb-20 font-medium opacity-90 leading-relaxed max-w-3xl mx-auto border-l-2 border-blue-500/30 pl-10">
                Integrate our release schedule directly into your personal environment. Receive real-time deployment notifications for every session.
              </p>
              <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
                <button className="w-full sm:w-auto bg-white text-slate-950 px-16 py-7 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.5em] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95">
                  Link Calendar
                </button>
                <button className="w-full sm:w-auto bg-white/5 backdrop-blur-3xl text-white border border-white/15 px-16 py-7 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.5em] hover:bg-white/15 transition-all hover:border-white/30 active:scale-95">
                  Sync Intelligence
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;