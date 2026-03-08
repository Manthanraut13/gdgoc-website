import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public pages
import Home from '../pages/Home';
import EventDetails from '../pages/EventDetails';
import ProjectDetails from '../pages/ProjectDetails';
import ResourceDetails from '../pages/ResourceDetails';
import BlogDetails from '../pages/BlogDetails';
import Login from "../auth/Login";
import ProtectedRoute from "../auth/ProtectedRoute";

// Admin pages
import AdminLayout from "../admin/AdminLayout";
import DashboardHome from "../admin/pages/DashboardHome";
import ManageEvents from "../admin/pages/ManageEvents";
import ManageBlogs from "../admin/pages/ManageBlogs";
import ManageProjects from "../admin/pages/ManageProjects";
import ManageResources from "../admin/pages/ManageResources";
import ManageJoinApplications from "../admin/pages/ManageJoinApplications";
import ManageContacts from "../admin/pages/ManageContacts";

import ScrollToTop from "../components/ScrollToTop";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />

        {/* Redirect old routes to Home with hash anchors */}
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        <Route path="/team" element={<Navigate to="/#team" replace />} />
        <Route path="/events" element={<Navigate to="/#events" replace />} />
        <Route path="/projects" element={<Navigate to="/#projects" replace />} />
        <Route path="/resources" element={<Navigate to="/#resources" replace />} />
        <Route path="/blog" element={<Navigate to="/#blog" replace />} />
        <Route path="/gallery" element={<Navigate to="/#gallery" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route path="/join" element={<Navigate to="/#join" replace />} />

        {/* Detail routes remain separate */}
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/resources/:id" element={<ResourceDetails />} />
        <Route path="/blog/:id" element={<BlogDetails />} />

        <Route path="/login" element={<Login />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="resources" element={<ManageResources />} />
          <Route path="blogs" element={<ManageBlogs />} />
          <Route path="join" element={<ManageJoinApplications />} />
          <Route path="contacts" element={<ManageContacts />} />
        </Route>

        {/* Catch all to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
