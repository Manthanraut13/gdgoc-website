import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { submitJoinApplication } from "../services/api";

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    year: '',
    major: '',
    interests: [],
    experience: '',
    message: ''
  });

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const formRef = useRef(null);

  const benefits = [
    {
      icon: '🛡️',
      title: 'Architect Technologies',
      description: 'Master Google Cloud, Flutter, and AI through deep-intel study jams and hands-on laboratory sessions.'
    },
    {
      icon: '🌐',
      title: 'Global Mesh Network',
      description: 'Integrate with a worldwide cluster of elite developers and industry pioneers across over 100 countries.'
    },
    {
      icon: '🏛️',
      title: 'Career Dossier',
      description: 'Elevate your professional trajectory with high-impact internships and industry-standard technical certifications.'
    },
    {
      icon: '⚡',
      title: 'Rapid Prototyping',
      description: 'Transition from ideation to production-ready deployments with mentor-guided architectural support.'
    },
    {
      icon: '📡',
      title: 'Infrastructure Access',
      description: 'Gain specialized access to exclusive Google Cloud resources and emerging experimental hardware.'
    },
    {
      icon: '💎',
      title: 'Elite Recognition',
      description: 'Differentiate your profile with accredited project showcases and leadership badges within the GDG ecosystem.'
    }
  ];

  const interests = [
    'Android Systems',
    'Flutter SDK',
    'Frontend Engine',
    'Cloud Cluster',
    'Neural Networks',
    'UI Architect',
    'Infrastructure',
    'Kernel Lab'
  ];

  const experienceLevels = [
    'Apprentice',
    'Practitioner',
    'Architect'
  ];

  const splitText = (text) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block relative overflow-hidden mr-[0.2em] last:mr-0">
        <span className="inline-block translate-y-[110%] opacity-0 join-word">
          {word}
        </span>
      </span>
    ));
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.to('.join-word', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out',
        delay: 0.3
      });

      gsap.fromTo('.hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 0.6, duration: 1.5, ease: 'power3.out', delay: 0.8 }
      );

      // Benefits Stagger
      gsap.fromTo('.directive-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.directives-grid',
            start: 'top 85%'
          }
        }
      );

      // Portal Entrance
      gsap.fromTo('.registration-portal',
        { y: 100, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.registration-portal',
            start: 'top 90%'
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          interests: [...prev.interests, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          interests: prev.interests.filter(interest => interest !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitJoinApplication(formData);
      alert("Registration Successful. Intel Received.");
      setFormData({
        name: "",
        email: "",
        year: "",
        major: "",
        interests: [],
        experience: "",
        message: ""
      });
    } catch {
      alert("Uplink Failure. Please retry.");
    }
  };

  return (
    <div ref={pageRef} className="bg-white min-h-screen selection:bg-blue-600/10 overflow-hidden">

      {/* Hero Section: The Entrance Portal */}
      <section ref={heroRef} className="min-h-[75vh] bg-slate-950 relative flex items-center justify-center overflow-hidden pt-20 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[160px]"></div>
          <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-teal-600/5 rounded-full blur-[160px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        </div>

        <div className="container-custom relative z-10 px-6">
          <div className="text-center max-w-6xl mx-auto">
            <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-3xl border border-white/10 px-8 py-3 rounded-full mb-12 shadow-2xl">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-100/70">Protocol Recruitment / Phase 2</span>
            </div>

            <h1 className="text-6xl md:text-[11rem] font-poppins font-black text-white leading-[0.8] tracking-tighter mb-14 uppercase">
              {splitText("JOIN THE COMMUNITY")}
            </h1>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Directives Section: Benefits of Connection */}
      <section className="relative z-20 py-32 bg-white">
        <div className="container-custom px-6 lg:px-12">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-poppins font-black text-slate-950 mb-8 tracking-tighter">Operational <span className="italic text-slate-400">Directives.</span></h2>
            <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              Integration grants access to specialized operational subsystems designed to accelerate your technical and professional development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 directives-grid">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="directive-card group flex flex-col h-full bg-slate-50/50 p-12 rounded-[3.5rem] border border-slate-100 hover:bg-white hover:shadow-[0_60px_120px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl mb-10 group-hover:bg-slate-950 group-hover:text-white transition-colors duration-500">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-poppins font-black text-slate-900 mb-6 tracking-tight group-hover:text-blue-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Portal: Registration Form */}
      <section className="py-48 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blue-50 rounded-full blur-[140px]"></div>

        <div className="container-custom px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="registration-portal bg-white rounded-[5rem] shadow-[0_100px_200px_rgba(0,0,0,0.1)] overflow-hidden border border-white p-10 md:p-24">

              <div className="text-center mb-24">
                <div className="inline-block px-8 py-3 rounded-full bg-slate-50 border border-slate-100 text-blue-600 text-[9px] font-black uppercase tracking-[0.5em] mb-10 italic">Secure Uplink Portal</div>
                <h2 className="text-4xl md:text-7xl font-poppins font-black text-slate-950 tracking-tighter mb-8 leading-none">Initialize <span className="italic text-slate-400">Intake.</span></h2>
                <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                  Complete the credentials below to authorize your membership. Our recruitment team will review your dossier within 48 operational hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Personal Intel Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-4">Identification Protocol</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="FULL NAME"
                      required
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-10 py-6 text-sm font-black text-slate-950 placeholder-slate-300 focus:outline-none focus:border-blue-500/30 transition-all"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-4">Digital Communications</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="EMAIL ADDRESS"
                      required
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-10 py-6 text-sm font-black text-slate-950 placeholder-slate-300 focus:outline-none focus:border-blue-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Academic Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-4">Temporal Academic Rank</label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-10 py-6 text-sm font-black text-slate-900 focus:outline-none focus:border-blue-500/30 transition-all appearance-none"
                    >
                      <option value="">SELECT YEAR...</option>
                      <option value="Freshman">FRESHMAN</option>
                      <option value="Sophomore">SOPHOMORE</option>
                      <option value="Junior">JUNIOR</option>
                      <option value="Senior">SENIOR</option>
                      <option value="Graduate">GRADUATE</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-4">Primary Technical Sector</label>
                    <input
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      placeholder="FIELD OF STUDY (E.G. CS)"
                      required
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-10 py-6 text-sm font-black text-slate-950 placeholder-slate-300 focus:outline-none focus:border-blue-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Interest Cluster */}
                <div className="space-y-8 py-8 border-y border-slate-50">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 block text-center">Operational Interests Checklist</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {interests.map((interest) => (
                      <label key={interest} className={`flex items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer font-black text-[9px] uppercase tracking-widest ${formData.interests.includes(interest) ? 'bg-slate-950 border-slate-950 text-white shadow-xl scale-105' : 'bg-white border-slate-100 text-slate-400 hober:border-slate-200'}`}>
                        <input
                          type="checkbox"
                          value={interest}
                          checked={formData.interests.includes(interest)}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <span>{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience Rank */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-4 text-center block">Technical Proficiency Baseline</label>
                  <div className="flex flex-wrap justify-center gap-6">
                    {experienceLevels.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, experience: lvl }))}
                        className={`px-12 py-5 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${formData.experience === lvl ? 'bg-blue-600 text-white shadow-2xl scale-110' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Narrative Mission Statement */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-4">Narrative Intent (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="DEFINE YOUR TECHNICAL OBJECTIVES AND INTENT WITHIN THE COMMUNITY..."
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-[3rem] px-10 py-8 text-sm font-black text-slate-950 placeholder-slate-300 focus:outline-none focus:border-blue-500/30 transition-all resize-none"
                  />
                </div>

                {/* Action Terminal */}
                <div className="text-center pt-10">
                  <button
                    type="submit"
                    className="bg-slate-950 text-white px-20 py-8 rounded-[2.5rem] font-black text-[14px] uppercase tracking-[0.5em] hover:bg-blue-600 hover:shadow-[0_40px_100px_rgba(66,133,244,0.3)] transition-all active:scale-95 transform"
                  >
                    Authorize Membership
                  </button>
                  <p className="text-[10px] text-slate-300 font-bold mt-8 tracking-widest uppercase italic">Secure Uplink Terminal v4.0 // 256-bit Encryption Active</p>
                </div>
              </form>
            </div>

            {/* External Protocol Link */}
            <div className="text-center mt-20">
              <p className="text-slate-400 text-sm font-medium mb-8">Execute enrollment via alternative external protocol?</p>
              <a
                href="https://forms.gle/yhqSrUX4P5VAz8nz9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-4 bg-slate-950/5 hover:bg-slate-950 hover:text-white px-10 py-5 rounded-2xl transition-all duration-500 font-black text-[10px] uppercase tracking-widest"
              >
                <span>Via Google Engine Forms</span>
                <span className="text-lg">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Buffer Section */}
      <section className="bg-white py-24"></section>
    </div>
  );
};

export default JoinUs;