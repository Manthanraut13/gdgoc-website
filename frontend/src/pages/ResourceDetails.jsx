import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResources } from "../services/api";

const ResourceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await getResources();
        const allResources = res.data?.data || [];
        
        // Find resource by ID (both _id and id)
        const found = allResources.find(r => 
          r._id === id || r.id === parseInt(id) || r.id === id
        );
        
        if (found) {
          setResource({
            id: found._id || found.id,
            title: found.title,
            description: found.description,
            category: found.category || 'Other',
            url: found.url || found.link || '#',
            difficulty: found.difficulty || 'Beginner',
            icon: found.icon || '📘',
            featured: found.featured || false,
            type: found.type || 'documentation',
            format: found.format || 'Video/Text',
            duration: found.duration || 'Self-paced',
            level: found.level || 'Beginner',
            downloads: found.downloads || 0,
            rating: found.rating || 0,
            tags: found.tags || [],
            link: found.url || found.link || '#'
          });
        } else {
          setError("Resource not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching resource:", err);
        setError("Failed to load resource");
        setLoading(false);
      }
    };

    fetchResource();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 text-center">
        <p className="text-lg text-gray-600">Loading resource...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate("/resources")}
          className="text-blue-600 hover:underline"
        >
          Back to Resources
        </button>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="pt-32 text-center">
        <p className="text-gray-600 mb-4">Resource not found</p>
        <button
          onClick={() => navigate("/resources")}
          className="text-blue-600 hover:underline"
        >
          Back to Resources
        </button>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="page-wrapper pt-20 bg-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-64 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">{resource.icon}</div>
          <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
            {resource.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-2">
          <button
            onClick={() => navigate("/resources")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4"
          >
            ← Back to Resources
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-4">{resource.title}</h1>
        
        <p className="text-lg text-gray-600 mb-8">{resource.description}</p>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Category</p>
              <p className="text-lg text-gray-800">{resource.category}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Difficulty Level</p>
              <p className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(resource.difficulty)}`}>
                {resource.difficulty}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Format</p>
              <p className="text-lg text-gray-800">{resource.format}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Duration</p>
              <p className="text-lg text-gray-800">⏱️ {resource.duration}</p>
            </div>
            {resource.downloads > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase">Downloads</p>
                <p className="text-lg text-gray-800">📥 {resource.downloads.toLocaleString()}</p>
              </div>
            )}
            {resource.rating > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase">Rating</p>
                <p className="text-lg text-gray-800">⭐ {resource.rating}/5</p>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-500 uppercase mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="mb-8">
          <a
            href={resource.url || resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg"
          >
            <span>Access Resource</span>
            <span>→</span>
          </a>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/resources")}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to All Resources
        </button>
      </div>
    </div>
  );
};

export default ResourceDetails;
