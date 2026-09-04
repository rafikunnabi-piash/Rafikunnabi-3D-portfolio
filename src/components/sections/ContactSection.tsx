import { useState, type FormEvent } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { FinalCoreScene } from '../3d/FinalCoreScene';
import { Mail, Copy, Check, ExternalLink, Github, Linkedin, Send, ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { sound } from '../../utils/audio';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [showDirectForm, setShowDirectForm] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [hasConverged, setHasConverged] = useState(false);

  const handleCopyEmail = () => {
    sound.hoverTick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!messageText) return;
    sound.playChime(784);
    setIsSent(true);
    setTimeout(() => {
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=Inquiry from 3D Portfolio&body=${encodeURIComponent(messageText + '\n\nFrom: ' + senderEmail)}`;
    }, 600);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-between"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono-tech text-[10px] tracking-[0.3em] font-semibold text-white/50 uppercase">
            SECTION 08 // CONVERGENCE & CONTACT
          </span>
          <div className="h-[1px] w-12 bg-white/20" />
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[0.95]">
          LET'S BUILD <br />
          <span className="text-stroke-white tracking-tighter">
            SOMETHING MEANINGFUL.
          </span>
        </h2>
        <p className="font-mono-tech text-xs sm:text-sm text-white/60 mt-4 max-w-xl">
          Evolved from learning and experimentation to production-grade engineering and operational infrastructure.
        </p>
      </div>

      {/* Main Grid: 3D Evolved Core & Contact Engine */}
      <div className="grid lg:grid-cols-12 gap-8 items-center my-8">
        {/* Left: 3D Evolved Core Canvas */}
        <div className="lg:col-span-6 relative flex flex-col items-center">
          <FinalCoreScene />

          {/* Evolution Progression Banner */}
          <div className="flex items-center justify-center gap-3 text-[10px] font-mono-tech text-white/50 mt-2 tracking-[0.2em] uppercase">
            <span className="text-white/30">CYCLE:</span>
            <span className="text-white/80">LEARNING</span>
            <span>→</span>
            <span className="text-white/80">BUILDING</span>
            <span>→</span>
            <span className="text-white font-bold">EXPERIENCE</span>
          </div>
        </div>

        {/* Right: Contact Touchpoints */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-8 rounded-3xl bg-[#080808]/90 border border-white/10 backdrop-blur-xl space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            <div>
              <span className="font-mono-tech text-[10px] text-white/50 tracking-[0.25em] uppercase block mb-1">
                DIRECT COMMUNICATION CANAL
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Initiate Dialogue
              </h3>
            </div>

            {/* Email Bar with Quick Copy */}
            <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-[#0d0d0d] border border-white/10 gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0">
                  <Mail size={16} />
                </div>
                <span className="font-mono-tech text-xs sm:text-sm text-white/90 truncate">
                  {PERSONAL_INFO.email}
                </span>
              </div>

              <button
                onClick={handleCopyEmail}
                data-cursor="COPY"
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white text-xs font-mono-tech flex items-center gap-1.5 transition-colors shrink-0 border border-white/10"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            {/* Magnetic GET IN TOUCH CTA Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Let's%20Build%20Something%20Meaningful`}
                data-cursor="MAIL"
                className="flex-1 py-4 px-6 rounded-2xl bg-white text-black font-display font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-white/90 hover:scale-[1.02] active:scale-95 transition-all text-center"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight size={16} />
              </a>

              <button
                onClick={() => setShowDirectForm(!showDirectForm)}
                data-cursor="MESSAGE"
                className="px-5 py-4 rounded-2xl bg-[#0e0e0e] hover:bg-[#141414] border border-white/15 text-white/80 hover:text-white font-mono-tech text-xs tracking-[0.2em] uppercase transition-colors text-center"
              >
                {showDirectForm ? 'HIDE FORM' : 'QUICK NOTE'}
              </button>
            </div>

            {/* Quick In-App Message Drawer */}
            {showDirectForm && (
              <form onSubmit={handleSendMessage} className="space-y-3 pt-4 border-t border-white/10 animate-fade-in">
                <input
                  type="email"
                  placeholder="Your return email address..."
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  required
                  className="w-full bg-black/70 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white"
                />
                <textarea
                  placeholder="Write your project or hiring message for Rafikunnabi..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-black/70 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  disabled={isSent}
                  className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-white/90 transition-all"
                >
                  <Send size={13} />
                  <span>{isSent ? 'LAUNCHING EMAIL CLIENT...' : 'DISPATCH MESSAGE'}</span>
                </button>
              </form>
            )}

            {/* Verified Social Channels */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono-tech text-xs text-white/40 tracking-wider">
                PROFILES:
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="GITHUB"
                  className="flex items-center gap-1.5 text-xs font-mono-tech text-white/60 hover:text-white transition-colors tracking-widest uppercase"
                >
                  <Github size={14} /> GITHUB
                </a>
                <span className="text-white/20">•</span>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="LINKEDIN"
                  className="flex items-center gap-1.5 text-xs font-mono-tech text-white/60 hover:text-white transition-colors tracking-widest uppercase"
                >
                  <Linkedin size={14} /> LINKEDIN
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FINAL 3D TRANSFORMATION & MONOLITH FOOTER */}
      <div className="mt-16 pt-12 border-t border-white/10 flex flex-col items-center text-center space-y-6">
        {/* Shard Deconstruction Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono-tech text-[10px] sm:text-xs text-white/60 uppercase tracking-[0.3em]">
          <span>CODE</span>
          <span className="text-white/20">·</span>
          <span>DESIGN</span>
          <span className="text-white/20">·</span>
          <span>NETWORK</span>
          <span className="text-white/20">·</span>
          <span>SYSTEM</span>
          <span className="text-white/20">·</span>
          <span>IDEA</span>
        </div>

        {/* The Converged RP Monolith */}
        <div className="relative flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d0d0d] border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-3">
            <span className="font-display text-2xl font-black text-white tracking-tighter">
              RP
            </span>
          </div>

          <h4 className="font-display text-lg sm:text-xl font-bold tracking-[0.3em] text-white uppercase">
            RAFIKUNNABI PIASH
          </h4>
          <p className="font-mono-tech text-xs text-white/50 tracking-[0.2em] mt-1 uppercase">
            FRONTEND DEVELOPER · UI/UX · IT SUPPORT
          </p>
        </div>

        {/* Minimal Black Screen Fade & Copyright */}
        <div className="pt-8 text-[10px] font-mono-tech text-white/40 tracking-widest flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl uppercase">
          <div>&copy; 2026 RAFIKUNNABI PIASH. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-6 mt-2 sm:mt-0">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white transition-colors">
              {PERSONAL_INFO.email}
            </a>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              GITHUB
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
