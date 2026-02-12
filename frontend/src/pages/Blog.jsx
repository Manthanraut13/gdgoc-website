import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getBlogs } from '../services/api';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const heroRef = useRef(null);
  const blogRef = useRef(null);
  const cardsRef = useRef([]);

  const categories = [
    { id: 'all', label: 'All Stories', icon: '📝' },
    { id: 'Technology', label: 'Technology', icon: '🛡️' },
    { id: 'Event Highlights', label: 'Events', icon: '✨' },
    { id: 'Member Spotlights', label: 'Members', icon: '👤' },
    { id: 'Tutorials', label: 'Tutorials', icon: '📖' },
    { id: 'News', label: 'News', icon: '📰' }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.blog-hero-title',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
    );

    gsap.fromTo('.blog-hero-sub',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: 'power4.out' }
    );
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await getBlogs({
          category: activeCategory !== 'all' ? activeCategory : undefined,
          search: searchQuery || undefined
        });
        // Filter only published blogs for public view
        const published = (res.data.data || []).filter(b => b.status === 'published' || !b.status);
        setBlogs(published);
      } catch (err) {
        console.error("Fetch Blogs Error:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    if (blogs.length > 0) {
      gsap.fromTo('.blog-card-animation',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blog-grid-section',
            start: 'top 80%',
          }
        }
      );
    }
  }, [blogs]);

  const featuredBlog = blogs.find(b => b.featured);
  const regularBlogs = blogs.filter(b => b._id !== featuredBlog?._id);

  return (
    <div className="page-wrapper pt-20 bg-[#fafafa]">
      {/* Cinematic Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-white border-b border-gray-100"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-8 border border-blue-100 italic">
            <span className="text-blue-600 text-sm font-black uppercase tracking-widest">The Editorial Studio</span>
          </div>
          <h1 className="blog-hero-title text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-none italic">
            Insights & <span className="text-blue-600">Stories.</span>
          </h1>
          <p className="blog-hero-sub text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Exploring the intersection of technology, community, and innovation through the lens of GDGOC developers.
          </p>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute -bottom-24 left-0 w-full h-48 bg-gradient-to-t from-[#fafafa] to-transparent"></div>
      </section>

      {/* Main Content Section */}
      <section ref={blogRef} className="pb-32 -mt-16 relative z-20">
        <div className="container-custom">
          {/* Controls Bar */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-white mb-16 flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Category Nav */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 border-2 ${activeCategory === cat.id
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                      : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                    }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search the archives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-gray-700 placeholder:text-gray-300"
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl grayscale opacity-30">🔍</span>
            </div>
          </div>

          {/* Featured Post Spotlight */}
          {featuredBlog && activeCategory === 'all' && !searchQuery && (
            <div className="mb-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <Link to={`/blog/${featuredBlog._id}`} className="group block relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-white transition-all duration-700 hover:shadow-blue-900/5 group-hover:-translate-y-2">
                  <div className="relative h-[400px] lg:h-auto overflow-hidden">
                    <img
                      src={featuredBlog.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"}
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                    <div className="absolute top-8 left-8">
                      <span className="bg-amber-400 text-white px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg">⭐ Featured Story</span>
                    </div>
                  </div>
                  <div className="p-12 lg:p-20 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">{featuredBlog.category}</span>
                      <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                      <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">{featuredBlog.readTime}</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.1] transition-colors group-hover:text-blue-600">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-gray-500 text-lg leading-relaxed mb-10 line-clamp-3 font-medium">
                      {featuredBlog.excerpt}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full border-4 border-gray-50 shadow-sm overflow-hidden flex items-center justify-center bg-gray-100 font-bold text-gray-400">
                        {featuredBlog.authorAvatar ? <img src={featuredBlog.authorAvatar} alt="" className="w-full h-full object-cover" /> : featuredBlog.author?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-gray-900 tracking-tight">{featuredBlog.author}</div>
                        <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{featuredBlog.authorRole}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Grid Section */}
          <div className="blog-grid-section">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white h-[500px] rounded-[3rem] animate-pulse border border-gray-100" />
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-gray-100">
                <span className="text-6xl block mb-6 grayscale opacity-20">📖</span>
                <h3 className="text-2xl font-black text-gray-400 tracking-tighter">No stories match your criteria.</h3>
                <button onClick={() => { setActiveCategory('all'); setSearchQuery('') }} className="mt-4 text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {blogs.map((blog, index) => (
                  <Link
                    key={blog._id}
                    to={`/blog/${blog._id}`}
                    className="block blog-card-animation group h-full"
                  >
                    <div className="bg-white rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col overflow-hidden h-full group-hover:-translate-y-3">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={blog.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute top-6 left-6">
                          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest shadow-sm">
                            {blog.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-10 flex-grow flex flex-col">
                        <div className="flex items-center gap-3 mb-4 text-gray-400 font-black text-[9px] uppercase tracking-[0.2em]">
                          <span>{blog.readTime || "5 min read"}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full" />
                          <span>{new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                        </div>

                        <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tighter leading-tight group-hover:text-blue-600 transition-colors">
                          {blog.title}
                        </h3>

                        <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                          {blog.excerpt}
                        </p>

                        <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 overflow-hidden border border-white shadow-sm flex items-center justify-center font-bold text-blue-400 text-[10px]">
                              {blog.authorAvatar ? <img src={blog.authorAvatar} alt="" className="w-full h-full object-cover" /> : blog.author?.charAt(0)}
                            </div>
                            <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">{blog.author}</span>
                          </div>
                          <span className="text-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="container-custom pb-32">
        <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[4rem] p-16 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-8 leading-none italic">Stay Ahead of the <span className="text-blue-200">Curve.</span></h2>
            <p className="text-blue-100 font-medium mb-12 opacity-80 leading-relaxed">Join 500+ developers receiving our weekly digest of the latest tech trends and community highlights.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-10 py-5 rounded-3xl bg-white/10 border-2 border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-4 focus:ring-white/10 transition-all font-bold"
              />
              <button className="bg-white text-blue-900 px-12 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:shadow-2xl hover:bg-blue-50 transition-all active:scale-95">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
