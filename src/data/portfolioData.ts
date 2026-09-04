import { ProjectItem, EducationItem, ExperienceItem, SkillCategory, CertificationItem } from '../types';

export const PERSONAL_INFO = {
  name: "Rafikunnabi Piash",
  shortName: "RP",
  tagline: "I BUILD DIGITAL EXPERIENCES, NOT JUST WEBSITES.",
  roles: [
    "Frontend Developer",
    "UI/UX Enthusiast",
    "IT Support Engineer"
  ],
  bio: "Computer Science graduate focused on frontend development, UI/UX design, networking and practical technology solutions.",
  aboutDetailed: "A motivated and detail-oriented Computer Science graduate focused on bridging the gap between elegant interface engineering and dependable systems infrastructure. Driven by relentless curiosity, I transform complex ideas into intuitive, high-performance digital experiences while maintaining robust hardware, network, and operational foundations.",
  email: "rfknbi.piash@gmail.com",
  github: "https://github.com/rafikunnabi-piash",
  linkedin: "https://www.linkedin.com/in/rafikunnabi-piash",
  portfolioUrl: "https://rafikunnabi-piash.github.io/Portfolio/",
  location: "Dhaka, Bangladesh",
  status: "Available for Frontend & IT Roles",
  avatarUrl: "/avatar.png",
  pillars: [
    { title: "Code", desc: "Clean, responsive, component-driven engineering using modern web standards." },
    { title: "Design", desc: "User-centric UI/UX architectures, interactive prototyping, and typographic precision." },
    { title: "Technology", desc: "Reliable IT infrastructure, network troubleshooting, and systems diagnostics." }
  ],
  characteristics: [
    {
      id: "problem-solving",
      title: "Problem Solving",
      badge: "CORE STRENGTH",
      description: "Analytical mindset breaking down intricate technical challenges into modular, verifiable steps across both frontend codebases and hardware/network topologies."
    },
    {
      id: "quick-learner",
      title: "Quick Learner",
      badge: "AGILITY",
      description: "Rapidly mastering emerging frameworks, cutting-edge UI methodologies, and API integrations with relentless technical curiosity."
    },
    {
      id: "team-player",
      title: "Team Player",
      badge: "COLLABORATION",
      description: "Collaborative lead and contributor bridging multidisciplinary teams, facilitating hackathons, and uniting developers with designers."
    },
    {
      id: "time-management",
      title: "Time Management",
      badge: "PRECISION",
      description: "Disciplined prioritization ensuring timely project delivery, streamlined incident resolution, and high-uptime operational performance."
    }
  ]
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Computer Science & Engineering",
    institution: "City University",
    passingYear: "2026",
    result: "CGPA: 2.95",
    description: "Rigorous undergraduate program emphasizing software engineering principles, algorithm design, relational databases, data structures, and computer networking foundations.",
    courses: ["Data Structures & Algorithms", "Database Management Systems", "Computer Networks", "Software Engineering", "Web Technologies"]
  },
  {
    id: "edu-2",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Lincoln Millennium College",
    passingYear: "2020",
    result: "GPA: 4.92 / 5.00",
    description: "Science concentration fostering intensive quantitative problem solving, physics, higher mathematics, and early computer programming logic.",
    courses: ["Physics", "Mathematics", "Information & Communication Technology", "Chemistry"]
  },
  {
    id: "edu-3",
    degree: "Secondary School Certificate (SSC)",
    institution: "Baghia Momin Sharker Academy",
    passingYear: "2018",
    result: "GPA: 4.67 / 5.00",
    description: "Solid foundational education in sciences, analytical mathematics, and technical reasoning.",
    courses: ["General Science", "Higher Mathematics", "Computer Studies"]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "IT SUPPORT ENGINEER",
    organization: "Nurjahan Institute of Medical Science",
    period: "Nov 2025 — Present",
    type: "it-support",
    topologyNodes: ["Workstations", "Local Gateway", "CCTV Array", "Medical Server", "Department Users"],
    description: "Spearheading hands-on IT infrastructure and systems reliability across institutional departments, clinical simulation labs, and administrative operations.",
    responsibilities: [
      "Technical support for computers, printers, CCTV and network systems across all wings",
      "Hardware, software and Wi-Fi/LAN troubleshooting ensuring 99.8% uptime for mission-critical staff",
      "User accounts provisioning, automated data backup pipelines, and scheduled system security updates",
      "Maintenance and issue resolution for institute management systems and employee/student portals",
      "Supporting cross-departmental IT operations, diagnosing peripheral anomalies, and conducting preventative audits"
    ]
  },
  {
    id: "exp-2",
    role: "CAMPUS AMBASSADOR",
    organization: "Programming Hero",
    period: "2024 — 2025",
    type: "ambassador",
    topologyNodes: ["Campus Community", "Mentorship Circles", "Hackathons", "Tech Workshops"],
    description: "Cultivated a thriving developer community on campus, inspiring students to dive into programming, modern web technologies, and collaborative innovation.",
    responsibilities: [
      "Brand awareness and technical evangelism for developer learning initiatives",
      "Coordinating tech events, coding workshops, and community social outreach",
      "Mentoring peers through foundational programming hurdles and hackathon preparations",
      "Facilitating student engagement sessions and connecting aspiring developers to industry resources"
    ]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "project-1",
    title: "ONLINE FARMER'S MARKET & BIDDING SYSTEM",
    subtitle: "AGRIFARM",
    category: "Full-Stack Web & Mobile Platform",
    role: "Team Lead + Primary UI/UX Designer",
    technologies: ["Laravel", "Vue.js", "MySQL"],
    description: "A comprehensive web and mobile platform engineered to eliminate exploitative middlemen by connecting rural farmers directly with wholesale and retail buyers through a transparent, real-time bidding auction system.",
    visualConcept: "3D Farmer & Buyer nodes exchanging dynamic bid telemetry across an illuminated digital marketplace lattice.",
    highlights: [
      "Real-time dynamic price bidding engine with reactive UI updates",
      "Role-based dashboards tailored for agricultural producers and buyers",
      "Relational MySQL architecture supporting multi-crop listings, transaction histories, and bid states",
      "Intuitive, accessible UI crafted specifically for non-technical agricultural users"
    ],
    accentColor: "#10b981"
  },
  {
    id: "project-2",
    title: "AI TRIP PLANNER",
    subtitle: "Smart Itinerary Engine",
    category: "AI-Powered Web Application",
    technologies: ["HTML5", "Tailwind CSS", "JavaScript", "Gemini API"],
    description: "A dynamic, responsive single-page application that generates bespoke, personalized travel itineraries in seconds based on target destination, trip duration, budget constraints, and personalized travel interests.",
    visualConcept: "3D interactive wireframe globe calculating trajectory arcs, location beacons, and generative itinerary schedules.",
    highlights: [
      "Intelligent prompt chaining via Gemini API for hyper-localized travel recommendations",
      "Interactive day-by-day itinerary schedule breakdown with activity timing and packing essentials",
      "Ultra-fast responsive single-page frontend styled with clean Tailwind typography",
      "Custom destination explorer with budget and pace toggles"
    ],
    accentColor: "#38bdf8"
  },
  {
    id: "project-3",
    title: "PERSONAL PORTFOLIO WEBSITE",
    subtitle: "Self-Authored Digital Hub",
    category: "Interactive Web Experience",
    technologies: ["HTML5", "Tailwind CSS", "JavaScript"],
    description: "A responsive, animated portfolio website built from scratch showcasing projects, technical competencies, and contact touchpoints with fluid layouts and high performance.",
    visualConcept: "Miniature 3D floating viewport recursion displaying the portfolio interface transforming into deep dimension.",
    highlights: [
      "Handcrafted responsive CSS grid and flex structures without bulky third-party UI dependencies",
      "Accessible navigation with smooth scrolling and dynamic viewport awareness",
      "Lightweight footprint yielding near-instant first contentful paint"
    ],
    accentColor: "#a855f7"
  },
  {
    id: "project-4",
    title: "NIGHTFLIX — MOVIE SERVER",
    subtitle: "Media Streaming Experience",
    category: "Media Portal Interface",
    technologies: ["HTML5", "CSS", "Tailwind CSS", "JavaScript"],
    description: "A modern, cinematic movie server interface tailored for high-speed browsing, filtering, and streaming multimedia content across local network repositories.",
    visualConcept: "Immersive 3D floating movie poster wall with spatial depth and cinematic light reflections.",
    highlights: [
      "Curated media browsing layout with category sorting, genre filters, and search indexing",
      "Deep dark-mode styling optimized for evening viewing comfort and high contrast legibility",
      "Smooth hover micro-interactions revealing synopsis, cast, and playback triggers"
    ],
    accentColor: "#f43f5e"
  },
  {
    id: "project-5",
    title: "REAL-TIME WEATHER DASHBOARD",
    subtitle: "Atmospheric Telemetry",
    category: "API Data Visualization",
    technologies: ["HTML", "JavaScript", "REST API", "CSS Grid"],
    description: "A live meteorological application fetching real-time weather conditions, barometric data, wind speeds, and temperature forecasts based on geolocation coordinates or global city lookup.",
    visualConcept: "3D atmospheric simulation with dynamic volumetric weather particles, clouds, and temperature rings.",
    highlights: [
      "Asynchronous REST API consumption with graceful error resilience and fallback states",
      "Live weather status visualizer dynamically morphing background ambience to current weather",
      "Responsive metric cards showcasing humidity, atmospheric pressure, visibility, and wind vectors"
    ],
    accentColor: "#06b6d4"
  },
  {
    id: "project-6",
    title: "X-RIDE MOBILE APP UI",
    subtitle: "Shared Urban Mobility",
    category: "Mobile Product Design",
    role: "UI/UX Design & Branding",
    technologies: ["Figma", "UI/UX", "Branding"],
    description: "A human-centered mobile application design for a ride-sharing platform focused on cost-efficient, eco-friendly shared commutes, transparent fair splitting, and route optimization.",
    visualConcept: "Miniature 3D isometric city with animated neon route tracks transitioning into high-fidelity mobile frames.",
    highlights: [
      "Comprehensive end-to-end Figma prototype from wireframes to high-fidelity clickable flows",
      "Custom design system featuring reusable components, iconography, and cohesive dark/light palettes",
      "Streamlined booking and ride-matching flow verified through user journey testing"
    ],
    accentColor: "#f59e0b"
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: "web",
    name: "Web Technologies",
    tagline: "Core building blocks of the web",
    color: "#38bdf8",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "Tailwind CSS", "Vue.js", "Laravel", "REST APIs"]
  },
  {
    id: "frontend",
    name: "Frontend Development",
    tagline: "Component architecture & interaction",
    color: "#818cf8",
    skills: ["Responsive Web Design", "Component Architecture", "Interactive UI", "DOM Manipulation", "CSS Grid & Flexbox", "Web Animations"]
  },
  {
    id: "design",
    name: "UI/UX Design",
    tagline: "Human-centered interfaces & design systems",
    color: "#ec4899",
    skills: ["Figma", "Wireframing", "Interactive Prototyping", "Design Systems", "Mobile App UI", "User Flow Mapping"]
  },
  {
    id: "database",
    name: "Database Management",
    tagline: "Data architecture & persistence",
    color: "#10b981",
    skills: ["MySQL", "Relational Database Design", "SQL Queries", "Data Backup Strategies", "CRUD Operations"]
  },
  {
    id: "tools",
    name: "Software & Frameworks",
    tagline: "Professional tooling & workflow",
    color: "#f59e0b",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Chrome DevTools", "npm"]
  },
  {
    id: "network",
    name: "Networking Basics",
    tagline: "Connected systems & data transmission",
    color: "#06b6d4",
    skills: ["LAN / WLAN Configuration", "Wi-Fi Troubleshooting", "IP Addressing (IPv4)", "Router & Switch Setup", "Network Diagnostics"]
  },
  {
    id: "os",
    name: "Operating Systems",
    tagline: "Platform administration & environments",
    color: "#a855f7",
    skills: ["Windows 10/11 Pro Administration", "Linux (Ubuntu)", "Terminal / Bash", "System Services"]
  },
  {
    id: "hardware",
    name: "Hardware Knowledge",
    tagline: "Physical diagnostics & infrastructure support",
    color: "#ef4444",
    skills: ["PC Assembly & Diagnostics", "Peripheral Maintenance", "CCTV System Installation & Config", "Network Printer Configuration", "Storage Management"]
  },
  {
    id: "programming",
    name: "Programming Skills",
    tagline: "Algorithmic logic & backend basics",
    color: "#14b8a6",
    skills: ["JavaScript", "PHP", "C / C++ Basics", "Object-Oriented Programming (OOP)"]
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Full Stack Development with MERN",
    issuer: "Grameenphone Academy",
    credentialType: "Technical Certification",
    accent: "#10b981",
    description: "Comprehensive program covering modern full-stack web architecture, MongoDB, Express, React, Node.js, asynchronous APIs, and component modularity."
  },
  {
    id: "cert-2",
    title: "Career Essentials in Data Analysis",
    issuer: "Microsoft & LinkedIn",
    credentialType: "Professional Certificate",
    accent: "#38bdf8",
    description: "Foundational data analysis curriculum focused on data literacy, structured querying, analytical interpretation, and evidence-based decision making."
  },
  {
    id: "cert-3",
    title: "UI/UX Design for Beginners",
    issuer: "Great Learning",
    credentialType: "Specialized Course",
    accent: "#a855f7",
    description: "Principles of human-computer interaction, visual hierarchy, user journey mapping, wireframing, and usability heuristics for digital interfaces."
  },
  {
    id: "cert-4",
    title: "Graphic Design",
    issuer: "Pentanik IT Solution Park",
    credentialType: "Design Certification",
    accent: "#f59e0b",
    description: "Digital design foundations including color theory, typography pairing, spatial composition, branding elements, and vector graphics creation."
  }
];
