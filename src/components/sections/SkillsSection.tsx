import { useState } from 'react';
import { SKILLS_DATA } from '../../data/portfolioData';
import { TechUniverseScene } from '../3d/TechUniverseScene';
import { Cpu, Check, Layers, Terminal, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

export function SkillsSection() {
  const [selectedCatId, setSelectedCatId] = useState<string>(SKILLS_DATA[0].id);
  const activeCategory = SKILLS_DATA.find((c) => c.id === selectedCatId) || SKILLS_DATA[0];

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono-tech text-xs tracking-widest text-cyan-400 uppercase">
            SECTION 05 // TECH STACK UNIVERSE
          </span>
          <div className="h-[1px] w-12 bg-cyan-400/40" />
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
          A CONSTELLATION OF <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-cyan-300 to-indigo-400">
            TECHNICAL COMPETENCIES.
          </span>
        </h2>
        <p className="font-mono-tech text-xs sm:text-sm text-zinc-400 mt-3 max-w-xl">
          Central node PIASH surrounded by verified domains: Code, Design, Database, Network, Systems, and Web.
        </p>
      </div>

      {/* Main Grid: 3D Universe + Category Explorer */}
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Tech Universe Canvas */}
        <div className="lg:col-span-6 relative">
          <TechUniverseScene activeCategory={selectedCatId} />

          {/* Central Monogram HUD Tag */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between p-3 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 font-mono-tech text-xs text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>CORE ORBIT // PIASH</span>
            </div>
            <span className="font-mono-tech text-[10px] text-zinc-500 uppercase">
              NO ARBITRARY % RATINGS
            </span>
          </div>
        </div>

        {/* Right: Technical Domain Inspector */}
        <div className="lg:col-span-6 space-y-6">
          {/* Category Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {SKILLS_DATA.map((cat) => {
              const isSelected = cat.id === selectedCatId;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCatId(cat.id);
                    sound.hoverTick();
                  }}
                  data-cursor="CATEGORY"
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech tracking-wider transition-all duration-300 border ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                      : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Active Domain Panel */}
          <div className="p-7 sm:p-8 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <span className="font-mono-tech text-xs text-cyan-400 tracking-wider uppercase">
                  DOMAIN SPECIFICATION
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  {activeCategory.name}
                </h3>
                <p className="font-mono-tech text-xs text-zinc-400 mt-0.5">
                  // {activeCategory.tagline}
                </p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                <Cpu size={18} />
              </div>
            </div>

            {/* Skills Cluster Badges */}
            <div className="space-y-3">
              <span className="font-mono-tech text-xs text-zinc-400 uppercase tracking-wider block">
                VERIFIED COMPETENCY STACK
              </span>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {activeCategory.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-xs font-mono-tech text-zinc-200 hover:border-cyan-400/40 transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_6px_#06b6d4]" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Integrity Notice */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 font-mono-tech text-[10px] text-zinc-400">
              <Sparkles size={13} className="text-cyan-400 shrink-0" />
              <span>
                Skills are derived directly from actual project codebases and IT support operations.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
