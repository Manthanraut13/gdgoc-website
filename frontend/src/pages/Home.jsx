import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <div className="home-page">
      {/* Hero Section */}
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
        className="py-32 bg-slate-900 relative overflow-hidden"
      >
        {/* Advanced Background Elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-gdg-blue rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(52,168,83,0.15),transparent_60%)] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-gdg-red rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150 brightness-150"></div>

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center px-6">
            {/* Ultra Premium Badge */}
            <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-2xl text-white px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] mb-12 border border-white/10 shadow-2xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gdg-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gdg-green"></span>
              </span>
              <span>Propel Your Career</span>
            </div>

            {/* Cinematic Heading */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-poppins font-black text-white mb-10 leading-[1.05] tracking-tight">
              Shape the Future <br />
              <span className="bg-gradient-to-r from-gdg-blue via-gdg-green to-gdg-yellow bg-clip-text text-transparent italic">
                of Technology.
              </span>
            </h2>

            {/* Impactful Description */}
            <p className="text-xl md:text-2xl text-slate-400 mb-14 leading-relaxed max-w-3xl mx-auto font-medium">
              Join a high-performance community of developers, innovators, and leaders at ZCOER. Your journey to mastery starts here.
            </p>

            {/* Polished CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/join"
                className="group relative bg-white text-slate-950 px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_rgba(66,133,244,0.3)] hover:-translate-y-1 transform transition-all duration-500 overflow-hidden text-center"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Become a Member</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gdg-blue to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </Link>
              <Link
                to="/events"
                className="group relative bg-white/5 backdrop-blur-xl text-white px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest border border-white/10 hover:border-white/20 hover:bg-white/10 hover:-translate-y-1 transform transition-all duration-500 text-center"
              >
                <span className="relative z-10">Attend Workshop</span>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-20 flex flex-col items-center">
              <div className="flex -space-x-3 mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                    U{i}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-gdg-blue flex items-center justify-center text-[10px] font-bold text-white">
                  +500
                </div>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Joined student developers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;