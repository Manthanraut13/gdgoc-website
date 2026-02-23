import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Stats = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const spotlightRef = useRef(null);

  const stats = [
    { number: '500', label: 'Community Members', suffix: '+', gradient: 'from-blue-500 to-cyan-500', subtitle: 'Building together since 2023' },
    { number: '50', label: 'Events Organized', suffix: '+', gradient: 'from-green-500 to-emerald-500', subtitle: 'Knowledge sharing at scale' },
    { number: '25', label: 'Projects Completed', suffix: '+', gradient: 'from-purple-500 to-pink-500', subtitle: 'Real world impact solutions' },
    { number: '15', label: 'Workshops Conducted', suffix: '+', gradient: 'from-orange-500 to-red-500', subtitle: 'Hands-on technical training' }
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
    });

    // Spotlight movement
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      gsap.to(spotlightRef.current, {
        x,
        y,
        duration: 0.8,
        ease: 'power2.out'
      });
    };

    sectionRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };

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
      className="py-32 bg-slate-950 relative overflow-hidden group/stats"
    >
      {/* Ultra-Premium Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-gdg-blue/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-gdg-red/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Interactive Spotlight */}
        <div
          ref={spotlightRef}
          className="absolute -top-[500px] -left-[500px] w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(66,133,244,0.15),transparent_70%)] opacity-0 group-hover/stats:opacity-100 transition-opacity duration-1000"
        ></div>

        {/* Cyber Grid Overlay with Depth */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:160px_160px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)] opacity-40"></div>

        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>
      </div>

      <div className="container-custom relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-2xl px-6 py-2.5 rounded-full border border-white/10 mb-8 shadow-2xl group cursor-default">
            <span className="flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity">Our Global Impact</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-poppins font-black text-white mb-8 leading-[1.05] tracking-tight">
            Empowering The <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent italic drop-shadow-2xl">Digital Frontier.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium opacity-80">
            Join the movement that's redefining how students learn, collaborate, and innovate in the world of modern technology.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={addToStatsRef}
              className="relative group h-full perspective-1000"
            >
              <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/5 hover:border-white/20 transition-all duration-700 h-full flex flex-col items-center text-center hover:bg-white/[0.05] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] transform-gpu hover:translate-z-10 group-hover:rotate-x-2">

                {/* Advanced Icon Container */}
                <div className="relative mb-12 transform-gpu transition-transform duration-500 group-hover:scale-110">
                  <div className={`w-24 h-24 bg-gradient-to-br ${stat.gradient} rounded-[2rem] flex items-center justify-center text-white text-3xl shadow-2xl stat-icon relative z-10 group-hover:rotate-[15deg] transition-all duration-700`}>
                    {getStatIcon(index)}
                  </div>
                  <div className={`absolute -inset-4 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 blur-2xl animate-pulse rounded-full`}></div>
                </div>

                {/* Metallic / Gradient Number */}
                <div className="stat-number text-6xl md:text-7xl font-black text-white mb-4 font-poppins tracking-tighter bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                  0
                </div>

                {/* Label & Subtitle with Depth */}
                <div className="stat-label-container space-y-3">
                  <div className="text-white font-black text-2xl tracking-tight uppercase leading-none">
                    {stat.label}
                  </div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                    {stat.subtitle}
                  </p>
                </div>

                {/* Interactive Dynamic Line */}
                <div className="mt-10 w-full h-[1px] bg-white/5 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000 ease-out`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Closing CTA Bar */}
        <div className="mt-20 relative px-10 py-12 bg-white/[0.01] border border-white/5 rounded-[3rem] backdrop-blur-3xl overflow-hidden group/cta">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-[2000ms] skew-x-[-20deg]"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Become a Part of the Story</h3>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Empowering the next generation of innovators at ZCOER.</p>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link
                to="/join"
                className="group relative bg-white text-slate-950 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:-translate-y-1 transform transition-all duration-500 overflow-hidden shadow-2xl"
              >
                <span className="relative z-10 group-hover:text-white transition-colors">Join Now</span>
                <div className="absolute inset-0 bg-gdg-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              </Link>
              <Link
                to="/about"
                className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-500"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;