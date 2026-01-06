import React, { useState } from "react";
import React from "react";
import blobAnimation from "../assets/lottie/rotating-blob.json"; // adjust path

const Team = () => {
  const [activeTeam, setActiveTeam] = useState("core");

  // 1️⃣ Teams data
  const teams = {
    core: [
      {
        name: "Alex Johnson",
        role: "Lead Organizer",
        bio: "Passionate about building inclusive tech communities and Android development.",
        image: "/images/team/alex.jpg",
      },
      {
        name: "Sarah Chen",
        role: "Technical Lead",
        bio: "Full-stack developer specializing in cloud technologies and system architecture.",
        image: "/images/team/sarah.jpg",
      },
      {
        name: "Mike Rodriguez",
        role: "Events Coordinator",
        bio: "Event management expert with a passion for creating memorable developer experiences.",
        image: "/images/team/mike.jpg",
      }
    ],
    tech: [
      {
        name: "David Kim",
        role: "Android Lead",
        bio: "Kotlin enthusiast and Android developer with 3+ years of experience.",
        image: "/images/team/david.jpg",
      },
      {
        name: "Lisa Wang",
        role: "Flutter Lead",
        bio: "Cross-platform development expert and UI/UX design enthusiast.",
        image: "/images/team/lisa.jpg",
      }
    ]
  };

  // 2️⃣ Faculty Mentor
  const facultyMentor = {
    name: "Dr. Michael Roberts",
    role: "Faculty Advisor",
    department: "Computer Science Department",
    bio: "Professor with 15+ years of experience in software engineering and research.",
    social: { linkedin: "#", email: "#", website: "#" }
  };

  // 3️⃣ Tabs
  const teamTabs = [
    { key: "core", label: "Core Team", count: teams.core.length },
    { key: "tech", label: "Tech Leads", count: teams.tech.length }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50">
      {/* Hero Section */}
      <section className="relative text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Meet Our <span className="text-gradient">Team</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Passionate students building the future of technology together.
        </p>

        {/* Lottie Blob */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
        <Lottie
          animationData={blobAnimation}
          loop
          className="absolute inset-0"
        />
        </div>
      </section>

      {/* Team Members */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {teams[activeTeam].map((member, index) => (
          <div key={index} className="relative text-center">
            {/* Image over Blob */}
            <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden shadow-lg">
              <Player
                autoplay
                loop
                src={blobAnimation}
                speed={0.5}
                className="absolute inset-0 w-full h-full"
              />
              <img
                src={member.image}
                alt={member.name}
                className="relative w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Info */}
            <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-500">{member.role}</p>
          </div>
        ))}
      </section>

      {/* Faculty Mentor */}
      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Faculty Mentor</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">{facultyMentor.bio}</p>
      </section>
    </div>
  );
};

export default Team;
