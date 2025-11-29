import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    year: '',
    major: '',
    interests: [],
    experience: '',
    message: ''
  });

  const joinRef = useRef(null);
  const benefitsRef = useRef([]);
  const formRef = useRef(null);

  const benefits = [
    {
      icon: '📚',
      title: 'Learn New Technologies',
      description: 'Hands-on experience with Google technologies and modern development tools through workshops and study jams.'
    },
    {
      icon: '👥',
      title: 'Build Your Network',
      description: 'Connect with like-minded students, industry professionals, and potential collaborators for your projects.'
    },
    {
      icon: '💼',
      title: 'Career Opportunities',
      description: 'Gain skills that employers value and access internship opportunities through our industry partnerships.'
    },
    {
      icon: '🚀',
      title: 'Project Experience',
      description: 'Work on real-world projects and build your portfolio with guidance from experienced mentors.'
    },
    {
      icon: '🌍',
      title: 'Global Community',
      description: 'Join a worldwide network of developers and participate in global Google Developer events and programs.'
    },
    {
      icon: '🏆',
      title: 'Recognition',
      description: 'Get certificates for completed study jams, showcase your projects, and earn recognition for your contributions.'
    }
  ];

  const interests = [
    'Android Development',
    'Flutter',
    'Web Development',
    'Cloud Computing',
    'Machine Learning',
    'UI/UX Design',
    'DevOps',
    'Open Source'
  ];

  const experienceLevels = [
    'Beginner',
    'Intermediate',
    'Advanced'
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

    // Join section animation
    gsap.fromTo(joinRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: joinRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Benefits stagger animation
    gsap.fromTo('.benefit-card',
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.benefits-grid',
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

  }, []);

  const addToBenefitsRef = (el) => {
    if (el && !benefitsRef.current.includes(el)) {
      benefitsRef.current.push(el);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          interests: [...prev.interests, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          interests: prev.interests.filter(interest => interest !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your application! We will contact you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      year: '',
      major: '',
      interests: [],
      experience: '',
      message: ''
    });
  };

  return (
    <div className="pt-20">
      <section className="page-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Us</h1>
          <p className="text-xl text-blue-100">Become part of our growing developer community</p>
        </div>
      </section>

      <section 
        ref={joinRef}
        className="section-padding bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Benefits Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Join GDG On-Campus?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join a vibrant community of student developers and accelerate your learning journey with hands-on experience, 
              mentorship, and real-world projects.
            </p>
          </div>

          <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                ref={addToBenefitsRef}
                className="benefit-card bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group hover:-translate-y-2"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#4285F4] transition-colors duration-200">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Registration Form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Join?</h2>
                <p className="text-gray-600">
                  Fill out the form below to become a member of GDG On-Campus. We'll add you to our communication 
                  channels and keep you updated about upcoming events and opportunities.
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
                      placeholder="your.email@university.edu"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                      Academic Year *
                    </label>
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-colors duration-200"
                    >
                      <option value="">Select your year</option>
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-2">
                      Major/Field of Study *
                    </label>
                    <input
                      type="text"
                      id="major"
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-colors duration-200"
                      placeholder="Computer Science, Engineering, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Technical Interests (Select all that apply) *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {interests.map((interest) => (
                      <label key={interest} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={interest}
                          checked={formData.interests.includes(interest)}
                          onChange={handleInputChange}
                          className="rounded border-gray-300 text-[#4285F4] focus:ring-[#4285F4]"
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Programming Experience Level *
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select your experience level</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to join GDG? (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-colors duration-200"
                    placeholder="Tell us about your interests, goals, or what you hope to gain from the community..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-[#4285F4] text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 transform hover:scale-105 text-lg"
                  >
                    Submit Application
                  </button>
                  <p className="text-sm text-gray-500 mt-3">
                    We'll contact you within 2-3 business days with next steps.
                  </p>
                </div>
              </form>
            </div>

            {/* Alternative Registration */}
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Prefer to use Google Forms?</p>
              <a 
                href="https://forms.gle/example" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#34A853] text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200"
              >
                <span>Register via Google Forms</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinUs;