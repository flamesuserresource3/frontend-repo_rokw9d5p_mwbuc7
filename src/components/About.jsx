import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (inView && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [inView]);

  return (
    <section id="about" ref={ref} className="relative w-full bg-[var(--bg)] text-[var(--text)] py-24 md:py-36">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
        >
          Crafting premium web experiences.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="mt-4 max-w-2xl text-base sm:text-lg opacity-80"
        >
          I fuse strategy, design, and engineering to deliver immersive, performant, and accessible products. From interactive 3D to meticulous UI systems.
        </motion.p>

        <div className="mt-10 relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <video
            ref={videoRef}
            muted={muted}
            playsInline
            loop
            preload="metadata"
            className="h-full w-full object-cover"
            poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1970&auto=format&fit=crop"
          >
            <source src="https://cdn.coverr.co/videos/coverr-matrix-digital-art-8597/1080p.mp4" type="video/mp4" />
          </video>
          <button
            onClick={() => setMuted((m) => !m)}
            className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-2 text-sm hover:bg-white/20 transition-colors"
          >
            <Play size={16} />
            <span>{muted ? 'Play Reel' : 'Mute'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
