import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import android from "../../assets/tech/android-logo.png";
import machineLearning from "../../assets/tech/machine-learning.jpg";
import datascience from "../../assets/tech/data-science.png";
import cloud from "../../assets/tech/cloud-logo.png";
import firebase from "../../assets/tech/firebase-logo.png";
import react from "../../assets/tech/react.png";
import flutter from "../../assets/tech/flutter.png";

const AboutPreview = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section animation
    gsap.fromTo(sectionRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Content stagger animation
    gsap.fromTo('.about-content > *',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Stats counter animation
    const statElements = document.querySelectorAll('.stat-number');
    statElements.forEach((stat, index) => {
      const target = parseInt(stat.getAttribute('data-target'));
      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration: 2.5,
        delay: index * 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          stat.textContent = Math.floor(obj.value) + '+';
        }
      });
    });

    // Stats cards animation
    gsap.fromTo('.stat-card',
      { scale: 0.8, opacity: 0, rotationY: -15 },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        onStart: () => {
          // Trigger progress bars
          document.querySelectorAll('.stat-progress').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
          });
        }
      }
    );

  }, []);

  const addToStatsRef = (el) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current.push(el);
    }
  };

  const stats = [
    { number: '500', label: 'Active Members', gradient: 'from-blue-500 to-cyan-500', icon: '👥', width: '85%' },
    { number: '50', label: 'Events Hosted', gradient: 'from-green-500 to-emerald-500', icon: '🎯', width: '70%' },
    { number: '25', label: 'Projects', gradient: 'from-purple-500 to-pink-500', icon: '🚀', width: '60%' },
    { number: '12', label: 'Study Jams', gradient: 'from-orange-500 to-red-500', icon: '📚', width: '45%' }
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden py-32"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gdg-blue rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-gdg-red rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 left-1/2 w-72 h-72 bg-gdg-green rounded-full blur-[100px]"></div>
      </div>

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="about-content">
            <div className="inline-flex items-center space-x-3 bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-2xl shadow-sm mb-10">
              <div className="w-2.5 h-2.5 bg-gdg-blue rounded-full shadow-[0_0_8px_rgba(66,133,244,0.5)]"></div>
              <span className="text-xs font-black uppercase tracking-widest text-dark-gray">About ZCOER Chapter</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-black text-dark-gray mb-8 leading-[1.1]">
              Fueling Innovation <br />
              <span className="bg-gradient-to-r from-gdg-blue via-gdg-red to-gdg-yellow bg-clip-text text-transparent italic">Together.</span>
            </h2>

            <p className="text-xl text-medium-gray mb-10 leading-relaxed font-medium">
              GDG On-Campus ZCOER is a dynamic hub where student developers unite to push boundaries, learn Google technologies, and build impactful solutions for the global community.
            </p>

            <div className="space-y-6 mb-12">
              {[
                { title: 'Learn', desc: 'Deep dive into Android, Cloud, AI and Web with expert mentors.' },
                { title: 'Build', desc: 'Participate in hackathons and ship products that solve real problems.' },
                { title: 'Connect', desc: 'Join a network of 500+ like-minded developers and techies.' }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-gdg-blue flex-shrink-0 mt-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <span className="font-black text-dark-gray block text-lg">{item.title}</span>
                    <p className="text-medium-gray text-sm font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-5">
              <Link
                to="/about"
                className="btn-primary"
              >
                Discover Our Mission
              </Link>
              <Link
                to="/team"
                className="group flex items-center space-x-2 text-dark-gray font-bold hover:text-gdg-blue transition-colors px-6 py-3"
              >
                <span>The Core Team</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={addToStatsRef}
                className="stat-card"
              >
                <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-large border border-white/60 hover:border-white transition-all duration-500 group h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-[1.25rem] flex items-center justify-center text-white text-xl shadow-lg transform group-hover:rotate-6 transition-transform`}>
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-black text-dark-gray font-poppins stat-number" data-target={stat.number}>
                      0
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-dark-gray mb-2 tracking-tight">
                    {stat.label}
                  </h3>
                  <p className="text-medium-gray text-sm font-medium leading-relaxed mb-6">
                    Join our active members building the future.
                  </p>

                  {/* Enhanced Progress Bar */}
                  <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`stat-progress absolute top-0 left-0 h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-[2000ms] cubic-bezier(0.34, 1.56, 0.64, 1) shadow-[0_0_8px_rgba(0,0,0,0.1)]`}
                      style={{ width: '0%' }}
                      data-width={stat.width}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Showcase */}
        <div className="mt-32 pt-20 border-t border-slate-50">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-yellow-50 text-gdg-yellow px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest mb-4">
              <span>The Tech Playground</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-poppins font-black text-dark-gray mb-4 tracking-tight">
              Technologies We Hub
            </h3>
            <p className="text-medium-gray text-lg font-medium max-w-xl mx-auto italic">
              "Mastering the tools of today to build the world of tomorrow."
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-10">
            {[
              { name: 'Android', image: android, color: 'hover:bg-green-50 text-green-600' },
              { name: 'App Development', image: flutter, color: 'hover:bg-blue-50 text-blue-600' },
              { name: 'Google Cloud', image: cloud, color: 'hover:bg-indigo-50 text-indigo-600' },
              { name: 'Firebase', image: firebase, color: 'hover:bg-orange-50 text-orange-600' },
              { name: 'Data Intelligence', image: datascience, color: 'hover:bg-red-50 text-red-600' },
              { name: 'Machine Learning', image: machineLearning, color: 'hover:bg-cyan-50 text-cyan-600' }
            ].map((tech, index) => (
              <div key={index} className="group text-center">
                <div
                  className={`bg-white w-24 h-24 rounded-3xl flex items-center justify-center shadow-soft border border-gray-50 transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-large ${tech.color}`}
                >
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-14 h-14 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="mt-4 font-black text-dark-gray text-[10px] uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;