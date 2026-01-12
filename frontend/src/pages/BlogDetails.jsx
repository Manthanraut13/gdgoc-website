import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogs } from "../services/api";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogs();
        const allBlogs = res.data?.data || [];
        
        // Find blog by ID (both _id and id)
        const found = allBlogs.find(b => 
          b._id === id || b.id === parseInt(id) || b.id === id
        );
        
        if (found) {
          setBlog({
            id: found._id || found.id,
            title: found.title,
            content: found.content || found.excerpt,
            excerpt: found.excerpt,
            author: found.author || 'GDG Community',
            authorRole: found.authorRole || 'Contributor',
            date: found.date || new Date().toISOString(),
            category: found.category || 'Technology',
            readTime: found.readTime || '5 min read',
            image: found.image || null,
            featured: found.featured || false,
            tags: found.tags || [],
            likes: found.likes || 0,
            comments: found.comments || 0
          });
        } else {
          setError("Blog not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 text-center">
        <p className="text-lg text-gray-600">Loading blog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate("/blog")}
          className="text-blue-600 hover:underline"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-32 text-center">
        <p className="text-gray-600 mb-4">Blog not found</p>
        <button
          onClick={() => navigate("/blog")}
          className="text-blue-600 hover:underline"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="page-wrapper pt-20 bg-white">
      {/* Hero Banner with Image */}
      {blog.image && (
        <div className="h-96 overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-4">
          <button
            onClick={() => navigate("/blog")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4"
          >
            ← Back to Blog
          </button>
        </div>

        {/* Meta Information */}
        <div className="mb-8 border-b pb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>
          
          <div className="flex flex-wrap gap-4 items-center text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-dark-gray">{blog.author}</span>
              {blog.authorRole && <span className="text-sm">({blog.authorRole})</span>}
            </div>
            <span>•</span>
            <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>•</span>
            <span>📖 {blog.readTime}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {blog.category && (
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                {blog.category}
              </span>
            )}
          </div>
        </div>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-xl text-gray-700 mb-8 leading-relaxed italic">
            {blog.excerpt}
          </p>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-8 pt-8 border-t">
            <p className="text-sm font-semibold text-gray-500 uppercase mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Engagement Stats */}
        <div className="flex gap-6 py-6 border-t border-b">
          {blog.likes > 0 && (
            <div className="flex items-center gap-2 text-gray-600">
              <span>❤️</span>
              <span>{blog.likes} likes</span>
            </div>
          )}
          {blog.comments > 0 && (
            <div className="flex items-center gap-2 text-gray-600">
              <span>💬</span>
              <span>{blog.comments} comments</span>
            </div>
          )}
        </div>

        {/* Author Info */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">About the Author</h3>
          <p className="text-gray-700">
            {blog.author} is a {blog.authorRole} in the GDG community. They share their expertise and knowledge with the community through articles and workshops.
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/blog")}
          className="text-blue-600 hover:text-blue-800 font-medium mt-8"
        >
          ← Back to All Articles
        </button>
      </article>
    </div>
  );
};

export default BlogDetails;
