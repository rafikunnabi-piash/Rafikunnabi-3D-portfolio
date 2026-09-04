import { ArrowDown, Terminal, Sparkles, Compass } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/audio';

interface HeroSectionProps {
  scrollProgress: number;
}

export function HeroSection({ scrollProgress }: HeroSectionProps) {
  const scrollTo = (id: string) => {
    sound.hoverTick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-10 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* Left-Side Vertical Scroll Marker from Design HTML */}
      <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-4 items-center z-20 pointer-events-none">
        <span className="text-[10px] rotate-90 origin-center tracking-[0.5em] uppercase text-white/40 mb-12">
          SCROLL
        </span>
        <div className="w-[1px] h-32 bg-linear-to-b from-white/40 to-transparent" />
      </div>

      {/* Top Status Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-4 z-10 text-[10px] tracking-[0.25em] text-white/50 uppercase font-mono-tech">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
          <span className="text-white/80 font-semibold">{PERSONAL_INFO.status}</span>
          <span className="text-white/30">// DHAKA, BANGLADESH</span>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <span className="text-white/30">CANONICAL SPECIFICATION</span>
          <span className="text-white/70">2026 // EDITION</span>
        </div>
      </div>

      {/* Center Cinematic Typography & Brand Identity */}
      <div className="relative z-10 my-auto py-4 sm:py-8 flex flex-col items-center text-center w-full max-w-4xl mx-auto">
        {/* Eyebrow from Elegant Dark Design: tracking-[0.4em] uppercase opacity-60 */}
        <h2 className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] uppercase text-white/60 mb-3 sm:mb-5 font-mono-tech max-w-full px-2">
          Frontend Developer · UI/UX · IT Support
        </h2>

        {/* Display Name scaled proportionally to fit 100% cleanly on all screen sizes */}
        <div className="relative leading-tight tracking-tight max-w-full px-4">
          <h1 className="font-display text-2xl min-[360px]:text-3xl min-[480px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] whitespace-nowrap">
            RAFIKUNNABI
          </h1>
          <h1 className="font-display text-2xl min-[360px]:text-3xl min-[480px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-stroke-white tracking-tight mt-1 whitespace-nowrap">
            PIASH
          </h1>

          {/* Elegant Pulsing Geometric Ring Accent */}
          <div className="absolute -right-2 sm:-right-4 -top-1 sm:-top-2 w-10 sm:w-14 h-10 sm:h-14 rounded-full border border-white/15 opacity-30 animate-pulse pointer-events-none" />
        </div>

        {/* Hero Core Statement with Editorial Serif Italic Accent */}
        <p className="text-xs sm:text-base md:text-lg max-w-xl mx-auto font-light text-white/80 leading-relaxed mt-4 sm:mt-6 px-4">
          I build <span className="italic font-serif-editorial text-white font-normal">digital experiences</span>, not just websites. At the intersection of Code, Design, and Technology.
        </p>

        {/* CTA Actions */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => scrollTo('projects')}
            data-cursor="EXPLORE"
            className="group relative px-6 py-2.5 sm:py-3 rounded-full bg-white text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/90 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.3)]"
          >
            <span>ENTER 3D GALLERY</span>
            <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
          </button>

          <button
            onClick={() => scrollTo('about')}
            data-cursor="ABOUT"
            className="px-5 py-2.5 sm:py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white font-mono-tech text-xs tracking-[0.2em] uppercase transition-all duration-300"
          >
            EXPLORE IDENTITY
          </button>
        </div>
      </div>

      {/* Bottom Telemetry & Latest Project Card */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
        {/* Bottom Left: Geographic Coordinates */}
        <div className="text-[10px] tracking-[0.2em] text-white/50 flex flex-col gap-1 font-mono-tech text-center sm:text-left">
          <div className="text-white/80 font-semibold">DHAKA, BD</div>
          <div>23.8103° N, 90.4125° E</div>
        </div>

        {/* Bottom Center: Scroll Hint */}
        <button
          onClick={() => scrollTo('about')}
          data-cursor="SCROLL"
          className="flex items-center gap-2 text-xs font-mono-tech text-white/40 hover:text-white transition-colors group tracking-[0.3em] uppercase"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform animate-bounce" />
        </button>

        {/* Bottom Right: Latest Project Circle Button */}
        <div
          onClick={() => scrollTo('projects')}
          data-cursor="PROJECT"
          className="group cursor-pointer flex items-center gap-4 text-right"
        >
          <div>
            <div className="text-[9px] tracking-[0.25em] text-white/40 uppercase font-mono-tech">
              FEATURED SYSTEM
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white tracking-wider">
              AGRIFARM BIDDING
            </div>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 shadow-md">
            <Compass size={16} className="group-hover:rotate-45 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
}
