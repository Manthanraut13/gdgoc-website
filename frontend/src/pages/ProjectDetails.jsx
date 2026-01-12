import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjects } from "../services/api";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getProjects();
        const allProjects = res.data?.data || [];
        
        // Find project by ID (both _id and id)
        const found = allProjects.find(p => 
          p._id === id || p.id === parseInt(id) || p.id === id
        );
        
        if (found) {
          // Map API data to display format
          setProject({
            id: found._id || found.id,
            title: found.title,
            description: found.description,
            status: found.status || 'planning',
            progress: found.progress || 0,
            category: found.category || 'web',
            tech: Array.isArray(found.technologies) ? found.technologies : (found.tech || []),
            team: found.team || [],
            github: found.github || null,
            demo: found.demo || null,
            timeline: found.timeline || 'TBD',
            impact: found.impact || '',
            image: found.image || null,
            link: found.link || found.github
          });
        } else {
          setError("Project not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project");
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 text-center">
        <p className="text-lg text-gray-600">Loading project...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate("/projects")}
          className="text-blue-600 hover:underline"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-32 text-center">
        <p className="text-gray-600 mb-4">Project not found</p>
        <button
          onClick={() => navigate("/projects")}
          className="text-blue-600 hover:underline"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-gradient-to-r from-green-500 to-emerald-600';
      case 'ongoing':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'planning':
        return 'bg-gradient-to-r from-orange-500 to-orange-600';
      default:
        return 'bg-gradient-to-r from-slate-500 to-gray-600';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'completed':
        return '✅ Completed';
      case 'ongoing':
        return '🚀 In Progress';
      case 'planning':
        return '📋 Planning';
      default:
        return status;
    }
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      'web': '🌐',
      'mobile': '📱',
      'ai-ml': '🧠',
      'iot': '🔌',
      'cloud': '☁️'
    };
    return emojis[category] || '🎯';
  };

  return (
    <div className="page-wrapper pt-20 bg-white">
      {/* Hero Banner */}
      <div className={`${getStatusColor(project.status)} h-64 flex items-center justify-center`}>
        <div className="text-center text-white">
          <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
            {getStatusLabel(project.status)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-2">
          <button
            onClick={() => navigate("/projects")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4"
          >
            ← Back to Projects
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        
        <p className="text-lg text-gray-600 mb-8">{project.description}</p>

        {/* Progress Bar */}
        {project.progress !== undefined && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold text-gray-500 uppercase">Progress</p>
              <span className="text-sm font-bold text-gray-800">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Category</p>
              <p className="text-lg text-gray-800">
                <span className="mr-2">{getCategoryEmoji(project.category)}</span>
                {project.category.replace('-', ' ').toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Timeline</p>
              <p className="text-lg text-gray-800">⏱️ {project.timeline}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Status</p>
              <p className="text-lg text-gray-800 capitalize">{project.status}</p>
            </div>
          </div>

          <div className="space-y-4">
            {project.team && project.team.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase">Team Size</p>
                <p className="text-lg text-gray-800">👥 {project.team.length} members</p>
              </div>
            )}
            {project.impact && (
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase">Impact</p>
                <p className="text-lg text-gray-800">{project.impact}</p>
              </div>
            )}
          </div>
        </div>

        {/* Technologies */}
        {project.tech && project.tech.length > 0 && (
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-500 uppercase mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Team Members */}
        {project.team && project.team.length > 0 && (
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-500 uppercase mb-3">Team Members</p>
            <div className="flex flex-wrap gap-2">
              {project.team.map((member, i) => (
                <span
                  key={i}
                  className="bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {member}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-4 mb-8">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 font-semibold"
            >
              <span>GitHub</span>
              <span>→</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              <span>View Demo</span>
              <span>→</span>
            </a>
          )}
          {project.link && !project.github && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              <span>View Project</span>
              <span>→</span>
            </a>
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/projects")}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to All Projects
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
