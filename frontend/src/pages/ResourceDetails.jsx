import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { getResources } from "../services/api";

const ResourceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const mainRef = useRef(null);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        setLoading(true);
        const res = await getResources();
        const allResources = res.data?.data || [];
        const found = allResources.find(r => r._id === id || r.id === id);

        if (found) {
          setResource(found);
        } else {
          setError("Resource not found");
        }
      } catch (err) {
        console.error("Error fetching resource:", err);
        setError("Failed to load knowledge asset");
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [id]);

  useEffect(() => {
    if (resource && mainRef.current) {
      gsap.fromTo(mainRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
      );
    }
  }, [resource]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error || !resource) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] p-4 text-center">
      <div className="text-6xl mb-6">🔍</div>
      <h2 className="text-3xl font-black text-gray-900 mb-4">{error || "Asset not found"}</h2>
      <button onClick={() => navigate("/resources")} className="px-8 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:shadow-blue-200 transition-all">
        Back to Library
      </button>
    </div>
  );

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'beginner': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'intermediate': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'advanced': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div ref={mainRef} className="page-wrapper pt-20 bg-[#fafafa] min-h-screen pb-32">
      {/* Hero Header */}
      <section className="relative h-[50vh] flex items-end pb-12 overflow-hidden bg-slate-900">
        {resource.image && (
          <img src={resource.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[0.5px] scale-105" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

        <div className="container-custom relative z-10">
          <button
            onClick={() => navigate("/resources")}
            className="mb-8 text-white/60 hover:text-white flex items-center gap-2 font-bold uppercase tracking-widest text-xs transition-colors"
          >
            ← Back to Knowledge Hub
          </button>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {resource.category}
                </span>
                {resource.featured && (
                  <span className="bg-amber-400 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    ⭐ Featured Asset
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none italic">
                {resource.title}
              </h1>
              <p className="text-xl text-white/70 font-medium leading-relaxed line-clamp-2">
                {resource.description}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] flex flex-col items-center gap-2 min-w-[200px]">
              <span className="text-5xl">{resource.icon || "📘"}</span>
              <div className="flex items-center gap-1.5 bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400">
                <span className="text-sm">⭐</span>
                <span className="font-black text-sm">{resource.rating || "5.0"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container-custom mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Deep Info */}
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl shadow-gray-200/50 border border-white">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-blue-600"></span> Asset Breakdown
            </h2>
            <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-gray-500 prose-p:leading-relaxed">
              {resource.longDescription ? (
                resource.longDescription.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              ) : (
                <p>{resource.description}</p>
              )}
            </div>

            {resource.tags && resource.tags.length > 0 && (
              <div className="mt-12 pt-12 border-t border-gray-50">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Expertise Mapping</h3>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag, i) => (
                    <span key={i} className="px-5 py-2 bg-gray-50 text-gray-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100">
                      # {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Metadata Sidebar */}
        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-100 border border-gray-100">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-8 italic">Metadata Index</h3>

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Knowledge Provider</span>
                <span className="text-sm font-black text-gray-900">{resource.provider || "GDGOC Hub"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Language</span>
                <span className="text-sm font-black text-gray-900">{resource.language || "English"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Difficulty</span>
                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black border uppercase tracking-wider ${getDifficultyColor(resource.difficulty)}`}>
                  {resource.difficulty || "Beginner"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Asset Format</span>
                <span className="text-sm font-black text-gray-900">{resource.category}</span>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <a
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-100 transition-all active:scale-95"
              >
                Launch Knowledge Asset →
              </a>
              <p className="text-[10px] text-gray-400 text-center font-medium italic opacity-70">Redirects to external provider</p>
            </div>
          </div>

          {/* Quick Tip / Info Box */}
          <div className="bg-gradient-to-br from-gray-900 to-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-blue-900/10">
            <div className="text-3xl mb-4">💡</div>
            <h4 className="text-lg font-black tracking-tight mb-3">Community Mentorship</h4>
            <p className="text-gray-400 text-xs leading-relaxed font-medium">
              Stuck on a concept? Join our Discord server to discuss this resource with lead developers and mentors from our community.
            </p>
            <button className="mt-6 text-blue-400 font-black text-[10px] uppercase tracking-widest hover:text-blue-300 transition-colors">Join the conversation →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetails;
