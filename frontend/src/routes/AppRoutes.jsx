import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public pages
import Home from '../pages/Home';
import About from '../pages/About';
import Team from '../pages/Team';
import Events from '../pages/Events';
import EventDetails from '../pages/EventDetails';
import Projects from '../pages/Projects';
import ProjectDetails from '../pages/ProjectDetails';
import Resources from '../pages/Resources';
import ResourceDetails from '../pages/ResourceDetails';
import JoinUs from '../pages/JoinUs';
import Blog from '../pages/Blog';
import BlogDetails from '../pages/BlogDetails';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import ScrollToTop from "../components/ScrollToTop";

// Admin pages
import AdminLayout from "../admin/AdminLayout";
import DashboardHome from "../admin/pages/DashboardHome";
import ManageEvents from "../admin/pages/ManageEvents";
import ManageBlogs from "../admin/pages/ManageBlogs";
import ManageProjects from "../admin/pages/ManageProjects";
import ManageResources from "../admin/pages/ManageResources";
import ManageJoinApplications from "../admin/pages/ManageJoinApplications";
import ManageContacts from "../admin/pages/ManageContacts";

import Login from "../auth/Login";
import ProtectedRoute from "../auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:id" element={<ResourceDetails />} />
        <Route path="/join" element={<JoinUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
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
      </Routes>
    </>
  );
};

export default AppRoutes;
