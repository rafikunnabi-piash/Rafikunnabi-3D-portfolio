import { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Target, Zap, Users, Clock, Camera, Sparkles, Code, Cpu } from 'lucide-react';
import { sound } from '../../utils/audio';
import avatarImg from '../../assets/avatar.png';

export function AboutSection() {
  const [activeTrait, setActiveTrait] = useState<string | null>(null);
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string>(avatarImg || PERSONAL_INFO.avatarUrl || '/avatar.png');
  const [showPhotoPrompt, setShowPhotoPrompt] = useState(false);

  const traitIcons: Record<string, typeof Target> = {
    'problem-solving': Target,
    'quick-learner': Zap,
    'team-player': Users,
    'time-management': Clock
  };

  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Section Header */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono-tech text-[10px] tracking-[0.3em] font-semibold text-white/50 uppercase">
            SECTION 01 // IDENTITY
          </span>
          <div className="h-[1px] w-12 bg-white/20" />
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
          I TURN IDEAS <br />
          <span className="text-stroke-white tracking-tighter">
            INTO DIGITAL EXPERIENCES.
          </span>
        </h2>
      </div>

      {/* Main Grid: Portrait & Philosophy + 4 Interactive 3D Trait Crystals */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Factual Bio + Holographic Portrait */}
        <div className="lg:col-span-5 space-y-6">
          {/* Holographic Portrait Card */}
          <div className="relative group rounded-2xl p-1 bg-linear-to-b from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/10 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
            <div className="relative rounded-xl bg-[#080808] p-6 flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar Frame with Portrait Image */}
              <div className="relative h-36 w-36 sm:h-40 sm:w-40 shrink-0 rounded-2xl bg-[#0e0e0e] border border-white/25 flex items-center justify-center overflow-hidden group/avatar shadow-[0_0_25px_rgba(255,255,255,0.08)]">
                {customAvatarUrl ? (
                  <img
                    src={customAvatarUrl}
                    alt={PERSONAL_INFO.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/avatar:scale-105"
                    referrerPolicy="no-referrer"
                    onError={() => setCustomAvatarUrl('/avatar.png')}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-2">
                    <span className="font-display text-3xl font-extrabold text-white tracking-wider">
                      RP
                    </span>
                    <span className="font-mono-tech text-[9px] text-white/40 mt-1 uppercase tracking-widest">
                      AUTHENTIC IDENTITY
                    </span>
                  </div>
                )}

                {/* Scanline laser animation */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/10 to-transparent animate-[pulse_3s_ease-in-out_infinite] pointer-events-none" />

                {/* Verified badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[8px] font-mono-tech text-white/80 flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
                  <span>VERIFIED</span>
                </div>

                {/* Avatar URL Quick Switcher */}
                <button
                  onClick={() => setShowPhotoPrompt(!showPhotoPrompt)}
                  data-cursor="PHOTO"
                  className="absolute bottom-1 right-1 p-1.5 rounded-lg bg-black/80 hover:bg-white/20 text-white/60 hover:text-white text-[10px] transition-all"
                  title="Configure portrait URL"
                >
                  <Camera size={12} />
                </button>
              </div>

              {/* Identity Snapshot */}
              <div className="text-center sm:text-left space-y-1">
                <span className="font-mono-tech text-[10px] text-white/40 tracking-[0.2em] uppercase">
                  FOUNDATION // DHAKA, BANGLADESH
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="font-mono-tech text-xs text-white/60 leading-tight">
                  Computer Science Graduate · City University
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-white/5 border border-white/15 text-white/90">
                    Frontend
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-white/5 border border-white/15 text-white/90">
                    UI/UX
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-white/5 border border-white/15 text-white/90">
                    IT Support
                  </span>
                </div>
              </div>
            </div>

            {/* Optional custom avatar URL input if clicked */}
            {showPhotoPrompt && (
              <div className="p-3 bg-[#0a0a0a] border-t border-white/10 flex gap-2">
                <input
                  type="url"
                  placeholder="Paste direct portrait image URL..."
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  className="flex-1 bg-black/70 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-white"
                />
                <button
                  onClick={() => setShowPhotoPrompt(false)}
                  className="px-3 py-1 bg-white text-black text-xs font-semibold rounded-lg hover:bg-white/90"
                >
                  SAVE
                </button>
              </div>
            )}
          </div>

          {/* Narrative Detailed Statement */}
          <div className="p-6 rounded-2xl bg-[#080808]/80 border border-white/10 space-y-4">
            <h4 className="font-mono-tech text-[11px] text-white/50 tracking-[0.25em] uppercase flex items-center gap-2">
              <Code size={14} className="text-white" />
              PHILOSOPHY // "FROM CODE TO EXPERIENCE"
            </h4>
            <p className="text-sm text-white/70 leading-relaxed font-light">
              {PERSONAL_INFO.aboutDetailed}
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
              {PERSONAL_INFO.pillars.map((pillar) => (
                <div key={pillar.title} className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <span className="font-display font-bold text-xs text-white block">
                    {pillar.title}
                  </span>
                  <span className="font-mono-tech text-[9px] text-white/40 block mt-0.5 leading-tight">
                    {pillar.title === 'Code' ? 'Interactive UI' : pillar.title === 'Design' ? 'Clean Figma' : 'Hardware & Net'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 4 Floating 3D Trait Crystals */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-mono-tech text-[10px] text-white/50 uppercase tracking-[0.25em]">
              CORE PILLARS & CHARACTERISTICS
            </span>
            <span className="font-mono-tech text-[10px] text-white/60">
              [ 4 DYNAMIC VECTORS ]
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {PERSONAL_INFO.characteristics.map((trait, idx) => {
              const Icon = traitIcons[trait.id] || Sparkles;
              const isHovered = activeTrait === trait.id;

              return (
                <div
                  key={trait.id}
                  onMouseEnter={() => {
                    setActiveTrait(trait.id);
                    sound.hoverTick();
                  }}
                  onMouseLeave={() => setActiveTrait(null)}
                  data-cursor="INSPECT"
                  className={`group relative p-6 rounded-2xl transition-all duration-500 border ${
                    isHovered
                      ? 'bg-[#0f0f0f] border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.08)] -translate-y-1.5'
                      : 'bg-[#080808]/70 border-white/10 hover:border-white/20'
                  }`}
                  style={{
                    perspective: 1000
                  }}
                >
                  {/* Floating Kinetic Glyph Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                        isHovered
                          ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                          : 'bg-white/5 text-white border border-white/15'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span className="font-mono-tech text-[10px] text-white/40 tracking-wider">
                      0{idx + 1} // {trait.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {trait.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    {trait.description}
                  </p>

                  {/* Subtle 3D reactive corner border */}
                  <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick IT & Engineering Summary banner */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cpu size={18} className="text-white" />
              <span className="font-mono-tech text-xs text-white/80">
                Synthesis: Practical IT Support & High-Fidelity Frontend Engineering
              </span>
            </div>
            <span className="font-mono-tech text-[10px] text-white/50 tracking-wider shrink-0">
              PRODUCTION READY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
