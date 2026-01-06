import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Stats = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);

  const stats = [
    { number: '500', label: 'Community Members', suffix: '+', gradient: 'from-blue-500 to-cyan-500' },
    { number: '50', label: 'Events Organized', suffix: '+', gradient: 'from-green-500 to-emerald-500' },
    { number: '25', label: 'Projects Completed', suffix: '+', gradient: 'from-purple-500 to-pink-500' },
    { number: '15', label: 'Workshops Conducted', suffix: '+', gradient: 'from-orange-500 to-red-500' }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section animation
    gsap.fromTo(sectionRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Counter animation for stats
    statsRef.current.forEach((stat, index) => {
      if (!stat) return;
      
      const numberElement = stat.querySelector('.stat-number');
      const target = parseInt(stats[index].number);
      const obj = { value: 0 };
      
      gsap.to(obj, {
        value: target,
        duration: 2.5,
        delay: index * 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          numberElement.textContent = Math.floor(obj.value) + stats[index].suffix;
        }
      });

      // Icon animation
      gsap.fromTo(stat.querySelector('.stat-icon'),
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 1,
          delay: 0.5 + (index * 0.4),
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: stat,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Label animation
      gsap.fromTo(stat.querySelector('.stat-label'),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 1 + (index * 0.4),
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stat,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

  }, []);

  const addToStatsRef = (el) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current.push(el);
    }
  };

  const getStatIcon = (index) => {
    const icons = ['👥', '🎯', '🚀', '📊'];
    return icons[index] || '⭐';
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-2xl font-semibold text-sm mb-6 border border-white/20">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span>Our Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
            Driving <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Innovation</span> Forward
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Empowering students to create, innovate, and lead in the world of technology
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              ref={addToStatsRef}
              className="text-center group"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-glow">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg mx-auto stat-icon group-hover:scale-110 transform transition-all duration-300`}>
                    {getStatIcon(index)}
                  </div>
                  <div className="absolute -inset-2 bg-white/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Number */}
                <div className="stat-number text-4xl md:text-5xl font-bold text-white mb-3 font-poppins">
                  {stat.number}{stat.suffix}
                </div>

                {/* Label */}
                <div className="stat-label text-blue-100 font-semibold text-lg">
                  {stat.label}
                </div>

                {/* Decorative Line */}
                <div className="mt-4 w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-poppins font-bold text-white mb-4">
              Ready to Make Your Mark?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Join our community and be part of the next generation of tech innovators and leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300 shadow-lg">
                Join Now
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 hover:scale-105 transform transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;