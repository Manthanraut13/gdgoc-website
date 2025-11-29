import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const heroRef = useRef(null);
  const eventsRef = useRef(null);
  const eventCardsRef = useRef([]);

  const events = {
    upcoming: [
      {
        id: 1,
        title: "Android Study Jam: Kotlin Fundamentals",
        date: "2024-01-15",
        time: "2:00 PM - 5:00 PM",
        type: "Workshop",
        category: "mobile",
        location: "Tech Building Room 101",
        description: "Master Android development with Kotlin and Jetpack Compose through hands-on coding sessions. Perfect for beginners!",
        image: "/images/events/android-jam.jpg",
        status: "upcoming",
        seats: 45,
        registered: 32,
        difficulty: "Beginner",
        tags: ["Android", "Kotlin", "Mobile"]
      },
      {
        id: 2,
        title: "Google Cloud Community Day 2024",
        date: "2024-01-22",
        time: "9:00 AM - 4:00 PM",
        type: "Conference",
        category: "cloud",
        location: "University Conference Center",
        description: "Explore Google Cloud technologies, AI/ML services, and real-world applications with industry experts and hands-on labs.",
        image: "/images/events/cloud-day.jpg",
        status: "upcoming",
        seats: 120,
        registered: 89,
        difficulty: "All Levels",
        tags: ["Cloud", "AI/ML", "Infrastructure"]
      },
      {
        id: 3,
        title: "Flutter Hackathon: Build in 24 Hours",
        date: "2024-02-05",
        time: "10:00 AM - Next Day 10:00 AM",
        type: "Hackathon",
        category: "mobile",
        location: "Innovation Lab",
        description: "Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. Prizes for winners!",
        image: "/images/events/flutter-hackathon.jpg",
        status: "upcoming",
        seats: 80,
        registered: 65,
        difficulty: "Intermediate",
        tags: ["Flutter", "Dart", "Cross-Platform"]
      },
      {
        id: 4,
        title: "Firebase Backend Masterclass",
        date: "2024-02-12",
        time: "1:00 PM - 4:00 PM",
        type: "Workshop",
        category: "web",
        location: "CS Department Lab",
        description: "Learn to build scalable backend solutions with Firebase, including authentication, databases, and cloud functions.",
        image: "/images/events/firebase-workshop.jpg",
        status: "upcoming",
        seats: 50,
        registered: 28,
        difficulty: "Intermediate",
        tags: ["Firebase", "Backend", "NoSQL"]
      }
    ],
    past: [
      {
        id: 5,
        title: "Web Dev Bootcamp 2023",
        date: "2023-12-10",
        time: "10:00 AM - 4:00 PM",
        type: "Workshop",
        category: "web",
        location: "Digital Innovation Hub",
        description: "Comprehensive web development workshop covering modern frameworks and best practices.",
        image: "/images/events/web-bootcamp.jpg",
        status: "past",
        attendees: 75,
        rating: 4.8,
        tags: ["React", "Node.js", "MongoDB"]
      },
      {
        id: 6,
        title: "AI & ML Introduction",
        date: "2023-11-25",
        time: "1:00 PM - 4:00 PM",
        type: "Seminar",
        category: "ai-ml",
        location: "AI Research Center",
        description: "Introduction to machine learning concepts and TensorFlow framework with practical examples.",
        image: "/images/events/ai-seminar.jpg",
        status: "past",
        attendees: 60,
        rating: 4.6,
        tags: ["AI", "Machine Learning", "TensorFlow"]
      }
    ]
  };

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

  const filteredEvents = events[activeTab].filter(event => 
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

  }, [activeTab, selectedCategory]);

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

  const getCategoryColor = (category) => {
    const colors = {
      mobile: 'from-blue-500 to-cyan-500',
      web: 'from-purple-500 to-pink-500',
      cloud: 'from-green-500 to-emerald-500',
      'ai-ml': 'from-orange-500 to-red-500'
    };
    return colors[category] || 'from-slate-500 to-gray-500';
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
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      activeTab === type.key
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
                  className={`px-4 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                    selectedCategory === category.key
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

          {/* Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredEvents.map((event, index) => (
              <div 
                key={event.id}
                ref={addToEventCardsRef}
                className="event-card group"
              >
                <div className="bg-card-bg rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden h-full flex flex-col">
                  {/* Event Header */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 ${getStatusColor(event.status)}`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    
                    {/* Status & Category Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="bg-white/90 backdrop-blur-sm text-dark-gray px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                        {event.status === 'upcoming' ? '🚀 Coming Soon' : '✅ Completed'}
                      </span>
                      <span className={`bg-white/90 backdrop-blur-sm text-dark-gray px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm`}>
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
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(event.difficulty)}`}>
                          {event.difficulty}
                        </span>
                        <span className="text-sm text-medium-gray flex items-center">
                          📍 {event.location}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                      {event.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {event.tags.map((tag, tagIndex) => (
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
                          <button className="ml-4 bg-gradient-to-r from-gdg-blue to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300 whitespace-nowrap">
                            Register Now
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
                          <button className="bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl font-semibold hover:bg-slate-200 hover:scale-105 transform transition-all duration-300">
                            View Recap
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
        </div>
      </section>
    </div>
  );
};

export default Events;