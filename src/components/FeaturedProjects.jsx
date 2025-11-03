import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    id: 'rs-dental',
    title: 'RS Dental Clinic',
    tags: ['web', 'design', 'development', '3d'],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1970&auto=format&fit=crop',
  },
  {
    id: 'immersive-store',
    title: 'Immersive Commerce',
    tags: ['web', '3d', 'shop'],
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1970&auto=format&fit=crop',
  },
  {
    id: 'motion-brand',
    title: 'Motion Branding',
    tags: ['ui', 'ux', 'motion'],
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1970&auto=format&fit=crop',
  },
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--rx', `${-py * 8}deg`);
    el.style.setProperty('--ry', `${px * 10}deg`);
    el.style.setProperty('--tx', `${px * 6}px`);
    el.style.setProperty('--ty', `${py * 6}px`);
  };

  const onMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--tx', '0px');
    el.style.setProperty('--ty', '0px');
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur will-change-transform"
      style={{
        transform: 'translate3d(var(--tx), var(--ty), 0) rotateX(var(--rx)) rotateY(var(--ry))',
        transition: 'transform 120ms ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
        <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70" />
        <div className="absolute left-4 bottom-4 flex flex-col gap-1">
          <h3 className="text-lg md:text-xl font-semibold">{project.title}</h3>
          <p className="text-xs md:text-sm opacity-80">{project.tags.join(' • ')}</p>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-60" style={{ background: 'radial-gradient(800px 200px at 50% 0%, var(--accent) 0%, transparent 60%)' }} />
    </motion.article>
  );
};

const FeaturedProjects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="projects" className="relative w-full bg-[var(--bg)] text-[var(--text)] py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
          >
            Featured Projects
          </motion.h2>
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            See all projects
          </motion.a>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
