import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const navItem = "block px-4 py-2 rounded hover:bg-gray-200";

const AdminSidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

      <nav className="flex flex-col space-y-2">
        <NavLink to="/admin" className={navItem} end>
          Dashboard
        </NavLink>

        <NavLink to="/admin/events" className={navItem}>
          Events
        </NavLink>

        <NavLink to="/admin/projects" className={navItem}>
          Projects
        </NavLink>

        <NavLink to="/admin/resources" className={navItem}>
          Resources
        </NavLink>

        <NavLink to="/admin/blogs" className={navItem}>
          Blogs
        </NavLink>

        <NavLink to="/admin/join" className={navItem}>
          Join Requests
        </NavLink>

        <NavLink to="/admin/contacts" className={navItem}>
          Contact Messages
        </NavLink>
      </nav>

      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded w-full"
      >
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
