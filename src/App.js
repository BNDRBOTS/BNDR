import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';

/**
 * BNDR AGENCY - REACT ARCHITECTURE [V3: ASSET HARDENING]
 * FIX: Replaced restricted Drive URLs with high-availability Unsplash CDN endpoints.
 * ENHANCEMENT: Shimmer loading states and eager rendering for 3D performance.
 */

// --- VERBATIM CONTENT & HIGH-QUALITY ASSETS ---
const CONTENT = {
  hero: {
    title1: "BNDR",
    title2: "CREATE",
    copy: "Every element on your page forces attention in the exact order that drives action, need to design your brand, don't have time - don't know who to trust? Let our work and knowing you'll have access directly to the source at all times be your assurance."
  },
  modalDesc: "At BNDR LLC, we approach every design challenge with a rigorous commitment to both aesthetic dominance and metric-driven performance. This artifact exemplifies our core philosophy: eliminating the superfluous to amplify the essential. By leveraging asymmetric grid structures, high-contrast brutalist typography, and bespoke WebGL environments, we establish a visual hierarchy that intuitively guides user attention toward key conversion points. \n\nThe deployment of kinetic motion and scroll-linked spatial transformations serves not just as eye-catching flair, but as functional dopamine triggers, engineered to sustain engagement and heavily reduce bounce rates. Every asset rendered here was meticulously optimized for cross-platform delivery, ensuring that heavy visual lifting never compromises loading speeds or seamless mobile accessibility. \n\nOur strategic use of negative space creates an architectural breathing room that elevates the brand's perceived value, firmly positioning it within the premium market tier. Direct communication channels during the development cycle allowed us to iterate rapidly based on live data, culminating in a digital experience that feels bespoke, authoritative, and fiercely modern. We believe that true brand recognition isn't just about being seen—it's about being undeniably remembered and trusted on impact.",
  logoUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=200&auto=format", 
  portfolio: [
    { id: 1, src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format', link: 'https://bndr.agency' },
    { id: 2, src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format', link: 'https://bndr.agency' },
    { id: 3, src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format', link: 'https://bndr.agency' },
    { id: 4, src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format', link: 'https://bndr.agency' },
    { id: 5, src: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format', link: 'https://bndr.agency' },
    { id: 6, src: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=1200&auto=format', link: 'https://bndr.agency' }
  ]
};

const App = () => {
  const [isAudio, setIsAudio] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [cursorLabel, setCursorLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const audioCtx = useRef(null);
  const playTick = () => {
    if (!isAudio) return;
    if (!audioCtx.current) audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    osc.connect(gain); gain.connect(audioCtx.current.destination);
    osc.frequency.setValueAtTime(150, audioCtx.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.1);
    gain.gain.setValueAtTime(0.05, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.05);
    osc.start(); osc.stop(audioCtx.current.currentTime + 0.1);
  };

  return (
    <div className="relative bg-black text-white selection:bg-white selection:text-black overflow-x-hidden w-full font-sans" style={{ height: '700vh' }}>
      
      {/* 12-COLUMN ARCHITECTURAL GRID */}
      <div className="fixed inset-0 pointer-events-none z-10 grid grid-cols-12 gap-5 px-[4vw] opacity-10 mix-blend-overlay">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-l border-[#2A2A2D] h-full last:border-r" />
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* OPTICAL GLASS CURSOR */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none hidden md:flex items-center justify-center transition-[width,height,background] duration-300 ease-out"
        style={{
          width: isHovering ? '80px' : '32px',
          height: isHovering ? '80px' : '32px',
          marginLeft: isHovering ? '-40px' : '-16px',
          marginTop: isHovering ? '-40px' : '-16px',
          background: isHovering ? 'rgba(255,255,255,0.05)' : 'transparent',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%',
        }}
      >
        <span className={`font-mono text-[8px] tracking-widest font-bold transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
          {cursorLabel}
        </span>
      </div>

      {/* HUD NAV */}
      <div className="fixed top-10 left-[4vw] z-[1000] mix-blend-difference pointer-events-auto">
        <div 
          className="text-xl font-black tracking-tighter cursor-pointer"
          onMouseEnter={() => { setIsHovering(true); setCursorLabel("HOME"); }}
          onMouseLeave={() => setIsHovering(false)}
        >
          BNDR.
        </div>
      </div>
      
      <nav className="fixed top-10 right-[4vw] z-[1000] flex gap-10 font-mono text-[10px] tracking-widest uppercase mix-blend-difference pointer-events-auto">
        {['BRAND', 'BELIEF', 'DESIGN'].map((item) => (
          <button 
            key={item}
            className="group relative"
            onMouseEnter={() => { setIsHovering(true); setCursorLabel("VIEW"); }}
            onMouseLeave={() => setIsHovering(false)}
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </button>
        ))}
      </nav>

      {/* HELIX CAROUSEL */}
      <div className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none perspective-[1500px]">
        <div className="relative w-[300px] h-[450px] preserve-3d pointer-events-auto">
          {CONTENT.portfolio.map((item, i) => (
            <HelixCard 
              key={item.id} 
              index={i} 
              total={CONTENT.portfolio.length} 
              progress={smoothProgress} 
              item={item}
              onOpen={() => { playTick(); setActiveProject(item); }}
              onHover={(label) => { setCursorLabel(label); setIsHovering(true); }}
              onLeave={() => setIsHovering(false)}
            />
          ))}
        </div>
      </div>

      <main className="relative z-30 pointer-events-none">
        <section className="h-screen px-[4vw] flex flex-col justify-center">
          <div className="max-w-[1400px] w-full mx-auto">
            <h1 className="text-[clamp(4rem,12vw,12rem)] font-black leading-[0.85] tracking-tighter uppercase overflow-hidden">
              <motion.span initial={{y: "100%"}} animate={{y: 0}} transition={{duration: 1, ease: [0.19, 1, 0.22, 1]}} className="block">
                {CONTENT.hero.title1}
              </motion.span>
            </h1>
            <h1 className="text-[clamp(4rem,12vw,12rem)] font-black leading-[0.85] tracking-tighter uppercase overflow-hidden">
              <motion.span initial={{y: "100%"}} animate={{y: 0}} transition={{duration: 1, delay: 0.1, ease: [0.19, 1, 0.22, 1]}} className="block">
                {CONTENT.hero.title2}
              </motion.span>
            </h1>
            <p className="font-mono text-sm opacity-60 mt-8 max-w-md leading-relaxed">
              {CONTENT.hero.copy}
            </p>
          </div>
        </section>

        <div className="h-[500vh]" />

        <section className="h-screen px-[4vw] flex flex-col justify-center items-end text-right">
          <h2 className="text-[clamp(3rem,8vw,8rem)] font-black leading-[0.85] tracking-tighter uppercase">
            END<br/>STATE
          </h2>
        </section>
      </main>

      <footer className="fixed bottom-10 left-[4vw] right-[4vw] z-[1000] flex justify-between items-end border-t border-[#2A2A2D] pt-4 font-mono text-[10px] tracking-widest">
        <div className="opacity-40 uppercase">©2025 BNDR LLC</div>
        <button 
          onClick={() => setIsAudio(!isAudio)}
          onMouseEnter={() => { setIsHovering(true); setCursorLabel("AUDIO"); }}
          onMouseLeave={() => setIsHovering(false)}
          className="pointer-events-auto"
        >
          {isAudio ? "AUDIO_ON" : "AUDIO_OFF"}
        </button>
      </footer>

      {/* MODAL */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-none"
            onClick={() => setActiveProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#080808] border border-white/10 rounded-xl w-full max-w-7xl h-[85vh] flex flex-col md:flex-row overflow-hidden shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors pointer-events-auto"
                onMouseEnter={() => { setIsHovering(true); setCursorLabel("CLOSE"); }}
                onMouseLeave={() => setIsHovering(false)}
              >
                <X size={20} />
              </button>

              <div className="flex-[1.5] bg-black overflow-hidden relative">
                <img 
                  src={activeProject.src} 
                  alt="Portfolio" 
                  loading="eager"
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="flex-1 p-10 md:p-16 flex flex-col">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">PROJECT_OVERVIEW</h3>
                <div className="font-mono text-xs opacity-60 leading-relaxed overflow-y-auto mb-10 pr-4 custom-scrollbar">
                  {CONTENT.modalDesc}
                </div>
                
                <a 
                  href={activeProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-3 bg-white text-black font-mono font-bold text-xs py-5 rounded group pointer-events-auto"
                  onMouseEnter={() => { setIsHovering(true); setCursorLabel("LAUNCH"); }}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  OPEN FULL EXPERIENCE <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .preserve-3d { transform-style: preserve-3d; }
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2A2A2D; }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-overlay {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }
      `}} />
    </div>
  );
};

const HelixCard = ({ index, total, progress, item, onOpen, onHover, onLeave }) => {
  const [loaded, setLoaded] = useState(false);
  const angleBase = (index / total) * Math.PI * 2;
  
  const transform = useTransform(progress, (p) => {
    const rotation = p * 15;
    const angle = angleBase + rotation;
    const radius = window.innerWidth < 768 ? 160 : 350;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const y = (angle / (Math.PI * 2)) * 80 - 40;
    const rotY = (angle * 180) / Math.PI;
    return `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg)`;
  });

  const opacity = useTransform(progress, (p) => {
    const rotation = p * 15;
    const angle = angleBase + rotation;
    const z = Math.cos(angle);
    return 0.3 + (z + 1) / 2 * 0.7;
  });

  return (
    <motion.div
      style={{ transform, opacity }}
      className="absolute inset-0 bg-[#0c0c0c] border border-white/10 rounded-lg overflow-hidden group cursor-none pointer-events-auto"
      onClick={onOpen}
      onMouseEnter={() => onHover("OPEN")}
      onMouseLeave={onLeave}
    >
      {/* 10% OPACITY SHIMMER PLACEHOLDER */}
      <div className={`absolute inset-0 bg-white/10 shimmer-overlay transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`} />
      
      <img 
        src={item.src} 
        alt="Portfolio" 
        loading="eager"
        crossOrigin="anonymous"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 pointer-events-none ${loaded ? 'opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110' : 'opacity-0'}`} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default App;
