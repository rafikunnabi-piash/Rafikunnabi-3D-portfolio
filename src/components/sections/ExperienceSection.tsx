import { useState } from 'react';
import { EXPERIENCE_DATA } from '../../data/portfolioData';
import { ExperienceScene } from '../3d/ExperienceScene';
import { Server, Users, ShieldCheck, Network, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { sound } from '../../utils/audio';

export function ExperienceSection() {
  const [selectedExpIdx, setSelectedExpIdx] = useState<number>(0);
  const currentExp = EXPERIENCE_DATA[selectedExpIdx];

  return (
    <section
      id="experience"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono-tech text-xs tracking-widest text-cyan-400 uppercase">
            SECTION 03 // SYSTEMS IN MOTION
          </span>
          <div className="h-[1px] w-12 bg-cyan-400/40" />
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
          OPERATIONAL ROLES & <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-emerald-400 to-teal-300">
            TECHNICAL IMPACT.
          </span>
        </h2>
        <p className="font-mono-tech text-xs sm:text-sm text-zinc-400 mt-3 max-w-xl">
          Real-world IT systems diagnostics, network reliability, and developer community leadership.
        </p>
      </div>

      {/* Role Switcher Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {EXPERIENCE_DATA.map((exp, idx) => {
          const isActive = selectedExpIdx === idx;
          return (
            <button
              key={exp.id}
              onClick={() => {
                setSelectedExpIdx(idx);
                sound.hoverTick();
              }}
              data-cursor="SWITCH"
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-mono-tech text-xs tracking-wider uppercase transition-all duration-300 border ${
                isActive
                  ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                  : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              {exp.type === 'it-support' ? <Server size={14} /> : <Users size={14} />}
              <span>{exp.role}</span>
              <span className="text-[10px] text-zinc-500">// {exp.period}</span>
            </button>
          );
        })}
      </div>

      {/* Main Experience Layout: 3D Topology + Factual Bullet Points */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: 3D Interactive Topology Canvas */}
        <div className="lg:col-span-6 space-y-4">
          <ExperienceScene mode={currentExp.type === 'it-support' ? 'network' : 'community'} />

          {/* Node Progression Sequence */}
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 flex items-center justify-between gap-2 overflow-x-auto">
            {currentExp.type === 'it-support' ? (
              <>
                <span className="px-2 py-1 rounded bg-white/5 text-[11px] font-mono-tech text-cyan-300 shrink-0">
                  Computer
                </span>
                <span className="text-zinc-600">→</span>
                <span className="px-2 py-1 rounded bg-white/5 text-[11px] font-mono-tech text-cyan-300 shrink-0">
                  Network
                </span>
                <span className="text-zinc-600">→</span>
                <span className="px-2 py-1 rounded bg-white/5 text-[11px] font-mono-tech text-cyan-300 shrink-0">
                  CCTV
                </span>
                <span className="text-zinc-600">→</span>
                <span className="px-2 py-1 rounded bg-white/5 text-[11px] font-mono-tech text-cyan-300 shrink-0">
                  Server
                </span>
                <span className="text-zinc-600">→</span>
                <span className="px-2 py-1 rounded bg-white/5 text-[11px] font-mono-tech text-cyan-300 shrink-0">
                  Users
                </span>
              </>
            ) : (
              <>
                <span className="px-2 py-1 rounded bg-white/5 text-[11px] font-mono-tech text-amber-300 shrink-0">
                  Technology
                </span>
                <span className="text-zinc-600">→</span>
                <span className="px-2 py-1 rounded bg-white/5 text-[11px] font-mono-tech text-amber-300 shrink-0">
                  Campus
                </span>
                <span className="text-zinc-600">→</span>
                <span className="px-2 py-1 rounded bg-white/5 text-[11px] font-mono-tech text-amber-300 shrink-0">
                  Workshops
                </span>
                <span className="text-zinc-600">→</span>
                <span className="px-2 py-1 rounded bg-white/5 text-[11px] font-mono-tech text-amber-300 shrink-0">
                  Hackathons
                </span>
                <span className="text-zinc-600">→</span>
                <span className="px-2 py-1 rounded bg-white/5 text-[11px] font-mono-tech text-amber-300 shrink-0">
                  Community
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right: Detailed Factual Responsibilities */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-7 sm:p-8 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono-tech text-xs text-cyan-400 tracking-wider uppercase">
                  {currentExp.organization}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  {currentExp.period}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {currentExp.role}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-light leading-relaxed">
                {currentExp.description}
              </p>
            </div>

            {/* Factual Bullet Points */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <h4 className="font-mono-tech text-xs tracking-wider uppercase text-zinc-400 flex items-center gap-1.5">
                <Activity size={14} className="text-cyan-400" />
                KEY RESPONSIBILITIES & FIELD DELIVERABLES
              </h4>
              <div className="space-y-2.5">
                {currentExp.responsibilities.map((resp, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/40 border border-white/5">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                      {resp}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Source Stamp */}
            <div className="pt-2 flex items-center justify-between text-[10px] font-mono-tech text-zinc-500">
              <span>SOURCE // PORTFOLIO CANONICAL</span>
              <span className="text-cyan-400">STATUS // ACTIVE PROFESSIONAL LOG</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
