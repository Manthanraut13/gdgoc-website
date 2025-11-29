import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const contactRef = useRef(null);
  const infoCardsRef = useRef([]);
  const formRef = useRef(null);

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'gdg@youruniversity.edu',
      description: 'Send us an email for general inquiries',
      color: 'from-[#4285F4] to-blue-500'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      details: 'Your University Campus',
      description: 'City, State 12345',
      color: 'from-[#34A853] to-green-500'
    },
    {
      icon: '🕒',
      title: 'Meeting Times',
      details: 'Every Wednesday',
      description: '6:00 PM - 8:00 PM',
      color: 'from-[#FBBC04] to-yellow-500'
    },
    {
      icon: '📱',
      title: 'Social Media',
      details: '@gdgoncampus',
      description: 'Follow us for updates',
      color: 'from-[#EA4335] to-red-500'
    }
  ];

  const categories = [
    'General Inquiry',
    'Event Collaboration',
    'Speaker Opportunity',
    'Technical Support',
    'Partnership',
    'Feedback',
    'Other'
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Page hero animation
    gsap.fromTo('.page-hero h1',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    );

    gsap.fromTo('.page-hero p',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out'
      }
    );

    // Contact section animation
    gsap.fromTo(contactRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Info cards stagger animation
    gsap.fromTo('.info-card',
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.info-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Form animation
    gsap.fromTo(formRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Map container animation
    gsap.fromTo('.map-container',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.map-container',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

  }, []);

  const addToInfoCardsRef = (el) => {
    if (el && !infoCardsRef.current.includes(el)) {
      infoCardsRef.current.push(el);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you within 24 hours.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    });
  };

  return (
    <div className="pt-20">
      <section className="page-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100">Get in touch with our team - we'd love to hear from you!</p>
        </div>
      </section>

      <section 
        ref={contactRef}
        className="section-padding bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Information */}
          <div className="info-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                ref={addToInfoCardsRef}
                className="info-card bg-gradient-to-br text-white rounded-2xl p-6 text-center group hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className={`${info.color} rounded-2xl p-6 h-full flex flex-col justify-between`}>
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                    <p className="font-semibold mb-1">{info.details}</p>
                    <p className="text-white text-opacity-90 text-sm">{info.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div ref={formRef}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-colors duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-colors duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-colors duration-200"
                      placeholder="What is this regarding?"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-colors duration-200"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-colors duration-200"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4285F4] text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium text-lg transform hover:scale-105 transition-transform duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              
              {/* Social Links */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Discord', icon: '💬', color: 'bg-purple-500' },
                    { name: 'GitHub', icon: '💻', color: 'bg-gray-800' },
                    { name: 'LinkedIn', icon: '💼', color: 'bg-blue-600' },
                    { name: 'Twitter', icon: '🐦', color: 'bg-sky-500' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow duration-200 group"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${social.color}`}>
                        <span className="text-lg">{social.icon}</span>
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-[#4285F4] transition-colors duration-200">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Answers</h3>
                <div className="space-y-4">
                  {[
                    {
                      question: "How often do you host events?",
                      answer: "We host workshops every 2 weeks and major events monthly."
                    },
                    {
                      question: "Do I need prior experience to join?",
                      answer: "No! We welcome students of all skill levels."
                    },
                    {
                      question: "Is there a membership fee?",
                      answer: "No, GDG On-Campus is completely free to join."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                      <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="map-container mt-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Us on Campus</h3>
                <p className="text-gray-600 mb-4">
                  We're located in the Computer Science Building, Room 301
                </p>
                <button className="bg-[#4285F4] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  View Campus Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;