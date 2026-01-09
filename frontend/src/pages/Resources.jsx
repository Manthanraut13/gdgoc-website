import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef(null);
  const resourcesRef = useRef(null);
  const resourceCardsRef = useRef([]);

  const resources = {
    studyJams: [
      {
        id: 1,
        title: "Android Development Fundamentals",
        description: "Complete guide to Android development with Kotlin and Jetpack Compose. Includes hands-on projects and best practices.",
        level: "Beginner",
        duration: "6 weeks",
        type: "study-jam",
        format: "Video Series",
        downloads: 1247,
        rating: 4.9,
        tags: ["Android", "Kotlin", "Mobile", "Jetpack"],
        link: "#",
        featured: true
      },
      {
        id: 2,
        title: "Flutter Crash Course",
        description: "Build cross-platform apps with Flutter and Dart. Covers widgets, state management, and API integration.",
        level: "Intermediate",
        duration: "4 weeks",
        type: "study-jam",
        format: "Interactive Course",
        downloads: 892,
        rating: 4.7,
        tags: ["Flutter", "Dart", "Cross-Platform", "UI"],
        link: "#",
        featured: false
      },
      {
        id: 3,
        title: "Google Cloud Basics",
        description: "Introduction to Google Cloud Platform services and deployment strategies for modern applications.",
        level: "Beginner",
        duration: "5 weeks",
        type: "study-jam",
        format: "Video Series",
        downloads: 756,
        rating: 4.8,
        tags: ["Cloud", "GCP", "DevOps", "Infrastructure"],
        link: "#",
        featured: true
      }
    ],
    workshop: [
      {
        id: 4,
        title: "Kotlin for Android",
        description: "Modern Android development with Kotlin programming language. Covers coroutines, extensions, and DSLs.",
        level: "Intermediate",
        duration: "2 hours",
        type: "workshop",
        format: "Workshop Recording",
        downloads: 543,
        rating: 4.6,
        tags: ["Kotlin", "Android", "Coroutines", "DSL"],
        link: "#",
        featured: false
      },
      {
        id: 5,
        title: "Firebase Integration",
        description: "Build real-time apps with Firebase backend services including Auth, Firestore, and Cloud Functions.",
        level: "Beginner",
        duration: "3 hours",
        type: "workshop",
        format: "Workshop Recording",
        downloads: 678,
        rating: 4.5,
        tags: ["Firebase", "Backend", "NoSQL", "Real-time"],
        link: "#",
        featured: true
      }
    ],
    openSource: [
      {
        id: 6,
        title: "Contributing Guidelines",
        description: "Learn how to contribute to open source projects effectively. Covers Git workflows and community standards.",
        level: "Beginner",
        duration: "Self-paced",
        type: "open-source",
        format: "Guide",
        downloads: 432,
        rating: 4.8,
        tags: ["Git", "Open Source", "Community", "Workflow"],
        link: "#",
        featured: false
      },
      {
        id: 7,
        title: "Code Review Process",
        description: "Best practices for code reviews in open source and professional development environments.",
        level: "Intermediate",
        duration: "Self-paced",
        type: "open-source",
        format: "Guide",
        downloads: 389,
        rating: 4.7,
        tags: ["Code Review", "Best Practices", "Quality"],
        link: "#",
        featured: false
      }
    ]
  };

  const categories = [
    { key: 'all', label: 'All Resources', icon: '📚', count: Object.values(resources).flat().length },
    { key: 'studyJams', label: 'Study Jams', icon: '👨‍💻', count: resources.studyJams.length },
    { key: 'workshop', label: 'Workshop Notes', icon: '📝', count: resources.workshop.length },
    { key: 'openSource', label: 'Open Source', icon: '🔓', count: resources.openSource.length }
  ];

  const levels = [
    { key: 'all', label: 'All Levels', icon: '🌈' },
    { key: 'beginner', label: 'Beginner', icon: '🌱' },
    { key: 'intermediate', label: 'Intermediate', icon: '🚀' },
    { key: 'advanced', label: 'Advanced', icon: '⚡' }
  ];

  const getAllResources = () => {
    return Object.values(resources).flat();
  };

  const filteredResources = getAllResources().filter(resource => {
    const matchesCategory = activeCategory === 'all' || resources[activeCategory]?.includes(resource);
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredResources = getAllResources().filter(resource => resource.featured);

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

    // Resources section animation
    gsap.fromTo(resourcesRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: resourcesRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Featured resources animation
    gsap.fromTo('.featured-resource',
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.featured-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Resource cards animation
    animateResourceCards();

  }, [activeCategory, searchQuery]);

  const animateResourceCards = () => {
    gsap.fromTo('.resource-card',
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

  const addToResourceCardsRef = (el) => {
    if (el && !resourceCardsRef.current.includes(el)) {
      resourceCardsRef.current.push(el);
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'study-jam': { bg: 'from-purple-500 to-pink-500', badge: 'bg-purple-50 text-purple-700' },
      'workshop': { bg: 'from-blue-500 to-cyan-500', badge: 'bg-blue-50 text-blue-700' },
      'open-source': { bg: 'from-green-500 to-emerald-500', badge: 'bg-green-50 text-green-700' }
    };
    return colors[type] || { bg: 'from-gray-500 to-slate-500', badge: 'bg-gray-50 text-gray-700' };
  };

  const getLevelColor = (level) => {
    const colors = {
      'Beginner': 'text-green-600 bg-green-50',
      'Intermediate': 'text-yellow-600 bg-yellow-50',
      'Advanced': 'text-red-600 bg-red-50'
    };
    return colors[level] || 'text-gray-600 bg-gray-50';
  };

  const getFormatIcon = (format) => {
    const icons = {
      'Video Series': '🎥',
      'Interactive Course': '🔄',
      'Workshop Recording': '📹',
      'Guide': '📖'
    };
    return icons[format] || '📄';
  };

  return (
    <div className="page-wrapper pt-20">
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
              <span className="text-sm font-semibold text-dark-gray">Learning Resources</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-dark-gray mb-6 leading-tight">
              Learn <span className="text-gradient">Smarter</span>, Build <span className="text-gradient">Better</span>
            </h1>

            <p className="text-xl text-medium-gray leading-relaxed max-w-3xl mx-auto">
              Access curated learning materials, workshop recordings, and study resources 
              designed to accelerate your development journey and build practical skills.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section 
        ref={resourcesRef}
        className="section-padding bg-white relative overflow-hidden"
      >
        <div className="container-custom">
          {/* Search & Filters */}
          <div className="mb-12">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources, topics, or technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-100 border border-slate-200 rounded-2xl text-dark-gray placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gdg-blue focus:border-transparent transition-all duration-300 text-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    activeCategory === category.key
                      ? 'bg-gdg-blue text-white shadow-md'
                      : 'bg-slate-100 text-medium-gray hover:bg-slate-200'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.label}</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Level Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {levels.map((level) => (
                <button
                  key={level.key}
                  className="px-3 py-2 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-2 bg-slate-100 text-medium-gray hover:bg-slate-200"
                >
                  <span className="text-lg">{level.icon}</span>
                  <span>{level.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Resources */}
          {featuredResources.length > 0 && searchQuery === '' && activeCategory === 'all' && (
            <div className="featured-section mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-poppins font-bold text-dark-gray">
                  Featured <span className="text-gradient">Resources</span>
                </h2>
                <div className="text-medium-gray text-sm">
                  Most popular learning materials
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredResources.slice(0, 2).map((resource, index) => (
                  <div 
                    key={resource.id}
                    className="featured-resource group"
                  >
                    <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(resource.type).badge} text-dark-gray`}>
                            {resource.type === 'study-jam' ? 'Study Jam' : 
                             resource.type === 'workshop' ? 'Workshop' : 'Open Source'}
                          </span>
                          <span className="text-yellow-300 text-sm flex items-center space-x-1">
                            <span>⭐</span>
                            <span>{resource.rating}</span>
                          </span>
                        </div>

                        <h3 className="text-2xl font-poppins font-bold mb-4">
                          {resource.title}
                        </h3>

                        <p className="text-blue-100 leading-relaxed mb-6">
                          {resource.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-blue-200 text-sm">
                            <span className="flex items-center space-x-1">
                              <span>📥</span>
                              <span>{resource.downloads} downloads</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <span>⏱️</span>
                              <span>{resource.duration}</span>
                            </span>
                          </div>

                          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300">
                            Access Resource
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <div 
                key={resource.id}
                ref={addToResourceCardsRef}
                className="resource-card group"
              >
                <div className="bg-card-bg rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden h-full flex flex-col">
                  {/* Resource Header */}
                  <div className="relative h-32 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(resource.type).bg}`}></div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${getTypeColor(resource.type).badge}`}>
                        {resource.type === 'study-jam' ? 'Study Jam' : 
                         resource.type === 'workshop' ? 'Workshop' : 'Open Source'}
                      </span>
                    </div>

                    {/* Format Icon */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm">
                      <span className="text-lg">{getFormatIcon(resource.format)}</span>
                    </div>

                    {/* Featured Badge */}
                    {resource.featured && (
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Resource Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    {/* Title & Rating */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-poppins font-bold text-dark-gray line-clamp-2 flex-1">
                        {resource.title}
                      </h3>
                      <span className="text-yellow-500 text-sm flex items-center space-x-1 ml-2">
                        <span>⭐</span>
                        <span>{resource.rating}</span>
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-grow">
                      {resource.description}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between mb-4 text-sm text-medium-gray">
                      <span className={`px-2 py-1 rounded-full ${getLevelColor(resource.level)}`}>
                        {resource.level}
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>📥</span>
                        <span>{resource.downloads}</span>
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > 3 && (
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-medium">
                          +{resource.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-gradient-to-r from-gdg-blue to-blue-600 text-white py-3 px-4 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300">
                      Download Resource
                    </button>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gdg-blue/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-2xl font-poppins font-bold text-dark-gray mb-3">
                No Resources Found
              </h3>
              <p className="text-medium-gray mb-6 max-w-md mx-auto">
                {searchQuery 
                  ? `No resources found for "${searchQuery}". Try different keywords or browse all categories.`
                  : `No resources found in the ${categories.find(cat => cat.key === activeCategory)?.label.toLowerCase()}.`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="bg-gdg-blue text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300"
                >
                  View All Resources
                </button>
                <button className="bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl font-semibold hover:bg-slate-200 hover:scale-105 transform transition-all duration-300">
                  Suggest Resource
                </button>
              </div>
            </div>
          )}

          {/* Community CTA */}
          <div className="mt-16 bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-8 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-4">
                Want More Learning Resources?
              </h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Join our community to get access to exclusive resources, mentorship programs, 
                and collaborative learning opportunities with fellow developers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300">
                  Join Community
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 hover:scale-105 transform transition-all duration-300">
                  Request Resource
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;