import React from 'react';
import Hero from '../components/sections/Hero';
import TechTicker from '../components/sections/TechTicker';
import Stats from '../components/sections/Stats';

// Full pages used as sections
import About from './About';
import Events from './Events';
import Team from './Team';
import Projects from './Projects';
import Resources from './Resources';
import Blog from './Blog';
import Gallery from './Gallery';
import Contact from './Contact';
import JoinUs from './JoinUs';

const Home = () => {
  return (
    <div className="single-page-scroll">
      {/* 1. Hero */}
      <section id="hero">
        <Hero />
      </section>

      {/* 2. Tech Ticker */}
      <TechTicker />

      {/* 3. About Section */}
      <About />

      {/* 4. Team Section */}
      <Team />

      {/* 5. Events Section */}
      <Events />

      {/* 6. Projects Section */}
      <Projects />

      {/* 7. Resources Section */}
      <Resources />

      {/* 9. Gallery Section */}
      <Gallery />

      {/* 11. Contact Section */}
      <div id="contact">
        <Contact />
      </div>

      {/* 12. Join Us Section */}
      <div id="join">
        <JoinUs />
      </div>

      <style>{`
        .single-page-scroll > div {
          scroll-margin-top: 80px;
        }
        #hero, #about, #team, #events, #projects, #resources, #blog, #gallery, #contact, #join {
          scroll-margin-top: 80px;
        }
        /* Optional: adjust some top paddings in subpages since they follow each other */
        #team, #events, #projects, #resources, #blog, #gallery, #contact, #join {
          border-top: 2px solid var(--ink-900);
        }
      `}</style>
    </div>
  );
};

export default Home;
