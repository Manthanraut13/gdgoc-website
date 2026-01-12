import { useState, useEffect } from "react";
import { getEvents, getProjects, getResources, getBlogs, getContacts, getJoinApplications } from "../../services/api";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    events: 0,
    projects: 0,
    resources: 0,
    blogs: 0,
    contacts: 0,
    joinRequests: 0,
  });

  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      setLoading(true);
      const eventsRes = await getEvents();
      const projectsRes = await getProjects();
      const resourcesRes = await getResources();
      const blogsRes = await getBlogs();
      const contactsRes = await getContacts();
      const joinRes = await getJoinApplications();

      setStats({
        events: eventsRes.data?.data?.length || 0,
        projects: projectsRes.data?.data?.length || 0,
        resources: resourcesRes.data?.data?.length || 0,
        blogs: blogsRes.data?.data?.length || 0,
        contacts: contactsRes.data?.data?.length || 0,
        joinRequests: joinRes.data?.data?.length || 0,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome, Admin 👋</h1>
        <p className="text-gray-600 mt-2">Here's an overview of your dashboard.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Loading stats...</p>
          </div>
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-700">Events</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.events}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-700">Projects</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.projects}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-700">Resources</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">{stats.resources}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-700">Blogs</h3>
              <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.blogs}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-700">Contact Messages</h3>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.contacts}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-700">Join Requests</h3>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.joinRequests}</p>
            </div>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/events"
            className="block bg-blue-500 text-white text-center p-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Manage Events
          </a>
          <a
            href="/admin/projects"
            className="block bg-green-500 text-white text-center p-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            Manage Projects
          </a>
          <a
            href="/admin/resources"
            className="block bg-purple-500 text-white text-center p-4 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Manage Resources
          </a>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              E
            </div>
            <div>
              <p className="font-medium text-gray-800">New event added</p>
              <p className="text-sm text-gray-500">Just now</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
              P
            </div>
            <div>
              <p className="font-medium text-gray-800">Project updated</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              R
            </div>
            <div>
              <p className="font-medium text-gray-800">Resource added</p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
