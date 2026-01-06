import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from "../../assets/google_developers_logo.png";



const Footer = () => {
  const footerRef = useRef(null);
  const sectionsRef = useRef([]);

 const socialLinks = [
  {
    name: 'GitHub',
    img: '/images/GitHub-Symbol.png',
    url: 'https://github.com/gdg',
    color: 'hover:text-gray-700'
  },
  {
    name: 'LinkedIn',
    img: '/images/linkedin-logo.jpg',
    url: 'https://linkedin.com/company/gdg',
    color: 'hover:text-blue-600'
  },
  {
    name: 'Twitter',
    img: '/images/twitter.webp',
    url: 'https://twitter.com/gdg',
    color: 'hover:text-sky-500'
  },
  {
    name: 'Discord',
    img: '/images/discord.jpg',
    url: 'https://discord.gg/gdg',
    color: 'hover:text-purple-500'
  },

];


  const quickLinks = [
    { name: 'Events', path: '/events' },
    { name: 'Projects', path: '/projects' },
    { name: 'Resources', path: '/resources' },
    { name: 'Blog', path: '/blog' },
    { name: 'Team', path: '/team' },
    { name: 'Join Us', path: '/join' }
  ];

  const supportLinks = [
    { name: 'Contact', path: '/contact' },
    { name: 'Code of Conduct', path: '/about#conduct' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Footer reveal animation
    gsap.fromTo(footerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Footer sections stagger animation
    gsap.fromTo('.footer-section',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Social links animation
    gsap.fromTo('.social-link',
      { scale: 0, rotation: -180 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.social-links',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      }
    );

  }, []);

  const addToSectionsRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-dark-gray text-white relative overflow-hidden"
    >
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gdg-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gdg-green rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 py-16">
          {/* Brand Section */}
          <div ref={addToSectionsRef} className="footer-section lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center">
                                <img src={logo} alt="GDG Logo" className="w-10 h-7" />
                              </div>
              
              <div className="flex flex-col">
                <span className="font-poppins font-bold text-xl text-white">GDG On-Campus</span>
                <span className="text-gray-400 text-sm font-medium">Google Developer Group</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Empowering student developers through workshops, study jams, and community events. 
              Join us to learn, build, and grow together in the world of technology.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
  {socialLinks.map((item, index) => (
<a
  key={index}
  href={item.url}
  target="_blank"
  rel="noopener noreferrer"
  className={item.color}
>
  <div
    className="w-10 h-10 bg-white rounded-full overflow-hidden
               flex items-center justify-center
               transition-all duration-300
               hover:scale-110 hover:shadow-lg"
  >
    <img
      src={item.img}
      alt={item.name}
      className="w-7 h-7 object-contain"
    />
  </div>
</a>



  ))}
</div>

          </div>

          {/* Quick Links */}
          <div ref={addToSectionsRef} className="footer-section">
            <h4 className="font-poppins font-semibold text-white text-lg mb-6">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="block text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 group"
                >
                  <span className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-gdg-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span>{link.name}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div ref={addToSectionsRef} className="footer-section">
            <h4 className="font-poppins font-semibold text-white text-lg mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gdg-blue rounded-lg flex items-center justify-center text-white text-sm mt-1">
                  📧
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Email</p>
                  <p className="text-gray-400 text-sm">gdgoc.zcoer@zealeducation.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-white text-sm mt-1">
                  📍
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Location</p>
                  <p className="text-gray-400 text-sm">Zeal College of Engineering and research</p>
                  <p className="text-gray-400 text-sm">Narhe, Pune</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gdg-yellow rounded-lg flex items-center justify-center text-white text-sm mt-1">
                  🕒
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Meeting Times</p>
                  <p className="text-gray-400 text-sm">Every Sunday</p>
                  <p className="text-gray-400 text-sm">8:00 PM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              <p>&copy; 2024 GDG On-Campus. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              {supportLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="text-gray-500 text-xs text-center md:text-right">
              <p>Google Developer Groups are independent groups; our activities and opinions are not necessarily endorsed by Google.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;