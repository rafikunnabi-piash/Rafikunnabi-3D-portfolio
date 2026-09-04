import { useState } from 'react';
import { CERTIFICATIONS_DATA } from '../../data/portfolioData';
import { Award, ShieldCheck, ExternalLink, CheckCircle, FileText } from 'lucide-react';
import { sound } from '../../utils/audio';

export function CertificationsSection() {
  const [activeCertId, setActiveCertId] = useState<string>(CERTIFICATIONS_DATA[0].id);

  return (
    <section
      id="certifications"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono-tech text-xs tracking-widest text-cyan-400 uppercase">
            SECTION 06 // CREDENTIAL ARCHIVE
          </span>
          <div className="h-[1px] w-12 bg-cyan-400/40" />
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
          PROFESSIONAL CERTIFICATION <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400">
            & FORMAL ATTESTATIONS.
          </span>
        </h2>
        <p className="font-mono-tech text-xs sm:text-sm text-zinc-400 mt-3 max-w-xl">
          Verified accreditations across full-stack software development, data analysis, and user experience design.
        </p>
      </div>

      {/* 3D Floating Certifications Showcase */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CERTIFICATIONS_DATA.map((cert, idx) => {
          const isActive = activeCertId === cert.id;

          return (
            <div
              key={cert.id}
              onClick={() => {
                setActiveCertId(cert.id);
                sound.hoverTick();
              }}
              onMouseEnter={() => sound.hoverTick()}
              data-cursor="CREDENTIAL"
              className={`group relative p-6 sm:p-7 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-zinc-900/90 border-cyan-400/70 shadow-[0_15px_40px_rgba(6,182,212,0.2)] -translate-y-2'
                  : 'bg-zinc-950/50 border-white/10 hover:border-white/20 hover:-translate-y-1'
              }`}
              style={{
                perspective: 1000
              }}
            >
              {/* Top Seal */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-cyan-300 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                    <Award size={20} />
                  </div>
                  <span className="font-mono-tech text-[10px] text-zinc-500">
                    CERT 0{idx + 1}
                  </span>
                </div>

                {/* Issuer Badge */}
                <span className="inline-block font-mono-tech text-[10px] text-cyan-400 tracking-wider uppercase mb-1.5">
                  {cert.issuer}
                </span>

                {/* Title */}
                <h3 className="font-display text-lg font-bold text-white leading-snug group-hover:text-cyan-200 transition-colors">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-zinc-400 mt-3 leading-relaxed font-light">
                  {cert.description}
                </p>
              </div>

              {/* Bottom Verification Seal */}
              <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-emerald-400">
                  <ShieldCheck size={14} />
                  <span>VERIFIED RECORD</span>
                </div>
                <span className="font-mono-tech text-[9px] text-zinc-500">
                  {cert.credentialType}
                </span>
              </div>

              {/* Holographic corner highlight */}
              <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          );
        })}
      </div>

      {/* Compliance Note */}
      <div className="mt-10 p-4 rounded-xl bg-zinc-950/40 border border-white/5 flex flex-wrap items-center justify-between gap-4 font-mono-tech text-xs text-zinc-500">
        <span>AUTHENTICITY CLAUSE: Factual records from rafikunnabi-piash.github.io/Portfolio</span>
        <span className="text-cyan-400">NO ARTIFICIAL DATES OR INVENTED SCORES</span>
      </div>
    </section>
  );
}
