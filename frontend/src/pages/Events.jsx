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

  const heroRef = useRef(null);
  const eventsRef = useRef(null);
  const eventCardsRef = useRef([]);
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
    { key: 'all', label: 'All Categories', icon: '🎯' },
    { key: 'mobile', label: 'Mobile Development', icon: '📱' },
    { key: 'web', label: 'Web Development', icon: '🌐' },
    { key: 'cloud', label: 'Cloud & DevOps', icon: '☁️' },
    { key: 'ai-ml', label: 'AI & ML', icon: '🧠' }
  ];

  const eventTypes = [
    { key: 'upcoming', label: 'Upcoming Events', count: events.upcoming.length },
    { key: 'past', label: 'Past Events', count: events.past.length }
  ];

  const filteredEvents = (events[activeTab] || []).filter(event =>
    selectedCategory === 'all' || event.category === selectedCategory
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    gsap.fromTo('.page-hero-content',
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
      }
    );

    // Events section animation
    gsap.fromTo(eventsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: eventsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Animate event cards when filters change
    animateEventCards();

  }, [activeTab, selectedCategory, loading]);

  useEffect(() => {
    if (isModalOpen && selectedEvent) {
      gsap.fromTo(modalRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out'
        }
      );
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setCurrentImageIndex(0);
    }
  }, [isModalOpen, selectedEvent]);

  const animateEventCards = () => {
    gsap.fromTo('.event-card',
      {
        y: 60,
        opacity: 0,
        scale: 0.9,
        rotationY: 15
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }
    );
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
      }
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (selectedEvent.images?.length || 1) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (selectedEvent.images?.length || 1) - 1 : prevIndex - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const addToEventCardsRef = (el) => {
    if (el && !eventCardsRef.current.includes(el)) {
      eventCardsRef.current.push(el);
    }
  };

  const getStatusColor = (status) => {
    return status === 'upcoming'
      ? 'bg-gradient-to-r from-green-500 to-emerald-600'
      : 'bg-gradient-to-r from-slate-500 to-gray-600';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'text-green-600 bg-green-50',
      'Intermediate': 'text-yellow-600 bg-yellow-50',
      'Advanced': 'text-red-600 bg-red-50',
      'All Levels': 'text-blue-600 bg-blue-50'
    };
    return colors[difficulty] || 'text-gray-600 bg-gray-50';
  };

  const getProgressPercentage = (registered, seats) => {
    if (!seats || seats === 0) return 0;
    return (registered / seats) * 100;
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-[50vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gdg-blue rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gdg-green rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative">
          <div className="page-hero-content text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-soft mb-8">
              <div className="w-2 h-2 bg-gdg-blue rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-dark-gray">Events & Workshops</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-dark-gray mb-6 leading-tight">
              Learn, Build, <span className="text-gradient">Connect</span>
            </h1>

            <p className="text-xl text-medium-gray leading-relaxed max-w-3xl mx-auto">
              Join our immersive learning experiences, hands-on workshops, and community events
              designed to accelerate your development journey.
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section
        ref={eventsRef}
        className="section-padding bg-white relative overflow-hidden"
      >
        <div className="container-custom">
          {/* Filters Section */}
          <div className="mb-12">
            {/* Event Type Tabs */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
              <div className="bg-slate-100 rounded-2xl p-1 inline-flex">
                {eventTypes.map((type) => (
                  <button
                    key={type.key}
                    onClick={() => setActiveTab(type.key)}
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 ${activeTab === type.key
                      ? 'bg-white text-dark-gray shadow-sm'
                      : 'text-medium-gray hover:text-dark-gray'
                      }`}
                  >
                    <span>{type.label}</span>
                    <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded-full text-xs">
                      {type.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="text-sm text-medium-gray">
                {activeTab === 'upcoming' ? '🎯 Register for upcoming events' : '📚 Learn from past events'}
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-4 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-2 ${selectedCategory === category.key
                    ? 'bg-gdg-blue text-white shadow-md'
                    : 'bg-slate-100 text-medium-gray hover:bg-slate-200'
                    }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-gdg-blue border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-medium-gray font-medium">Discovering amazing events...</p>
            </div>
          ) : (
            <>
              {/* Events Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredEvents.map((event, index) => (
                  <div
                    key={event._id || event.id}
                    ref={addToEventCardsRef}
                    className="event-card group cursor-pointer"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="bg-card-bg rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden h-full flex flex-col">
                      {/* Event Header */}
                      <div className="relative h-48 overflow-hidden">
                        {event.image ? (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className={`absolute inset-0 ${getStatusColor(event.status)}`}></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        {/* Status & Category Badges */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          <span className="bg-white/90 backdrop-blur-sm text-dark-gray px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                            {event.status === 'upcoming' ? '🚀 Coming Soon' : '✅ Completed'}
                          </span>
                          <span className="bg-white/90 backdrop-blur-sm text-dark-gray px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                            {event.type}
                          </span>
                        </div>

                        {/* Event Info Overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-poppins font-bold text-white mb-2 line-clamp-2">
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-white/90 text-sm">
                            <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>🕒 {event.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Event Content */}
                      <div className="p-6 flex-grow flex flex-col">
                        {/* Meta Information */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            {event.difficulty && (
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(event.difficulty)}`}>
                                {event.difficulty}
                              </span>
                            )}
                            <span className="text-sm text-medium-gray flex items-center">
                              📍 {event.location}
                            </span>
                          </div>
                          <span className="text-lg text-gray-400 group-hover:text-gdg-blue transition-colors">→</span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                          {event.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {event.tags && event.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Stats & Actions */}
                        <div className="flex items-center justify-between">
                          {event.status === 'upcoming' ? (
                            <>
                              <div className="flex-1">
                                <div className="flex items-center justify-between text-sm text-medium-gray mb-2">
                                  <span>Registration Progress</span>
                                  <span>{event.registered}/{event.seats} registered</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${getProgressPercentage(event.registered, event.seats)}%` }}
                                  ></div>
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEventClick(event);
                                }}
                                className="ml-4 bg-gradient-to-r from-gdg-blue to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300 whitespace-nowrap"
                              >
                                View Details
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="text-sm text-medium-gray">
                                <span className="flex items-center space-x-1">
                                  <span>👥 {event.attendees} attendees</span>
                                  <span>•</span>
                                  <span>⭐ {event.rating}/5 rating</span>
                                </span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEventClick(event);
                                }}
                                className="bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl font-semibold hover:bg-slate-200 hover:scale-105 transform transition-all duration-300"
                              >
                                View Details
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gdg-blue/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredEvents.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">📅</span>
                  </div>
                  <h3 className="text-2xl font-poppins font-bold text-dark-gray mb-3">
                    No Events Found
                  </h3>
                  <p className="text-medium-gray mb-6 max-w-md mx-auto">
                    {selectedCategory !== 'all'
                      ? `There are no ${activeTab} events in the ${categories.find(cat => cat.key === selectedCategory)?.label.toLowerCase()} category.`
                      : `There are no ${activeTab} events at the moment.`
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setActiveTab('upcoming');
                    }}
                    className="bg-gdg-blue text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300"
                  >
                    View All Events
                  </button>
                </div>
              )}

              {/* Calendar CTA */}
              <div className="mt-16 bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-8 text-white text-center">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-4">
                    Never Miss an Event
                  </h3>
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    Subscribe to our calendar and get automatic updates for all upcoming workshops,
                    hackathons, and community events.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300">
                      Add to Calendar
                    </button>
                    <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 hover:scale-105 transform transition-all duration-300">
                      Get Reminders
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Event Details Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-gray-100 transition-colors shadow-md"
            >
              <span className="text-xl font-bold text-gray-600">✕</span>
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {/* Event Header */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-white/90 backdrop-blur-sm text-dark-gray px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-gray-200">
                    {selectedEvent.status === 'upcoming' ? '🚀 Coming Soon' : '✅ Completed'}
                  </span>
                  <span className="bg-white/90 backdrop-blur-sm text-dark-gray px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-gray-200">
                    {selectedEvent.type}
                  </span>
                  {selectedEvent.difficulty && (
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getDifficultyColor(selectedEvent.difficulty)}`}>
                      {selectedEvent.difficulty}
                    </span>
                  )}
                </div>

                <h2 className="text-3xl font-poppins font-bold text-dark-gray mb-4">
                  {selectedEvent.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📅</span>
                    <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🕒</span>
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📍</span>
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="mb-8">
                <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">Event Gallery</h3>
                <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
                  {/* Main Image */}
                  <img
                    src={(selectedEvent.images && selectedEvent.images[currentImageIndex]) || selectedEvent.image}
                    alt={`${selectedEvent.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation Buttons */}
                  {selectedEvent.images && selectedEvent.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-md"
                      >
                        <span className="text-xl">←</span>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-md"
                      >
                        <span className="text-xl">→</span>
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {selectedEvent.images ? selectedEvent.images.length : 1}
                  </div>
                </div>

                {/* Thumbnails */}
                {selectedEvent.images && selectedEvent.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedEvent.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => selectImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === index
                          ? 'border-gdg-blue scale-105'
                          : 'border-transparent hover:border-gray-300'
                          }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Detailed Description */}
                  <div className="mb-8">
                    <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">About This Event</h3>
                    <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {selectedEvent.detailedDescription || selectedEvent.description}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-8">
                    <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags && selectedEvent.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Event Requirements */}
                  {selectedEvent.requirements && selectedEvent.requirements.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">Event Requirements</h3>
                      <ul className="space-y-3">
                        {selectedEvent.requirements.map((req, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-gdg-blue rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Speakers */}
                  {selectedEvent.keySpeakers && selectedEvent.keySpeakers.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">Key Speakers</h3>
                      <div className="space-y-6">
                        {selectedEvent.keySpeakers.map((speaker, index) => (
                          <div key={index} className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6">
                            <h4 className="text-lg font-semibold text-dark-gray mb-2">{speaker.name}</h4>
                            {speaker.role && (
                              <p className="text-gdg-blue font-medium mb-2">{speaker.role}</p>
                            )}
                            {speaker.description && (
                              <p className="text-gray-600 text-sm">{speaker.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Teams */}
                  {selectedEvent.teams && selectedEvent.teams.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">Participating Teams</h3>
                      <div className="space-y-4">
                        {selectedEvent.teams.map((team, index) => (
                          <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:border-gdg-blue transition-colors">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="text-lg font-semibold text-dark-gray">{team.name}</h4>
                                <p className="text-gray-500 text-sm">Team Lead: {team.lead}</p>
                              </div>
                              <span className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                                {team.theme}
                              </span>
                            </div>
                            <div className="mb-3">
                              <span className="font-medium text-dark-gray">Project Idea:</span>
                              <span className="text-gray-600 ml-2">{team.idea}</span>
                            </div>
                            <p className="text-gray-600 text-sm">{team.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Agenda */}
                  {selectedEvent.agenda && selectedEvent.agenda.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">Event Agenda</h3>
                      <ul className="space-y-3">
                        {selectedEvent.agenda.map((item, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-gdg-blue rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Highlights */}
                  {selectedEvent.highlights && selectedEvent.highlights.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">Event Highlights</h3>
                      <ul className="space-y-3">
                        {selectedEvent.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="text-lg text-green-500 mt-0.5">✓</span>
                            <span className="text-gray-600">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Themes */}
                  {selectedEvent.themes && selectedEvent.themes.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">Event Themes</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.themes.map((theme, index) => (
                          <span
                            key={index}
                            className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 px-4 py-2 rounded-full text-sm font-medium"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Conclusion */}
                  {selectedEvent.conclusion && (
                    <div className="mb-8">
                      <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">Conclusion</h3>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                        <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                          {selectedEvent.conclusion}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Record Number */}
                  {selectedEvent.recordNumber && (
                    <div className="text-sm text-gray-500 mt-8">
                      <span className="font-medium">Record Number:</span> {selectedEvent.recordNumber}
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Stats */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
                    <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">Event Details</h3>
                    <div className="space-y-4">
                      {selectedEvent.status === 'upcoming' ? (
                        <>
                          <div>
                            <div className="flex justify-between text-sm text-medium-gray mb-2">
                              <span>Registration</span>
                              <span>{selectedEvent.registered}/{selectedEvent.seats}</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-3">
                              <div
                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                                style={{ width: `${getProgressPercentage(selectedEvent.registered, selectedEvent.seats)}%` }}
                              ></div>
                            </div>
                          </div>
                          <button className="w-full bg-gradient-to-r from-gdg-blue to-blue-600 text-white py-4 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300">
                            Register Now
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">👥</span>
                              <span className="text-gray-600">Attendees</span>
                            </div>
                            <span className="text-xl font-bold text-dark-gray">{selectedEvent.attendees}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">⭐</span>
                              <span className="text-gray-600">Rating</span>
                            </div>
                            <span className="text-xl font-bold text-dark-gray">{selectedEvent.rating}/5</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {selectedEvent.prerequisites && selectedEvent.prerequisites.length > 0 && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
                      <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">Prerequisites</h3>
                      <ul className="space-y-2">
                        {selectedEvent.prerequisites.map((prereq, index) => (
                          <li key={index} className="flex items-center space-x-2 text-gray-600">
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span>{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Takeaways/Resources */}
                  {(selectedEvent.takeaways || selectedEvent.resources) && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
                      <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">
                        {selectedEvent.status === 'upcoming' ? 'What You\'ll Get' : 'Resources'}
                      </h3>
                      <ul className="space-y-2">
                        {(selectedEvent.takeaways || selectedEvent.resources).map((item, index) => (
                          <li key={index} className="flex items-center space-x-2 text-gray-600">
                            <span className="text-lg text-blue-500">📚</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Organizer/Speaker */}
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6">
                    <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">
                      {selectedEvent.speaker ? 'Speaker' : 'Organizer'}
                    </h3>
                    <p className="text-gray-600">
                      {selectedEvent.speaker || selectedEvent.organizer}
                    </p>
                  </div>

                  {/* Feedback */}
                  {selectedEvent.feedback && selectedEvent.feedback.length > 0 && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
                      <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">Participant Feedback</h3>
                      <ul className="space-y-2">
                        {selectedEvent.feedback.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2 text-gray-600">
                            <span className="text-lg text-yellow-500">💬</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;