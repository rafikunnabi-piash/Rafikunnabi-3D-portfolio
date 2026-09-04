import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Compass } from 'lucide-react';
import { sound } from '../../utils/audio';

interface NavbarProps {
  activeSection: string;
  scrollProgress: number;
}

export function Navbar({ activeSection, scrollProgress }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'INDEX' },
    { id: 'about', label: 'ABOUT' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'certifications', label: 'CERTS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const scrollTo = (id: string) => {
    sound.hoverTick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const state = sound.toggle();
    setIsAudioActive(state);
  };

  return (
    <>
      {/* Top Floating Bar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-4 px-6 sm:px-12 bg-[#050505]/85 border-b border-white/10 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.9)]'
            : 'py-6 px-6 sm:px-12 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Mark: RP text-2xl font-bold tracking-tighter */}
          <button
            onClick={() => scrollTo('hero')}
            data-cursor="TOP"
            className="group flex items-center gap-3 text-left focus:outline-none"
            aria-label="Scroll to top"
          >
            <div className="text-2xl font-bold tracking-tighter text-white group-hover:opacity-80 transition-opacity font-display">
              RP
            </div>
            <div className="hidden lg:flex flex-col pl-3 border-l border-white/15">
              <span className="text-[10px] tracking-[0.25em] font-semibold text-white/90 uppercase">
                RAFIKUNNABI PIASH
              </span>
              <span className="font-mono-tech text-[9px] text-white/40 tracking-widest">
                FRONTEND · UI/UX · IT SUPPORT
              </span>
            </div>
          </button>

          {/* Nav Links with tracking-[0.3em] font-semibold opacity-60 */}
          <nav className="hidden sm:flex items-center gap-6 md:gap-8 text-[10px] tracking-[0.3em] font-semibold">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={() => sound.hoverTick()}
                  data-cursor={item.label}
                  className={`transition-all duration-300 uppercase py-1 ${
                    isActive
                      ? 'text-white opacity-100 border-b border-white'
                      : 'text-white/60 hover:text-white hover:opacity-100 border-b border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Tools: Audio + Connect */}
          <div className="flex items-center gap-3">
            {/* Audio Synth Toggle */}
            <button
              onClick={toggleSound}
              data-cursor={isAudioActive ? 'MUTE' : 'AUDIO'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono-tech tracking-wider transition-all duration-300 border ${
                isAudioActive
                  ? 'border-white bg-white text-black font-semibold'
                  : 'border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-white/30'
              }`}
              title={isAudioActive ? 'Sound Synthesizer Active' : 'Enable Subtle UI Audio'}
            >
              {isAudioActive ? <Volume2 size={12} /> : <VolumeX size={12} />}
              <span className="hidden md:inline">{isAudioActive ? 'AUDIO: ON' : 'AUDIO'}</span>
            </button>

            {/* Quick Contact button */}
            <button
              onClick={() => scrollTo('contact')}
              data-cursor="CONTACT"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase bg-white text-black hover:bg-white/90 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <span>CONTACT</span>
              <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
            </button>
          </div>
        </div>

        {/* Dynamic Scroll Progress Hairline */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5 overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-75 opacity-80"
            style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
          />
        </div>
      </header>

      {/* Mobile Floating Bottom Bar for quick navigation */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 sm:hidden flex items-center gap-1 bg-[#090b14]/90 border border-white/10 rounded-full py-1.5 px-3 backdrop-blur-xl shadow-2xl">
        <button
          onClick={() => scrollTo('about')}
          className="px-2 py-1 text-[10px] font-mono-tech text-zinc-300 hover:text-cyan-300"
        >
          ABOUT
        </button>
        <span className="text-zinc-600">•</span>
        <button
          onClick={() => scrollTo('experience')}
          className="px-2 py-1 text-[10px] font-mono-tech text-zinc-300 hover:text-cyan-300"
        >
          EXP
        </button>
        <span className="text-zinc-600">•</span>
        <button
          onClick={() => scrollTo('projects')}
          className="px-2 py-1 text-[10px] font-mono-tech text-zinc-300 hover:text-cyan-300"
        >
          PROJECTS
        </button>
        <span className="text-zinc-600">•</span>
        <button
          onClick={() => scrollTo('skills')}
          className="px-2 py-1 text-[10px] font-mono-tech text-zinc-300 hover:text-cyan-300"
        >
          SKILLS
        </button>
      </div>
    </>
  );
}
