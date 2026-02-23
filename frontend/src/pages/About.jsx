import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About = () => {
  const pageRef = useRef(null);
  const spotlightRef = useRef(null);
  const magneticCtaRef = useRef(null);

  const values = [
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and encourage creative problem-solving.',
      color: 'text-gdg-blue',
      glow: 'shadow-blue-500/20'
    },
    {
      icon: '👥',
      title: 'Community',
      description: 'We believe in the power of collaboration and building together.',
      color: 'text-gdg-red',
      glow: 'shadow-red-500/20'
    },
    {
      icon: '🌱',
      title: 'Growth',
      description: 'We foster continuous learning and personal development for all members.',
      color: 'text-gdg-green',
      glow: 'shadow-green-500/20'
    },
    {
      icon: '💡',
      title: 'Excellence',
      description: 'We strive for quality in everything we do, from events to projects.',
      color: 'text-gdg-yellow',
      glow: 'shadow-yellow-500/20'
    }
  ];

  const timeline = [
    {
      year: '2022',
      title: 'GDG On-Campus Founded',
      description: 'Launched with 50 founding members and our first Android workshop series.',
      color: 'bg-gdg-blue'
    },
    {
      year: '2023',
      title: 'Community Growth',
      description: 'Expanded to 300+ members with monthly hackathons and study jams.',
      color: 'bg-gdg-green'
    },
    {
      year: '2024',
      title: 'Innovation Hub',
      description: 'Became the premier tech community on campus with industry partnerships.',
      color: 'bg-gdg-red'
    }
  ];

  // Split text for word-by-word animation
  const splitText = (text) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block relative overflow-hidden mr-[0.25em] last:mr-0">
        <span className="inline-block translate-y-full opacity-0 about-word-anim">
          {word}
        </span>
      </span>
    ));
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    // Hero Reveal
    tl.to('.about-word-anim', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'expo.out'
    })
      .fromTo('.about-hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 0.7, duration: 1.2, ease: 'power3.out' },
        '-=0.7'
      );

    // Section reveal animations
    const sections = ['.reveal-mission', '.reveal-values', '.reveal-timeline', '.reveal-conduct'];
    sections.forEach(selector => {
      gsap.fromTo(selector,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: selector,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Interactive Spotlight & Parallax
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (!pageRef.current) return;
      const rect = pageRef.current.getBoundingClientRect();
      const x = clientX;
      const y = clientY + window.scrollY;

      gsap.to(spotlightRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Global Parallax
      const xPos = (clientX / window.innerWidth - 0.5) * 2;
      const yPos = (clientY / window.innerHeight - 0.5) * 2;
      gsap.to('.about-bg-icon', {
        x: xPos * 40,
        y: yPos * 40,
        duration: 2.5,
        ease: 'power2.out',
        stagger: 0.1
      });

      // Magnetic CTA
      if (magneticCtaRef.current) {
        const ctaRect = magneticCtaRef.current.getBoundingClientRect();
        const ctaCenterX = ctaRect.left + ctaRect.width / 2;
        const ctaCenterY = ctaRect.top + ctaRect.height / 2;
        const dist = Math.hypot(clientX - ctaCenterX, clientY - ctaCenterY);

        if (dist < 150) {
          const mX = (clientX - ctaCenterX) * 0.4;
          const mY = (clientY - ctaCenterY) * 0.4;
          gsap.to(magneticCtaRef.current, {
            x: mX,
            y: mY,
            scale: 1.05,
            duration: 0.4,
            ease: 'power2.out'
          });
        } else {
          gsap.to(magneticCtaRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCardTilt = (e, cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = (y - centerY) * 0.05;
    const rY = (centerX - x) * 0.05;

    gsap.to(cardEl, {
      rotateX: rX,
      rotateY: rY,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const resetCardTilt = (cardEl) => {
    if (!cardEl) return;
    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <div ref={pageRef} className="page-wrapper bg-slate-950 text-white selection:bg-gdg-blue/30 overflow-hidden">

      {/* Global Interactive Elements */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div
          ref={spotlightRef}
          className="absolute -top-[500px] -left-[500px] w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(66,133,244,0.08),transparent_70%)] opacity-0 lg:opacity-100 transition-opacity duration-1000"
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full">
        {[
          { icon: '</>', top: '15%', left: '8%', size: 'text-6xl' },
          { icon: '{ }', top: '25%', right: '12%', size: 'text-5xl' },
          { icon: '✕', bottom: '20%', left: '18%', size: 'text-3xl' },
          { icon: '○', bottom: '65%', right: '10%', size: 'text-7xl' }
        ].map((item, i) => (
          <div key={i} className={`about-bg-icon absolute text-white/[0.03] font-black ${item.size}`} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}>
            {item.icon}
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative pt-20">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-2xl px-6 py-2.5 rounded-full border border-white/10 mb-10 shadow-2xl">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gdg-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gdg-blue"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gdg-blue opacity-70">Chapter ZCOER</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-poppins font-black text-white mb-10 leading-[0.95] tracking-tighter">
              <div className="block">
                {splitText("Building The")}
              </div>
              <div className="block mt-2">
                <span className="text-6xl md:text-8xl lg:text-[7rem] font-poppins font-black text-white mb-10 leading-[0.95] tracking-tighter">
                  {splitText("Digital Legacy.")}
                </span>
              </div>
            </h1>

            <p className="about-hero-sub text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium opacity-70">
              Transforming curiosity into expertise. Join a global pulse of innovators dedicated to mastering the technologies of tomorrow, today.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding relative overflow-hidden reveal-mission">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Mission Visual Card */}
            <div
              onMouseMove={(e) => handleCardTilt(e, e.currentTarget)}
              onMouseLeave={(e) => resetCardTilt(e.currentTarget)}
              className="relative group transform-gpu perspective-2000"
            >
              <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] p-12 border border-white/5 shadow-2xl relative overflow-hidden transition-all duration-700 hover:border-white/20 hover:bg-white/[0.04]">
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-gdg-blue/10 rounded-full blur-[80px]"></div>
                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gdg-red/10 rounded-full blur-[80px]"></div>

                <h3 className="text-4xl font-black text-white mb-10 font-poppins leading-tight tracking-tight">
                  Empowering <br />
                  <span className="text-gdg-blue">Leaders.</span>
                </h3>

                <div className="space-y-6">
                  {[
                    "Bridge academic-industry gaps",
                    "Master emerging stack paradigms",
                    "Lead high-impact projects",
                    "Scale community-first innovation"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center space-x-4 group/item cursor-default">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:border-gdg-blue transition-all">
                        <div className="w-1.5 h-1.5 bg-gdg-blue rounded-full"></div>
                      </div>
                      <span className="text-slate-400 font-bold text-sm tracking-wide group-hover/item:text-white transition-colors capitalize">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-gdg-blue to-cyan-500 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            </div>

            {/* Mission Text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-3 bg-white/5 px-5 py-2 rounded-full border border-white/10 mb-8">
                <span className="text-[10px] font-black text-gdg-blue uppercase tracking-[0.4em]">Our Mission</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-poppins font-black text-white mb-8 leading-tight tracking-tight">
                Architecting <br />
                The <span className="italic text-slate-500">Next Gen.</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8 font-medium opacity-80">
                We don't just teach code; we cultivate a mindset. Our ecosystem at ZCOER is designed to turn theoretical potential into field-ready mastery, ensuring every member is prepared for the rapid evolution of the tech industry.
              </p>
              <div className="grid grid-cols-2 gap-8 text-left">
                <div>
                  <div className="text-4xl font-black text-white mb-2 font-poppins">98%</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Skill Growth</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-white mb-2 font-poppins">50+</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Live Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-slate-950/50 reveal-values">
        <div className="container-custom relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-poppins font-black text-white mb-8 tracking-tighter">
              Core <span className="text-gradient">Principles.</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium opacity-70">
              The foundational DNA that guides every workshop, project, and interaction within our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                onMouseMove={(e) => handleCardTilt(e, e.currentTarget)}
                onMouseLeave={(e) => resetCardTilt(e.currentTarget)}
                className="transform-gpu perspective-1000"
              >
                <div className="h-full bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col items-center text-center shadow-xl group">
                  <div className={`w-20 h-20 rounded-[1.5rem] bg-slate-900 border border-white/5 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:shadow-2xl ${v.glow} transition-all duration-500 shadow-inner`}>
                    {v.icon}
                  </div>
                  <h3 className={`text-2xl font-black font-poppins mb-6 ${v.color}`}>{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{v.description}</p>
                  <div className={`mt-10 h-1 w-12 rounded-full opacity-20 bg-current ${v.color}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding reveal-timeline">
        <div className="container-custom relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-3 bg-white/5 px-5 py-2 rounded-full border border-white/10 mb-8">
              <span className="text-[10px] font-black text-gdg-green uppercase tracking-[0.4em]">Historical Log</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-poppins font-black text-white mb-8 tracking-tighter">
              Our <span className="italic text-slate-500">Timeline.</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-[1px] bg-gradient-to-b from-gdg-blue via-gdg-red to-gdg-yellow opacity-10 hidden md:block"></div>

            {timeline.map((t, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center justify-between mb-20 last:mb-0 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                <div className="w-full md:w-[45%]">
                  <div
                    onMouseMove={(e) => handleCardTilt(e, e.currentTarget)}
                    onMouseLeave={(e) => resetCardTilt(e.currentTarget)}
                    className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-10 rounded-[2.5rem] shadow-2xl hover:bg-white/[0.04] transition-all duration-500"
                  >
                    <div className={`inline-block mb-6 px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-[0.3em] ${t.color}`}>
                      Session {t.year}
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 font-poppins">{t.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{t.description}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-800 z-10 hidden md:block shadow-[0_0_15px_rgba(255,255,255,0.1)]"></div>

                <div className="w-full md:w-[45%] h-full hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code of Conduct Section */}
      <section className="section-padding bg-slate-950 reveal-conduct">
        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-[4rem] p-12 md:p-20 border border-white/5 shadow-2xl relative overflow-hidden group/conduct">

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center space-x-3 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 mb-10">
                  <span className="w-2 h-2 bg-gdg-green rounded-full animate-pulse shadow-[0_0_10px_#0f9d58]"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50">Safe Ecosystem</span>
                </div>

                <h2 className="text-5xl md:text-7xl font-poppins font-black text-white mb-10 tracking-tighter">
                  Community <br />
                  <span className="text-gradient">Protocol.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-20">
                  {[
                    { t: 'Extreme Respect', d: 'Value diverse styles and viewpoints. Disagreement is no excuse for poor manners.', i: '🤝' },
                    { t: 'Radical Inclusion', d: 'Diversity powers innovation. We actively seek perspectives outside the norm.', i: '🌍' },
                    { t: 'High Collaboration', d: 'Build together. Our collective power defines our community strength.', i: '🚀' },
                    { t: 'Domain Excellence', d: 'Keep communication professional and focused on technological advancement.', i: '🔥' }
                  ].map((p, i) => (
                    <div key={i} className="p-8 bg-white/[0.02] rounded-[2rem] border border-white/5 hover:bg-white/[0.05] transition-all duration-300">
                      <div className="text-3xl mb-4">{p.i}</div>
                      <h4 className="text-xl font-black text-white mb-3 font-poppins">{p.t}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium opacity-80">{p.d}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-24">
                  <div ref={magneticCtaRef} className="inline-block">
                    <a
                      href="https://forms.gle/8MPZkSyVaAJ33XkEA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative bg-white text-dark-gray px-12 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(255,255,255,0.05)] hover:shadow-glow transition-all duration-500 block overflow-hidden"
                    >
                      <span className="relative z-10">Report An Incident</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-white transition-opacity"></div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative Shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gdg-blue/5 via-transparent to-transparent opacity-0 group-hover/conduct:opacity-100 transition-opacity duration-1000"></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;