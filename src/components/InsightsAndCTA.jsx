import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Rocket, Code2, Palette, Boxes, Github, Linkedin, Instagram, Twitter } from 'lucide-react';

const services = [
  {
    icon: <Code2 className="text-[var(--accent)]" size={22} />,
    title: 'React.js Development',
    desc: 'Robust, scalable frontends with performance-first patterns.'
  },
  {
    icon: <Palette className="text-[var(--accent)]" size={22} />,
    title: 'UI/UX Design',
    desc: 'Human-centered interfaces with meticulous attention to detail.'
  },
  {
    icon: <Boxes className="text-[var(--accent)]" size={22} />,
    title: '3D Web Experiences',
    desc: 'Immersive, interactive scenes integrated into modern UIs.'
  },
  {
    icon: <Rocket className="text-[var(--accent)]" size={22} />,
    title: 'Frontend Engineering',
    desc: 'Clean architectures, smooth animations, and accessibility.'
  }
];

const ServicesGrid = () => (
  <section className="relative w-full bg-[var(--bg)] text-[var(--text)] py-20">
    <div className="container mx-auto px-6 max-w-6xl">
      <h3 className="text-2xl md:text-3xl font-semibold">What I Do</h3>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-[var(--accent)]/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              {s.icon}
              <h4 className="font-medium">{s.title}</h4>
            </div>
            <p className="mt-2 text-sm opacity-80">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Philosophy = () => (
  <section className="relative w-full bg-[var(--bg)] text-[var(--text)] py-24">
    <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: 'radial-gradient(1200px 400px at 10% 20%, var(--primary), transparent 60%)' }} />
    <div className="container mx-auto px-6 max-w-5xl relative">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-white">Step into a new world</span> and let your imagination run wild
      </motion.p>
    </div>
  </section>
);

const CTAAndFooter = () => (
  <section className="relative w-full bg-[var(--bg)] text-[var(--text)] pt-24 pb-16">
    <div className="container mx-auto px-6 max-w-5xl text-center">
      <h3 className="text-3xl md:text-4xl font-semibold">Ready to Bring Your Vision to Life?</h3>
      <p className="mt-3 opacity-80">Let’s build something remarkable together.</p>
      <a
        href="mailto:you@example.com"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-black hover:translate-y-[-2px] transition-transform"
      >
        Let's Work Together
      </a>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
        <div>
          <h4 className="font-semibold mb-3">Stay in the loop</h4>
          <form className="flex gap-3">
            <input type="email" placeholder="Your email" className="flex-1 rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 outline-none placeholder:text-white/50" />
            <button className="rounded-xl bg-white/10 px-4 py-3 hover:bg-white/20">Subscribe</button>
          </form>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center gap-4">
            <a href="#" aria-label="GitHub" className="hover:text-[var(--accent)]"><Github size={18} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[var(--accent)]"><Linkedin size={18} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-[var(--accent)]"><Instagram size={18} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-[var(--accent)]"><Twitter size={18} /></a>
          </div>
          <p className="text-sm opacity-70">Contact: you@example.com</p>
        </div>
      </div>

      <div className="mt-12 text-sm opacity-70">Built with ❤️ by Your Name</div>
    </div>
  </section>
);

const InsightsAndCTA = () => {
  return (
    <>
      <ServicesGrid />
      <Philosophy />
      <CTAAndFooter />
    </>
  );
};

export default InsightsAndCTA;
