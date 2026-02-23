import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getBlogs } from '../services/api';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const pageRef = useRef(null);
  const heroRef = useRef(null);

  const categories = [
    { id: 'all', label: 'All Stories', icon: '🎯' },
    { id: 'Technology', label: 'Tech', icon: '🛡️' },
    { id: 'Event Highlights', label: 'Events', icon: '✨' },
    { id: 'Member Spotlights', label: 'Spotlight', icon: '👤' },
    { id: 'Tutorials', label: 'Guides', icon: '📖' },
    { id: 'News', label: 'Bulletin', icon: '📰' }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await getBlogs({
          category: activeCategory !== 'all' ? activeCategory : undefined,
          search: searchQuery || undefined
        });
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

  const featuredBlog = useMemo(() => blogs.find(b => b.featured), [blogs]);
  const regularBlogs = useMemo(() => blogs.filter(b => b._id !== featuredBlog?._id), [blogs, featuredBlog]);

  const splitText = (text) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block relative overflow-hidden mr-[0.2em] last:mr-0">
        <span className="inline-block translate-y-[110%] opacity-0 editorial-word">
          {word}
        </span>
      </span>
    ));
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!loading) {
      const ctx = gsap.context(() => {
        // Hero Animation
        gsap.to('.editorial-word', {
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

        // Card Revelations
        gsap.fromTo('.blog-card-premium',
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: '.blog-grid-container',
              start: 'top 85%'
            }
          }
        );

        // Featured Revelations
        gsap.fromTo('.featured-post-container',
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.featured-post-container',
              start: 'top 80%'
            }
          }
        );
      }, pageRef);

      return () => ctx.revert();
    }
  }, [loading, blogs]);

  return (
    <div ref={pageRef} className="bg-white min-h-screen selection:bg-blue-600/10 overflow-hidden">

      {/* Hero Section: Cinematic Editorial Studio */}
      <section ref={heroRef} className="min-h-[75vh] bg-slate-950 relative flex items-center justify-center overflow-hidden pt-20 pb-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/15 rounded-full blur-[140px] animate-pulse"></div>
          <div className="absolute bottom-[-15%] left-[-5%] w-[60vw] h-[60vw] bg-indigo-600/10 rounded-full blur-[140px] animate-pulse duration-[5000ms]"></div>
          <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
        </div>

        <div className="container-custom relative z-10 px-6">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-3xl border border-white/10 px-8 py-3 rounded-full mb-14 shadow-2xl">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-100/70">The Editorial Studio / Vol. 24</span>
            </div>

            <h1 className="text-6xl md:text-[10rem] font-poppins font-black text-white leading-[0.85] tracking-tight mb-14">
              {splitText("CURATING INTELLECT.")}
            </h1>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Control Center: Archive Filters */}
      <section className="relative z-20 -mt-24">
        <div className="container-custom px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-[4rem] shadow-[0_50px_120px_rgba(0,0,0,0.08)] border border-slate-100 p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCategory(c.id)}
                    className={`px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 flex items-center space-x-3 ${activeCategory === c.id
                      ? 'bg-slate-950 text-white shadow-2xl scale-[1.05]'
                      : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                      }`}
                  >
                    <span className="text-lg">{c.icon}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-[400px]">
                <input
                  type="text"
                  placeholder="QUERY THE ARCHIVES..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] pl-10 pr-20 py-6 text-sm font-black text-slate-950 placeholder-slate-400 focus:outline-none focus:border-blue-500/30 focus:bg-white transition-all shadow-inner"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-950 text-white rounded-2xl flex items-center justify-center shadow-xl">
                  🔍
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: High-Impact Editorial Grid */}
      <section className="bg-white pb-64">
        <div className="container-custom px-6 lg:px-12">

          {/* Featured Post: Cinematic Wide Spotlight */}
          {activeCategory === 'all' && !searchQuery && featuredBlog && (
            <div className="featured-post-container mb-32 mt-24">
              <Link to={`/blog/${featuredBlog._id}`} className="group block relative h-[600px] lg:h-[700px] rounded-[5rem] overflow-hidden bg-slate-900 shadow-[0_60px_150px_rgba(0,0,0,0.1)]">
                <img
                  src={featuredBlog.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1500&auto=format&fit=crop"}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="absolute inset-0 p-12 md:p-24 flex flex-col justify-end z-10 transition-transform duration-700 group-hover:-translate-y-4">
                  <div className="flex items-center space-x-6 mb-10">
                    <span className="bg-amber-400 text-slate-950 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl">EDITORIAL SPOTLIGHT</span>
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em]">{featuredBlog.category}</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl lg:text-9xl font-poppins font-black text-white leading-[1] tracking-tighter mb-10 group-hover:text-blue-400 transition-colors">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-slate-200 text-xl md:text-2xl font-medium opacity-80 max-w-4xl mb-14 line-clamp-2 leading-relaxed">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-10 pt-14 border-t border-white/10">
                    <div className="flex items-center space-x-8">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-3xl overflow-hidden border border-white/20 flex items-center justify-center text-xl font-black text-white">
                        {featuredBlog.authorAvatar ? <img src={featuredBlog.authorAvatar} alt="" className="w-full h-full object-cover" /> : featuredBlog.author?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-black text-xl tracking-tight leading-tight">{featuredBlog.author}</div>
                        <div className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em]">{featuredBlog.authorRole || 'Lead Contributor'}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-white/40 text-[11px] font-black uppercase tracking-widest">
                      <span className="text-blue-400">READ TIME:</span>
                      <span>{featuredBlog.readTime || '8 MINS'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="blog-grid-container pt-24">
            <div className="flex items-center space-x-6 mb-20">
              <h2 className="text-4xl font-poppins font-black text-slate-950 tracking-tight">Editorial <span className="italic text-slate-400">Archive</span></h2>
              <div className="h-[2px] flex-grow bg-slate-100"></div>
              <div className="text-slate-400 text-[11px] font-black uppercase tracking-widest leading-none">Records: {regularBlogs.length}</div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-[600px] bg-slate-50 rounded-[4rem] animate-pulse"></div>
                ))}
              </div>
            ) : regularBlogs.length === 0 ? (
              <div className="text-center py-48 bg-slate-50 rounded-[5rem] border-4 border-dashed border-slate-100">
                <div className="text-8xl mb-12 opacity-20">📖</div>
                <h3 className="text-4xl font-poppins font-black text-slate-950 mb-6 tracking-tighter">Archive Index Empty</h3>
                <p className="text-slate-500 text-xl font-medium max-w-xl mx-auto mb-16 leading-relaxed">
                  No stories matched your current search protocol. Try widening your filters or querying different keywords.
                </p>
                <button
                  onClick={() => { setActiveCategory('all'); setSearchQuery('') }}
                  className="bg-slate-950 text-white px-16 py-7 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.5em] hover:shadow-2xl transition-all"
                >
                  Reset Index Connection
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14">
                {regularBlogs.map((blog) => (
                  <Link key={blog._id} to={`/blog/${blog._id}`} className="blog-card-premium group h-full">
                    <div className="bg-white rounded-[4rem] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] hover:shadow-[0_80px_150px_rgba(0,0,0,0.12)] transition-all duration-700 overflow-hidden flex flex-col h-full transform group-hover:-translate-y-4">

                      {/* Card Header Visual */}
                      <div className="relative h-72 overflow-hidden bg-slate-50">
                        <img
                          src={blog.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>

                        <div className="absolute top-8 left-8">
                          <div className="bg-white/95 backdrop-blur-3xl px-5 py-2 rounded-2xl font-black text-[9px] uppercase tracking-widest text-slate-950 shadow-xl border border-slate-100">
                            {blog.category}
                          </div>
                        </div>

                        <div className="absolute bottom-8 left-8 flex items-center space-x-3 text-white/80 text-[10px] font-black uppercase tracking-widest">
                          <span>{new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                          <span className="text-blue-400">{blog.readTime || '5 MINS'}</span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-12 flex-grow flex flex-col">
                        <h3 className="text-3xl font-poppins font-black text-slate-900 leading-tight mb-8 group-hover:text-blue-600 transition-colors">
                          {blog.title}
                        </h3>

                        <p className="text-slate-500 text-lg leading-relaxed font-medium line-clamp-3 opacity-80 mb-12">
                          {blog.excerpt}
                        </p>

                        {/* Author & Read More */}
                        <div className="mt-auto pt-10 border-t border-slate-50 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center font-black text-[10px] text-slate-400">
                              {blog.authorAvatar ? <img src={blog.authorAvatar} alt="" className="w-full h-full object-cover" /> : blog.author?.charAt(0)}
                            </div>
                            <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em]">{blog.author}</span>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-slate-950 group-hover:text-white transition-all duration-500 group-hover:rotate-45 shadow-sm">
                            <span className="text-2xl font-light">→</span>
                          </div>
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

      {/* Global CTA: Stay Updated */}
      <section className="bg-slate-950 py-48 md:py-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
        <div className="container-custom relative z-10 text-center px-6">
          <div className="inline-block px-8 py-3 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.6em] mb-12">Newsletter Syndicate</div>
          <h2 className="text-6xl md:text-[10rem] font-poppins font-black text-white leading-[0.85] tracking-tighter mb-16 italic">
            JOIN THE<br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent italic">SYNDICATE.</span>
          </h2>
          <p className="text-slate-400 text-xl md:text-3xl font-medium max-w-4xl mx-auto leading-relaxed mb-24 opacity-80">
            Receive weekly technical dispatches, community highlights, and exclusive developer intel directly in your inbox.
          </p>

          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-6 p-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem]">
            <input
              type="email"
              placeholder="ENTER EMAIL PROTOCOL..."
              className="flex-grow bg-transparent px-8 py-6 text-white font-bold placeholder:text-white/20 focus:outline-none"
            />
            <button className="bg-white text-slate-950 px-12 py-6 rounded-[2.5rem] font-black text-[13px] uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-2xl">
              Subscribe
            </button>
          </div>
        </div>

        {/* Floating Decorative Dots */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-blue-500 opacity-20 rounded-full blur-[1px]" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}></div>
        ))}
      </section>
    </div>
  );
};

export default Blog;
