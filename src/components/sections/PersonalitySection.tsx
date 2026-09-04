import { Sparkles, Terminal, Flame } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export function PersonalitySection() {
  return (
    <section
      id="personality"
      className="relative py-32 sm:py-44 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col items-center text-center justify-center overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono-tech tracking-[0.3em] uppercase text-white/60">
          <Sparkles size={12} className="text-white" />
          <span>SECTION 07 // ETHOS & MOMENTUM</span>
        </div>

        {/* Large High-Contrast Cinematic Statement */}
        <div className="space-y-2 font-display font-black tracking-tighter text-white leading-[0.88]">
          <h2 className="text-6xl sm:text-8xl md:text-9xl text-white">
            CURIOUS.
          </h2>
          <h2 className="text-6xl sm:text-8xl md:text-9xl text-stroke-white">
            CREATIVE.
          </h2>
          <h2 className="text-6xl sm:text-8xl md:text-9xl text-white/90">
            ALWAYS BUILDING.
          </h2>
        </div>

        {/* Concise Supporting Statement with Editorial Serif Italic */}
        <p className="font-sans text-base sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light pt-2">
          A motivated and detail-oriented Computer Science graduate focused on <span className="italic font-serif-editorial text-white font-normal">frontend development</span>, networking, IT support, and user-centric digital experiences.
        </p>

        {/* Engineering Motto Micro-tag */}
        <div className="pt-2 flex items-center justify-center gap-3 text-[10px] font-mono-tech text-white/40 tracking-[0.25em] uppercase">
          <Terminal size={12} className="text-white" />
          <span>CODE × DESIGN × TECHNOLOGY // PURE ARCHITECTURE</span>
        </div>
      </div>
    </section>
  );
}
