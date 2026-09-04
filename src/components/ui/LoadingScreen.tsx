import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'rp' | 'name' | 'ready'>('rp');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Step 1: RP Mark
    const t1 = setTimeout(() => {
      setPhase('name');
    }, 450);

    // Progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 18) + 8;
        return Math.min(100, prev + step);
      });
    }, 80);

    const t2 = setTimeout(() => {
      setPhase('ready');
    }, 1100);

    const t3 = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05060a] text-white transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient glow */}
      <div className="absolute h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      {/* Futuristic Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md">
        {/* Visual Mark Monogram */}
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-900/90 border border-cyan-400/40 shadow-[0_0_35px_rgba(6,182,212,0.3)]">
          <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-cyan-500/20 to-transparent animate-pulse" />
          <span className="font-display text-3xl font-extrabold tracking-wider text-cyan-300">
            RP
          </span>
          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]" />
        </div>

        {/* Primary Name reveal */}
        <div className="h-10 overflow-hidden mb-2">
          <h1
            className={`font-display text-xl sm:text-2xl font-bold tracking-[0.25em] uppercase text-zinc-100 transition-all duration-700 transform ${
              phase !== 'rp' ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Rafikunnabi Piash
          </h1>
        </div>

        {/* Subtitle Tech Tagline */}
        <p className="font-mono-tech text-xs tracking-widest text-zinc-400 mb-8 uppercase">
          From Code to Experience
        </p>

        {/* Progress Bar & Telemetry */}
        <div className="w-56 space-y-2">
          <div className="h-[2px] w-full bg-zinc-800 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-linear-to-r from-cyan-400 via-sky-300 to-blue-500 transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono-tech text-zinc-400">
            <span>INITIALIZING 3D WEBGL</span>
            <span className="text-cyan-300">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
