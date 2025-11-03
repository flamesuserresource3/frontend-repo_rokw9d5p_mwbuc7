import React, { useEffect, useRef, useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedProjects from './components/FeaturedProjects';
import InsightsAndCTA from './components/InsightsAndCTA';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function App() {
  // CSS variables for theming
  const themeVars = {
    '--primary': '#21808D',
    '--bg': '#1F2121',
    '--text': '#F5F5F5',
    '--accent': '#32B8C6',
  };

  // Custom cursor
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const down = (e) => setIsPointer(e.target.closest('a,button,input,textarea,select,[role="button"]'));
    const up = () => setIsPointer(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', down);
    window.addEventListener('mouseout', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', down);
      window.removeEventListener('mouseout', up);
    };
  }, [cursorX, cursorY]);

  return (
    <div style={themeVars} className="bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)]/30 selection:text-[var(--text)] scroll-smooth">
      <Hero />
      <About />
      <FeaturedProjects />
      <InsightsAndCTA />

      {/* Custom cursor */}
      <motion.div
        aria-hidden
        className={`fixed top-0 left-0 z-[999] h-6 w-6 rounded-full mix-blend-difference pointer-events-none ${isPointer ? 'bg-white/80' : 'bg-white/60'}`}
        style={{ translateX: smoothX, translateY: smoothY, x: '-50%', y: '-50%' }}
      />
    </div>
  );
}

export default App;
