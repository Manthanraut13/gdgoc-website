import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../services/api";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    getEventById(id)
      .then((res) => {
        setEvent(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Event Error:", err);
        setError("Failed to load event details. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!loading && event) {
      const ctx = gsap.context(() => {
        // Hero Animation
        gsap.from(".event-hero-content", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });

        // Content Sections Animation
        gsap.from(".animate-section", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".animate-section",
            start: "top 85%"
          }
        });

        // Sidebar Animation
        gsap.from(sidebarRef.current, {
          x: 50,
          opacity: 0,
          duration: 1,
          delay: 0.5,
          ease: "power3.out"
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [loading, event]);

  const nextImage = () => {
    if (event.images && event.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
    }
  };

  const prevImage = () => {
    if (event.images && event.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-gdg-blue border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-medium-gray font-medium animate-pulse">Gathering event details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <div className="bg-red-50 p-6 rounded-3xl mb-6">
          <span className="text-4xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-dark-gray mb-2">Oops! Something went wrong</h2>
        <p className="text-medium-gray mb-8 max-w-md">{error}</p>
        <Link to="/events" className="btn-primary">Back to Events</Link>
      </div>
    );
  }

  if (!event) return null;

  const getStatusBadge = (status) => {
    const isUpcoming = status === 'upcoming';
    return (
      <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md border ${isUpcoming
          ? 'bg-green-500/10 border-green-500/20 text-green-600'
          : 'bg-slate-500/10 border-slate-500/20 text-slate-600'
        }`}>
        <div className={`w-2 h-2 rounded-full animate-pulse ${isUpcoming ? 'bg-green-500' : 'bg-slate-500'}`}></div>
        <span className="text-sm font-bold uppercase tracking-wider">
          {isUpcoming ? 'Registration Open' : 'Event Completed'}
        </span>
      </div>
    );
  };

  const images = event.images && event.images.length > 0 ? event.images : [event.image];

  return (
    <div ref={containerRef} className="page-wrapper bg-white">
      {/* Immersive Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={event.image || (event.images && event.images[0])}
            alt={event.title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-black/30"></div>
        </div>

        <div className="container-custom relative z-10 pb-12 w-full">
          <div className="event-hero-content max-w-4xl">
            {getStatusBadge(event.status)}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-black text-dark-gray mt-6 mb-4 leading-tight">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-dark-gray/70 font-medium">
              <div className="flex items-center space-x-2">
                <span className="text-xl">📅</span>
                <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">📍</span>
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-20 relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-16">

              {/* About Section */}
              <div className="animate-section">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gdg-blue/10 rounded-xl flex items-center justify-center text-gdg-blue">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <h2 className="text-3xl font-poppins font-bold text-dark-gray">About the Event</h2>
                </div>
                <div className="prose prose-lg max-w-none text-medium-gray leading-relaxed">
                  <p className="whitespace-pre-line">{event.detailedDescription || event.description}</p>
                </div>
              </div>

              {/* Gallery Section */}
              {images.length > 0 && (
                <div className="animate-section">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gdg-red/10 rounded-xl flex items-center justify-center text-gdg-red">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      </div>
                      <h2 className="text-3xl font-poppins font-bold text-dark-gray">Experience the Event</h2>
                    </div>
                  </div>

                  <div className="relative group rounded-3xl overflow-hidden shadow-large aspect-video">
                    <img
                      src={images[currentImageIndex]}
                      alt={`Event highlight ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700"
                    />

                    {images.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={prevImage} className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                          <span className="text-2xl">←</span>
                        </button>
                        <button onClick={nextImage} className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                          <span className="text-2xl">→</span>
                        </button>
                      </div>
                    )}

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                      {images.map((_, i) => (
                        <div
                          key={i}
                          onClick={() => setCurrentImageIndex(i)}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${currentImageIndex === i ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Speakers Section */}
              {event.keySpeakers && event.keySpeakers.length > 0 && (
                <div className="animate-section">
                  <div className="flex items-center space-x-3 mb-10">
                    <div className="w-10 h-10 bg-gdg-green/10 rounded-xl flex items-center justify-center text-gdg-green">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <h2 className="text-3xl font-poppins font-bold text-dark-gray">Featured Speakers</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {event.keySpeakers.map((speaker, i) => (
                      <div key={i} className="group bg-slate-50 hover:bg-white rounded-3xl p-8 border border-transparent hover:border-gray-100 hover:shadow-large transition-all duration-300">
                        <div className="w-16 h-16 bg-gradient-to-br from-gdg-blue to-indigo-600 rounded-2xl mb-6 flex items-center justify-center text-white text-2xl font-bold">
                          {speaker.name.charAt(0)}
                        </div>
                        <h3 className="text-xl font-bold text-dark-gray mb-1">{speaker.name}</h3>
                        <p className="text-gdg-blue font-semibold text-sm mb-4">{speaker.role}</p>
                        <p className="text-medium-gray text-sm leading-relaxed">{speaker.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agenda Section */}
              {event.agenda && event.agenda.length > 0 && (
                <div className="animate-section">
                  <div className="flex items-center space-x-3 mb-10">
                    <div className="w-10 h-10 bg-gdg-yellow/10 rounded-xl flex items-center justify-center text-gdg-yellow">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h2 className="text-3xl font-poppins font-bold text-dark-gray">Agenda</h2>
                  </div>
                  <div className="space-y-4">
                    {event.agenda.map((item, i) => (
                      <div key={i} className="flex items-start space-x-6 p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-dashed border-gray-200">
                        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center font-bold text-dark-gray">
                          {i + 1}
                        </div>
                        <p className="text-lg text-dark-gray font-medium pt-2">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
              <div ref={sidebarRef} className="space-y-8">

                {/* Main Action Card */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-large border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gdg-blue/5 rounded-full -mr-16 -mt-16"></div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-poppins font-bold text-dark-gray mb-6">Join the Event</h3>

                    <div className="space-y-6 mb-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">🕒</span>
                          <span className="text-medium-gray font-medium">Time</span>
                        </div>
                        <span className="font-bold text-dark-gray">{event.time || 'TBD'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">📊</span>
                          <span className="text-medium-gray font-medium">Difficulty</span>
                        </div>
                        <span className="font-bold text-dark-gray capitalize">{event.difficulty || 'All Levels'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">🏷️</span>
                          <span className="text-medium-gray font-medium">Category</span>
                        </div>
                        <span className="bg-blue-50 text-gdg-blue px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                          {event.category || 'General'}
                        </span>
                      </div>
                    </div>

                    {event.status === 'upcoming' ? (
                      <div className="space-y-4">
                        <div className="bg-slate-50 p-6 rounded-2xl flex items-center justify-between border border-gray-100">
                          <div>
                            <p className="text-xs font-bold text-medium-gray uppercase tracking-widest mb-1">Seats Left</p>
                            <p className="text-2xl font-black text-dark-gray">{(event.seats || 0) - (event.registered || 0)}</p>
                          </div>
                          <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-gdg-green flex items-center justify-center text-xs font-bold text-dark-gray">
                            {Math.round(((event.registered || 0) / (event.seats || 1)) * 100)}%
                          </div>
                        </div>

                        {event.registrationLink ? (
                          <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full btn-primary py-5 text-center text-lg shadow-glow-blue"
                          >
                            Register Now
                          </a>
                        ) : (
                          <button disabled className="w-full bg-slate-100 text-slate-400 py-5 rounded-2xl font-bold text-lg cursor-not-allowed">
                            Full Capacity
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center p-6 bg-slate-50 rounded-2xl">
                        <p className="text-medium-gray font-medium mb-4">Event is completed</p>
                        <div className="flex items-center justify-center space-x-2 text-2xl">
                          <span>⭐</span>
                          <span className="font-black text-dark-gray">{event.rating || 'N/A'}/5</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Requirements Card */}
                {event.requirements && event.requirements.length > 0 && (
                  <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                      <span className="mr-2">📝</span> Prerequisites
                    </h3>
                    <ul className="space-y-4">
                      {event.requirements.map((req, i) => (
                        <li key={i} className="flex items-start space-x-3 text-slate-300 text-sm">
                          <span className="text-gdg-green">✓</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Share Link */}
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-gray-100">
                  <h3 className="text-sm font-bold text-medium-gray uppercase tracking-widest mb-4 text-center">Share Event</h3>
                  <div className="flex justify-center space-x-4">
                    {['🔗', '📱', '🐦', '👥'].map((icon, i) => (
                      <button key={i} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:scale-110 transition-transform">
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar for Mobile */}
      {event.status === 'upcoming' && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 p-4 z-50 animate-fade-in-up">
          <div className="container-custom flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-medium-gray uppercase">Capacity</p>
              <p className="text-sm font-black text-dark-gray">{event.registered}/{event.seats} registered</p>
            </div>
            {event.registrationLink && (
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-3 px-8 text-sm"
              >
                Register
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
