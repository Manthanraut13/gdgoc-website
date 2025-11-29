import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef(null);
  const blogRef = useRef(null);
  const blogCardsRef = useRef([]);

  const blogPosts = {
    all: [
      {
        id: 1,
        title: "Getting Started with Flutter: Build Your First Cross-Platform App",
        excerpt: "Learn the fundamentals of Flutter and Dart to build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.",
        author: "Sarah Chen",
        authorRole: "Flutter Lead",
        date: "2024-01-15",
        category: "Tech Articles",
        readTime: "8 min read",
        image: "/images/blog/flutter.jpg",
        featured: true,
        tags: ["Flutter", "Dart", "Cross-Platform", "Mobile"],
        likes: 142,
        comments: 28
      },
      {
        id: 2,
        title: "Android Study Jam 2024: Key Takeaways and Learning Outcomes",
        excerpt: "Recap of our recent Android Study Jam event where participants learned modern Android development with Kotlin and Jetpack Compose.",
        author: "Alex Johnson",
        authorRole: "Android Lead",
        date: "2024-01-10",
        category: "Event Highlights",
        readTime: "5 min read",
        image: "/images/blog/android-jam.jpg",
        featured: false,
        tags: ["Android", "Kotlin", "Study Jam", "Workshop"],
        likes: 89,
        comments: 15
      },
      {
        id: 3,
        title: "Member Spotlight: How Sarah Went from Beginner to Flutter Developer in 6 Months",
        excerpt: "Inspiring journey of one of our community members who transformed her career through dedication and our learning resources.",
        author: "Mike Rodriguez",
        authorRole: "Community Manager",
        date: "2024-01-05",
        category: "Member Spotlights",
        readTime: "6 min read",
        image: "/images/blog/spotlight.jpg",
        featured: true,
        tags: ["Success Story", "Learning", "Community", "Career"],
        likes: 156,
        comments: 32
      },
      {
        id: 4,
        title: "Building REST APIs with Node.js: Best Practices and Architecture Patterns",
        excerpt: "Comprehensive guide to creating robust, scalable RESTful APIs using Node.js, Express, and modern development practices.",
        author: "David Kim",
        authorRole: "Backend Specialist",
        date: "2023-12-28",
        category: "Tech Articles",
        readTime: "12 min read",
        image: "/images/blog/nodejs.jpg",
        featured: false,
        tags: ["Node.js", "API", "Backend", "JavaScript"],
        likes: 203,
        comments: 41
      },
      {
        id: 5,
        title: "Hackathon 2023 Winners: Celebrating Innovation and Creativity",
        excerpt: "Showcasing the amazing projects and talented developers from our annual 24-hour hackathon competition.",
        author: "Emily Watson",
        authorRole: "Events Coordinator",
        date: "2023-12-20",
        category: "Event Highlights",
        readTime: "4 min read",
        image: "/images/blog/hackathon.jpg",
        featured: false,
        tags: ["Hackathon", "Innovation", "Projects", "Winners"],
        likes: 97,
        comments: 18
      },
      {
        id: 6,
        title: "Open Source Contributions: Your First Pull Request Guide",
        excerpt: "Step-by-step guide to start contributing to open source projects and make your first meaningful contribution to the community.",
        author: "Chris Lee",
        authorRole: "Open Source Advocate",
        date: "2023-12-15",
        category: "Tech Articles",
        readTime: "10 min read",
        image: "/images/blog/opensource.jpg",
        featured: false,
        tags: ["Open Source", "Git", "Community", "Contributions"],
        likes: 178,
        comments: 29
      }
    ]
  };

  const categories = [
    { key: 'all', label: 'All Posts', count: blogPosts.all.length },
    { key: 'Tech Articles', label: 'Tech Articles', count: blogPosts.all.filter(post => post.category === 'Tech Articles').length },
    { key: 'Event Highlights', label: 'Event Highlights', count: blogPosts.all.filter(post => post.category === 'Event Highlights').length },
    { key: 'Member Spotlights', label: 'Member Spotlights', count: blogPosts.all.filter(post => post.category === 'Member Spotlights').length }
  ];

  const filteredPosts = blogPosts.all.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.all.find(post => post.featured);

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

    // Blog section animation
    gsap.fromTo(blogRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: blogRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Featured post animation
    if (featuredPost && activeCategory === 'all' && searchQuery === '') {
      gsap.fromTo('.featured-post',
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.featured-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }

    // Blog cards animation
    animateBlogCards();

  }, [activeCategory, searchQuery]);

  const animateBlogCards = () => {
    gsap.fromTo('.blog-card',
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

  const addToBlogCardsRef = (el) => {
    if (el && !blogCardsRef.current.includes(el)) {
      blogCardsRef.current.push(el);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Tech Articles': { bg: 'from-blue-500 to-cyan-500', badge: 'bg-blue-50 text-blue-700' },
      'Event Highlights': { bg: 'from-green-500 to-emerald-500', badge: 'bg-green-50 text-green-700' },
      'Member Spotlights': { bg: 'from-purple-500 to-pink-500', badge: 'bg-purple-50 text-purple-700' }
    };
    return colors[category] || { bg: 'from-gray-500 to-slate-500', badge: 'bg-gray-50 text-gray-700' };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          <div className="absolute top-20 right-20 w-96 h-96 bg-gdg-blue rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gdg-green rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative">
          <div className="page-hero-content text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-soft mb-8">
              <div className="w-2 h-2 bg-gdg-blue rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-dark-gray">Community Blog</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-dark-gray mb-6 leading-tight">
              Stories from Our <span className="text-gradient">Community</span>
            </h1>

            <p className="text-xl text-medium-gray leading-relaxed max-w-3xl mx-auto">
              Discover insights, tutorials, and stories from our developers. Learn from experiences, 
              stay updated with events, and get inspired by community success stories.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section 
        ref={blogRef}
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
                  placeholder="Search articles, tutorials, or stories..."
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
            <div className="flex flex-wrap gap-3 justify-center">
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
                  <span>{category.label}</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && activeCategory === 'all' && searchQuery === '' && (
            <div className="featured-section mb-16">
              <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl overflow-hidden shadow-large">
                <div className="md:flex">
                  <div className="md:w-2/3 p-8 text-white">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(featuredPost.category).badge}`}>
                        {featuredPost.category}
                      </span>
                      <span className="text-blue-200 text-sm">Featured Post</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4 leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-blue-100 text-lg leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-semibold text-sm">
                            {featuredPost.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold text-white">{featuredPost.author}</div>
                            <div className="text-blue-200 text-sm">{featuredPost.authorRole}</div>
                          </div>
                        </div>
                        <div className="text-blue-200 text-sm">
                          {formatDate(featuredPost.date)} • {featuredPost.readTime}
                        </div>
                      </div>

                      <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300">
                        Read Article
                      </button>
                    </div>
                  </div>

                  <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center text-white">
                      <div className="text-6xl mb-4">🚀</div>
                      <div className="text-xl font-poppins font-bold">Featured Story</div>
                      <div className="text-blue-100 text-sm mt-2">Community Favorite</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts
              .filter(post => !post.featured || activeCategory !== 'all' || searchQuery !== '')
              .map((post, index) => (
              <div 
                key={post.id}
                ref={addToBlogCardsRef}
                className="blog-card group"
              >
                <div className="bg-card-bg rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden h-full flex flex-col">
                  {/* Post Header */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(post.category).bg}`}></div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm ${getCategoryColor(post.category).badge}`}>
                        {post.category}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {post.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Engagement Stats */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white/90 text-sm">
                        <span>❤️ {post.likes} likes</span>
                        <span>💬 {post.comments} comments</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    {/* Title */}
                    <h3 className="text-xl font-poppins font-bold text-dark-gray mb-3 line-clamp-2 group-hover:text-gdg-blue transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-medium-gray mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-dark-gray">{post.author}</div>
                          <div className="text-xs">{post.readTime}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs">{formatDate(post.date)}</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-slate-100 text-slate-600 py-3 px-4 rounded-2xl font-semibold hover:bg-slate-200 hover:scale-105 transform transition-all duration-300 group-hover:shadow-sm">
                      Read More
                    </button>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gdg-blue/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-2xl font-poppins font-bold text-dark-gray mb-3">
                No Articles Found
              </h3>
              <p className="text-medium-gray mb-6 max-w-md mx-auto">
                {searchQuery 
                  ? `No articles found for "${searchQuery}". Try different keywords or browse all categories.`
                  : `No articles found in the ${categories.find(cat => cat.key === activeCategory)?.label.toLowerCase()}.`
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
                  View All Articles
                </button>
                <button className="bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl font-semibold hover:bg-slate-200 hover:scale-105 transform transition-all duration-300">
                  Suggest Topic
                </button>
              </div>
            </div>
          )}

          {/* Newsletter Subscription */}
          <div className="mt-16 bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-8 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-4">
                Never Miss a Story
              </h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Subscribe to our newsletter and get the latest articles, tutorials, and community 
                stories delivered directly to your inbox every week.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                <input 
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                />
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300 whitespace-nowrap">
                  Subscribe Now
                </button>
              </div>
              <p className="text-blue-200 text-sm mt-4">
                Join 2,000+ developers who read our newsletter weekly
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;