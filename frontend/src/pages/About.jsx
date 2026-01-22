import React, { useEffect, useRef } from 'react';
import Hero from '../components/sections/Hero';
import FeaturedEvents from '../components/sections/FeaturedEvents';
import AboutPreview from '../components/sections/AboutPreview';
import Stats from '../components/sections/Stats';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Home = () => {
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // CTA section animation
    gsap.fromTo(ctaRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

  }, []);

  // Simple click functions - Option 1 (if you prefer buttons)
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="home-page">
      {/* Hero Section - Update Hero component similarly */}
      <Hero />

      {/* About Preview Section */}
      <AboutPreview />

      {/* Stats Section */}
      <Stats />

      {/* Featured Events Section */}
      <FeaturedEvents />

      {/* Call to Action Section */}
      <section
        ref={ctaRef}
        className="py-20 bg-gradient-to-br from-slate-700 via-blue-700 to-orange-600 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-2xl font-semibold text-sm mb-8 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Join Our Community</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
              Ready to <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">Transform</span> Your Future?
            </h2>

            {/* Description */}
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              Join hundreds of students who are building their skills, launching projects,
              and shaping the future of technology through our vibrant developer community.
            </p>

            {/* CTA Buttons - SIMPLEST SOLUTION: Use <a> tags */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Option 1: Simple <a> tags (Recommended) */}
              <a
                href="/JoinUs"
                className="group relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-glow hover:scale-105 transform transition-all duration-300 overflow-hidden inline-block text-center"
              >
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              <a
                href="/Events"
                className="group relative bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 hover:scale-105 transform transition-all duration-300 inline-block text-center"
              >
                <span className="relative z-10">Explore Events</span>
              </a>

              {/* Option 2: Buttons with onClick (if you want to keep button styling) */}
              {/* 
              <button 
                onClick={() => navigateTo('/JoinUs')}
                className="group relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-glow hover:scale-105 transform transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button 
                onClick={() => navigateTo('/Events')}
                className="group relative bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 hover:scale-105 transform transition-all duration-300"
              >
                <span className="relative z-10">Explore Events</span>
              </button>
              */}
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-blue-200 text-sm">
              <p>🚀 No experience required • 💼 Build your portfolio • 🌍 Join a global network</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;