import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FeaturedEvents = () => {
  const sectionRef = useRef(null);
  const eventsRef = useRef([]);

  const featuredEvents = [
    {
      id: 1,
      title: "Android Study Jam",
      date: "2024-01-15",
      time: "2:00 PM - 5:00 PM",
      type: "Workshop",
      category: "Mobile Development",
      description: "Master Android development with Kotlin and Jetpack Compose through hands-on coding sessions and real-world projects.",
      image: "/images/event-android.jpg",
      status: "upcoming",
      seats: 45
    },
    {
      id: 2,
      title: "Cloud Community Day",
      date: "2024-01-22",
      time: "9:00 AM - 4:00 PM",
      type: "Conference",
      category: "Cloud Computing",
      description: "Explore Google Cloud technologies, AI/ML services, and real-world applications with industry experts.",
      image: "/images/event-cloud.jpg",
      status: "upcoming",
      seats: 120
    },
    {
      id: 3,
      title: "Flutter Hackathon",
      date: "2024-02-05",
      time: "10:00 AM - Next Day",
      type: "Hackathon",
      category: "Cross-Platform",
      description: "Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.",
      image: "/images/event-flutter.jpg",
      status: "upcoming",
      seats: 80
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section header animation
    gsap.fromTo('.section-header',
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-header',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Event cards animation
    gsap.fromTo('.event-card',
      { 
        y: 100, 
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
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.events-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );

  }, []);

  const addToEventsRef = (el) => {
    if (el && !eventsRef.current.includes(el)) {
      eventsRef.current.push(el);
    }
  };

  const getStatusColor = (status) => {
    return status === 'upcoming' 
      ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
      : 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'Workshop': '🎯',
      'Conference': '👥',
      'Hackathon': '⚡'
    };
    
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-section-bg relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gdg-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gdg-red rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="section-header text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white rounded-2xl px-4 py-2 shadow-soft mb-6">
            <div className="w-2 h-2 bg-gdg-blue rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-dark-gray">Featured Events</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-dark-gray mb-6">
            Upcoming <span className="bg-gradient-to-r from-gdg-blue to-blue-600 bg-clip-text text-transparent">Events</span>
          </h2>
          <p className="text-xl text-medium-gray max-w-2xl mx-auto leading-relaxed">
            Join our immersive learning experiences and connect with the developer community
          </p>
        </div>

        {/* Events Grid */}
        <div className="events-grid grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {featuredEvents.map((event, index) => (
            <div 
              key={event.id}
              ref={addToEventsRef}
              className="event-card group relative"
            >
              <div className="relative bg-card-bg rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 h-full flex flex-col">
                {/* Event Header */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 ${getStatusColor(event.status)}`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-dark-gray px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                      {event.status === 'upcoming' ? '🚀 Coming Soon' : '✅ Completed'}
                    </span>
                  </div>

                  {/* Event Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>
                      <div className="flex items-center space-x-2 text-white/90 text-sm">
                        <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>🕒 {event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6 flex-grow flex flex-col">
                  {/* Category */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-50 text-gdg-blue px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                    <span className="text-sm text-medium-gray">
                      {event.seats} seats
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {event.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link 
                      to={`/events/${event.id}`}
                      className="flex-1 bg-gradient-to-r from-gdg-blue to-blue-600 text-white py-3 px-4 rounded-xl font-semibold text-center hover:shadow-glow hover:scale-105 transform transition-all duration-300"
                    >
                      Learn More
                    </Link>
                 
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gdg-blue/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link 
            to="/events"
            className="group inline-flex items-center space-x-3 bg-white text-dark-gray px-8 py-4 rounded-2xl font-semibold shadow-soft hover:shadow-medium border border-gray-200 hover:border-gray-300 hover:scale-105 transform transition-all duration-300"
          >
            <span>View All Events</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;