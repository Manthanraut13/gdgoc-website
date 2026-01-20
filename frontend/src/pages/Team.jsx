import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaGlobe, FaBehance, FaCode } from 'react-icons/fa';

const Team = () => {
  const [activeTeam, setActiveTeam] = useState('core');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const heroRef = useRef(null);
  const coreTeamRef = useRef(null);
  const mentorRef = useRef(null);
  const modalRef = useRef(null);

  // Normalize image paths
  const normalizeImagePaths = (teamData) => {
    return Object.keys(teamData).reduce((acc, teamKey) => {
      acc[teamKey] = teamData[teamKey].map(member => {
        let imagePath = member.image;
        
        // Check for common image extensions and normalize
        if (imagePath) {
          // Remove leading slash if present
          imagePath = imagePath.replace(/^\//, '');
          
          // Check if file has extension, if not add .jpg
          if (!/\.(jpg|jpeg|png|gif|webp)$/i.test(imagePath)) {
            imagePath += '.jpg';
          }
          
          // Handle spaces and special characters
          imagePath = encodeURI(imagePath);
        }
        
        return {
          ...member,
          image: imagePath || null
        };
      });
      return acc;
    }, {});
  };

  const rawTeams = {
    core: [
      {
        name: "Soham Mahajan",
        role: "GDG on campus Lead",
        bio: "Leading the GDG community with passion and dedication. Focused on creating impactful learning experiences for all members.",
        image: "/images/team/Soham Mahajan.jpg",
        social: { 
        },
        gradient: "from-blue-500 to-cyan-500",
        department: "Lead Organizer"
      },
      {
        name: "Rhiya Buranpur",
        role: "Administration Lead",
        bio: "Managing administrative operations and ensuring smooth functioning of all GDG activities and events.",
        image: "/images/team/Rhiya Buranpur.jpg",
        social: { 
          linkedin: "https://www.linkedin.com/in/rhiya-k-buranpur",
          github: "https://github.com/rhiyaburanpur"
        },
        gradient: "from-purple-500 to-pink-500",
        department: "Administration"
      },
      {
        name: "Yash Khope",
        role: "Community Manager",
        bio: "Building and nurturing the developer community, fostering engagement and collaboration among members.",
        image: "/images/team/Yash Khope.jpg",
        social: { 
          linkedin: "https://www.linkedin.com/in/yash-khope/"
        },
        gradient: "from-green-500 to-emerald-500",
        department: "Community"
      }
    ],
    eventManagement: [
      {
        name: "Prajyot Ghadi",
        role: "Event Management Lead",
        bio: "Orchestrating successful events and workshops, ensuring seamless execution from planning to completion.",
        image: "/images/team/Prajyot ghadi.jpg",
        social: { 
          linkedin: "https://www.linkedin.com/in/prajyot-ghadi-4b33a8319/",
           github: "https://github.com/Prajyot-Ghadi"
        },
        gradient: "from-orange-500 to-red-500",
        department: "Event Management"
      },
      {
        name: "Yuvraj Patil",
        role: "Event Management Coordinator",
        bio: "Assisting in event planning and execution, handling logistics and participant coordination.",
        image: "/images/team/Yuvraj Patil.jpg",
        social: { 
        },
        gradient: "from-yellow-500 to-orange-500",
        department: "Event Management"
      },
      {
        name: "Swara Berde",
        role: "Event Management Coordinator",
        bio: "Supporting event operations and ensuring participant satisfaction through effective coordination.",
        image: "/images/team/SwaraBerde.jpg",
        social: { 
        },
        gradient: "from-pink-500 to-rose-500",
        department: "Event Management"
      }
    ],
    design: [
      {
        name: "Rudrapratap Therokar",
        role: "Design Lead",
        bio: "Leading creative design initiatives, creating visual identities and engaging content for GDG activities.",
        image: "/images/team/Rudrapratap Therokar.jpg",
        social: { 
          linkedin: "https://www.linkedin.com/in/rudrtherokar/", 
          github: "https://github.com/ftw-rudra"
        },
        gradient: "from-indigo-500 to-purple-500",
        department: "Design"
      },
      {
        name: "Sumit Trivedi",
        role: "Design Coordinator",
        bio: "Creating compelling visual designs and graphics for events, social media, and promotional materials.",
        image: "/images/team/sumit-trivedi.jpg",
        social: { 
         },
        gradient: "from-teal-500 to-cyan-500",
        department: "Design"
      },
      {
        name: "Sampada Bari",
        role: "Design Coordinator",
        bio: "Developing innovative design solutions and maintaining visual consistency across all GDG platforms.",
        image: "/images/team/SampadaBari.jpg",
        social: { 
         },
        gradient: "from-violet-500 to-purple-500",
        department: "Design"
      }
    ],
    socialMedia: [
      {
        name: "Aditya Jathar",
        role: "Social Media Lead",
        bio: "Strategizing and executing social media campaigns to enhance GDG's online presence and engagement.",
        image: "/images/team/Aditya Jathar.jpg",
        social: { 
          linkedin: "https://www.linkedin.com/in/aditya-jathar/", 
          twitter: "https://twitter.com/Adi-Jathar"
        },
        gradient: "from-blue-500 to-indigo-500",
        department: "Social Media"
      },
      {
        name: "Tanishka Patil",
        role: "Social Media Coordinator",
        bio: "Creating engaging content and managing social media interactions to grow our community reach.",
        image: "/images/team/tanishka-patil.jpg",
        social: { 
          },
        gradient: "from-pink-500 to-rose-500",
        department: "Social Media"
      },
      {
        name: "Ganesh Dhepe",
        role: "Social Media Coordinator",
        bio: "Developing content strategies and analyzing social media metrics to optimize engagement.",
        image: "/images/team/GaneshDhepe.jpg",
        social: { 
        },
        gradient: "from-green-500 to-teal-500",
        department: "Social Media"
      },
      {
        name: "Adiraj Khore",
        role: "Social Media Coordinator",
        bio: "Managing social media platforms and creating interactive content to connect with the community.",
        image: "/images/team/AdirajKhore.jpg",
        social: { 
        },
        gradient: "from-orange-500 to-amber-500",
        department: "Social Media"
      }
    ],
    documentation: [
      {
        name: "Shruti Patil",
        role: "Documentation Lead",
        bio: "Overseeing documentation processes and ensuring all GDG activities are properly recorded and archived.",
        image: "/images/team/Shruti Patil.jpg",
        social: { 
          linkedin: "https://www.linkedin.com/in/patil-shruti18a05/",
          github: "https://github.com/Patil-Shruti18"
        },
        gradient: "from-gray-500 to-slate-500",
        department: "Documentation"
      },
      {
        name: "Chaitanya Shelar",
        role: "Documentation Coordinator",
        bio: "Documenting events, meetings, and activities to maintain comprehensive records of GDG operations.",
        image: "/images/team/ChaitanyaShelar.jpg",
        social: { 
        },
        gradient: "from-blue-500 to-gray-500",
        department: "Documentation"
      },
      {
        name: "Shubham Shinde",
        role: "Documentation Coordinator",
        bio: "Creating and organizing documentation for projects, events, and community resources.",
        image: "/images/team/ShubhamShinde.jpg",
        social: { 
        },
        gradient: "from-slate-500 to-blue-500",
        department: "Documentation"
      }
    ],
    webDevelopment: [
      {
        name: "Dhanashri Shedge",
        role: "Web Development Lead",
        bio: "Leading web development initiatives and maintaining GDG's digital platforms and websites.",
        image: "/images/team/Dhanashri Shedge.jpg",
        social: { 
          linkedin: "https://www.linkedin.com/in/dhanashri-shedge-aa7635312/", 
          github: "https://github.com/Dhanashri-shedge"
        },
        gradient: "from-cyan-500 to-blue-500",
        department: "Web Development"
      },
      {
        name: "Vijay Umbare",
        role: "Web Development Coordinator",
        bio: "Developing and maintaining web applications and contributing to GDG's technical projects.",
        image: "/images/team/VijayUmbare.jpg",
        social: { 
        },
        gradient: "from-purple-500 to-indigo-500",
        department: "Web Development"
      },
      {
        name: "Manthan Raut",
        role: "Web Development Coordinator",
        bio: "Building responsive web interfaces and contributing to frontend development projects.",
        image: "/images/team/ManthanRaut.jpg",
        social: { 
         },
        gradient: "from-green-500 to-emerald-500",
        department: "Web Development"
      }
    ],
    dsaCp: [
      {
        name: "Kunal Telangi",
        role: "DSA/CP Lead",
        bio: "Leading Data Structures and Competitive Programming initiatives and mentoring members.",
        image: "/images/team/Kunal Telangi.jpg",
        social: { 
         },
        gradient: "from-red-500 to-orange-500",
        department: "DSA/CP"
      },
      {
        name: "Vijay Umbare",
        role: "DSA/CP Coordinator",
        bio: "Organizing DSA sessions and competitive programming contests for skill development.",
        image: "/images/team/VijayUmbare.jpg",
        social: { 
         },
        gradient: "from-yellow-500 to-orange-500",
        department: "DSA/CP"
      },
      {
        name: "Rohan Patil",
        role: "DSA/CP Coordinator",
        bio: "Facilitating DSA workshops and helping members improve their problem-solving skills.",
        image: "/images/team/RohanPatil.jpg",
        social: { 
        },
        gradient: "from-blue-500 to-cyan-500",
        department: "DSA/CP"
      }
    ],
    android: [
      {
        name: "Smitesh Bore",
        role: "Android Development Lead",
        bio: "Leading Android development initiatives and mentoring aspiring mobile developers.",
        image: "/images/team/Smitesh Bore.jpg",
        social: { 
          linkedin: "https://www.linkedin.com/in/smitesh-bhore-b46697257", 
          github: "https://github.com/Smiteshbhore21"
        },
        gradient: "from-green-500 to-lime-500",
        department: "Android Development"
      },
      {
        name: "Nishant Galande",
        role: "Android Development Coordinator",
        bio: "Organizing Android workshops and helping members build their first mobile applications.",
        image: "/images/team/NishantGalande.jpg",
        social: { 
       },
        gradient: "from-purple-500 to-violet-500",
        department: "Android Development"
      },
      {
        name: "Simran Bhosale",
        role: "Android Development Coordinator",
        bio: "Supporting Android learning initiatives and creating resources for mobile development.",
        image: "/images/team/SimranBhosale.jpg",
        social: { 
         },
        gradient: "from-pink-500 to-rose-500",
        department: "Android Development"
      }
    ],
    cybersecurity: [
      {
        name: "Vedant Sonawane",
        role: "Cybersecurity Lead",
        bio: "Leading cybersecurity initiatives and promoting awareness about digital security.",
        image: "/images/team/Vedant Sonawane.jpg",
        social: { 
          linkedin: "https://www.linkedin.com/in/vedant-sonawane01", 
          github: "https://github.com/Vedantsonawane-ngl"
        },
        gradient: "from-gray-700 to-black",
        department: "Cybersecurity"
      },
      {
        name: "Harish Pudake",
        role: "Cybersecurity Coordinator",
        bio: "Organizing security workshops and CTF challenges for the community.",
        image: "/images/team/HarishPudake.jpg",
        social: { 
          
        },
        gradient: "from-blue-900 to-gray-800",
        department: "Cybersecurity"
      },
      {
        name: "Urvi Pawar",
        role: "Cybersecurity Coordinator",
        bio: "Promoting cybersecurity awareness and facilitating learning sessions.",
        image: "/images/team/UrviPawar.jpg",
        social: { 
        },
        gradient: "from-purple-900 to-gray-800",
        department: "Cybersecurity"
      }
    ],
    cloud: [
      {
        name: "Atharva Makwan",
        role: "Cloud Computing Lead",
        bio: "Leading cloud computing initiatives and organizing hands-on workshops with cloud platforms.",
        image: "/images/team/Atharva Makhwan.jpg",
        social: { 
          linkedin: "https://www.linkedin.com/in/atharva-makwan/", 
          github: "https://github.com/atharva-mak-dev"
        },
        gradient: "from-blue-500 to-cyan-500",
        department: "Cloud Computing"
      },
      {
        name: "Chaitanya Sawant",
        role: "Cloud Computing Coordinator",
        bio: "Facilitating cloud learning sessions and helping members with cloud certifications.",
        image: "/images/team/ChaitanyaSawant.jpg",
        social: { 
         },
        gradient: "from-indigo-500 to-blue-500",
        department: "Cloud Computing"
      },
      {
        name: "Sahil Birari",
        role: "Cloud Computing Coordinator",
        bio: "Organizing cloud infrastructure workshops and hands-on labs.",
        image: "/images/team/SahilBirari.jpg",
        social: { 
          },
        gradient: "from-cyan-500 to-teal-500",
        department: "Cloud Computing"
      }
    ],
    aiMl: [
      {
        name: "Om Kute",
        role: "AI/ML Lead",
        bio: "Leading artificial intelligence and machine learning initiatives for the community.",
        image: "/images/team/OM kute.jpg",
        social: { 
          linkedin: "https://www.linkedin.com/in/om-kute-348813215/", 
          github: "https://github.com/omkute101"
        },
        gradient: "from-orange-500 to-red-500",
        department: "AI/ML"
      },
      {
        name: "Mukund Thorat",
        role: "AI/ML Coordinator",
        bio: "Organizing AI/ML workshops and facilitating hands-on learning sessions.",
        image: "/images/team/MukundThorat.jpg",
        social: { 
         },
        gradient: "from-red-500 to-pink-500",
        department: "AI/ML"
      },
      {
        name: "Siddhesh Nagmote",
        role: "AI/ML Coordinator",
        bio: "Supporting machine learning projects and organizing data science sessions.",
        image: "/images/team/SiddheshNagmote.jpg",
        social: { 
         },
        gradient: "from-purple-500 to-indigo-500",
        department: "AI/ML"
      },
      {
        name: "Kiran Ingale",
        role: "AI/ML Coordinator",
        bio: "Facilitating AI learning initiatives and helping members with ML projects.",
        image: "/images/team/KiranIngale.jpg",
        social: { 
         },
        gradient: "from-blue-500 to-cyan-500",
        department: "AI/ML"
      }
    ]
  };

  const teams = normalizeImagePaths(rawTeams);

  const facultyMentor = {
    name: "Dr. Michael Roberts",
    role: "Faculty Advisor",
    department: "Computer Science Department",
    bio: "Professor with 15+ years of experience in software engineering and research. Passionate about bridging academic learning with industry practices. Provides invaluable guidance and support for our GDG activities, helping bridge academic learning with practical technology skills and industry insights.",
    image: "/images/team/dr-roberts.jpg",
    social: { linkedin: "#", email: "#", website: "#" },
    gradient: "from-slate-600 to-blue-600",
    expertise: [
      'Software Engineering',
      'Cloud Computing',
      'Machine Learning',
      'Research Methodology',
      'Industry Partnerships'
    ]
  };

  const teamCategories = [
    { key: 'core', label: 'Core Team', icon: '👑', count: teams.core.length },
    { key: 'eventManagement', label: 'Event Management', icon: '🎪', count: teams.eventManagement.length },
    { key: 'design', label: 'Design Team', icon: '🎨', count: teams.design.length },
    { key: 'socialMedia', label: 'Social Media', icon: '📱', count: teams.socialMedia.length },
    { key: 'documentation', label: 'Documentation', icon: '📋', count: teams.documentation.length },
    { key: 'webDevelopment', label: 'Web Development', icon: '💻', count: teams.webDevelopment.length },
    { key: 'dsaCp', label: 'DSA/CP', icon: '🧠', count: teams.dsaCp.length },
    { key: 'android', label: 'Android Dev', icon: '📱', count: teams.android.length },
    { key: 'cybersecurity', label: 'Cybersecurity', icon: '🔒', count: teams.cybersecurity.length },
    { key: 'cloud', label: 'Cloud Computing', icon: '☁️', count: teams.cloud.length },
    { key: 'aiMl', label: 'AI/ML', icon: '🤖', count: teams.aiMl.length }
  ];

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'linkedin':
        return <FaLinkedin className="text-blue-700" />;
      case 'github':
        return <FaGithub className="text-gray-800" />;
      case 'twitter':
        return <FaTwitter className="text-blue-400" />;
      case 'email':
        return <FaEnvelope className="text-red-500" />;
      case 'website':
        return <FaGlobe className="text-green-500" />;
      case 'behance':
        return <FaBehance className="text-blue-600" />;
      case 'leetcode':
        return <FaCode className="text-orange-500" />;
      default:
        return null;
    }
  };

  const handleImageError = (memberId) => {
    setImageErrors(prev => ({ ...prev, [memberId]: true }));
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

  useEffect(() => {
    if (isModalOpen && selectedMember) {
      gsap.fromTo(modalRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out'
        }
      );
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen, selectedMember]);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => {
        setIsModalOpen(false);
        setSelectedMember(null);
      }
    });
  };

  // Create unique member ID for image error tracking
  const getMemberId = (member, teamKey) => `${teamKey}-${member.name.replace(/\s+/g, '-')}`;

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
              GDG OC <span className="text-gradient">Team 2025-26</span>
            </h1>

            <p className="text-xl text-medium-gray leading-relaxed max-w-3xl mx-auto">
              Passionate students from diverse technical domains working together to build an 
              innovative and inclusive developer community at our university.
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
              Meet Our <span className="text-gradient">Team Leads</span>
            </h2>

            <p className="text-xl text-medium-gray max-w-2xl mx-auto leading-relaxed">
              Dedicated student leaders driving innovation across various technical domains
            </p>
          </div>

          {/* Team Categories Navigation */}
          <div className="mb-12 overflow-x-auto pb-4">
            <div className="flex gap-2 min-w-max">
              {teamCategories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveTeam(category.key)}
                  className={`px-4 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-2 whitespace-nowrap ${
                    activeTeam === category.key
                      ? 'bg-gdg-blue text-white shadow-md'
                      : 'bg-slate-100 text-medium-gray hover:bg-slate-200'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.label}</span>
                  <span className="bg-white/30 text-white px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Teams Grid */}
          <div className="teams-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teams[activeTeam].map((member, index) => {
              const memberId = getMemberId(member, activeTeam);
              const hasImageError = imageErrors[memberId];
              
              return (
                <div 
                  key={index}
                  className="team-card group cursor-pointer"
                  onClick={() => handleMemberClick(member)}
                >
                  <div className="bg-card-bg rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden h-full flex flex-col">
                    {/* Member Image with gradient overlay */}
                    <div className="relative h-48 overflow-hidden">
                      {/* Gradient Background Fallback */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient}`}></div>
                      
                      {/* Member Photo */}
                      <div className="relative w-full h-full">
                        {member.image && !hasImageError ? (
                          <>
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              onError={() => handleImageError(memberId)}
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                          </>
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${member.gradient}`}>
                            <span className="text-white text-5xl opacity-80">👤</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Member Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-xl font-poppins font-bold mb-1 line-clamp-1">{member.name}</h3>
                        <p className="text-white/90 text-sm line-clamp-1">{member.role}</p>
                      </div>
                      
                      {/* View Details Indicator */}
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                        <span className="text-white">👁️</span>
                      </div>
                    </div>

                    {/* Member Content */}
                    <div className="p-5 flex-grow">
                      <p className="text-medium-gray leading-relaxed text-sm mb-4 line-clamp-3">
                        {member.bio}
                      </p>

                      {/* Department Tag */}
                      <div className="mb-4">
                        <span className="bg-blue-50 text-gdg-blue px-3 py-1 rounded-full text-xs font-medium">
                          {member.department}
                        </span>
                      </div>

                      {/* Social Links */}
                      <div className="flex space-x-2">
                        {Object.entries(member.social).map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url}
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 hover:scale-110 transform transition-all duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {getSocialIcon(platform)}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gdg-blue/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Team Category Description */}
          <div className="mt-12 text-center">
            <p className="text-medium-gray">
              Showing {teams[activeTeam].length} members from the {teamCategories.find(t => t.key === activeTeam)?.label} department.
              Click on any member to view more details.
            </p>
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
                    <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl overflow-hidden mx-auto md:mx-0 mb-6 shadow-lg">
                      {facultyMentor.image ? (
                        <img 
                          src={facultyMentor.image} 
                          alt={facultyMentor.name}
                          className="w-full h-full object-cover"
                          onError={() => setImageErrors(prev => ({ ...prev, 'faculty': true }))}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white text-4xl">👨‍🏫</span>
                        </div>
                      )}
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
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {getSocialIcon(platform)}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mentor Bio */}
                <div className="md:w-3/5 p-8">
                  <div className="mb-6">
                    <h4 className="text-xl font-poppins font-bold text-dark-gray mb-4">About {facultyMentor.name}</h4>
                    <p className="text-medium-gray leading-relaxed mb-4">
                      {facultyMentor.bio}
                    </p>
                  </div>

                  {/* Expertise */}
                  <div>
                    <h5 className="font-poppins font-bold text-dark-gray mb-3">Areas of Expertise</h5>
                    <div className="flex flex-wrap gap-2">
                      {facultyMentor.expertise.map((expertise, index) => (
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
              shape the future of our developer community. Applications open twice a year!
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

      {/* Team Member Details Modal */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div 
            ref={modalRef}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-gray-100 transition-colors shadow-md"
            >
              <span className="text-xl font-bold text-gray-600">✕</span>
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {/* Member Header */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                {/* Member Image */}
                <div className={`w-32 h-32 bg-gradient-to-br ${selectedMember.gradient} rounded-2xl overflow-hidden shadow-lg`}>
                  {selectedMember.image && !imageErrors[getMemberId(selectedMember, activeTeam)] ? (
                    <img 
                      src={selectedMember.image} 
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(getMemberId(selectedMember, activeTeam))}
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${selectedMember.gradient}`}>
                      <span className="text-white text-4xl">👤</span>
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div className="flex-grow text-center md:text-left">
                  <h2 className="text-2xl font-poppins font-bold text-dark-gray mb-2">
                    {selectedMember.name}
                  </h2>
                  <p className="text-lg text-gdg-blue font-semibold mb-1">
                    {selectedMember.role}
                  </p>
                  <p className="text-medium-gray mb-4">
                    {selectedMember.department}
                  </p>

                  {/* Social Links */}
                  <div className="flex space-x-3 justify-center md:justify-start">
                    {Object.entries(selectedMember.social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 hover:scale-110 transform transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getSocialIcon(platform)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Member Bio */}
              <div className="mb-8">
                <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">About {selectedMember.name.split(' ')[0]}</h3>
                <p className="text-medium-gray leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>

              {/* Department Info */}
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6">
                <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">Department Role</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🏢</span>
                  <div>
                    <p className="font-semibold text-dark-gray">{selectedMember.department}</p>
                    <p className="text-medium-gray text-sm">Google Developer Group on Campus</p>
                  </div>
                </div>
              </div>

              {/* Current Teams */}
              <div className="mt-8">
                <h3 className="text-xl font-poppins font-bold text-dark-gray mb-4">Team Participation</h3>
                <div className="flex flex-wrap gap-2">
                  {teamCategories
                    .filter(category => 
                      teams[category.key]?.some(m => m.name === selectedMember.name)
                    )
                    .map(category => (
                      <span 
                        key={category.key}
                        className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                      >
                        <span>{category.icon}</span>
                        <span>{category.label}</span>
                      </span>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
