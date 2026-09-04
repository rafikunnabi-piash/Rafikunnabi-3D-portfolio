import { ProjectItem } from '../../types';
import { X, ExternalLink, Code2, Layers, Cpu, Sparkles } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-white/10 p-6 sm:p-8 text-zinc-100 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="font-mono-tech text-xs tracking-widest uppercase text-cyan-400">
              {project.category}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              {project.title}
            </h2>
            {project.subtitle && (
              <p className="font-mono-tech text-xs text-zinc-400 mt-1">
                // {project.subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            data-cursor="CLOSE"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-6 space-y-6">
          {/* Role badge if available */}
          {project.role && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono-tech">
              <Sparkles size={14} />
              <span>ROLE: {project.role}</span>
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="font-mono-tech text-xs tracking-wider uppercase text-zinc-400 mb-2">
              System Overview
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* 3D Visual Concept */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
            <h4 className="font-mono-tech text-xs tracking-wider uppercase text-cyan-300 flex items-center gap-2 mb-1.5">
              <Cpu size={14} /> 3D Spatial Representation
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {project.visualConcept}
            </p>
          </div>

          {/* Engineering Highlights */}
          <div>
            <h3 className="font-mono-tech text-xs tracking-wider uppercase text-zinc-400 mb-3">
              Key Architecture Highlights
            </h3>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {project.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-900/40 border border-white/5"
                >
                  <span className="font-mono-tech text-cyan-400 text-xs mt-0.5">0{i + 1}</span>
                  <p className="text-xs text-zinc-300">{h}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="font-mono-tech text-xs tracking-wider uppercase text-zinc-400 mb-2.5">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono-tech rounded-md bg-white/5 border border-white/10 text-zinc-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono-tech text-xs text-zinc-500">
            Source: rafikunnabi-piash.github.io/Portfolio
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/rafikunnabi-piash"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono-tech transition-colors"
            >
              <Code2 size={14} /> GITHUB REPO
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-mono-tech transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
