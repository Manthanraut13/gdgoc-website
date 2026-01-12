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

  const categories = [
    'all',
    'Tech Articles',
    'Event Highlights',
    'Member Spotlights'
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.page-hero-content',
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    );

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
        }
      }
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
        setBlogs(res.data.data || []);
      } catch {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [activeCategory, searchQuery]);

  return (
    <div className="page-wrapper pt-20">
      {/* Hero */}
      <section
        ref={heroRef}
        className="min-h-[50vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center"
      >
        <div className="container-custom text-center">
          <div className="page-hero-content max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Community <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-xl text-medium-gray">
              Stories, tutorials, and highlights from our community.
            </p>
          </div>
        </div>
      </section>

      {/* Blogs */}
      <section ref={blogRef} className="section-padding bg-white">
        <div className="container-custom">
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-slate-100 rounded-2xl"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-2xl font-semibold ${
                  activeCategory === cat
                    ? 'bg-gdg-blue text-white'
                    : 'bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-16 text-lg font-medium">
              Loading blogs...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map(blog => (
                <Link key={blog._id} to={`/blog/${blog._id}`} className="block">
                  <div className="bg-card-bg rounded-3xl shadow-soft overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full">
                    <div className="p-6 h-full flex flex-col">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                        {blog.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="text-sm text-gray-500 mt-auto">
                        {blog.author} •{' '}
                        {new Date(blog.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && blogs.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              No blogs found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
