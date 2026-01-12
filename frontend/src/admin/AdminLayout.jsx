import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray p-6 mt-14">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </header>

        {/* Main Content */}
        <div className="p-6 mt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
