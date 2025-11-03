import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mouse parallax for headline
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 30);
      mouseY.set(y * 30);
    };
    const el = containerRef.current;
    el?.addEventListener('mousemove', handleMouseMove);
    return () => el?.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Fake loader until Spline onLoad fires
  useEffect(() => {
    if (loaded) return;
    let i = 0;
    const id = setInterval(() => {
      i = Math.min(100, i + 4);
      setProgress(i);
      if (i >= 100) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, [loaded]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-[var(--bg)] text-[var(--text)]"
      aria-label="Hero"
    >
      {/* Spline 3D scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/N8g2VNcx8Rycz93J/scene.splinecode"
          onLoad={() => setLoaded(true)}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient vignette overlay (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(31,33,33,0)_0%,rgba(31,33,33,0.35)_60%,rgba(31,33,33,0.9)_100%)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center px-6">
        <motion.h1
          style={{ x: smoothX, y: smoothY }}
          className="font-extrabold leading-[0.95] tracking-[-0.02em] text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="block text-[var(--text)]">Beyond Visions</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-white">Within Reach</span>
        </motion.h1>

        <p className="mt-6 max-w-xl text-sm sm:text-base opacity-80">
          Immersive, high-performance web experiences blending design, code, and 3D.
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-widest opacity-70">scroll to explore</span>
          <ChevronDown className="animate-bounce text-[var(--accent)]" />
        </div>
      </div>

      {/* Loading screen */}
      {!loaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[var(--bg)]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-56 h-1.5 rounded bg-white/10 overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm tracking-wide text-white/80">Loading {progress}%</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
