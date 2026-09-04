import { useState } from 'react';
import { EDUCATION_DATA } from '../../data/portfolioData';
import { GraduationCap, Award, Calendar, BookOpen, ChevronRight } from 'lucide-react';
import { sound } from '../../utils/audio';

export function EducationSection() {
  const [activeItem, setActiveItem] = useState<string>(EDUCATION_DATA[0].id);

  return (
    <section
      id="education"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono-tech text-xs tracking-widest text-cyan-400 uppercase">
            SECTION 02 // ACADEMIC RIGOR
          </span>
          <div className="h-[1px] w-12 bg-cyan-400/40" />
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
          TIMELINE THROUGH <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-sky-300 to-cyan-400">
            KNOWLEDGE & FORMATION.
          </span>
        </h2>
        <p className="font-mono-tech text-xs sm:text-sm text-zinc-400 mt-3 max-w-xl">
          Factual academic milestones charting computational principles, computer science, and technical foundations.
        </p>
      </div>

      {/* Vertical 3D Timeline Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Timeline Path & Milestones */}
        <div className="lg:col-span-8 relative">
          {/* Glowing Vertical Laser Backbone */}
          <div className="absolute left-6 sm:left-8 top-4 bottom-4 w-[2px] bg-linear-to-b from-cyan-400 via-sky-500 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />

          <div className="space-y-8">
            {EDUCATION_DATA.map((item, idx) => {
              const isActive = activeItem === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    sound.hoverTick();
                  }}
                  onMouseEnter={() => sound.hoverTick()}
                  data-cursor="TIMELINE"
                  className={`relative pl-16 sm:pl-20 group cursor-pointer transition-all duration-300 ${
                    isActive ? 'scale-[1.01]' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Timeline Chrono-Beacon Node */}
                  <div
                    className={`absolute left-3.5 sm:left-5.5 -top-0.5 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-cyan-400 text-black border-2 border-white shadow-[0_0_20px_#06b6d4] scale-125'
                        : 'bg-zinc-900 border border-cyan-400/50 text-cyan-300 group-hover:border-cyan-400'
                    }`}
                  >
                    <GraduationCap size={14} />
                  </div>

                  {/* Content Slab */}
                  <div
                    className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 backdrop-blur-md ${
                      isActive
                        ? 'bg-zinc-900/90 border-cyan-400/50 shadow-[0_10px_35px_rgba(6,182,212,0.15)]'
                        : 'bg-zinc-950/40 border-white/5 hover:border-white/15'
                    }`}
                  >
                    {/* Year & Metric Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tech text-xs font-bold text-cyan-300 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-400/30">
                          {item.passingYear}
                        </span>
                        <span className="font-mono-tech text-xs text-emerald-400 font-semibold">
                          {item.result}
                        </span>
                      </div>
                      <span className="font-mono-tech text-[10px] text-zinc-500 uppercase">
                        MILESTONE 0{idx + 1}
                      </span>
                    </div>

                    {/* Degree & Institution */}
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {item.degree}
                    </h3>
                    <p className="font-mono-tech text-xs sm:text-sm text-sky-400 font-medium mt-0.5">
                      {item.institution}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-300 mt-3 font-light leading-relaxed">
                      {item.description}
                    </p>

                    {/* Course Focus Badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                      {item.courses.map((course) => (
                        <span
                          key={course}
                          className="px-2 py-0.5 text-[10px] font-mono-tech rounded bg-white/5 text-zinc-300 border border-white/5"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 3D Knowledge Beacon HUD */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-cyan-400/20 backdrop-blur-xl relative overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.1)]">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono-tech text-xs text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={14} /> ACTIVE MILESTONE
              </span>
              <span className="font-mono-tech text-[10px] text-zinc-500">
                VERIFIED SOURCE
              </span>
            </div>

            {/* Selected item breakdown */}
            {(() => {
              const selected = EDUCATION_DATA.find((e) => e.id === activeItem) || EDUCATION_DATA[0];
              return (
                <div className="space-y-4">
                  <div>
                    <span className="font-mono-tech text-[10px] text-zinc-400 uppercase">DEGREE / AWARD</span>
                    <h4 className="font-display text-xl font-bold text-white mt-0.5">
                      {selected.degree}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/5">
                    <div>
                      <span className="font-mono-tech text-[10px] text-zinc-500">INSTITUTION</span>
                      <p className="font-mono-tech text-xs text-zinc-200 mt-0.5 font-semibold">
                        {selected.institution}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono-tech text-[10px] text-zinc-500">PASSING YEAR</span>
                      <p className="font-mono-tech text-xs text-cyan-300 mt-0.5 font-semibold">
                        {selected.passingYear}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono-tech text-[10px] text-zinc-500">OFFICIAL RESULT</span>
                    <p className="font-mono-tech text-sm text-emerald-400 font-bold mt-0.5">
                      {selected.result}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed pt-2">
                    Underlying foundation strictly corroborates credentials hosted at rafikunnabi-piash.github.io/Portfolio.
                  </p>
                </div>
              );
            })()}

            {/* Ambient Corner Glow */}
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
