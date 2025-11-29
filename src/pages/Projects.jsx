import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const projectCardsRef = useRef([]);

  const projects = [
    {
      id: 1,
      title: "Campus Navigation App",
      description: "A Flutter-based mobile application that helps students navigate campus with real-time updates, event discovery, and interactive maps. Features include indoor navigation and AR wayfinding.",
      status: "ongoing",
      progress: 75,
      category: "mobile",
      tech: ["Flutter", "Firebase", "Google Maps API", "Dart", "ARCore"],
      team: ["Alex Johnson", "Sarah Chen", "Mike Rodriguez"],
      github: "https://github.com/gdg/campus-nav",
      demo: "https://campus-nav.demo.com",
      timeline: "6 months",
      impact: "Helping 5000+ students navigate campus daily"
    },
    {
      id: 2,
      title: "Study Group Platform",
      description: "Web platform for students to form study groups, share resources, and collaborate on assignments in real-time. Includes video conferencing and collaborative document editing.",
      status: "completed",
      progress: 100,
      category: "web",
      tech: ["React", "Node.js", "MongoDB", "Socket.io", "WebRTC"],
      team: ["David Kim", "Lisa Wang", "Emily Watson"],
      github: "https://github.com/gdg/study-groups",
      demo: "https://study-groups.demo.com",
      timeline: "4 months",
      impact: "200+ active study groups formed"
    },
    {
      id: 3,
      title: "GDG Event Manager",
      description: "Internal tool for managing GDG events, member registrations, and automated communication workflows. Streamlines event planning and participant engagement.",
      status: "ongoing",
      progress: 60,
      category: "web",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "SendGrid"],
      team: ["John Smith", "Maria Garcia"],
      github: "https://github.com/gdg/event-manager",
      demo: null,
      timeline: "3 months",
      impact: "Automating event management for 50+ events yearly"
    },
    {
      id: 4,
      title: "AI Learning Assistant",
      description: "Machine learning-powered chatbot that helps students with programming questions and learning resources. Uses natural language processing to provide personalized assistance.",
      status: "planning",
      progress: 20,
      category: "ai-ml",
      tech: ["Python", "TensorFlow", "FastAPI", "React", "Docker"],
      team: ["Chris Lee", "Anna Brown"],
      github: null,
      demo: null,
      timeline: "8 months",
      impact: "Providing 24/7 programming assistance to students"
    },
    {
      id: 5,
      title: "Eco Campus Initiative",
      description: "IoT-based sustainability platform that monitors campus energy consumption and provides insights for reducing carbon footprint. Includes smart sensors and data visualization.",
      status: "ongoing",
      progress: 45,
      category: "iot",
      tech: ["Python", "Raspberry Pi", "AWS IoT", "React", "D3.js"],
      team: ["Tom Wilson", "Sarah Martinez"],
      github: "https://github.com/gdg/eco-campus",
      demo: "https://eco-campus.demo.com",
      timeline: "5 months",
      impact: "Monitoring 10 campus buildings for energy efficiency"
    },
    {
      id: 6,
      title: "Code Review Platform",
      description: "Platform for peer code reviews and collaborative learning. Features include automated code analysis, review workflows, and learning progress tracking.",
      status: "completed",
      progress: 100,
      category: "web",
      tech: ["Vue.js", "Express.js", "MySQL", "Docker", "GitHub API"],
      team: ["Kevin Davis", "Rachel Green"],
      github: "https://github.com/gdg/code-review",
      demo: "https://code-review.demo.com",
      timeline: "6 months",
      impact: "5000+ code reviews conducted"
    }
  ];

  const filters = [
    { key: 'all', label: 'All Projects', icon: '🎯', count: projects.length },
    { key: 'ongoing', label: 'In Progress', icon: '🚀', count: projects.filter(p => p.status === 'ongoing').length },
    { key: 'completed', label: 'Completed', icon: '✅', count: projects.filter(p => p.status === 'completed').length },
    { key: 'planning', label: 'Planning', icon: '📋', count: projects.filter(p => p.status === 'planning').length }
  ];

  const categories = [
    { key: 'all', label: 'All Categories', icon: '🌈' },
    { key: 'mobile', label: 'Mobile', icon: '📱' },
    { key: 'web', label: 'Web', icon: '🌐' },
    { key: 'ai-ml', label: 'AI/ML', icon: '🧠' },
    { key: 'iot', label: 'IoT', icon: '🔌' }
  ];

  const filteredProjects = projects.filter(project => {
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
    animateProjectCards();

  }, [activeFilter, viewMode]);

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

  const addToProjectCardsRef = (el) => {
    if (el && !projectCardsRef.current.includes(el)) {
      projectCardsRef.current.push(el);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'ongoing': { bg: 'from-blue-500 to-cyan-500', text: 'text-blue-600', badge: 'bg-blue-50 text-blue-700' },
      'completed': { bg: 'from-green-500 to-emerald-500', text: 'text-green-600', badge: 'bg-green-50 text-green-700' },
      'planning': { bg: 'from-yellow-500 to-orange-500', text: 'text-yellow-600', badge: 'bg-yellow-50 text-yellow-700' }
    };
    return colors[status] || { bg: 'from-gray-500 to-slate-500', text: 'text-gray-600', badge: 'bg-gray-50 text-gray-700' };
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'mobile': '📱',
      'web': '🌐',
      'ai-ml': '🧠',
      'iot': '🔌'
    };
    return icons[category] || '🚀';
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-[50vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gdg-blue rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gdg-green rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative">
          <div className="page-hero-content text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-soft mb-8">
              <div className="w-2 h-2 bg-gdg-blue rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-dark-gray">Our Projects</span>
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
                    className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      activeFilter === filter.key
                        ? 'bg-gdg-blue text-white shadow-md'
                        : 'bg-slate-100 text-medium-gray hover:bg-slate-200'
                    }`}
                  >
                    <span className="text-lg">{filter.icon}</span>
                    <span>{filter.label}</span>
                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-slate-100 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-2xl transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-white text-dark-gray shadow-sm' : 'text-medium-gray'
                  }`}
                >
                  <span className="text-lg">⏹️</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-2xl transition-all duration-300 ${
                    viewMode === 'list' ? 'bg-white text-dark-gray shadow-sm' : 'text-medium-gray'
                  }`}
                >
                  <span className="text-lg">📋</span>
                </button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.key}
                  className="px-4 py-2 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-2 bg-slate-100 text-medium-gray hover:bg-slate-200"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid/List */}
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }`}>
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                ref={addToProjectCardsRef}
                className="project-card group"
              >
                <div className={`bg-card-bg rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden ${
                  viewMode === 'list' ? 'flex' : 'h-full flex flex-col'
                }`}>
                  {/* Project Visual */}
                  <div className={`${
                    viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48'
                  } relative overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor(project.status).bg}`}></div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm ${getStatusColor(project.status).badge}`}>
                        {project.status === 'ongoing' ? '🚀 In Progress' : 
                         project.status === 'completed' ? '✅ Completed' : '📋 Planning'}
                      </span>
                    </div>

                    {/* Category Icon */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm">
                      <span className="text-xl">{getCategoryIcon(project.category)}</span>
                    </div>

                    {/* Project Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-poppins font-bold text-white mb-2 line-clamp-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-white/90 text-sm">
                        <span>⏱️ {project.timeline}</span>
                        <span>•</span>
                        <span>👥 {project.team.length} members</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className={`p-6 flex-grow flex flex-col ${
                    viewMode === 'list' ? 'flex-1' : ''
                  }`}>
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Impact */}
                    <div className="mb-4">
                      <span className="text-sm font-semibold text-dark-gray">Impact: </span>
                      <span className="text-sm text-medium-gray">{project.impact}</span>
                    </div>

                    {/* Progress Bar */}
                    {project.status === 'ongoing' && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-medium-gray mb-2">
                          <span>Development Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-dark-gray mb-2">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Team */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-dark-gray mb-2">Team</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.team.map((member, memberIndex) => (
                          <span 
                            key={memberIndex}
                            className="bg-blue-50 text-gdg-blue px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-auto">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-slate-100 text-slate-600 py-2 px-4 rounded-2xl font-semibold text-center hover:bg-slate-200 hover:scale-105 transform transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <span>💻</span>
                          <span>GitHub</span>
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-gdg-blue to-blue-600 text-white py-2 px-4 rounded-2xl font-semibold text-center hover:shadow-glow hover:scale-105 transform transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <span>🚀</span>
                          <span>Live Demo</span>
                        </a>
                      )}
                      {!project.demo && !project.github && (
                        <button className="flex-1 bg-slate-100 text-slate-600 py-2 px-4 rounded-2xl font-semibold hover:bg-slate-200 hover:scale-105 transform transition-all duration-300">
                          Coming Soon
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gdg-blue/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-2xl font-poppins font-bold text-dark-gray mb-3">
                No Projects Found
              </h3>
              <p className="text-medium-gray mb-6 max-w-md mx-auto">
                {activeFilter !== 'all' 
                  ? `There are no ${filters.find(f => f.key === activeFilter)?.label.toLowerCase()} at the moment.`
                  : 'No projects match your current filters.'
                }
              </p>
              <button 
                onClick={() => setActiveFilter('all')}
                className="bg-gdg-blue text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300"
              >
                View All Projects
              </button>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-8 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-4">
                Ready to Start Your Own Project?
              </h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Join our community of builders and innovators. Get support, mentorship, and resources 
                to turn your ideas into reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300">
                  Propose a Project
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 hover:scale-105 transform transition-all duration-300">
                  Join a Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;