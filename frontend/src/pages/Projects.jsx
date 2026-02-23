import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProjects } from '../services/api';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await getProjects();
        setProjects(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filters = [
    { key: 'all', label: 'All Projects', icon: '🎯' },
    { key: 'ongoing', label: 'Active Sprints', icon: '🚀' },
    { key: 'completed', label: 'Completed', icon: '✅' },
    { key: 'planning', label: 'In Planning', icon: '📋' }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    return project.status === activeFilter;
  });

  const splitText = (text) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block relative overflow-hidden mr-[0.2em] last:mr-0">
        <span className="inline-block translate-y-[110%] opacity-0 premium-word">
          {word}
        </span>
      </span>
    ));
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Entry Animation
    const ctx = gsap.context(() => {
      gsap.to('.premium-word', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out',
        delay: 0.5
      });

      gsap.fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 0.7, duration: 1.5, ease: 'power3.out', delay: 1 }
      );

      gsap.fromTo('.hero-gradient-bg',
        { opacity: 0, scale: 0.8 },
        { opacity: 0.4, scale: 1, duration: 3, ease: 'power2.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.project-card-premium',
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: '.projects-grid-container',
              start: 'top 85%'
            }
          }
        );
      });
      return () => ctx.revert();
    }
  }, [activeFilter, loading]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.4,
      ease: 'power3.inOut',
      onComplete: () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto';
      }
    });
  };

  const statusColors = {
    ongoing: 'from-blue-500 to-cyan-400',
    completed: 'from-green-500 to-emerald-400',
    planning: 'from-orange-500 to-amber-400'
  };

  return (
    <div ref={pageRef} className="bg-white min-h-screen selection:bg-blue-600/10">

      {/* Hero Section: Cinematic Dark High-End */}
      <section ref={heroRef} className="min-h-[75vh] bg-slate-950 relative flex items-center justify-center overflow-hidden pt-20 pb-20">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="hero-gradient-bg absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/20 rounded-full blur-[120px]"></div>
          <div className="hero-gradient-bg absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
        </div>

        <div className="container-custom relative z-10 px-6">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-full mb-12 shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200/80">Innovation Portfolio</span>
            </div>

            <h1 className="text-6xl md:text-[9.5rem] font-poppins font-black text-white leading-[0.9] tracking-tight mb-14 drop-shadow-2xl">
              {splitText("CRAFTING THE FUTURE.")}
            </h1>
          </div>
        </div>

        {/* Elegant Bottom Transition */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Projects Grid Section: Clean High-End Light */}
      <section className="relative z-20 pb-40">
        <div className="container-custom px-6 lg:px-12">

          {/* Controls / Filter Bar */}
          <div className="flex justify-center -translate-y-16 mb-24">
            <div className="bg-white p-3 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-wrap justify-center items-center gap-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`px-10 py-4.5 rounded-[3rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 flex items-center space-x-3 ${activeFilter === f.key
                    ? 'bg-slate-950 text-white shadow-2xl scale-[1.05]'
                    : 'text-slate-400 hover:text-slate-950 hover:bg-slate-50'
                    }`}
                >
                  <span className="text-xl">{f.icon}</span>
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-56">
              <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-8 text-slate-400 font-bold uppercase tracking-[0.3em] text-[11px]">Syncing Archive...</p>
            </div>
          ) : (
            <div className="projects-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {filteredProjects.map((project) => (
                <div
                  key={project._id}
                  className="project-card-premium group cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="bg-white rounded-[4rem] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] hover:shadow-[0_60px_120px_rgba(0,0,0,0.08)] transition-all duration-700 overflow-hidden transform group-hover:-translate-y-4 h-full flex flex-col">

                    {/* Visual Area */}
                    <div className="relative h-72 overflow-hidden bg-slate-50">
                      <img
                        src={project.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                      {/* Category Badge */}
                      <div className="absolute top-8 right-8 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                        <div className="bg-white/95 backdrop-blur-xl px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-950 shadow-2xl">
                          {project.category || 'Architecture'}
                        </div>
                      </div>

                      {/* Status Indicator */}
                      <div className="absolute bottom-8 left-8">
                        <div className="bg-white/95 backdrop-blur-xl px-5 py-2 rounded-2xl flex items-center space-x-3 shadow-xl border-l-4 border-blue-500">
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                          <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.2em]">{project.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-12 flex-grow flex flex-col">
                      <h3 className="text-3xl font-poppins font-black text-slate-950 leading-tight mb-6 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium line-clamp-2 opacity-80">
                        {project.description}
                      </p>

                      {(project.status === 'ongoing' && project.progress) && (
                        <div className="mb-10">
                          <div className="flex justify-between text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-3">
                            <span>Load Status</span>
                            <span className="text-blue-600">{project.progress}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-slate-950 rounded-full transition-all duration-[2s]`}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="mt-auto pt-10 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex -space-x-4">
                          {(project.team || []).slice(0, 4).map((m, i) => (
                            <div key={i} className="w-11 h-11 rounded-2xl bg-slate-100 border-4 border-white flex items-center justify-center text-[10px] font-black text-slate-500 overflow-hidden shadow-sm hover:z-10 transition-transform hover:-translate-y-2">
                              {m.image ? <img src={m.image} alt={m.name} className="w-full h-full object-cover" /> : (m.name ? m.name[0] : '?')}
                            </div>
                          ))}
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-slate-950 group-hover:text-white transition-all duration-500 group-hover:rotate-45">
                          <span className="text-2xl font-light">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal: Stunning Dossier Style */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl px-6" onClick={closeModal}></div>

          <div
            ref={modalRef}
            className="bg-white w-full max-w-5xl h-full max-h-[85vh] rounded-[4rem] shadow-[0_100px_200px_rgba(0,0,0,0.4)] relative z-10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-500"
          >
            {/* Header: Cinematic Visual */}
            <div className="relative h-[40vh] md:h-[50vh] flex-shrink-0">
              <img
                src={selectedProject.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>

              <button
                onClick={closeModal}
                className="absolute top-10 right-10 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-3xl text-white flex items-center justify-center transition-all group lg:text-slate-950 lg:bg-white lg:hover:bg-slate-100"
              >
                <span className="text-2xl group-hover:rotate-90 transition-transform">✕</span>
              </button>

              <div className="absolute bottom-10 left-10 md:left-20">
                <div className={`inline-flex items-center space-x-3 bg-white/95 px-5 py-2 rounded-2xl shadow-xl border-l-4 border-blue-500 mb-6`}>
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.2em]">{selectedProject.status} Protocol</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-poppins font-black text-slate-950 leading-[1] tracking-tight">
                  {selectedProject.title}
                </h2>
              </div>
            </div>

            {/* Content Segment */}
            <div className="flex-grow overflow-y-auto p-10 md:p-20 custom-scrollbar">
              <div className="max-w-4xl mx-auto space-y-16">

                {/* Summary Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-y border-slate-100">
                  <div className="space-y-4">
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Project Timeline</div>
                    <div className="text-xl font-black text-slate-950">{selectedProject.timeline || 'Q1 2024 Deployment'}</div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Core Discipline</div>
                    <div className="text-xl font-black text-blue-600 uppercase italic">/ {selectedProject.category || 'Engineering'}</div>
                  </div>
                </div>

                {/* Detailed Intel */}
                <div className="prose prose-slate max-w-none">
                  <div className="flex items-center space-x-6 mb-10">
                    <div className="h-[2px] w-12 bg-slate-950"></div>
                    <h4 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.6em] m-0">Intel Briefing</h4>
                  </div>
                  <p className="text-slate-700 text-xl md:text-2xl leading-relaxed font-bold opacity-80 mb-12">
                    {selectedProject.detailedDescription || selectedProject.description}
                  </p>
                </div>

                {/* Operational Matrix (Tech & Team) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {selectedProject.technologies?.length > 0 && (
                    <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-100">
                      <h4 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.4em] mb-10 flex items-center">
                        <span className="w-3 h-3 bg-blue-600 rounded-full mr-4"></span>
                        Operational Stack
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.technologies.map((t, i) => (
                          <span key={i} className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.team?.length > 0 && (
                    <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-100">
                      <h4 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.4em] mb-10 flex items-center">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-4"></span>
                        Component Squad
                      </h4>
                      <div className="space-y-6">
                        {selectedProject.team.map((m, i) => (
                          <div key={i} className="flex items-center space-x-5 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-sm font-black text-blue-600 overflow-hidden">
                              {m.image ? <img src={m.image} alt={m.name} className="w-full h-full object-cover" /> : (m.name ? m.name[0] : '?')}
                            </div>
                            <div>
                              <div className="font-black text-slate-950 text-sm tracking-tight">{m.name}</div>
                              <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{m.role}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Activation Command Bar */}
                <div className="pt-20 border-t border-slate-100 flex flex-wrap gap-6 mb-10">
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px]">
                      <button className="w-full bg-slate-950 text-white py-8 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.5em] hover:bg-slate-800 transition-all shadow-2xl">
                        Initiate Uplink
                      </button>
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px]">
                      <button className="w-full bg-blue-600 text-white py-8 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.5em] hover:bg-blue-500 transition-all shadow-2xl">
                        Launch Solution
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global CTA: Consistent Final Section */}
      <section className="bg-slate-950 py-48 md:py-64 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <div className="inline-block px-8 py-3 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.6em] mb-12">System Deployment</div>
          <h2 className="text-6xl md:text-9xl font-poppins font-black text-white leading-[0.9] tracking-tighter mb-16 italic">
            CRAFT THE<br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">IMPOSSIBLE.</span>
          </h2>
          <p className="text-slate-400 text-xl md:text-3xl font-medium max-w-4xl mx-auto leading-relaxed mb-24 opacity-80">
            Our repository is a living organism. Join the core development squad and start pushing the boundaries of what's buildable.
          </p>
          <button className="bg-white text-slate-950 px-20 py-8 rounded-full font-black text-[13px] uppercase tracking-[0.5em] hover:shadow-[0_0_80px_rgba(255,255,255,0.2)] transition-all hover:scale-110 active:scale-95">
            Commit To Mission
          </button>
        </div>
      </section>
    </div>
  );
};

export default Projects;