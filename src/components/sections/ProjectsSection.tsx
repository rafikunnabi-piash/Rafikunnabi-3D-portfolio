import { useState } from 'react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { ProjectsStage } from '../3d/ProjectsStage';
import { ProjectItem } from '../../types';
import { ChevronLeft, ChevronRight, Eye, Code2, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const currentProject = PROJECTS_DATA[activeIdx];

  const handleNext = () => {
    sound.hoverTick();
    setActiveIdx((prev) => (prev + 1) % PROJECTS_DATA.length);
  };

  const handlePrev = () => {
    sound.hoverTick();
    setActiveIdx((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono-tech text-xs tracking-widest text-cyan-400 uppercase">
              SECTION 04 // 3D PROJECT GALLERY
            </span>
            <div className="h-[1px] w-12 bg-cyan-400/40" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
            FROM CODE TO <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500">
              IMMERSIVE EXPERIENCE.
            </span>
          </h2>
          <p className="font-mono-tech text-xs sm:text-sm text-zinc-400 mt-3 max-w-xl">
            Continuously connected 3D spatial stages showcasing self-engineered platforms, AI workflows, and UI/UX systems.
          </p>
        </div>

        {/* Gallery Navigation Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            data-cursor="PREV"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/80 border border-white/10 hover:border-cyan-400/60 text-zinc-200 hover:text-cyan-300 transition-all active:scale-95 shadow-lg"
            aria-label="Previous project"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="font-mono-tech text-xs text-zinc-400 px-3 py-2 rounded-full bg-zinc-900/50 border border-white/5">
            <span className="text-cyan-400 font-bold">0{activeIdx + 1}</span>
            <span className="text-zinc-600"> / </span>
            <span>0{PROJECTS_DATA.length}</span>
          </div>
          <button
            onClick={handleNext}
            data-cursor="NEXT"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/80 border border-white/10 hover:border-cyan-400/60 text-zinc-200 hover:text-cyan-300 transition-all active:scale-95 shadow-lg"
            aria-label="Next project"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Project Selector Mini Carousel Pills */}
      <div className="flex gap-2 pb-6 overflow-x-auto no-scrollbar">
        {PROJECTS_DATA.map((p, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={p.id}
              onClick={() => {
                setActiveIdx(idx);
                sound.hoverTick();
              }}
              data-cursor="SELECT"
              className={`px-4 py-2 rounded-full text-xs font-mono-tech whitespace-nowrap transition-all duration-300 border shrink-0 ${
                isActive
                  ? 'bg-white text-black font-semibold border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'bg-zinc-950/60 border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
              }`}
            >
              0{idx + 1} // {p.subtitle || p.title.split(' ')[0]}
            </button>
          );
        })}
      </div>

      {/* Main 3D Gallery Stage */}
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Spatial Canvas */}
        <div className="lg:col-span-7 relative">
          <ProjectsStage activeProjectIndex={activeIdx} />

          {/* Spatial Concept Tag */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono-tech text-[10px] text-cyan-300 tracking-wider uppercase bg-black/60 px-2.5 py-1 rounded-full border border-cyan-400/30">
              SPATIAL ENVIRONMENT // 0{activeIdx + 1}
            </span>
          </div>
        </div>

        {/* Right: Immersive Project Specification Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-7 sm:p-8 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl space-y-5 shadow-2xl">
            {/* Category & Role */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono-tech text-xs tracking-widest uppercase text-cyan-400">
                {currentProject.category}
              </span>
              {currentProject.role && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech bg-cyan-950/60 text-cyan-300 border border-cyan-400/30">
                  {currentProject.role}
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                {currentProject.title}
              </h3>
              {currentProject.subtitle && (
                <p className="font-mono-tech text-xs text-zinc-400 mt-1">
                  // {currentProject.subtitle}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
              {currentProject.description}
            </p>

            {/* 3D Visual Concept summary */}
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="font-mono-tech text-[10px] uppercase text-zinc-400 block tracking-wider">
                STAGE CHOREOGRAPHY
              </span>
              <p className="text-xs text-zinc-300 font-mono-tech">
                {currentProject.visualConcept}
              </p>
            </div>

            {/* Tech Stack Badges */}
            <div className="space-y-2">
              <span className="font-mono-tech text-[10px] uppercase text-zinc-400 block tracking-wider">
                TECHNOLOGIES UTILIZED
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono-tech rounded-md bg-white/5 border border-white/10 text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  sound.playChime(660);
                  onSelectProject(currentProject);
                }}
                data-cursor="INSPECT"
                className="flex-1 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-95"
              >
                <span>EXPLORE ARCHITECTURE</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
