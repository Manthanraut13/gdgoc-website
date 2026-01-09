import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import android from "../../assets/tech/android-logo.png";
import cloud from "../../assets/tech/cloud-logo.png";
import firebase from "../../assets/tech/firebase-logo.png";
import flutter from "../../assets/tech/flutter.png";


const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Background elements animation
    tl.fromTo('.hero-bg-element',
      { scale: 0, opacity: 0, rotation: -180 },
      { scale: 1, opacity: 0.1, rotation: 0, duration: 1.5, stagger: 0.2, ease: 'back.out(1.7)' }
    );

    // Content animation
    tl.fromTo('.hero-title span',
      { y: 100, opacity: 0, rotationX: 90 },
      { y: 0, opacity: 1, rotationX: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' },
      '-=1'
    )
      .fromTo('.hero-subtitle',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo('.hero-buttons a',
        { y: 30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.5'
      );

    // Floating animation for background elements
    gsap.to('.hero-bg-element', {
      y: '+=30',
      rotation: '+=5',
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 2
    });

  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-bg-element absolute top-1/4 left-1/4 w-72 h-72 bg-gdg-blue rounded-full opacity-10 blur-3xl"></div>
        <div className="hero-bg-element absolute top-1/3 right-1/4 w-96 h-96 bg-gdg-red rounded-full opacity-10 blur-3xl"></div>
        <div className="hero-bg-element absolute bottom-1/4 left-1/3 w-80 h-80 bg-gdg-yellow rounded-full opacity-10 blur-3xl"></div>
        <div className="hero-bg-element absolute bottom-1/3 right-1/3 w-64 h-64 bg-gdg-green rounded-full opacity-10 blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-soft mb-8">
              <div className="w-2 h-2 bg-gdg-green rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-dark-gray">Welcome to GDG On-Campus ZCOER</span>
            </div>

            <h1 className="hero-title text-5xl md:text-6xl lg:text-6xl font-poppins font-bold text-dark-gray mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-dark-gray to-gdg-blue bg-clip-text text-transparent">
                Google Developers Group
              </span>
              <span className="block bg-gradient-to-r from-gdg-blue to-gdg-green bg-clip-text text-transparent">
                 On-Campus ZCOER
              </span>
            </h1>

            <p className="hero-subtitle text-xl md:text-2xl text-medium-gray mb-8 leading-relaxed max-w-2xl">
              Empowering the next generation of developers through cutting-edge workshops,
              collaborative projects, and an inclusive community focused on Google technologies.
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/join"
                className="group relative bg-gradient-to-r from-gdg-blue to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-glow hover:scale-105 transform transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Join Our Community</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-gdg-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/events"
                className="group relative bg-white text-dark-gray px-8 py-4 rounded-2xl font-semibold shadow-soft hover:shadow-medium border border-gray-200 hover:border-gray-300 hover:scale-105 transform transition-all duration-300"
              >
                <span className="relative z-10">Explore Events</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
              {[
                { number: '500+', label: 'Developers' },
                { number: '50+', label: 'Events' },
                { number: '25+', label: 'Projects' },
                { number: '100%', label: 'Community' }
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-dark-gray mb-1">{stat.number}</div>
                  <div className="text-medium-gray text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div ref={visualRef} className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Card */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-large p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {['Android', 'Flutter', 'Cloud', 'Firebase'].map((tech, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 text-center group hover:scale-105 transform transition-all duration-300">
                      <div className="text-2xl mb-2">
                        {tech === 'Android' && (
                          <img
                            src={android}
                            alt="Android"
                            className="w-8 h-8 mx-auto"
                          />
                        )}
                        {tech === 'Flutter' && (
                          <img
                            src={flutter}
                            alt="Flutter"
                            className="w-8 h-8 mx-auto"
                          />
                        )}
                        {tech === 'Cloud' && (
                          <img
                            src={cloud}
                            alt="Cloud"
                            className="w-12 h-12 mx-auto"
                          />
                        )}
                        {tech === 'Firebase' && (
                          <img
                            src={firebase}
                            alt="Firebase"
                            className="w-8 h-8 mx-auto"
                          />
                        )}
                      </div>
                      <div className="font-semibold text-dark-gray text-sm">{tech}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-gdg-blue to-blue-600 rounded-2xl p-6 text-white text-center">
                  <div className="text-3xl font-bold mb-2">Next Event</div>
                  <div className="text-blue-100">Android Study Jam</div>
                  <div className="text-sm text-blue-200 mt-2">Jan 15, 2026 • 2:00 PM</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-gdg-green text-white px-4 py-2 rounded-2xl shadow-lg transform rotate-6">
                <div className="font-semibold">Workshop</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gdg-yellow text-dark-gray px-4 py-2 rounded-2xl shadow-lg transform -rotate-6">
                <div className="font-semibold">Free Event</div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </section>
  );
};

export default Hero;