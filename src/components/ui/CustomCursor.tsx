import { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor], a, button, input, [role="button"]') as HTMLElement | null;

      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor');
        setCursorText(customText || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  // Smooth lerp loop
  useEffect(() => {
    if (isTouch) return;

    let currentX = position.x;
    let currentY = position.y;

    const animate = () => {
      const ease = 0.22;
      currentX += (targetPos.x - currentX) * ease;
      currentY += (targetPos.y - currentY) * ease;

      setPosition({ x: currentX, y: currentY });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetPos, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-9999 transition-opacity duration-300"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        left: 0,
        top: 0,
        opacity: isVisible ? 1 : 0
      }}
    >
      {/* Center point */}
      <div
        className={`relative -left-1/2 -top-1/2 flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
          isHovered
            ? 'h-14 w-14 bg-cyan-400/15 border border-cyan-400/80 backdrop-blur-[2px] shadow-[0_0_20px_rgba(6,182,212,0.3)]'
            : 'h-3.5 w-3.5 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
        }`}
      >
        {isHovered && cursorText && (
          <span className="font-mono-tech text-[9px] font-bold tracking-widest text-cyan-200 uppercase animate-pulse">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
