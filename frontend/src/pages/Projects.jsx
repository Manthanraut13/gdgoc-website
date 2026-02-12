import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProjects } from '../services/api';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const projectCardsRef = useRef([]);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await getProjects();
        setProjects(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const displayProjects = projects;

  const filters = [
    { key: 'all', label: 'All Projects', icon: '🎯', count: displayProjects.length },
    { key: 'ongoing', label: 'In Progress', icon: '🚀', count: displayProjects.filter(p => p.status === 'ongoing').length },
    { key: 'completed', label: 'Completed', icon: '✅', count: displayProjects.filter(p => p.status === 'completed').length },
    { key: 'planning', label: 'Planning', icon: '📋', count: displayProjects.filter(p => p.status === 'planning').length }
  ];

  const categories = [
    { key: 'all', label: 'All Categories', icon: '🌈' },
    { key: 'mobile', label: 'Mobile', icon: '📱' },
    { key: 'web', label: 'Web', icon: '🌐' },
    { key: 'ai-ml', label: 'AI/ML', icon: '🧠' },
    { key: 'iot', label: 'IoT', icon: '🔌' }
  ];

  const filteredProjects = displayProjects.filter(project => {
    if (activeFilter === 'all') return true;
    return project.status === activeFilter;
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    gsap.fromTo('.page-hero-content',
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
      }
    );

    // Projects section animation
    gsap.fromTo(projectsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Animate projects when filters change
    const cards = document.querySelectorAll('.project-card');
    if (cards.length > 0) {
      animateProjectCards();
    }

  }, [activeFilter, viewMode, projects]);

  const animateProjectCards = () => {
    gsap.fromTo('.project-card',
      {
        y: 60,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      'ongoing': { bg: 'from-blue-500 to-cyan-500', text: 'text-blue-600', badge: 'bg-blue-50 text-blue-700' },
      'completed': { bg: 'from-green-500 to-emerald-500', text: 'text-green-600', badge: 'bg-green-50 text-green-700' },
      'planning': { bg: 'from-yellow-500 to-orange-500', text: 'text-yellow-600', badge: 'bg-yellow-50 text-yellow-700' },
      'archived': { bg: 'from-gray-500 to-slate-500', text: 'text-gray-600', badge: 'bg-gray-50 text-gray-700' }
    };
    return colors[status] || { bg: 'from-gray-500 to-slate-500', text: 'text-gray-600', badge: 'bg-gray-50 text-gray-700' };
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'mobile': '📱',
      'web': '🌐',
      'ai-ml': '🧠',
      'iot': '🔌',
      'cloud': '☁️',
      'blockchain': '⛓️',
      'cybersecurity': '🛡️'
    };
    return icons[category] || '🚀';
  };

  return (
    <div className="page-wrapper pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-[50vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gdg-blue rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gdg-green rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative">
          <div className="page-hero-content text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-soft mb-8">
              <div className="w-2 h-2 bg-gdg-blue rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-dark-gray">Innovation in Action</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-dark-gray mb-6 leading-tight">
              Building <span className="text-gradient">Solutions</span> That Matter
            </h1>

            <p className="text-xl text-medium-gray leading-relaxed max-w-3xl mx-auto">
              Explore the innovative projects our community is building to solve real-world problems
              and create meaningful impact on campus and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        className="section-padding bg-white relative overflow-hidden"
      >
        <div className="container-custom">
          {/* Filters & Controls */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              {/* Status Filters */}
              <div className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`px-4 py-2 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 ${activeFilter === filter.key
                      ? 'bg-gdg-blue text-white shadow-xl shadow-blue-200'
                      : 'bg-slate-100 text-medium-gray hover:bg-slate-200'
                      }`}
                  >
                    <span className="text-lg">{filter.icon}</span>
                    <span>{filter.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${activeFilter === filter.key ? 'bg-white/20' : 'bg-slate-200'}`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-slate-100 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${viewMode === 'grid' ? 'bg-white text-dark-gray shadow-md' : 'text-medium-gray'
                    }`}
                >
                  <span className="text-lg">⏹️</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${viewMode === 'list' ? 'bg-white text-dark-gray shadow-md' : 'text-medium-gray'
                    }`}
                >
                  <span className="text-lg">📋</span>
                </button>
              </div>
            </div>
          </div>

          {/* Projects Grid/List */}
          <div className={`${viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'space-y-6'
            }`}>
            {loading ? (
              <div className="col-span-full text-center py-20">
                <div className="w-16 h-16 border-4 border-gdg-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 font-medium">Loading our innovation portfolio...</p>
              </div>
            ) : filteredProjects.map((project, index) => (
              <div
                key={project._id}
                className="project-card group"
                onClick={() => setSelectedProject(project)}
              >
                <div className={`bg-white rounded-[2.5rem] shadow-soft hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-100 overflow-hidden cursor-pointer relative h-full flex flex-col ${viewMode === 'list' ? 'lg:flex-row' : ''
                  }`}>
                  {/* Project Visual */}
                  <div className={`${viewMode === 'list' ? 'lg:w-72 flex-shrink-0' : 'h-56'
                    } relative overflow-hidden`}>
                    <img
                      src={project.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Status Badge */}
                    <div className="absolute top-6 left-6">
                      <span className={`px-4 py-2 rounded-2xl text-xs font-bold shadow-lg backdrop-blur-md ${getStatusColor(project.status).badge}`}>
                        {getStatusColor(project.status).icon} {project.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Category Icon */}
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                      <span className="text-xl">{getCategoryIcon(project.category)}</span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-2xl font-poppins font-bold text-dark-gray mb-3 group-hover:text-gdg-blue transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-2 text-sm">
                      {project.description}
                    </p>

                    {/* Progress Bar */}
                    {project.status === 'ongoing' && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 mb-2 tracking-widest uppercase">
                          <span>Progress</span>
                          <span className="text-gdg-blue">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Bottom Info */}
                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex -space-x-3">
                        {(project.team || []).slice(0, 3).map((m, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500 overflow-hidden shadow-sm">
                            {m.image ? <img src={m.image} alt={m.name} /> : (m.name ? m.name[0] : '?')}
                          </div>
                        ))}
                        {(project.team || []).length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 shadow-sm">
                            +{(project.team || []).length - 3}
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        View Details <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="text-6xl mb-6">🔭</div>
              <h3 className="text-2xl font-bold text-dark-gray mb-2">No projects found in this category</h3>
              <p className="text-medium-gray mb-8">We're always brainstorming new ideas. Check back soon!</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="bg-white text-gdg-blue px-8 py-3 rounded-2xl font-bold shadow-soft hover:shadow-large transition-all"
              >
                Show All Projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* BIG CARD MODAL (Matching Events.jsx style) */}
      {selectedProject && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 lg:p-8 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-dark-gray/90 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          ></div>

          <div className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 duration-500">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-[1] bg-white/10 hover:bg-white/20 text-white backdrop-blur-md w-12 h-12 rounded-2xl flex items-center justify-center transition-all group lg:text-gray-900 lg:bg-gray-100 lg:hover:bg-gray-200"
            >
              <span className="text-2xl group-hover:rotate-90 transition-transform">✕</span>
            </button>

            {/* Left: Visual Component */}
            <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden">
              <img
                src={selectedProject.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute bottom-8 left-8 right-8">
                <span className={`px-4 py-2 rounded-2xl text-xs font-bold mb-4 inline-block backdrop-blur-md ${getStatusColor(selectedProject.status).badge}`}>
                  {getStatusColor(selectedProject.status).icon} {selectedProject.status.toUpperCase()}
                </span>
                <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-2 leading-tight">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-4 text-white/80 text-sm font-medium">
                  <span className="flex items-center gap-1.5">🌐 {selectedProject.category.toUpperCase()}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">⏱️ {selectedProject.timeline}</span>
                </div>
              </div>
            </div>

            {/* Right: Content Component */}
            <div className="lg:w-1/2 p-8 lg:p-12 overflow-y-auto bg-white flex flex-col">
              <div className="space-y-8">
                {/* description */}
                <div>
                  <h4 className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase mb-4">Overview</h4>
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    {selectedProject.detailedDescription || selectedProject.description}
                  </p>
                </div>

                {/* Long Description */}
                {(selectedProject.longDescription) && (
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-4">The Solution</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>
                )}

                {/* Progress */}
                {selectedProject.status === 'ongoing' && (
                  <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-blue-900 uppercase">Development Roadmap</span>
                      <span className="text-2xl font-black text-blue-600">{selectedProject.progress}%</span>
                    </div>
                    <div className="h-3 w-full bg-white rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                        style={{ width: `${selectedProject.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                {(selectedProject.technologies?.length > 0) && (
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((t, i) => (
                        <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold hover:bg-gdg-blue hover:text-white transition-all cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Team */}
                {(selectedProject.team?.length > 0) && (
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-4">The Team</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProject.team.map((m, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all group">
                          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-lg font-bold text-blue-600 overflow-hidden">
                            {m.image ? <img src={m.image} alt={m.name} className="w-full h-full object-cover" /> : (m.name ? m.name[0] : '?')}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{m.name || 'Anonymous'}</div>
                            <div className="text-xs text-gray-500 font-medium">{m.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery */}
                {(selectedProject.images?.length > 0) && (
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-4">Gallery</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProject.images.map((img, i) => (
                        <img key={i} src={img} className="rounded-2xl h-32 w-full object-cover shadow-sm hover:scale-105 transition-transform" />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Section */}
              <div className="mt-12 lg:mt-auto pt-8 border-t border-gray-100 flex flex-wrap gap-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    className="flex-1 min-w-[140px] bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all hover:-translate-y-1 shadow-xl"
                  >
                    <span>💻</span> GitHub
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    className="flex-1 min-w-[140px] bg-gdg-blue text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-blue-200 hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <span>🚀</span> Live Demo
                  </a>
                )}
                {selectedProject.documentation && (
                  <a
                    href={selectedProject.documentation}
                    target="_blank"
                    className="flex-1 min-w-[140px] bg-slate-100 text-slate-700 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all hover:-translate-y-1"
                  >
                    <span>📄</span> Docs
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;