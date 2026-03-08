import React, { useState, useEffect, useRef } from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

/* ── Raw team data (unchanged) ── */
const rawTeams = {
  core: [
    { name: "Soham Mahajan", role: "GDG on campus Lead", bio: "Leading the GDG community with passion and dedication. Focused on creating impactful learning experiences for all members.", image: "/images/team/Soham Mahajan.png", social: {}, color: 'var(--g-blue)', tint: 'rgba(26,115,232,0.1)' },
    { name: "Rhiya Buranpur", role: "Administration Lead", bio: "Managing administrative operations and ensuring smooth functioning of all GDG activities and events.", image: "/images/team/Rhiya Buranpur.png", social: { linkedin: "https://www.linkedin.com/in/rhiya-k-buranpur", github: "https://github.com/rhiyaburanpur" }, color: 'var(--g-red)', tint: 'rgba(234,67,53,0.1)' },
    { name: "Yash Khope", role: "Community Manager", bio: "Building and nurturing the developer community, fostering engagement and collaboration among members.", image: "/images/team/Yash Khope.png", social: { linkedin: "https://www.linkedin.com/in/yash-khope/" }, color: 'var(--g-green)', tint: 'rgba(52,168,83,0.1)' }
  ],
  design: [
    { name: "Rudrapratap Therokar", role: "Design Lead", bio: "Leading creative design initiatives, creating visual identities and engaging content for GDG activities.", image: "/images/team/Rudrapratap Theorkar.png", social: { linkedin: "https://www.linkedin.com/in/rudrtherokar/", github: "https://github.com/ftw-rudra" }, color: 'var(--g-blue)', tint: 'rgba(26,115,232,0.1)' },
    { name: "Sumit Trivedi", role: "Design Coordinator", bio: "Creating compelling visual designs and graphics for events, social media, and promotional materials.", image: "/images/team/Sumit Trivedi.png", social: {}, color: 'var(--g-yellow)', tint: 'rgba(251,188,4,0.12)' },
    { name: "Sampada Bari", role: "Design Coordinator", bio: "Developing innovative design solutions and maintaining visual consistency across all GDG platforms.", image: "/images/team/Sampada Bari.png", social: {}, color: 'var(--g-green)', tint: 'rgba(52,168,83,0.1)' }
  ],
  eventManagement: [
    { name: "Prajyot Ghadi", role: "Event Management Lead", bio: "Orchestrating successful events and workshops, ensuring seamless execution from planning to completion.", image: "/images/team/Prajyot Ghadi.png", social: { linkedin: "https://www.linkedin.com/in/prajyot-ghadi-4b33a8319/", github: "https://github.com/Prajyot-Ghadi" }, color: 'var(--g-yellow)', tint: 'rgba(251,188,4,0.12)' },
    { name: "Swara Berde", role: "Event Management Coordinator", bio: "Supporting event operations and ensuring participant satisfaction through effective coordination.", image: "/images/team/Swara Berde.png", social: {}, color: 'var(--g-red)', tint: 'rgba(234,67,53,0.1)' }
  ],
  webDevelopment: [
    { name: "Dhanashri Shedge", role: "Web Development Lead", bio: "Leading web development initiatives and maintaining GDG's digital platforms and websites.", image: "/images/team/Dhanashri Shedge.png", social: { linkedin: "https://www.linkedin.com/in/dhanashri-shedge-aa7635312/", github: "https://github.com/Dhanashri-shedge" }, color: 'var(--g-blue)', tint: 'rgba(26,115,232,0.1)' },
    { name: "Manthan Raut", role: "Web Development Coordinator", bio: "Building responsive web interfaces and contributing to frontend development projects.", image: "/images/team/Manthan Raut.png", social: { linkedin: "https://www.linkedin.com/in/manthan-raut-438608332/", github: "https://github.com/Manthanraut13" }, color: 'var(--g-red)', tint: 'rgba(234,67,53,0.1)' },
    { name: "Vijay Umbare", role: "Web Development Coordinator", bio: "Contributing to technical projects and development.", image: "/images/team/Vijay Umbare.png", social: {}, color: 'var(--g-green)', tint: 'rgba(52,168,83,0.1)' }
  ],
  socialMedia: [
    { name: "Aditya Jathar", role: "Social Media Lead", bio: "Strategizing and executing social media campaigns to enhance GDG's online presence and engagement.", image: "/images/team/Aditya Jathar.png", social: { linkedin: "https://www.linkedin.com/in/aditya-jathar/", twitter: "https://twitter.com/Adi-Jathar" }, color: 'var(--g-red)', tint: 'rgba(234,67,53,0.1)' },
    { name: "Tanishka Patil", role: "Social Media Coordinator", bio: "Creating engaging content and managing social media interactions to grow our community reach.", image: "/images/team/Tanishka Patil.png", social: {}, color: 'var(--g-blue)', tint: 'rgba(26,115,232,0.1)' },
    { name: "Ganesh Dhepe", role: "Social Media Coordinator", bio: "Developing content strategies and analyzing social media metrics to optimize engagement.", image: "/images/team/Ganesh Dhepe.png", social: {}, color: 'var(--g-green)', tint: 'rgba(52,168,83,0.1)' },
    { name: "Adhiraj Khore", role: "Social Media Coordinator", bio: "Managing social media platforms and creating interactive content to connect with the community.", image: "/images/team/Adhiraj Khore.png", social: {}, color: 'var(--g-yellow)', tint: 'rgba(251,188,4,0.12)' }
  ],

  documentation: [
    { name: "Shruti Patil", role: "Documentation Lead", bio: "Overseeing documentation processes and ensuring all GDG activities are properly recorded and archived.", image: "/images/team/Shruti Patil.png", social: { linkedin: "https://www.linkedin.com/in/patil-shruti18a05/", github: "https://github.com/Patil-Shruti18" }, color: 'var(--g-blue)', tint: 'rgba(26,115,232,0.1)' },
    { name: "Chaitanya Shelar", role: "Documentation Coordinator", bio: "Documenting events, meetings, and activities to maintain comprehensive records.", image: "/images/team/Chaitanya Shelar.png", social: {}, color: 'var(--g-green)', tint: 'rgba(52,168,83,0.1)' },
    { name: "Shubham Shinde", role: "DocumentationCoordinator", bio: "Creating and organizing documentation for projects, events, and community resources.", image: "/images/team/Shubham Shinde.png", social: {}, color: 'var(--g-yellow)', tint: 'rgba(251,188,4,0.12)' }
  ],
  android: [
    { name: "Smitesh Bhore", role: "Android Dev Lead", bio: "Leading Android development initiatives and mentoring aspiring mobile developers.", image: "/images/team/Smitesh Bhore.png", social: { linkedin: "https://www.linkedin.com/in/smitesh-bhore-b46697257", github: "https://github.com/Smiteshbhore21" }, color: 'var(--g-green)', tint: 'rgba(52,168,83,0.1)' },
    { name: "Nishant Galande", role: "Android Dev Coordinator", bio: "Organizing Android workshops and helping members build mobile apps.", image: "/images/team/Nishant Galande.png", social: {}, color: 'var(--g-blue)', tint: 'rgba(26,115,232,0.1)' },
    { name: "Simran Bhosale", role: "Android Dev Coordinator", bio: "Supporting Android learning initiatives and creating resources for mobile development.", image: "/images/team/Simran Bhosale.png", social: {}, color: 'var(--g-red)', tint: 'rgba(234,67,53,0.1)' }
  ],
  aiMl: [
    { name: "Om Kute", role: "AI/ML Lead", bio: "Leading artificial intelligence and machine learning initiatives for the community.", image: "/images/team/Om Kute.png", social: { linkedin: "https://www.linkedin.com/in/om-kute-348813215/", github: "https://github.com/omkute101" }, color: 'var(--g-yellow)', tint: 'rgba(251,188,4,0.12)' },
    { name: "Mukund Thorat", role: "AI/ML Coordinator", bio: "Organizing AI/ML workshops and facilitating hands-on learning sessions.", image: "/images/team/Mukund Thorat.png", social: {}, color: 'var(--g-red)', tint: 'rgba(234,67,53,0.1)' },
    { name: "Siddhesh Nagmote", role: "AI/ML Coordinator", bio: "Supporting machine learning projects and organizing data science sessions.", image: "/images/team/Siddhesh Nagmote.png", social: {}, color: 'var(--g-blue)', tint: 'rgba(26,115,232,0.1)' },
    { name: "Kiran Ingale", role: "AI/MLCoordinator", bio: "Facilitating AI learning initiatives and helping members with ML projects.", image: "/images/team/Kiran Ingale.png", social: {}, color: 'var(--g-green)', tint: 'rgba(52,168,83,0.1)' }
  ],
  cybersecurity: [
    { name: "Vedant Sonawane", role: "Cybersecurity Lead", bio: "Leading cybersecurity initiatives and promoting awareness about digital security.", image: "/images/team/Vedant Sonawane.png", social: { linkedin: "https://www.linkedin.com/in/vedant-sonawane01", github: "https://github.com/Vedantsonawane-ngl" }, color: 'var(--g-red)', tint: 'rgba(234,67,53,0.1)' },
    { name: "Harish Pudake", role: "Cybersecurity Coordinator", bio: "Organizing security workshops and CTF challenges for the community.", image: "/images/team/Harish Pudake.png", social: {}, color: 'var(--g-blue)', tint: 'rgba(26,115,232,0.1)' }
  ],
  cloud: [
    { name: "Atharva Makwan", role: "Cloud Computing Lead", bio: "Leading cloud computing initiatives and organizing hands-on workshops with cloud platforms.", image: "/images/team/Atharva Makwan.png", social: { linkedin: "https://www.linkedin.com/in/atharva-makwan/", github: "https://github.com/atharva-mak-dev" }, color: 'var(--g-blue)', tint: 'rgba(26,115,232,0.1)' },
    { name: "Chaitanya Sawant", role: "Cloud Computing Coordinator", bio: "Facilitating cloud learning sessions and helping members with cloud certifications.", image: "/images/team/Chaitanya Sawant.png", social: {}, color: 'var(--g-green)', tint: 'rgba(52,168,83,0.1)' },
    { name: "Sahil Birari", role: "Cloud ComputingCoordinator", bio: "Organizing cloud infrastructure workshops and hands-on labs.", image: "/images/team/Sahil Birari.png", social: {}, color: 'var(--g-yellow)', tint: 'rgba(251,188,4,0.12)' }
  ],
  dsaCp: [
    { name: "Kunal Telangi", role: "DSA/CP Lead", bio: "Leading Data Structures and Competitive Programming initiatives and mentoring members.", image: "/images/team/Kunal Telangi.png", social: {}, color: 'var(--g-red)', tint: 'rgba(234,67,53,0.1)' },
    { name: "Rohan Patil", role: "DSA/CP Coordinator", bio: "Facilitating DSA workshops and helping members improve their problem-solving skills.", image: "/images/team/Rohan Patil.png", social: {}, color: 'var(--g-blue)', tint: 'rgba(26,115,232,0.1)' },
    { name: "Vinayak Gawade", role: "DSA/CPCoordinator", bio: "Facilitating DSA workshops and helping members improve their problem-solving skills.", image: "/images/team/Vinayak Gawade.png", social: {}, color: 'var(--g-blue)', tint: 'rgba(26,115,232,0.1)' }
  ]
};

/* ── Flatten into ordered list: Core → Leads → Coordinators ── */
const allMembers = (() => {
  const everyone = Object.values(rawTeams).flat();
  const isCore = (m) => rawTeams.core.includes(m);
  const isLead = (m) => !isCore(m) && m.role.toLowerCase().includes('lead');
  const isCoord = (m) => !isCore(m) && !isLead(m);

  return [
    ...everyone.filter(isCore),
    ...everyone.filter(isLead),
    ...everyone.filter(isCoord),
  ];
})();

const CARD_W = 300;
const CARD_GAP = 24;
const SCROLL_SPEED = 60; // seconds for one full loop (slower = smoother)

/* ── Reusable card component ── */
const MemberCard = ({ member, onClick }) => (
  <div
    className="neo-card"
    style={{
      minWidth: `${CARD_W}px`,
      maxWidth: `${CARD_W}px`,
      padding: '0',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      flexShrink: 0,
    }}
    onClick={() => onClick(member)}
  >
    <div style={{ height: '200px', background: member.tint, position: 'relative', borderBottom: '2px solid var(--ink-900)' }}>
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', ...member.imgStyle }}
        onError={(e) => { e.target.src = 'https://www.gstatic.com/images/branding/product/2x/googleg_96dp.png'; e.target.style.objectFit = 'contain'; e.target.style.padding = '40px'; }}
      />
      <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: '#fff', padding: '4px 12px', borderRadius: '8px', border: '1.5px solid var(--ink-900)', boxShadow: '2px 2px 0px var(--ink-900)' }}>
        <p className="font-mono" style={{ fontSize: '9px', fontWeight: 700, color: 'var(--ink-900)', textTransform: 'uppercase' }}>{member.role}</p>
      </div>
    </div>
    <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h3 className="font-display" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink-900)', marginBottom: '4px' }}>{member.name}</h3>
      <p style={{ fontSize: '12px', color: 'var(--ink-400)', lineHeight: 1.5, flex: 1, marginBottom: '16px' }}>
        {member.bio.slice(0, 80)}{member.bio.length > 80 ? '...' : ''}
      </p>
      <div className="flex items-center gap-3">
        {member.social.linkedin && <SocialIcon href={member.social.linkedin} icon={<FaLinkedin />} color="#0077b5" />}
        {member.social.github && <SocialIcon href={member.social.github} icon={<FaGithub />} color="#333" />}
        {member.social.twitter && <SocialIcon href={member.social.twitter} icon={<FaTwitter />} color="#1DA1F2" />}
      </div>
    </div>
  </div>
);

/* ── Main component ── */
const Team = () => {
  const [selected, setSelected] = useState(null);
  /* ── JS-controlled Marquee with Manual Scroll ── */
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const requestRef = useRef();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Duplicated width for seamless looping logic
    const halfWidth = scrollContainer.scrollWidth / 2;

    const animate = () => {
      if (!isHovered && scrollContainer) {
        scrollContainer.scrollLeft += 0.8; // Adjust speed here

        // Loop back seamlessly
        if (scrollContainer.scrollLeft >= halfWidth) {
          scrollContainer.scrollLeft = 0;
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isHovered]);

  return (
    <div id="team">
      <section
        style={{
          background: '#f7fcd4',
          paddingTop: '80px',
          paddingBottom: '64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Hero heading */}
        <div style={{ position: 'absolute', top: '-100px', right: '10%', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(234,67,53,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="page-container relative z-10" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-label" style={{ color: 'var(--yellow-deep)' }}>The Community</div>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              color: 'var(--ink-900)',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              marginBottom: '8px',
            }}
          >
            Meet the <span style={{ color: 'var(--yellow-deep)' }}>Visionaries</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink-400)', maxWidth: '480px', margin: '0 auto' }}>
            A passionate collective of student developers, designers, and organizers building the future together.
          </p>
        </div>

        {/* Continuous marquee */}
        <div
          className="team-marquee-wrapper"
          style={{
            width: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
            cursor: isHovered ? 'grab' : 'default',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={scrollRef}
        >
          <div
            className="team-marquee-track"
            style={{
              display: 'flex',
              gap: `${CARD_GAP}px`,
              width: 'max-content',
              padding: '0 40px'
            }}
          >
            {/* First set */}
            {allMembers.map((member, i) => (
              <MemberCard key={`a-${i}`} member={member} onClick={setSelected} />
            ))}
            {/* Duplicate for seamless loop */}
            {allMembers.map((member, i) => (
              <MemberCard key={`b-${i}`} member={member} onClick={setSelected} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .team-marquee-wrapper::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Modal */}
      {selected && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
          onClick={() => setSelected(null)}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)' }} />
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              background: '#fff',
              borderRadius: '24px',
              maxWidth: '480px',
              width: '100%',
              overflow: 'hidden',
              border: '2px solid var(--ink-900)',
              boxShadow: '8px 8px 0px var(--ink-900)'
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'var(--surface-1)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', fontWeight: 800, zIndex: 10 }}
            >
              ✕
            </button>

            <div style={{ height: '240px', background: selected.tint }}>
              <img
                src={selected.image}
                alt={selected.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = 'https://www.gstatic.com/images/branding/product/2x/googleg_96dp.png'; e.target.style.objectFit = 'contain'; e.target.style.padding = '60px'; }}
              />
            </div>

            <div style={{ padding: '24px' }}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '6px', background: selected.tint, color: selected.color }}>
                  {selected.role}
                </span>
              </div>
              <h2 className="font-display" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink-900)', marginBottom: '12px' }}>{selected.name}</h2>
              <p style={{ fontSize: '14px', color: 'var(--ink-400)', lineHeight: 1.6 }}>{selected.bio}</p>

              <div className="flex gap-3 mt-8">
                {selected.social.linkedin && (
                  <a href={selected.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary-pill" style={{ fontSize: '12px' }}>LinkedIn</a>
                )}
                {selected.social.github && (
                  <a href={selected.social.github} target="_blank" rel="noopener noreferrer" className="btn-primary-pill" style={{ background: 'var(--ink-900)', fontSize: '12px' }}>GitHub</a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SocialIcon = ({ href, icon, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      fontSize: '16px',
      color: 'var(--ink-400)',
      transition: 'color 150ms ease'
    }}
    onMouseEnter={(e) => e.target.style.color = color}
    onMouseLeave={(e) => e.target.style.color = 'var(--ink-400)'}
  >
    {icon}
  </a>
);

export default Team;
