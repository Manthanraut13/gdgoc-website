import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Team from '../pages/Team';
import Events from '../pages/Events';
import EventDetails from '../pages/EventDetails';
import Projects from '../pages/Projects';
import Resources from '../pages/Resources';
import JoinUs from '../pages/JoinUs';
import Blog from '../pages/Blog';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import ScrollToTop from "../components/ScrollToTop";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/team" element={<Team />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/join" element={<JoinUs />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    </>
  );
};

export default AppRoutes;