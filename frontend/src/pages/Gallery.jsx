import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  const galleryItemsRef = useRef([]);

  const galleryItems = {
    all: [
      {
        id: 1,
        type: "photo",
        title: "Android Study Jam Workshop",
        description: "Students engaged in hands-on Android development learning session with Kotlin and Jetpack Compose.",
        category: "workshop",
        date: "2024-01-15",
        image: "/images/gallery/android-workshop.jpg",
        featured: true,
        stats: { attendees: 45, duration: "3 hours" },
        tags: ["Android", "Kotlin", "Workshop", "Learning"]
      },
      {
        id: 2,
        type: "photo", 
        title: "24-Hour Hackathon 2024",
        description: "Intense coding session during our annual hackathon with innovative project presentations.",
        category: "hackathon",
        date: "2024-01-10",
        image: "/images/gallery/hackathon-2024.jpg",
        featured: true,
        stats: { participants: 80, projects: 15 },
        tags: ["Hackathon", "Innovation", "Coding", "Projects"]
      },
      {
        id: 3,
        type: "video",
        title: "Flutter Study Jam Highlights",
        description: "Recap video from our Flutter study jam featuring project demos and participant interviews.",
        category: "study-jam",
        date: "2024-01-08",
        image: "/images/gallery/flutter-jam.jpg",
        featured: false,
        stats: { views: 1247, duration: "4 weeks" },
        tags: ["Flutter", "Dart", "Study Jam", "Video"]
      },
      {
        id: 4,
        type: "photo",
        title: "Community Networking Event",
        description: "Students connecting with industry professionals and fellow developers during our networking session.",
        category: "meetup",
        date: "2024-01-05",
        image: "/images/gallery/networking-event.jpg",
        featured: false,
        stats: { attendees: 60, connections: 200 },
        tags: ["Networking", "Community", "Career", "Connections"]
      },
      {
        id: 5,
        type: "video",
        title: "Google Cloud Expert Session",
        description: "Industry expert sharing insights on cloud technologies and career opportunities in DevOps.",
        category: "speaker",
        date: "2023-12-20",
        image: "/images/gallery/cloud-expert.jpg",
        featured: true,
        stats: { views: 892, duration: "2 hours" },
        tags: ["Cloud", "Expert", "Career", "Learning"]
      },
      {
        id: 6,
        type: "photo",
        title: "Project Showcase Day",
        description: "Students presenting their innovative projects to the community and industry judges.",
        category: "showcase",
        date: "2023-12-15",
        image: "/images/gallery/project-showcase.jpg",
        featured: false,
        stats: { projects: 12, attendees: 100 },
        tags: ["Projects", "Showcase", "Innovation", "Demo"]
      },
      {
        id: 7,
        type: "photo",
        title: "Code Review Session",
        description: "Peer programming and collaborative code reviews helping students improve their coding skills.",
        category: "workshop",
        date: "2023-12-10",
        image: "/images/gallery/code-review.jpg",
        featured: false,
        stats: { participants: 35, reviews: 50 },
        tags: ["Code Review", "Learning", "Collaboration", "Programming"]
      },
      {
        id: 8,
        type: "video",
        title: "GDG Anniversary Celebration",
        description: "Celebrating one year of GDG On-Campus with community achievements and future plans.",
        category: "celebration",
        date: "2023-12-05",
        image: "/images/gallery/anniversary.jpg",
        featured: true,
        stats: { views: 567, duration: "1 hour" },
        tags: ["Anniversary", "Celebration", "Community", "Achievements"]
      }
    ]
  };

  const categories = [
    { key: 'all', label: 'All Media', icon: '🖼️', count: galleryItems.all.length },
    { key: 'workshop', label: 'Workshops', icon: '👨‍💻', count: galleryItems.all.filter(item => item.category === 'workshop').length },
    { key: 'hackathon', label: 'Hackathons', icon: '⚡', count: galleryItems.all.filter(item => item.category === 'hackathon').length },
    { key: 'study-jam', label: 'Study Jams', icon: '📚', count: galleryItems.all.filter(item => item.category === 'study-jam').length },
    { key: 'meetup', label: 'Meetups', icon: '👥', count: galleryItems.all.filter(item => item.category === 'meetup').length },
    { key: 'speaker', label: 'Guest Speakers', icon: '🎤', count: galleryItems.all.filter(item => item.category === 'speaker').length }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems.all 
    : galleryItems.all.filter(item => item.category === activeFilter);

  const featuredItems = galleryItems.all.filter(item => item.featured);

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

    // Gallery section animation
    gsap.fromTo(galleryRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Featured items animation
    gsap.fromTo('.featured-item',
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

    // Gallery items animation
    animateGalleryItems();

  }, [activeFilter, viewMode]);

  const animateGalleryItems = () => {
    gsap.fromTo('.gallery-item',
      { 
        y: 60, 
        opacity: 0, 
        scale: 0.9,
        rotationY: viewMode === 'grid' ? 15 : 0
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'back.out(1.7)'
      }
    );
  };

  const addToGalleryItemsRef = (el) => {
    if (el && !galleryItemsRef.current.includes(el)) {
      galleryItemsRef.current.push(el);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'workshop': 'from-blue-500 to-cyan-500',
      'hackathon': 'from-purple-500 to-pink-500',
      'study-jam': 'from-green-500 to-emerald-500',
      'meetup': 'from-yellow-500 to-orange-500',
      'speaker': 'from-red-500 to-pink-500',
      'showcase': 'from-indigo-500 to-purple-500',
      'celebration': 'from-pink-500 to-rose-500'
    };
    return colors[category] || 'from-slate-500 to-gray-500';
  };

  const getTypeIcon = (type) => {
    return type === 'photo' ? '📷' : '🎥';
  };

  const getTypeBadge = (type) => {
    return type === 'photo' 
      ? { bg: 'bg-blue-500', text: 'Photo' }
      : { bg: 'bg-red-500', text: 'Video' };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const openMediaModal = (media) => {
    setSelectedMedia(media);
  };

  const closeMediaModal = () => {
    setSelectedMedia(null);
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
          <div className="absolute top-20 right-20 w-96 h-96 bg-gdg-blue rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gdg-green rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative">
          <div className="page-hero-content text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-soft mb-8">
              <div className="w-2 h-2 bg-gdg-blue rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-dark-gray">Community Gallery</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-dark-gray mb-6 leading-tight">
              Moments That <span className="text-gradient">Inspire</span>
            </h1>

            <p className="text-xl text-medium-gray leading-relaxed max-w-3xl mx-auto">
              Explore photos and videos from our events, workshops, and community gatherings. 
              Relive the moments that make our developer community special.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section 
        ref={galleryRef}
        className="section-padding bg-white relative overflow-hidden"
      >
        <div className="container-custom">
          {/* Filters & Controls */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setActiveFilter(category.key)}
                    className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      activeFilter === category.key
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
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 rounded-2xl transition-all duration-300 ${
                    viewMode === 'masonry' ? 'bg-white text-dark-gray shadow-sm' : 'text-medium-gray'
                  }`}
                >
                  <span className="text-lg">🧱</span>
                </button>
              </div>
            </div>
          </div>

          {/* Featured Gallery Items */}
          {featuredItems.length > 0 && activeFilter === 'all' && (
            <div className="featured-section mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-poppins font-bold text-dark-gray">
                  Featured <span className="text-gradient">Highlights</span>
                </h2>
                <div className="text-medium-gray text-sm">
                  Community favorites and memorable moments
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {featuredItems.slice(0, 3).map((item, index) => (
                  <div 
                    key={item.id}
                    className="featured-item group cursor-pointer"
                    onClick={() => openMediaModal(item)}
                  >
                    <div className="bg-card-bg rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden h-full">
                      {/* Media Preview */}
                      <div className="relative h-64 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(item.category)}`}></div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                        
                        {/* Type Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm ${getTypeBadge(item.type).bg} text-white`}>
                            {getTypeBadge(item.type).text}
                          </span>
                        </div>

                        {/* Featured Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Featured
                          </span>
                        </div>

                        {/* Play Button for Videos */}
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transform transition-all duration-300">
                              <span className="text-2xl">▶️</span>
                            </div>
                          </div>
                        )}

                        {/* Item Info */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-poppins font-bold text-white mb-2 line-clamp-1">
                            {item.title}
                          </h3>
                          <div className="flex items-center justify-between text-white/90 text-sm">
                            <span>{formatDate(item.date)}</span>
                            <span>{getTypeIcon(item.type)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Item Content */}
                      <div className="p-6">
                        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                          {item.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-medium-gray">
                          <span>
                            {item.type === 'photo' ? '👥' : '👀'} {
                              item.type === 'photo' 
                                ? `${item.stats.attendees} attendees`
                                : `${item.stats.views} views`
                            }
                          </span>
                          <span>📅 {item.stats.duration}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {item.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Grid */}
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
              : 'columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6'
          }`}>
            {filteredItems
              .filter(item => !item.featured || activeFilter !== 'all')
              .map((item, index) => (
              <div 
                key={item.id}
                ref={addToGalleryItemsRef}
                className="gallery-item group break-inside-avoid cursor-pointer"
                onClick={() => openMediaModal(item)}
              >
                <div className={`bg-card-bg rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden ${
                  viewMode === 'masonry' ? 'mb-6' : 'h-full'
                }`}>
                  {/* Media Preview */}
                  <div className="relative aspect-square overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(item.category)}`}></div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    
                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${getTypeBadge(item.type).bg} text-white`}>
                        {getTypeBadge(item.type).text}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                      {formatDate(item.date)}
                    </div>

                    {/* Play Button for Videos */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transform transition-all duration-300">
                          <span className="text-xl">▶️</span>
                        </div>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-lg">👁️</span>
                      </div>
                    </div>
                  </div>

                  {/* Item Info */}
                  <div className="p-4">
                    <h3 className="font-poppins font-bold text-dark-gray mb-2 line-clamp-2 group-hover:text-gdg-blue transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📷</span>
              </div>
              <h3 className="text-2xl font-poppins font-bold text-dark-gray mb-3">
                No Media Found
              </h3>
              <p className="text-medium-gray mb-6 max-w-md mx-auto">
                {activeFilter !== 'all' 
                  ? `No media found in the ${categories.find(cat => cat.key === activeFilter)?.label.toLowerCase()} category.`
                  : 'No media matches your current filters.'
                }
              </p>
              <button 
                onClick={() => setActiveFilter('all')}
                className="bg-gdg-blue text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300"
              >
                View All Media
              </button>
            </div>
          )}

          {/* Social Media CTA */}
          <div className="mt-16 bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-8 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-4">
                Follow Our Journey
              </h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Stay connected with our community through social media. Get real-time updates, 
                behind-the-scenes content, and more event highlights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>📸</span>
                  <span>Follow on Instagram</span>
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 hover:scale-105 transform transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>🎥</span>
                  <span>Subscribe on YouTube</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={closeMediaModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 text-white rounded-2xl flex items-center justify-center hover:bg-black/70 transition-colors duration-300"
              >
                ✕
              </button>

              {/* Media Content */}
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center relative">
                {selectedMedia.type === 'video' ? (
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🎥</div>
                    <div className="text-xl font-semibold">Video Content</div>
                    <div className="text-blue-200 mt-2">Click outside to close</div>
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">📷</div>
                    <div className="text-xl font-semibold">Photo Gallery</div>
                    <div className="text-blue-200 mt-2">Click outside to close</div>
                  </div>
                )}
              </div>

              {/* Media Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-poppins font-bold text-dark-gray mb-2">
                      {selectedMedia.title}
                    </h3>
                    <p className="text-medium-gray leading-relaxed">
                      {selectedMedia.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeBadge(selectedMedia.type).bg} text-white`}>
                    {getTypeBadge(selectedMedia.type).text}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-medium-gray">
                  <span>📅 {formatDate(selectedMedia.date)}</span>
                  <span>{getTypeIcon(selectedMedia.type)}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedMedia.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;