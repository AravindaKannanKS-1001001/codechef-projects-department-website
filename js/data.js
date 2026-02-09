// ============================================
// CENTRALIZED DATA STORE
// ============================================

const appData = {
  // MEMBERS DATA
  members: {
    leads: [
      {
        id: 1,
        name: "Aakash Jude Anthony",
        role: "Technical Lead",
        photo: "https://i.pravatar.cc/150?img=3",
        linkedin: "https://linkedin.com",
        github: "https://github.com"
      },
      {
        id: 2,
        name: "Rahul Kumar",
        role: "Management Lead",
        photo: "https://i.pravatar.cc/150?img=7",
        linkedin: "https://linkedin.com",
        github: "https://github.com"
      },
      {
        id: 3,
        name: "Bala Shanmugam",
        role: "Research Lead",
        photo: "https://i.pravatar.cc/150?img=12",
        linkedin: "https://linkedin.com",
        github: "https://github.com"
      }
    ],
    members: [
      {
        id: 4,
        name: "John Developer",
        role: "Frontend Developer",
        photo: "https://i.pravatar.cc/150?img=5",
        linkedin: "https://linkedin.com",
        github: "https://github.com"
      },
      {
        id: 5,
        name: "Sarah Backend",
        role: "Backend Developer",
        photo: "https://i.pravatar.cc/150?img=8",
        linkedin: "https://linkedin.com",
        github: "https://github.com"
      }
    ],
    mentors: [
      {
        id: 6,
        name: "Prof. Mentor One",
        role: "Faculty Mentor",
        photo: "https://i.pravatar.cc/150?img=12",
        linkedin: "https://linkedin.com",
        github: "https://github.com"
      }
    ],
    alumni: [
      {
        id: 7,
        name: "Alumni Graduate",
        role: "Senior Developer @TechCorp",
        photo: "https://i.pravatar.cc/150?img=15",
        linkedin: "https://linkedin.com",
        github: "https://github.com"
      }
    ]
  },

  // PROJECTS DATA
  projects: [
    {
      id: 1,
      title: "CodeChef Department Portal",
      description: "A centralized portal to showcase department activities, members, and achievements.",
      status: "ongoing",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      contributors: ["Aakash", "Rahul"],
      github: "https://github.com/Aakash-Jude-Anthony/CodeChef-Department-System",
      demo: "#"
    },
    {
      id: 2,
      title: "Quest System",
      description: "Gamified contribution tracking and leaderboard system for members.",
      status: "completed",
      technologies: ["Vue.js", "Express", "Firebase"],
      contributors: ["Sarah", "John"],
      github: "https://github.com",
      demo: "#"
    },
    {
      id: 3,
      title: "AI Research Dashboard",
      description: "Real-time visualization of ongoing AI/ML research projects.",
      status: "ongoing",
      technologies: ["Python", "Flask", "TensorFlow", "D3.js"],
      contributors: ["Bala", "Research Team"],
      github: "https://github.com",
      demo: "#"
    }
  ],

  // RESEARCH PAPERS
  research: [
    {
      id: 1,
      title: "Deep Learning Approaches for NLP",
      authors: "Bala Shanmugam, Dr. Smith",
      publication: "International Journal of AI Research, 2024",
      doi: "10.1234/ijair.2024.001",
      pdf: "#",
      arxiv: "#"
    },
    {
      id: 2,
      title: "Efficient Machine Learning Models for Edge Devices",
      authors: "Research Team, Prof. Mentor",
      publication: "IEEE Conference on ML, 2023",
      doi: "10.5678/ieeeml.2023.045",
      pdf: "#",
      arxiv: "#"
    }
  ],

  // ACHIEVEMENTS
  achievements: {
    awards: [
      {
        id: 1,
        title: "Best Web App - HackVIT 2024",
        icon: "🥇",
        year: "2024",
        description: "Won first place for innovative coding solutions"
      },
      {
        id: 2,
        title: "Runner-up - TechFest 2023",
        icon: "🥈",
        year: "2023",
        description: "Outstanding performance in hackathon competition"
      }
    ],
    milestones: [
      {
        id: 1,
        title: "50+ Active Members",
        icon: "👥",
        year: "2024",
        description: "Reached milestone of 50 active contributing members"
      },
      {
        id: 2,
        title: "10 Completed Projects",
        icon: "✅",
        year: "2023",
        description: "Successfully delivered 10 major projects"
      }
    ],
    hackathons: [
      {
        id: 1,
        title: "HackVIT 2024",
        icon: "🏆",
        year: "2024",
        description: "3 teams participated, 1 award won"
      },
      {
        id: 2,
        title: "TechFest 2023",
        icon: "🎯",
        year: "2023",
        description: "2 teams, runner-up position"
      }
    ]
  },

  // GAME DEV WING
  gameDev: {
    members: [
      {
        name: "Game Dev Lead",
        photo: "https://i.pravatar.cc/150?img=20"
      },
      {
        name: "Art Director",
        photo: "https://i.pravatar.cc/150?img=21"
      }
    ],
    projects: [
      { title: "Unity 3D Adventure Game", link: "#" },
      { title: "2D Puzzle Game (Godot)", link: "#" }
    ],
    tools: [
      "Unity",
      "Godot Engine",
      "Unreal Engine",
      "Blender",
      "Photoshop"
    ],
    events: [
      { title: "Game Jam 2024", date: "March 2024" },
      { title: "Art Workshop", date: "February 2024" }
    ]
  },

  // QUEST SYSTEM
  questSystem: {
    leaderboard: [
      { rank: 1, name: "Aakash", points: 2500, contributions: 45 },
      { rank: 2, name: "Sarah", points: 2100, contributions: 38 },
      { rank: 3, name: "John", points: 1850, contributions: 32 }
    ],
    contributions: [
      { id: 1, user: "Aakash", contribution: "Fixed critical bug in portal", date: "2024-02-08", points: 100 },
      { id: 2, user: "Sarah", contribution: "Added new feature", date: "2024-02-07", points: 80 }
    ],
    winners: [
      { month: "January 2024", winner: "Aakash", reward: "Certificate + Prize" },
      { month: "December 2023", winner: "Sarah", reward: "Certificate + Prize" }
    ]
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = appData;
}