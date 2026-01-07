import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Team = () => {
  const [activeTeam, setActiveTeam] = useState('core');
  const heroRef = useRef(null);
  const coreTeamRef = useRef(null);
  const mentorRef = useRef(null);

  const teams = {
    core: [
      {
        name: "Alex Johnson",
        role: "Lead Organizer",
        bio: "Passionate about building inclusive tech communities and Android development.",
        image: "/images/team/alex.jpg",
        social: { linkedin: "#", github: "#", twitter: "#" },
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        name: "Sarah Chen",
        role: "Technical Lead",
        bio: "Full-stack developer specializing in cloud technologies and system architecture.",
        image: "/images/team/sarah.jpg",
        social: { linkedin: "#", github: "#", twitter: "#" },
        gradient: "from-purple-500 to-pink-500"
      },
      {
        name: "Mike Rodriguez",
        role: "Events Coordinator",
        bio: "Event management expert with a passion for creating memorable developer experiences.",
        image: "/images/team/mike.jpg",
        social: { linkedin: "#", github: "#", twitter: "#" },
        gradient: "from-green-500 to-emerald-500"
      },
      {
        name: "Emily Watson",
        role: "Community Manager",
        bio: "Dedicated to fostering engagement and building strong community relationships.",
        image: "/images/team/emily.jpg",
        social: { linkedin: "#", github: "#", twitter: "#" },
        gradient: "from-orange-500 to-red-500"
      }
    ],
    tech: [
      {
        name: "David Kim",
        role: "Android Lead",
        bio: "Kotlin enthusiast and Android developer with 3+ years of experience.",
        image: "/images/team/david.jpg",
        social: { linkedin: "#", github: "#", twitter: "#" },
        gradient: "from-yellow-500 to-orange-500"
      },
      {
        name: "Lisa Wang",
        role: "Flutter Lead",
        bio: "Cross-platform development expert and UI/UX design enthusiast.",
        image: "/images/team/lisa.jpg",
        social: { linkedin: "#", github: "#", twitter: "#" },
        gradient: "from-indigo-500 to-purple-500"
      }
    ]
  };

  const facultyMentor = {
    name: "Dr. Michael Roberts",
    role: "Faculty Advisor",
    department: "Computer Science Department",
    bio: "Professor with 15+ years of experience in software engineering and research. Passionate about bridging academic learning with industry practices.",
    image: "/images/team/dr-roberts.jpg",
    social: { linkedin: "#", email: "#", website: "#" },
    gradient: "from-slate-600 to-blue-600"
  };

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

    // Core team animation
    gsap.fromTo(coreTeamRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: coreTeamRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Team cards animation
    gsap.fromTo('.team-card',
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.teams-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Mentor animation
    gsap.fromTo(mentorRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mentorRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

  }, [activeTeam]);

  const teamTabs = [
    { key: 'core', label: 'Core Team', count: teams.core.length },
    { key: 'tech', label: 'Tech Leads', count: teams.tech.length }
  ];

  return (
    <div className="page-wrapper pt-20 bg-white">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-[50vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gdg-blue rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gdg-green rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative">
          <div className="page-hero-content text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-soft mb-8">
              <div className="w-2 h-2 bg-gdg-blue rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-dark-gray">Meet Our Team</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-dark-gray mb-6 leading-tight">
              The <span className="text-gradient">People</span> Behind the Magic
            </h1>

            <p className="text-xl text-medium-gray leading-relaxed max-w-3xl mx-auto">
              Passionate students driving innovation, building community, and shaping the future 
              of technology at our university.
            </p>
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section 
        ref={coreTeamRef}
        className="section-padding bg-white relative overflow-hidden"
      >
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-gdg-blue px-4 py-2 rounded-2xl font-semibold text-sm mb-6">
              <div className="w-2 h-2 bg-gdg-blue rounded-full animate-pulse"></div>
              <span>Leadership Team</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-dark-gray mb-6">
              Core <span className="text-gradient">Committee</span>
            </h2>

            <p className="text-xl text-medium-gray max-w-2xl mx-auto leading-relaxed">
              Dedicated students leading our community initiatives and driving technological innovation
            </p>
          </div>

          {/* Team Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-slate-100 rounded-2xl p-1 inline-flex">
              {teamTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTeam(tab.key)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    activeTeam === tab.key
                      ? 'bg-white text-dark-gray shadow-sm'
                      : 'text-medium-gray hover:text-dark-gray'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{tab.label}</span>
                    <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Teams Grid */}
          <div className="teams-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teams[activeTeam].map((member, index) => (
              <div 
                key={index}
                className="team-card group"
              >
                <div className="bg-card-bg rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden h-full">
                  {/* Member Image/Placeholder */}
                  <div className={`h-48 bg-gradient-to-br ${member.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-poppins font-bold mb-1">{member.name}</h3>
                      <p className="text-white/90 text-sm">{member.role}</p>
                    </div>
                  </div>

                  {/* Member Content */}
                  <div className="p-6">
                    <p className="text-medium-gray leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex space-x-3">
                      {Object.entries(member.social).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:scale-110 transform transition-all duration-300"
                        >
                          <span className="text-sm">
                            {platform === 'linkedin' && '💼'}
                            {platform === 'github' && '💻'}
                            {platform === 'twitter' && '🐦'}
                            {platform === 'email' && '📧'}
                            {platform === 'website' && '🌐'}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gdg-blue/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Mentor Section */}
      <section 
        ref={mentorRef}
        className="section-padding bg-slate-50 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gdg-blue rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gdg-green rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-soft mb-6">
                <div className="w-2 h-2 bg-gdg-green rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-dark-gray">Faculty Guidance</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-dark-gray mb-6">
                Faculty <span className="text-gradient">Mentor</span>
              </h2>
            </div>

            {/* Mentor Card */}
            <div className="bg-card-bg rounded-3xl shadow-large overflow-hidden border border-gray-100">
              <div className="md:flex">
                {/* Mentor Image/Info */}
                <div className="md:w-2/5 bg-gradient-to-br from-slate-900 to-blue-900 p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative z-10 text-center md:text-left">
                    <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-4xl mx-auto md:mx-0 mb-6 shadow-lg">
                      👨‍🏫
                    </div>
                    
                    <h3 className="text-2xl font-poppins font-bold mb-2">{facultyMentor.name}</h3>
                    <p className="text-cyan-200 font-semibold text-lg mb-1">{facultyMentor.role}</p>
                    <p className="text-blue-200 mb-4">{facultyMentor.department}</p>

                    {/* Social Links */}
                    <div className="flex space-x-3 justify-center md:justify-start">
                      {Object.entries(facultyMentor.social).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transform transition-all duration-300"
                        >
                          <span className="text-sm">
                            {platform === 'linkedin' && '💼'}
                            {platform === 'email' && '📧'}
                            {platform === 'website' && '🌐'}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mentor Bio */}
                <div className="md:w-3/5 p-8">
                  <div className="mb-6">
                    <h4 className="text-xl font-poppins font-bold text-dark-gray mb-4">About Dr. Roberts</h4>
                    <p className="text-medium-gray leading-relaxed mb-4">
                      {facultyMentor.bio}
                    </p>
                    <p className="text-medium-gray leading-relaxed">
                      Dr. Roberts provides invaluable guidance and support for our GDG activities, 
                      helping bridge academic learning with practical technology skills and industry insights.
                    </p>
                  </div>

                  {/* Expertise */}
                  <div>
                    <h5 className="font-poppins font-bold text-dark-gray mb-3">Areas of Expertise</h5>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Software Engineering',
                        'Cloud Computing',
                        'Machine Learning',
                        'Research Methodology',
                        'Industry Partnerships'
                      ].map((expertise, index) => (
                        <span 
                          key={index}
                          className="bg-blue-50 text-gdg-blue px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {expertise}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="section-padding bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-2xl font-semibold text-sm mb-8 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Join Our Team</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
              Want to <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">Lead</span> with Us?
            </h2>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              We're always looking for passionate students to join our leadership team and help 
              shape the future of our developer community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-glow hover:scale-105 transform transition-all duration-300">
                Apply for Leadership
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 hover:scale-105 transform transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;