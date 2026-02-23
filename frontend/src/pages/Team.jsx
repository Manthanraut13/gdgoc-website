import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaGlobe, FaBehance, FaCode } from 'react-icons/fa';

const Team = () => {
  const [activeTeam, setActiveTeam] = useState('core');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const pageRef = useRef(null);
  const modalRef = useRef(null);

  // Normalize image paths
  const normalizeImagePaths = (teamData) => {
    return Object.keys(teamData).reduce((acc, teamKey) => {
      acc[teamKey] = teamData[teamKey].map(member => {
        let imagePath = member.image;
        if (imagePath) {
          imagePath = imagePath.replace(/^\//, '');
          if (!/\.(jpg|jpeg|png|gif|webp)$/i.test(imagePath)) {
            imagePath += '.jpg';
          }
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
        return <FaLinkedin />;
      case 'github':
        return <FaGithub />;
      case 'twitter':
        return <FaTwitter />;
      case 'email':
        return <FaEnvelope />;
      case 'website':
        return <FaGlobe />;
      case 'behance':
        return <FaBehance />;
      case 'leetcode':
        return <FaCode />;
      default:
        return null;
    }
  };

  const handleImageError = (memberId) => {
    setImageErrors(prev => ({ ...prev, [memberId]: true }));
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Title Reveal
      gsap.fromTo('.prism-title-char',
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.04,
          ease: 'expo.out'
        }
      );

      // Scroll Background Transitions
      gsap.to('.nebula-bg', {
        scrollTrigger: {
          trigger: '.teams-grid',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -100,
        ease: 'none'
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo('.team-card',
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: 'expo.out'
      }
    );
  }, [activeTeam]);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    gsap.to('.modal-content', {
      scale: 0.95,
      opacity: 0,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => {
        setIsModalOpen(false);
        setSelectedMember(null);
      }
    });
  };

  const getMemberId = (member, teamKey) => `${teamKey}-${member.name.replace(/\s+/g, '-')}`;

  const renderTitle = (text) => {
    return text.split('').map((char, i) => (char === ' ' ? <span key={i}>&nbsp;</span> : (
      <span key={i} className="prism-title-char inline-block">
        {char}
      </span>
    )));
  };

  return (
    <div ref={pageRef} className="bg-slate-50 text-slate-900 min-h-screen relative overflow-hidden font-poppins">

      {/* Equilibrium Nebula Background (Mid-tone) */}
      <div className="nebula-bg fixed inset-0 z-0 pointer-events-none opacity-60">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-purple-50/20 to-transparent blur-[120px]"></div>
        <div className="absolute top-[20%] right-[-5%] w-[60%] h-[60%] bg-indigo-200/20 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[70%] h-[70%] bg-cyan-100/30 rounded-full blur-[150px]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-full px-6 py-2 mb-12 shadow-sm">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Architectural Core</span>
        </div>

        <h1 className="text-6xl md:text-[10rem] font-black leading-[0.8] tracking-tighter text-center mb-16 text-slate-900">
          {renderTitle("THE ARCHITECTS.")}
        </h1>

        <div className="max-w-2xl text-center space-y-10">
          <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-light">
            Diverse intellects. Unified by code. Crafting the next digital epoch at <span className="text-slate-900 font-bold tracking-tight">GDG On-Campus.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#teams-explorer" className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 hover:scale-105 transition-all duration-500 shadow-xl shadow-slate-200">
              Explore Roster
            </a>
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] hidden sm:block">2025 // 2026</div>
          </div>
        </div>
      </section>

      {/* Teams Explorer Section */}
      <section id="teams-explorer" className="relative z-10 py-32 bg-white/40 backdrop-blur-md border-t border-slate-200/50">
        <div className="container-custom px-6">

          {/* Prismatic Navigation */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900">DEPARTMENTS.</h2>
              <p className="text-slate-400 uppercase text-[10px] font-black tracking-[0.6em]">Select Protocol to View Intel</p>
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end max-w-3xl">
              {teamCategories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveTeam(category.key)}
                  className={`group relative px-6 py-3 rounded-xl transition-all duration-500 ${activeTeam === category.key
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                    : 'bg-white/60 text-slate-400 border border-slate-100 hover:bg-white hover:text-slate-900 hover:border-slate-200'
                    }`}
                >
                  <div className="relative z-10 flex items-center space-x-3">
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{category.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black ${activeTeam === category.key ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-400'
                      }`}>
                      {category.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Teams Grid: Prism Cards */}
          <div className="teams-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teams[activeTeam].map((member, index) => {
              const memberId = getMemberId(member, activeTeam);
              const hasImageError = imageErrors[memberId];

              return (
                <div
                  key={index}
                  className="team-card group cursor-pointer"
                  onClick={() => handleMemberClick(member)}
                >
                  <div className="relative h-[500px] border border-slate-200 rounded-[2.5rem] bg-slate-900 overflow-hidden transition-all duration-700 hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-slate-300">

                    {/* Background Light Leaks */}
                    <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${member.gradient} opacity-20 blur-[60px]`}></div>

                    {/* Member Photo Container */}
                    <div className="absolute inset-0 z-0">
                      {member.image && !hasImageError ? (
                        <>
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover grayscale opacity-40 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-110"
                            onError={() => handleImageError(memberId)}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                        </>
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${member.gradient} opacity-20`}>
                          <span className="text-white text-8xl opacity-10 font-black">?</span>
                        </div>
                      )}
                    </div>

                    {/* Member Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-400">
                            {member.role}
                          </p>
                          <h3 className="text-3xl font-black tracking-tighter leading-none text-white break-words">
                            {member.name}
                          </h3>
                        </div>

                        <div className="w-12 h-1 bg-white/10 group-hover:w-full group-hover:bg-blue-500 transition-all duration-700"></div>

                        <p className="text-xs text-white/40 leading-relaxed font-medium line-clamp-2 italic group-hover:text-white transition-colors duration-500">
                          {member.bio}
                        </p>

                        <div className="flex items-center space-x-3 pt-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-blue-500 transition-colors duration-500">
                            View Dossier
                          </span>
                          <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-blue-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join the Architect Guild */}
      <section className="relative z-10 py-40 bg-white border-t border-slate-200">
        <div className="container-custom px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-16">
            <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-none text-slate-900">JOIN.<br />THE.<br />GUILD.</h2>
            <p className="text-2xl text-slate-400 font-light leading-relaxed">
              We are always scouting for new intellects to expand our collective. The next intake cycle initializes soon.
            </p>
            <button className="px-20 py-8 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-sm hover:bg-slate-900 transition-all duration-500 shadow-2xl shadow-blue-200">
              Register Interest
            </button>
          </div>
        </div>
      </section>

      {/* Member Details Modal */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
          {/* Overlay */}
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={closeModal}></div>

          <div className="modal-content relative w-full max-w-5xl bg-slate-900 border border-white/10 rounded-[3rem] sm:rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-500">

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
              {/* Image Side */}
              <div className="relative h-[350px] lg:h-auto bg-slate-800">
                {selectedMember.image && !imageErrors[getMemberId(selectedMember, activeTeam)] ? (
                  <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${selectedMember.gradient} opacity-20`}>
                    <span className="text-9xl opacity-10">👤</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent"></div>
              </div>

              {/* Info Side */}
              <div className="p-10 lg:p-20 flex flex-col justify-center relative bg-slate-900">
                <button
                  onClick={closeModal}
                  className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all duration-500 text-xl z-30"
                >
                  ✕
                </button>

                <div className="space-y-10 relative z-10 w-full">
                  <div className="space-y-4">
                    <p className="text-blue-400 font-black uppercase tracking-[0.5em] text-[10px]">
                      {selectedMember.role}
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] text-white">
                      {selectedMember.name}
                    </h2>
                  </div>

                  <div className="w-16 h-1.5 bg-blue-600 rounded-full"></div>

                  <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light italic">
                    "{selectedMember.bio}"
                  </p>

                  <div className="flex flex-col sm:flex-row gap-8 sm:items-center pt-4">
                    <div className="space-y-3">
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Sector</p>
                      <span className="inline-block px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/60">
                        {selectedMember.department}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Connect</p>
                      <div className="flex gap-3">
                        {Object.entries(selectedMember.social).map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl text-white hover:bg-white hover:text-slate-950 transition-all duration-500"
                          >
                            {getSocialIcon(platform)}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Metadata Watermark */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[100px] font-black text-white/[0.02] rotate-90 pointer-events-none select-none uppercase tracking-tighter whitespace-nowrap hidden lg:block">
                  INTEL ARCHIVE
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
