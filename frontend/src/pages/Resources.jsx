import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getResources } from '../services/api';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const pageRef = useRef(null);
  const heroRef = useRef(null);

  const loadResources = async () => {
    try {
      setLoading(true);
      const res = await getResources();
      setResources(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const categories = [
    { key: 'all', label: 'All Protocols', icon: '🎯' },
    { key: 'Documentation', label: 'Docs', icon: '📚' },
    { key: 'YouTube', label: 'YouTube', icon: '📹' },
    { key: 'Course', label: 'Courses', icon: '🎓' },
    { key: 'Tools', label: 'Toolkit', icon: '🛠️' },
    { key: 'Roadmap', label: 'Roadmap', icon: '🗺️' },
    { key: 'Blogs', label: 'Blogs', icon: '📝' },
    { key: 'API', label: 'Endpoints', icon: '🔌' },
    { key: 'GitHub Repo', label: 'Source', icon: '🔗' }
  ];

  const levels = [
    { key: 'all', label: 'All Levels', icon: '🌈' },
    { key: 'Beginner', label: 'Entry', icon: '🌱' },
    { key: 'Intermediate', label: 'Mid-Tier', icon: '🚀' },
    { key: 'Advanced', label: 'Elite', icon: '⚡' }
  ];

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
      const matchesLevel = activeLevel === 'all' || resource.difficulty === activeLevel;
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [resources, activeCategory, activeLevel, searchQuery]);

  const featuredResources = useMemo(() => {
    return resources.filter(resource => resource.featured).slice(0, 2);
  }, [resources]);

  const splitText = (text) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block relative overflow-hidden mr-[0.2em] last:mr-0">
        <span className="inline-block translate-y-[110%] opacity-0 knowledge-word">
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
        gsap.to('.knowledge-word', {
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
        gsap.fromTo('.resource-card-premium',
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: '.resource-grid-container',
              start: 'top 85%'
            }
          }
        );

        // Featured Revelations
        gsap.fromTo('.featured-resource-card',
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.featured-container',
              start: 'top 80%'
            }
          }
        );
      }, pageRef);

      return () => ctx.revert();
    }
  }, [loading, activeCategory, activeLevel]);

  const getTypeStyle = (category) => {
    const map = {
      'Documentation': 'bg-purple-500/10 text-purple-600 border-purple-200/50',
      'YouTube': 'bg-red-500/10 text-red-600 border-red-200/50',
      'Course': 'bg-blue-500/10 text-blue-600 border-blue-200/50',
      'Tools': 'bg-green-500/10 text-green-600 border-green-200/50',
      'Roadmap': 'bg-amber-500/10 text-amber-600 border-amber-200/50',
      'Blogs': 'bg-violet-500/10 text-violet-600 border-violet-200/50',
      'API': 'bg-slate-500/10 text-slate-600 border-slate-200/50',
      'GitHub Repo': 'bg-slate-900/10 text-slate-950 border-slate-300'
    };
    return map[category] || 'bg-slate-100 text-slate-600 border-slate-200';
  };

  return (
    <div ref={pageRef} className="bg-white min-h-screen selection:bg-blue-600/10 overflow-hidden">

      {/* Hero Section: Cinematic Knowledge Base */}
      <section ref={heroRef} className="min-h-[75vh] bg-slate-950 relative flex items-center justify-center overflow-hidden pt-20 pb-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-blue-600/10 rounded-full blur-[160px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-indigo-600/10 rounded-full blur-[160px] animate-pulse duration-[4000ms]"></div>
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
        </div>

        <div className="container-custom relative z-10 px-6">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-3xl border border-white/10 px-8 py-3 rounded-full mb-14 shadow-2xl">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-100/60">Knowledge Hub / Global Uplink</span>
            </div>

            <h1 className="text-6xl md:text-[9.5rem] font-poppins font-black text-white leading-[0.85] tracking-tight mb-14">
              {splitText("ACCELERATE YOUR INTEL.")}
            </h1>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Control Center: Search & Filter Matrix */}
      <section className="relative z-20 -mt-24 pointer-events-none">
        <div className="container-custom px-6 lg:px-12 pointer-events-auto">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-[4rem] shadow-[0_50px_120px_rgba(0,0,0,0.1)] border border-slate-100 p-8 md:p-14 space-y-12 mb-24">

              {/* Search Bar */}
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <input
                  type="text"
                  placeholder="QUERY THE KNOWLEDGE BASE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] px-12 py-8 text-xl font-bold text-slate-950 placeholder-slate-400 focus:outline-none focus:border-blue-500/30 focus:bg-white transition-all shadow-inner"
                />
                <div className="absolute right-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-950 text-white rounded-2xl flex items-center justify-center text-xl shadow-xl">
                  🔍
                </div>
              </div>

              {/* Category Protocols */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {categories.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setActiveCategory(c.key)}
                    className={`px-8 py-4.5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 flex items-center space-x-3 ${activeCategory === c.key
                      ? 'bg-slate-950 text-white shadow-2xl scale-[1.05]'
                      : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-950'
                      }`}
                  >
                    <span className="text-lg">{c.icon}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>

              {/* Difficulty Levels */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-slate-50">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mr-4">Intel Complexity:</span>
                {levels.map((l) => (
                  <button
                    key={l.key}
                    onClick={() => setActiveLevel(l.key)}
                    className={`px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all duration-500 flex items-center space-x-2 ${activeLevel === l.key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                  >
                    <span className="text-sm">{l.icon}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-white pb-64">
        <div className="container-custom px-6 lg:px-12">

          {/* Featured Intel: Cinematic Dark Cards */}
          {searchQuery === '' && activeCategory === 'all' && featuredResources.length > 0 && (
            <div className="featured-container mb-32">
              <div className="flex items-center space-x-6 mb-16">
                <h2 className="text-4xl font-poppins font-black text-slate-950 tracking-tight">Featured <span className="italic text-blue-600">Assets</span></h2>
                <div className="h-[2px] flex-grow bg-slate-100"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {featuredResources.map((res) => (
                  <div key={res._id} className="featured-resource-card group relative h-[500px] rounded-[4rem] overflow-hidden bg-slate-950 shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                    <img
                      src={res.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[2s] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                    {/* Holographic Overlays */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(66,133,244,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(66,133,244,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

                    <div className="absolute inset-0 p-12 md:p-16 flex flex-col justify-end z-10">
                      <div className="flex items-center space-x-4 mb-8">
                        <span className="bg-blue-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl">PRIORITY ASSET</span>
                        <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">[{res.category}]</span>
                      </div>
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1] tracking-tighter mb-8 group-hover:text-blue-400 transition-colors">
                        {res.title}
                      </h3>
                      <p className="text-slate-300 text-lg md:text-xl font-medium opacity-80 line-clamp-2 max-w-2xl mb-12">
                        {res.description}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-6 pt-12 border-t border-white/10">
                        <div className="flex items-center space-x-10 text-white/50 text-[10px] font-black uppercase tracking-widest">
                          <div className="flex items-center space-x-2">
                            <span>👤</span>
                            <span>{res.provider || 'GDG Intel'}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>⏱️</span>
                            <span>{res.duration || 'Archive'}</span>
                          </div>
                        </div>
                        <button className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-2 shadow-3xl">
                          Access Intel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources Grid: Frosted Premium Cards */}
          <div className="resource-grid-container">
            <div className="flex items-center space-x-6 mb-16">
              <h2 className="text-4xl font-poppins font-black text-slate-950 tracking-tight">The Knowledge <span className="italic text-slate-400">Archive</span></h2>
              <div className="h-[2px] flex-grow bg-slate-100"></div>
              <div className="text-slate-400 text-[11px] font-black uppercase tracking-[0.4em]">Indices: {filteredResources.length}</div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-[500px] bg-slate-50 rounded-[4rem] animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14">
                {filteredResources.map((res) => (
                  <div key={res._id} className="resource-card-premium group h-full cursor-pointer">
                    <div className="bg-white rounded-[4rem] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] hover:shadow-[0_80px_150px_rgba(0,0,0,0.1)] transition-all duration-700 overflow-hidden flex flex-col h-full transform group-hover:-translate-y-4">

                      {/* Header Visual */}
                      <div className="relative h-64 overflow-hidden bg-slate-50">
                        <img
                          src={res.image || "https://images.unsplash.com/photo-1454165833767-027ffea9e7a7?q=80&w=1000&auto=format&fit=crop"}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="absolute top-8 left-8">
                          <div className={`px-5 py-2 rounded-2xl border backdrop-blur-3xl font-black text-[9px] uppercase tracking-widest shadow-xl flex items-center space-x-2 ${getTypeStyle(res.category)}`}>
                            <span>{res.category}</span>
                          </div>
                        </div>

                        <div className="absolute top-8 right-8">
                          <div className="bg-white/95 backdrop-blur-xl w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl transition-all group-hover:bg-slate-950 group-hover:text-white">
                            {res.category === 'YouTube' ? '📹' : res.category === 'Roadmap' ? '🗺️' : '📄'}
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-12 flex-grow flex flex-col pt-14">
                        <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-50">
                          <div className="flex items-center space-x-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{res.difficulty || 'Level Access'}</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-yellow-400/10 px-3 py-1 rounded-lg">
                            <span className="text-sm">⭐</span>
                            <span className="text-[10px] font-black text-slate-950">{res.rating || '5.0'}</span>
                          </div>
                        </div>

                        <h3 className="text-3xl font-poppins font-black text-slate-950 leading-tight mb-6 group-hover:text-blue-600 transition-colors">
                          {res.title}
                        </h3>

                        <p className="text-slate-500 text-lg leading-relaxed font-medium line-clamp-2 opacity-80 mb-10">
                          {res.description}
                        </p>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 gap-8 py-10 border-t border-slate-50">
                          <div className="space-y-2">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block">PROVIDER</span>
                            <span className="text-xs font-black text-slate-900 truncate block">{res.provider || 'GDG HUB'}</span>
                          </div>
                          <div className="space-y-2 text-right">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block">DURATION</span>
                            <span className="text-xs font-black text-slate-900 truncate block">{res.duration || 'Variable'}</span>
                          </div>
                        </div>

                        {/* Action Console */}
                        <div className="mt-auto pt-10">
                          <button className="w-full bg-slate-50 group-hover:bg-slate-950 text-slate-400 group-hover:text-white py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] transition-all duration-700 shadow-xl shadow-slate-100 group-hover:shadow-blue-500/20">
                            Access Knowledge Protocol
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Empty State */}
          {!loading && filteredResources.length === 0 && (
            <div className="text-center py-48 bg-slate-50 rounded-[5rem] border-4 border-dashed border-slate-100">
              <div className="text-8xl mb-12 opacity-20">🔎</div>
              <h3 className="text-4xl font-poppins font-black text-slate-950 mb-6 tracking-tighter">Null Search Results</h3>
              <p className="text-slate-500 text-xl font-medium max-w-xl mx-auto mb-16 leading-relaxed">
                The requested intel index could not be retrieved. Adjust your filter protocols or search parameters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); setActiveLevel('all'); }}
                className="bg-slate-950 text-white px-16 py-7 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.5em] hover:shadow-2xl transition-all hover:scale-105"
              >
                Reset Index Connection
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Final Polish CTA: The Knowledge Uplink */}
      <section className="bg-slate-950 py-48 md:py-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent"></div>
        <div className="container-custom relative z-10 text-center px-6">
          <div className="inline-block px-8 py-3 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.6em] mb-12">System Knowledge Sync</div>
          <h2 className="text-6xl md:text-[10rem] font-poppins font-black text-white leading-[0.85] tracking-tighter mb-16 italic">
            BUILD THE<br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">IMPOSSIBLE.</span>
          </h2>
          <p className="text-slate-400 text-xl md:text-3xl font-medium max-w-4xl mx-auto leading-relaxed mb-24 opacity-80">
            Our intelligence repository is built by the community, for the community. Add your knowledge footprint to the archive.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button className="bg-white text-slate-950 px-20 py-8 rounded-full font-black text-[13px] uppercase tracking-[0.5em] hover:shadow-[0_0_80px_rgba(255,255,255,0.2)] transition-all hover:scale-110 active:scale-95">
              Join Neural Network
            </button>
            <button className="bg-white/5 backdrop-blur-3xl text-white px-20 py-8 rounded-full font-black text-[13px] uppercase tracking-[0.5em] border border-white/10 hover:bg-white/10 transition-all hover:scale-110">
              Recommend Intel
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;