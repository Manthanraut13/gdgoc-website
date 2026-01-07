import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { submitContactForm } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

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

    gsap.fromTo('.page-hero h1',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo('.page-hero p',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power2.out' }
    );

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
        }
      }
    );

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
        }
      }
    );

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await submitContactForm(formData);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      });
    } catch (err) {
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper pt-20">
      <section className="page-hero">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100">Get in touch with our team</p>
        </div>
      </section>

      <section ref={contactRef} className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="info-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                ref={addToInfoCardsRef}
                className="info-card bg-gradient-to-br text-white rounded-2xl p-6 text-center"
              >
                <div className={`${info.color} rounded-2xl p-6 h-full`}>
                  <div className="text-4xl mb-4">{info.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                  <p className="font-semibold">{info.details}</p>
                  <p className="text-sm opacity-90">{info.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div ref={formRef}>
            <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required className="w-full p-3 border rounded" />
              <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required className="w-full p-3 border rounded" />
              <input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" required className="w-full p-3 border rounded" />
              <select name="category" value={formData.category} onChange={handleInputChange} required className="w-full p-3 border rounded">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} placeholder="Message" required className="w-full p-3 border rounded" />
              <button type="submit" disabled={loading} className="bg-[#4285F4] text-white px-6 py-3 rounded">
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
