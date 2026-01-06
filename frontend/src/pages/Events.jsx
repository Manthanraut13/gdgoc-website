import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { getEvents } from '../services/api';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const heroRef = useRef(null);
  const eventsRef = useRef(null);
  const eventCardsRef = useRef([]);

  const categories = [
    { key: 'all', label: 'All Categories', icon: '🎯' },
    { key: 'mobile', label: 'Mobile Development', icon: '📱' },
    { key: 'web', label: 'Web Development', icon: '🌐' },
    { key: 'cloud', label: 'Cloud & DevOps', icon: '☁️' },
    { key: 'ai-ml', label: 'AI & ML', icon: '🧠' }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.page-hero-content',
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    );

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
        }
      }
    );
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await getEvents({
          status: activeTab,
          category: selectedCategory !== 'all' ? selectedCategory : undefined
        });
        setEvents(res.data.data || []);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [activeTab, selectedCategory]);

  const getStatusColor = (status) =>
    status === 'upcoming'
      ? 'bg-gradient-to-r from-green-500 to-emerald-600'
      : 'bg-gradient-to-r from-slate-500 to-gray-600';

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Beginner: 'text-green-600 bg-green-50',
      Intermediate: 'text-yellow-600 bg-yellow-50',
      Advanced: 'text-red-600 bg-red-50',
      'All Levels': 'text-blue-600 bg-blue-50'
    };
    return colors[difficulty] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section
        ref={heroRef}
        className="min-h-[50vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center"
      >
        <div className="container-custom text-center">
          <div className="page-hero-content max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Learn, Build, <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-xl text-medium-gray">
              Join our immersive learning experiences and community events.
            </p>
          </div>
        </div>
      </section>

      {/* Events */}
      <section ref={eventsRef} className="section-padding bg-white">
        <div className="container-custom">
          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-10">
            {['upcoming', 'past'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-2xl font-semibold ${
                  activeTab === tab
                    ? 'bg-gdg-blue text-white'
                    : 'bg-slate-100'
                }`}
              >
                {tab === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
              </button>
            ))}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-3 rounded-2xl font-medium flex items-center space-x-2 ${
                  selectedCategory === cat.key
                    ? 'bg-gdg-blue text-white'
                    : 'bg-slate-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-16 text-lg font-medium">
              Loading events...
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {events.map(event => (
                <div key={event._id} className="event-card">
                  <div className="bg-card-bg rounded-3xl shadow-soft overflow-hidden h-full flex flex-col">
                    <div className={`h-40 ${getStatusColor(event.status)}`}></div>

                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold mb-3">
                        {event.title}
                      </h3>

                      <p className="text-gray-600 mb-4 flex-grow">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(
                            event.difficulty
                          )}`}
                        >
                          {event.difficulty}
                        </span>

                        <Link
                          to={`/events/${event._id}`}
                          className="bg-gdg-blue text-white px-4 py-2 rounded-xl font-semibold"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && events.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              No events found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
