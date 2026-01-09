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
      const target = parseInt(stat.textContent);
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
    { number: '500', label: 'Active Members', gradient: 'from-blue-500 to-cyan-500', icon: '👥' },
    { number: '50', label: 'Events Hosted', gradient: 'from-green-500 to-emerald-500', icon: '🎯' },
    { number: '25', label: 'Projects', gradient: 'from-purple-500 to-pink-500', icon: '🚀' },
    { number: '12', label: 'Study Jams', gradient: 'from-orange-500 to-red-500', icon: '📚' }
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-gdg-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gdg-green rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="about-content">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-gdg-blue px-4 py-2 rounded-2xl font-semibold text-sm mb-8">
              <div className="w-2 h-2 bg-gdg-blue rounded-full animate-pulse"></div>
              <span>About GDG On-Campus</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-dark-gray mb-6 leading-tight">
              Building the Future of <span className="text-gradient">Tech Innovation</span>
            </h2>

            <p className="text-xl text-medium-gray mb-8 leading-relaxed">
              We are a vibrant community of student developers passionate about Google technologies.
              Our mission is to create an ecosystem where students can grow their skills, collaborate
              on innovative projects, and build meaningful connections.
            </p>

            <p className="text-lg text-medium-gray mb-8 leading-relaxed">
              Through hands-on workshops, hackathons, and study jams, we help students explore
              cutting-edge technologies like Android, Flutter, Firebase, Google Cloud, and Machine Learning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/about"
                className="btn-primary group relative overflow-hidden"
              >
                <span className="relative z-10">Learn Our Story</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-gdg-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/team"
                className="btn-secondary group"
              >
                <span>Meet Our Team</span>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={addToStatsRef}
                className="stat-card group"
              >
                <div className="bg-card-bg rounded-3xl p-6 shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-gray-200 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center text-white text-lg shadow-md`}>
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-dark-gray stat-number">
                      {stat.number}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-dark-gray mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-medium-gray text-sm leading-relaxed">
                    Join our growing community of innovators and creators
                  </p>

                  {/* Animated progress bar */}
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Showcase */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-poppins font-bold text-dark-gray mb-4">
              Technologies We <span className="text-gradient">Explore</span>
            </h3>
            <p className="text-medium-gray text-lg max-w-2xl mx-auto">
              Hands-on experience with Google's ecosystem and modern development tools
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'Android', image: android, color: 'from-green-400 to-emerald-500' },
              { name: 'Machine Learning', image: machineLearning, color: 'from-blue-400 to-cyan-500' },
              { name: 'Firebase', image: firebase, color: 'from-yellow-400 to-orange-500' },
              { name: 'Google Cloud', image: cloud, color: 'from-blue-500 to-indigo-600' },
              { name: 'Data Science', image: datascience, color: 'from-orange-500 to-red-500' },
              { name: 'react', image: react, color: 'from-red-500 to-pink-600' }
            ]
              .map((tech, index) => (
                <div key={index} className="group text-center">
                  <div
                    className={`bg-gradient-to-br ${tech.color} w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-3 transform transition-all duration-300 group-hover:scale-110`}
                  >
                    <div className="bg-white p-3 rounded-xl">
                      <img
                        src={tech.image}
                        alt={tech.name}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <span className="font-semibold text-dark-gray text-sm">
                    {tech.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;