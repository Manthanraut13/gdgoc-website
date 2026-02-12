import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { getBlogs } from "../services/api";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const articleRef = useRef(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await getBlogs();
        const allBlogs = res.data?.data || [];
        const found = allBlogs.find(b => b._id === id || b.id === id);

        if (found) {
          setBlog(found);
        } else {
          setError("Article not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (blog && articleRef.current) {
      gsap.fromTo(articleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
      );
    }
  }, [blog]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error || !blog) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 text-center">
      <span className="text-6xl mb-6">📜</span>
      <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tighter">{error || "Article missing"}</h2>
      <button onClick={() => navigate("/blog")} className="px-10 py-4 bg-gray-900 text-white font-black rounded-2xl shadow-xl hover:-translate-y-1 transition-all uppercase tracking-widest text-[10px]">
        Back to Feed
      </button>
    </div>
  );

  return (
    <div ref={articleRef} className="page-wrapper pt-20 bg-white min-h-screen pb-32">
      {/* Editorial Header */}
      <header className="container-custom py-16 lg:py-24 text-center max-w-5xl">
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="bg-blue-50 text-blue-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 italic">
              {blog.category}
            </span>
            {blog.featured && (
              <span className="bg-amber-100 text-amber-700 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-amber-200">
                Featured Spotlight
              </span>
            )}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none italic px-4">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
            <span>{new Date(blog.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
            <span>{blog.readTime || "5 min read"}</span>
          </div>
        </div>

        {/* Hero Image */}
        {blog.image && (
          <div className="rounded-[4rem] overflow-hidden shadow-2xl border border-gray-100 max-w-6xl mx-auto mb-20 animate-in zoom-in-95 duration-1000">
            <img src={blog.image} alt={blog.title} className="w-full h-auto aspect-video object-cover" />
          </div>
        )}

        {/* Author Identity */}
        <div className="flex flex-col items-center gap-4 border-b border-gray-100 pb-16">
          <div className="w-20 h-20 rounded-full bg-blue-50 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center font-black text-blue-500 text-2xl uppercase">
            {blog.authorAvatar ? <img src={blog.authorAvatar} alt="" className="w-full h-full object-cover" /> : blog.author?.charAt(0)}
          </div>
          <div className="text-center">
            <div className="text-xl font-black text-gray-900 tracking-tight leading-tight">{blog.author}</div>
            <div className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mt-1">{blog.authorRole || "Lead Technical Contributor"}</div>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="container-custom max-w-4xl">
        <div className="prose prose-2xl prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:italic prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-gray-900 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-8 prose-blockquote:rounded-3xl prose-blockquote:not-italic prose-blockquote:font-bold prose-img:rounded-[3rem] prose-img:shadow-2xl">
          <div className="whitespace-pre-wrap font-medium">
            {blog.content}
          </div>
        </div>

        {/* Post Metadata & Engagement */}
        <div className="mt-24 pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-8 flex-1">
            {blog.tags && blog.tags.length > 0 && (
              <div>
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Discovery Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, i) => (
                    <span key={i} className="px-5 py-2 bg-gray-50 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100">#{tag}</span>
                  ))}
                </div>
              </div>
            )}
            {blog.seoKeywords && blog.seoKeywords.length > 0 && (
              <div>
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Semantic Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {blog.seoKeywords.map((kw, i) => (
                    <span key={i} className="px-5 py-2 bg-blue-50 text-blue-400 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-blue-100 italic">{kw}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-full md:w-auto flex items-center gap-6 bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">❤️</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{blog.likes || 0} Likes</span>
            </div>
            <div className="w-[1px] h-12 bg-gray-200"></div>
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">💬</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{blog.comments || 0} Comments</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-20 flex justify-between items-center">
          <button
            onClick={() => navigate("/blog")}
            className="px-10 py-5 bg-gray-900 text-white font-black rounded-2xl shadow-2xl shadow-gray-200 hover:-translate-y-1 transition-all uppercase tracking-widest text-[10px] active:scale-95"
          >
            ← Return to Feed
          </button>
          <button className="hidden md:flex items-center gap-3 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-gray-900 transition-colors">
            Share Article <span>↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
