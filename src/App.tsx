import { useState, useEffect } from 'react';
import { HeroScene } from './components/3d/HeroScene';
import { Navbar } from './components/ui/Navbar';
import { CustomCursor } from './components/ui/CustomCursor';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { EducationSection } from './components/sections/EducationSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { PersonalitySection } from './components/sections/PersonalitySection';
import { ContactSection } from './components/sections/ContactSection';
import { ProjectModal } from './components/sections/ProjectModal';
import { ProjectItem } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Track global scroll for camera choreography and progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, currentScroll / totalScroll)) : 0;
      setScrollProgress(progress);

      // Section spy
      const sections = ['hero', 'about', 'education', 'experience', 'projects', 'skills', 'certifications', 'personality', 'contact'];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-white/20 selection:text-white font-sans">
      {/* Cinematic Initial Loader */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Custom Fluid Magnetic Cursor */}
      <CustomCursor />

      {/* Elegant Architectural 12-Column Hairline Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div className="grid grid-cols-12 h-full w-full max-w-7xl mx-auto">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white/5 h-full" />
          ))}
        </div>
      </div>

      {/* Minimalist Precision Reticle SVG Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-15">
        <svg width="100%" height="100%" viewBox="0 0 1024 768" fill="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <circle cx="512" cy="384" r="300" stroke="white" strokeWidth="0.5" strokeDasharray="4 12" />
          <circle cx="512" cy="384" r="200" stroke="white" strokeWidth="0.5" opacity="0.4" />
          <circle cx="512" cy="384" r="80" stroke="white" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.3" />
          <line x1="0" y1="384" x2="1024" y2="384" stroke="white" strokeWidth="0.25" opacity="0.6" />
          <line x1="512" y1="0" x2="512" y2="768" stroke="white" strokeWidth="0.25" opacity="0.6" />
        </svg>
      </div>

      {/* Atmospheric Diffuse Lighting Accents */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Persistent Minimal Floating Navigation */}
      <Navbar activeSection={activeSection} scrollProgress={scrollProgress} />

      {/* Fixed 3D WebGL Background Canvas (Hero & Scroll Choreography) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <HeroScene scrollProgress={scrollProgress} />
        {/* Deep vignette gradient to merge seamlessly into #050505 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#050505_96%)] pointer-events-none" />
      </div>

      {/* Main Content Layers */}
      <main className="relative z-10 flex flex-col space-y-16 sm:space-y-24">
        <HeroSection scrollProgress={scrollProgress} />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
        <SkillsSection />
        <CertificationsSection />
        <PersonalitySection />
        <ContactSection />
      </main>

      {/* Interactive Project Inspection Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
