import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About = () => {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const conductRef = useRef(null);

  const values = [
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and encourage creative problem-solving.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '👥',
      title: 'Community',
      description: 'We believe in the power of collaboration and building together.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🌱',
      title: 'Growth',
      description: 'We foster continuous learning and personal development for all members.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '💡',
      title: 'Excellence',
      description: 'We strive for quality in everything we do, from events to projects.',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const timeline = [
    {
      year: '2022',
      title: 'GDG On-Campus Founded',
      description: 'Launched with 50 founding members and our first Android workshop series.'
    },
    {
      year: '2023',
      title: 'Community Growth',
      description: 'Expanded to 300+ members with monthly hackathons and study jams.'
    },
    {
      year: '2024',
      title: 'Innovation Hub',
      description: 'Became the premier tech community on campus with industry partnerships.'
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    gsap.fromTo('.page-hero-content',
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
      }
    );

    // Mission section
    gsap.fromTo(missionRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Values cards animation
    gsap.fromTo('.value-card',
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Timeline animation
    gsap.fromTo('.timeline-item',
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Code of conduct animation
    gsap.fromTo(conductRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: conductRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

  }, []);

  return (
    <div className="page-wrapper pt-20">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-[60vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gdg-blue rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gdg-green rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative">
          <div className="page-hero-content text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-soft mb-8">
              <div className="w-2 h-2 bg-gdg-blue rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-dark-gray">About GDG On-Campus</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-dark-gray mb-6 leading-tight">
              Building the Future of <span className="text-gradient">Tech Innovation</span>
            </h1>

            <p className="text-xl text-medium-gray leading-relaxed max-w-3xl mx-auto">
              We are a vibrant community of student developers passionate about Google technologies, 
              dedicated to creating an ecosystem where innovation thrives and skills transform into impact.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section 
        ref={missionRef}
        className="section-padding bg-white relative overflow-hidden"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Mission */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-gdg-blue px-4 py-2 rounded-2xl font-semibold text-sm mb-8">
                <div className="w-2 h-2 bg-gdg-blue rounded-full animate-pulse"></div>
                <span>Our Mission</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-dark-gray mb-6 leading-tight">
                Empowering <span className="text-gradient">Student Developers</span>
              </h2>

              <p className="text-lg text-medium-gray mb-6 leading-relaxed">
                To create a vibrant ecosystem where students can explore cutting-edge technologies, 
                develop practical skills through hands-on experience, and build innovative solutions 
                that make a positive impact on campus and beyond.
              </p>

              <p className="text-lg text-medium-gray leading-relaxed">
                We bridge the gap between academic learning and industry requirements, preparing 
                students for successful careers in technology through mentorship, collaboration, 
                and real-world project experience.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl font-semibold text-sm mb-6">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span>Our Vision</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-6">
                  Shaping Tomorrow's <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Tech Leaders</span>
                </h3>

                <p className="text-blue-100 leading-relaxed mb-6">
                  To be the premier platform for student developers to innovate, collaborate, 
                  and lead in the rapidly evolving world of technology.
                </p>

                <ul className="space-y-3">
                  {[
                    'Foster innovation through hands-on learning',
                    'Build a supportive and inclusive community',
                    'Connect students with industry opportunities',
                    'Drive technological advancement on campus'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 text-blue-100">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        ref={valuesRef}
        className="section-padding bg-slate-50 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gdg-red rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gdg-yellow rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-soft mb-6">
              <div className="w-2 h-2 bg-gdg-green rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-dark-gray">Our Values</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-dark-gray mb-6">
              What <span className="text-gradient">Drives Us</span>
            </h2>

            <p className="text-xl text-medium-gray max-w-2xl mx-auto leading-relaxed">
              Our core principles guide everything we do, from event planning to community building
            </p>
          </div>

          {/* Values Grid */}
          <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="value-card group"
              >
                <div className="bg-card-bg rounded-3xl p-6 shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-gray-200 h-full text-center">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg mx-auto mb-6 group-hover:scale-110 transform transition-all duration-300`}>
                    {value.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">
                    {value.title}
                  </h3>

                  <p className="text-medium-gray leading-relaxed">
                    {value.description}
                  </p>

                  {/* Decorative Line */}
                  <div className={`mt-6 w-12 h-1 bg-gradient-to-r ${value.gradient} rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-gdg-blue px-4 py-2 rounded-2xl font-semibold text-sm mb-6">
              <div className="w-2 h-2 bg-gdg-blue rounded-full animate-pulse"></div>
              <span>Our Journey</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-dark-gray mb-6">
              Building <span className="text-gradient">Together</span>
            </h2>
          </div>

          <div className="timeline-container max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div 
                key={index}
                className="timeline-item relative flex items-start space-x-8 mb-12 last:mb-0"
              >
                {/* Year */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-gdg-blue to-blue-600 rounded-2xl flex items-center justify-center text-white font-poppins font-bold text-xl shadow-lg">
                    {item.year}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow bg-slate-50 rounded-3xl p-6 shadow-soft border border-gray-100">
                  <h3 className="text-2xl font-poppins font-bold text-dark-gray mb-3">
                    {item.title}
                  </h3>
                  <p className="text-medium-gray leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Connector Line */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-12 top-24 w-0.5 h-16 bg-gradient-to-b from-gdg-blue to-blue-600 -bottom-12"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code of Conduct Section */}
      <section 
        ref={conductRef}
        className="section-padding bg-slate-900 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-2xl font-semibold text-sm mb-6 border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Community Guidelines</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
                Code of <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">Conduct</span>
              </h2>

              <p className="text-xl text-blue-100 leading-relaxed">
                We are dedicated to providing a harassment-free and inclusive experience for everyone
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
              <p className="text-blue-100 text-lg leading-relaxed mb-8">
                All participants in our community, including events, online spaces, and communications, 
                are expected to follow this code of conduct. We are committed to providing a friendly, 
                safe, and welcoming environment for all.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Be Respectful',
                    description: 'Value each other\'s ideas, styles, and viewpoints. We may not always agree, but disagreement is no excuse for poor manners.',
                    icon: '🤝'
                  },
                  {
                    title: 'Be Inclusive',
                    description: 'Seek diverse perspectives. Diversity of views and people powers innovation, even if it is uncomfortable.',
                    icon: '🌍'
                  },
                  {
                    title: 'Be Collaborative',
                    description: 'Work together to build up the community. The power of our community comes from its collaborative nature.',
                    icon: '👥'
                  },
                  {
                    title: 'Be Professional',
                    description: 'Keep your communication professional and appropriate for a professional audience including people of many different backgrounds.',
                    icon: '💼'
                  }
                ].map((principle, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-lg">
                        {principle.icon}
                      </div>
                      <h3 className="text-xl font-poppins font-bold text-white">
                        {principle.title}
                      </h3>
                    </div>
                    <p className="text-blue-100 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 p-6 bg-white/10 rounded-2xl border border-white/20 text-center">
                <h4 className="text-white font-poppins font-bold text-lg mb-3">
                  Need to Report an Issue?
                </h4>
                <p className="text-blue-100 mb-4">
                  Our community leaders are here to help. Reach out to us confidentially.
                </p>
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transform transition-all duration-300">
                  Contact Community Leaders
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;